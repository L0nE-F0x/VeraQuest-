import { QUESTS } from '../data/topics';
import { sounds } from '../utils/sounds';

export interface PlayerState {
  explorerLevel: number;
  xp: number;
  xpToNextLevel: number;
  stickers: string[]; // Unlocked sticker IDs
  badges: string[]; // Unlocked badge IDs (e.g. 'badge_english_master')
  completedQuests: Record<string, number>; // questId -> bestScore (0-100)
  streak: number;
  lastStudyDate: string; // YYYY-MM-DD
  dailyChestOpened: boolean;
  companionName: string;
  avatarUnlocks: string[]; // unlocked cosmetic accessories
}

const DEFAULT_STATE: PlayerState = {
  explorerLevel: 1,
  xp: 0,
  xpToNextLevel: 100,
  stickers: [],
  badges: [],
  completedQuests: {},
  streak: 0,
  lastStudyDate: '',
  dailyChestOpened: false,
  companionName: 'Lumi',
  avatarUnlocks: []
};

type StateListener = (state: PlayerState) => void;

class GameStateManager {
  private state: PlayerState;
  private listeners: Set<StateListener> = new Set();

  constructor() {
    this.state = this.loadState();
    this.checkDailyReset();
  }

  private loadState(): PlayerState {
    const saved = localStorage.getItem('vera_quest_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaults for safety if new fields are added
        return { ...DEFAULT_STATE, ...parsed };
      } catch (e) {
        console.error('Failed to parse saved state, resetting', e);
        return { ...DEFAULT_STATE };
      }
    }
    return { ...DEFAULT_STATE };
  }

  private saveState() {
    localStorage.setItem('vera_quest_state', JSON.stringify(this.state));
    this.notify();
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    // Immediate callback with current state
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  public getState(): PlayerState {
    return { ...this.state };
  }

  public renameCompanion(newName: string) {
    this.state.companionName = newName.trim() || 'Lumi';
    this.saveState();
  }

  private checkDailyReset() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = this.state.lastStudyDate;

    if (lastDate !== today) {
      this.state.dailyChestOpened = false;
      
      // Calculate streak
      if (lastDate) {
        const last = new Date(lastDate);
        const curr = new Date(today);
        const diffTime = Math.abs(curr.getTime() - last.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          // Streak broken
          this.state.streak = 0;
        }
      } else {
        this.state.streak = 0;
      }
      this.saveState();
    }
  }

  public addXP(amount: number): { leveledUp: boolean; newLevel: number } {
    let leveledUp = false;
    this.state.xp += amount;
    
    // Check level ups. Level curve: Level 1: 100XP, Level 2: 150XP, Level 3: 200XP, Level 4: 250XP, etc.
    let xpNeeded = this.getXPNeededForLevel(this.state.explorerLevel);
    while (this.state.xp >= xpNeeded) {
      this.state.xp -= xpNeeded;
      this.state.explorerLevel++;
      leveledUp = true;
      xpNeeded = this.getXPNeededForLevel(this.state.explorerLevel);
      
      // Unlock accessories based on level
      this.unlockAccessoriesForLevel(this.state.explorerLevel);
    }
    
    this.state.xpToNextLevel = xpNeeded;
    this.saveState();

    if (leveledUp) {
      setTimeout(() => sounds.playLevelUp(), 500);
    }

    return { leveledUp, newLevel: this.state.explorerLevel };
  }

  private getXPNeededForLevel(level: number): number {
    // Level 1: 100, Level 2: 150, Level 3: 200, Level 4: 250, Level 5+: 300
    if (level === 1) return 100;
    if (level === 2) return 150;
    if (level === 3) return 200;
    if (level === 4) return 250;
    return 300;
  }

  private unlockAccessoriesForLevel(level: number) {
    const unlocks = this.state.avatarUnlocks;
    if (level === 2 && !unlocks.includes('hat')) {
      unlocks.push('hat');
    }
    if (level === 3 && !unlocks.includes('goggles')) {
      unlocks.push('goggles');
    }
    if (level === 4 && !unlocks.includes('shell')) {
      unlocks.push('shell');
    }
  }

  public getCompanionLevel(): number {
    // Lumi levels up with player: Level 1, 2, 3, 4 based on accessories unlocked
    const unlocks = this.state.avatarUnlocks;
    let lvl = 1;
    if (unlocks.includes('hat')) lvl = 2;
    if (unlocks.includes('goggles')) lvl = 3;
    if (unlocks.includes('shell')) lvl = 4;
    return lvl;
  }

  public claimDailyChest(): { xpReward: number; streak: number } {
    if (this.state.dailyChestOpened) {
      return { xpReward: 0, streak: this.state.streak };
    }

    const today = new Date().toISOString().split('T')[0];
    
    // Update streak
    if (this.state.lastStudyDate === '') {
      this.state.streak = 1;
    } else {
      const last = new Date(this.state.lastStudyDate);
      const curr = new Date(today);
      const diffTime = Math.abs(curr.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        this.state.streak++;
      } else if (diffDays > 1) {
        this.state.streak = 1;
      }
    }

    this.state.lastStudyDate = today;
    this.state.dailyChestOpened = true;
    
    // Daily chest rewards 30 XP
    const xpReward = 30;
    this.addXP(xpReward);
    
    sounds.playChestOpen();
    this.saveState();
    
    return { xpReward, streak: this.state.streak };
  }

  public completeQuest(questId: string, score: number): { xpReward: number; stickerUnlocked: string | null; badgeUnlocked: string | null } {
    const quest = QUESTS.find(q => q.id === questId);
    if (!quest) return { xpReward: 0, stickerUnlocked: null, badgeUnlocked: null };

    const previousBest = this.state.completedQuests[questId] || 0;
    let xpReward = 0;
    let stickerUnlocked: string | null = null;
    let badgeUnlocked: string | null = null;

    // Calculate XP reward
    if (score > previousBest) {
      this.state.completedQuests[questId] = score;
      
      // First-time completion or higher score improvement
      const improvement = score - previousBest;
      xpReward = Math.round((improvement / 100) * quest.xpReward);
      
      // If completed with score >= 70% (passing score), unlock sticker
      if (score >= 70 && !this.state.stickers.includes(quest.stickerId)) {
        this.state.stickers.push(quest.stickerId);
        stickerUnlocked = quest.stickerId;
      }
      
      this.addXP(xpReward);
    }

    // Check subject mastery for badges (All quests in a subject completed with score >= 70%)
    const subjectQuests = QUESTS.filter(q => q.subject === quest.subject);
    const completedSubjectQuests = subjectQuests.filter(q => (this.state.completedQuests[q.id] || 0) >= 70);
    
    const subjectBadgeId = `badge_${quest.subject}_master`;
    if (completedSubjectQuests.length === subjectQuests.length && !this.state.badges.includes(subjectBadgeId)) {
      this.state.badges.push(subjectBadgeId);
      badgeUnlocked = subjectBadgeId;
    }

    const today = new Date().toISOString().split('T')[0];
    this.state.lastStudyDate = today;
    this.saveState();

    return { xpReward, stickerUnlocked, badgeUnlocked };
  }

  public getSubjectMastery(subject: 'english' | 'math' | 'science'): number {
    const subjectQuests = QUESTS.filter(q => q.subject === subject);
    if (subjectQuests.length === 0) return 0;
    
    const totalScore = subjectQuests.reduce((sum, q) => {
      const score = this.state.completedQuests[q.id] || 0;
      return sum + (score >= 70 ? 100 : score); // treat passing as fully mastered for simplicity, or sum score
    }, 0);
    
    return Math.round(totalScore / subjectQuests.length);
  }

  public getOverallMastery(): number {
    const subjects: ('english' | 'math' | 'science')[] = ['english', 'math', 'science'];
    const total = subjects.reduce((sum, sub) => sum + this.getSubjectMastery(sub), 0);
    return Math.round(total / 3);
  }

  public resetProgress() {
    this.state = { ...DEFAULT_STATE };
    // Clear localStorage
    localStorage.removeItem('vera_quest_state');
    localStorage.removeItem('vera_quest_muted');
    this.saveState();
  }
}

export const gameState = new GameStateManager();
