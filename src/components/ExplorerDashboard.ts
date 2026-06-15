import { gameState } from '../game/state';
import { sounds } from '../utils/sounds';
import { QUESTS } from '../data/topics';

const SUBJECTS: { key: 'english' | 'math' | 'science'; label: string; place: string; color: string }[] = [
  { key: 'english', label: 'English', place: 'English Cove', color: 'var(--color-coral)' },
  { key: 'math', label: 'Math', place: 'Math Peaks', color: 'var(--color-gold-dark)' },
  { key: 'science', label: 'Science', place: 'Science Lagoon', color: 'var(--color-teal)' }
];

export class ExplorerDashboard {
  private container: HTMLDivElement;
  private onShowCertificate: () => void;
  private onShowPaperPractice: () => void;

  constructor(parent: HTMLElement, onShowCertificate: () => void, onShowPaperPractice: () => void) {
    this.onShowCertificate = onShowCertificate;
    this.onShowPaperPractice = onShowPaperPractice;

    this.container = document.createElement('div');
    this.container.className = 'screen';
    this.container.id = 'screen-dashboard';
    parent.appendChild(this.container);

    this.render();

    // Subscribe to state to redraw when progress is made
    gameState.subscribe(() => {
      this.render();
    });
  }

  /** Map a mastery percentage to a Cambridge-style practice band. */
  private getBand(pct: number): { name: string; reached: boolean } {
    if (pct >= 90) return { name: 'Higher', reached: true };
    if (pct >= 70) return { name: 'Good', reached: true };
    if (pct >= 40) return { name: 'Developing', reached: false };
    return { name: 'Aspiring', reached: false };
  }

  private render() {
    const state = gameState.getState();
    const engMastery = gameState.getSubjectMastery('english');
    const mathMastery = gameState.getSubjectMastery('math');
    const sciMastery = gameState.getSubjectMastery('science');
    const overallMastery = gameState.getOverallMastery();
    const masteryByKey: Record<string, number> = { english: engMastery, math: mathMastery, science: sciMastery };

    const xpPercent = Math.min(100, Math.round((state.xp / state.xpToNextLevel) * 100));

    // Circular ring stroke offset math
    const circumference = 2 * Math.PI * 26; // r=26
    const offset = (m: number) => circumference - (m / 100) * circumference;

    const allReachedGood = SUBJECTS.every(s => masteryByKey[s.key] >= 70);

    let html = `
      <!-- User stats header -->
      <div class="dashboard-header">
        <div class="dashboard-userinfo">
          <div>
            <h2 style="color:var(--color-text); font-size:1.4rem;">Vera's Study Log</h2>
            <p style="font-size:0.85rem; color:var(--color-text-muted);">Goal: reach the <strong>Good</strong> band in all three subjects for Grade 6 entry</p>
          </div>
          <div class="dashboard-level-badge flex-center">
            ${state.explorerLevel}
          </div>
        </div>

        <div class="xp-progress-container">
          <div class="xp-progress-fill" style="width: ${xpPercent}%;"></div>
        </div>
        <div class="xp-progress-text">
          XP: ${state.xp} / ${state.xpToNextLevel} to next explorer level
        </div>
      </div>

      <!-- Ring Mastery stats with band labels -->
      <div class="mastery-rings-container">
    `;

    SUBJECTS.forEach(s => {
      const m = masteryByKey[s.key];
      const band = this.getBand(m);
      html += `
        <div class="mastery-ring-card">
          <svg class="mastery-ring-svg" viewBox="0 0 60 60">
            <circle class="mastery-ring-bg" cx="30" cy="30" r="26" />
            <circle class="mastery-ring-fill mastery-ring-fill-${s.key}" cx="30" cy="30" r="26"
                    stroke-dasharray="${circumference}" stroke-dashoffset="${offset(m)}" />
          </svg>
          <div class="mastery-ring-text">
            <div>${s.label}</div>
            <div style="color:${s.color}; font-size:0.95rem;">${m}%</div>
            <div class="band-pill ${band.reached ? 'band-pill-good' : ''}">${band.name}</div>
          </div>
        </div>
      `;
    });

    html += `
      </div>

      <!-- Readiness / focus insight -->
      <div class="strengths-container">
        <h3 class="strengths-title">🎯 Where to focus next</h3>
        <p class="strengths-text">${this.getReadinessText(masteryByKey, overallMastery)}</p>
        ${allReachedGood
          ? `<button class="quest-card-play-btn" id="btn-claim-cert" style="margin-top:14px;">🏆 Claim your Grade 6 Ready certificate</button>`
          : ''}
      </div>

      <!-- Paper practice -->
      <div class="strengths-container" style="border-left-color: var(--color-gold);">
        <h3 class="strengths-title" style="color: var(--color-gold-dark);">🖨️ Practice on paper</h3>
        <p class="strengths-text">A printable pack with a reading passage, a writing task, and Math &amp; Science questions — great for practising away from the screen. Includes an answer key for parents.</p>
        <button class="quest-card-play-btn" id="btn-paper-practice" style="margin-top:14px; background:var(--color-gold-dark);">Open printable practice sheets</button>
      </div>

      <!-- Per-subject topic checklist -->
      <div class="plan-container">
        <h3 class="plan-title">Topic checklist · Cambridge Stage 5</h3>
        <p style="font-size:0.78rem; color:var(--color-text-muted); margin-bottom:12px;">
          A topic counts as mastered once you score 70%+ (the Good standard). Tap a subject location on the Map to practise it.
        </p>
        ${SUBJECTS.map(s => this.renderSubjectChecklist(s, state)).join('')}
      </div>

      <!-- Settings -->
      <div style="background:white; border-radius:var(--border-radius-md); padding:20px; margin:16px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:16px;">
        <h3 style="font-family:var(--font-display); font-size:1.1rem; color:var(--color-text);">Settings</h3>

        <div>
          <label style="font-size:0.8rem; font-weight:bold; color:var(--color-text-muted); display:block; margin-bottom:6px;">Study buddy's name</label>
          <div style="display:flex; gap:12px;">
            <input type="text" id="companion-name-input" value="${state.companionName}"
                   style="flex:1; padding:8px 12px; border-radius:8px; border:2px solid var(--color-sand-dark); outline:none; font-family:var(--font-primary); font-weight:bold;" />
            <button id="btn-rename-lumi" class="btn-primary" style="padding:8px 16px; border-radius:8px; font-size:0.85rem; box-shadow:none;">Save</button>
          </div>
        </div>

        <div style="display:flex; gap:12px; justify-content:space-between; margin-top:8px; border-top:1.5px solid var(--color-sand-dark); padding-top:16px;">
          <button id="btn-toggle-sound" class="btn-secondary" style="flex:1; font-size:0.8rem; padding:8px;">
            🔊 Sound: ${sounds.isMuted() ? 'OFF' : 'ON'}
          </button>
          <button id="btn-reset-game" class="btn-secondary settings-panel-btn-danger" style="flex:1; font-size:0.8rem; padding:8px; border-radius:8px;">
            ⚠️ Reset Progress
          </button>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.initEvents();
  }

  private renderSubjectChecklist(
    s: { key: 'english' | 'math' | 'science'; label: string; place: string; color: string },
    state: any
  ): string {
    const quests = QUESTS.filter(q => q.subject === s.key);
    const done = quests.filter(q => (state.completedQuests[q.id] || 0) >= 70).length;

    let rows = '';
    quests.forEach(q => {
      const best = state.completedQuests[q.id] || 0;
      const isDone = best >= 70;
      const started = best > 0;
      const icon = isDone ? '✅' : started ? '🔶' : '⚪';
      const scoreLabel = started ? `${best}%` : '';
      rows += `
        <div class="checklist-row">
          <span class="checklist-icon">${icon}</span>
          <span class="checklist-topic">${q.topic}</span>
          <span class="checklist-score">${scoreLabel}</span>
        </div>
      `;
    });

    return `
      <div class="checklist-subject">
        <div class="checklist-subject-head" style="border-left:4px solid ${s.color};">
          <strong>${s.place}</strong>
          <span class="checklist-count">${done}/${quests.length} mastered</span>
        </div>
        ${rows}
      </div>
    `;
  }

  private initEvents() {
    // Rename study buddy
    const renameBtn = this.container.querySelector('#btn-rename-lumi');
    const nameInput = this.container.querySelector('#companion-name-input') as HTMLInputElement;
    renameBtn?.addEventListener('click', () => {
      const newName = nameInput?.value || 'Lumi';
      gameState.renameCompanion(newName);
      sounds.playPop();

      const bubble = document.querySelector('.companion-bubble');
      const bubbleText = bubble?.querySelector('div');
      if (bubble && bubbleText) {
        (bubbleText as HTMLElement).innerText = `Thank you! I love my new name, ${newName}! 💚`;
        bubble.classList.add('companion-bubble-visible');
        setTimeout(() => {
          bubble.classList.remove('companion-bubble-visible');
        }, 3000);
      }
    });

    // Sound toggle
    const soundBtn = this.container.querySelector('#btn-toggle-sound');
    soundBtn?.addEventListener('click', () => {
      const isMuted = sounds.toggleMute();
      sounds.playPop();
      if (soundBtn) {
        soundBtn.innerHTML = `🔊 Sound: ${isMuted ? 'OFF' : 'ON'}`;
      }
    });

    // Reset game
    const resetBtn = this.container.querySelector('#btn-reset-game');
    resetBtn?.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all progress, stickers and levels? This cannot be undone.')) {
        gameState.resetProgress();
        sounds.playError();
        window.location.reload();
      }
    });

    // Claim certificate
    const claimBtn = this.container.querySelector('#btn-claim-cert');
    claimBtn?.addEventListener('click', () => {
      sounds.playQuestSelect();
      this.onShowCertificate();
    });

    // Open printable paper practice
    const paperBtn = this.container.querySelector('#btn-paper-practice');
    paperBtn?.addEventListener('click', () => {
      sounds.playQuestSelect();
      this.onShowPaperPractice();
    });
  }

  private getReadinessText(masteryByKey: Record<string, number>, overall: number): string {
    const completedList = Object.keys(masteryByKey).filter(k => masteryByKey[k] >= 70);

    // Find the subject that most needs attention (lowest mastery)
    const lowest = SUBJECTS.slice().sort((a, b) => masteryByKey[a.key] - masteryByKey[b.key])[0];
    const lowestQuests = QUESTS.filter(q => q.subject === lowest.key);
    const nextTopic = lowestQuests.find(q => (gameState.getState().completedQuests[q.id] || 0) < 70);

    if (overall === 0) {
      return `Welcome, Vera! You're preparing to retake the Grade 6 entrance test in English, Math and Science. Start anywhere on the Map — a great first step is <strong>${nextTopic ? nextTopic.title : 'any topic'}</strong> at ${lowest.place}. Read the "Learn first" note, then try the questions.`;
    }

    if (completedList.length === 3) {
      return `Outstanding work, Vera! All three subjects are at the <strong>Good</strong> band or above. Keep revising to stay sharp, and claim your certificate below. You're Grade 6 ready! 🌟`;
    }

    const goalLine = `Overall you're at <strong>${overall}%</strong>. ${lowest.place} needs the most attention right now`;
    const nextLine = nextTopic
      ? ` — try <strong>${nextTopic.title}</strong> (${nextTopic.topic}) next.`
      : ` — revisit a topic and aim for a higher score.`;
    return goalLine + nextLine + ` Reach 70%+ in each subject to hit the Good band.`;
  }
}
