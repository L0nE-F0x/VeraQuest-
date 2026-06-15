import { gameState } from '../game/state';
import { sounds } from '../utils/sounds';

export class ExplorerDashboard {
  private container: HTMLDivElement;
  private onShowCertificate: () => void;

  constructor(parent: HTMLElement, onShowCertificate: () => void) {
    this.onShowCertificate = onShowCertificate;
    
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

  private render() {
    const state = gameState.getState();
    const engMastery = gameState.getSubjectMastery('english');
    const mathMastery = gameState.getSubjectMastery('math');
    const sciMastery = gameState.getSubjectMastery('science');
    const overallMastery = gameState.getOverallMastery();

    const xpPercent = Math.min(100, Math.round((state.xp / state.xpToNextLevel) * 100));

    // Circular ring stroke offset math
    const circumference = 2 * Math.PI * 26; // r=26, circumference ≈ 163.3
    const engOffset = circumference - (engMastery / 100) * circumference;
    const mathOffset = circumference - (mathMastery / 100) * circumference;
    const sciOffset = circumference - (sciMastery / 100) * circumference;

    // Plan definition
    const planDays = [
      { day: 1, title: "Inference & Fractions", quests: ['eng_inference', 'math_pizza'] },
      { day: 2, title: "Circuits & Sentences", quests: ['sci_circuit', 'eng_sentence'] },
      { day: 3, title: "Geometry & Materials", quests: ['math_gem_sort', 'sci_materials'] },
      { day: 4, title: "Figurative & Measures", quests: ['eng_figurative', 'math_measurement'] },
      { day: 5, title: "Shadow Lab & Play", quests: ['sci_shadow'] },
      { day: 6, title: "Review & Replay", quests: [] },
      { day: 7, title: "Claim Certificate!", quests: [] }
    ];

    let html = `
      <!-- User stats header -->
      <div class="dashboard-header">
        <div class="dashboard-userinfo">
          <div>
            <h2 style="color:var(--color-text); font-size:1.4rem;">Vera's Captain Log</h2>
            <p style="font-size:0.85rem; color:var(--color-text-muted);">Rank: <strong>Voyage Explorer</strong></p>
          </div>
          <div class="dashboard-level-badge flex-center">
            ${state.explorerLevel}
          </div>
        </div>

        <div class="xp-progress-container">
          <div class="xp-progress-fill" style="width: ${xpPercent}%;"></div>
        </div>
        <div class="xp-progress-text">
          XP: ${state.xp} / ${state.xpToNextLevel} to next level
        </div>
      </div>

      <!-- Ring Mastery stats -->
      <div class="mastery-rings-container">
        <!-- English Ring -->
        <div class="mastery-ring-card">
          <svg class="mastery-ring-svg" viewBox="0 0 60 60">
            <circle class="mastery-ring-bg" cx="30" cy="30" r="26" />
            <circle class="mastery-ring-fill mastery-ring-fill-english" cx="30" cy="30" r="26" 
                    stroke-dasharray="${circumference}" stroke-dashoffset="${engOffset}" />
          </svg>
          <div class="mastery-ring-text">
            <div>English</div>
            <div style="color:var(--color-coral); font-size:0.95rem;">${engMastery}%</div>
          </div>
        </div>

        <!-- Math Ring -->
        <div class="mastery-ring-card">
          <svg class="mastery-ring-svg" viewBox="0 0 60 60">
            <circle class="mastery-ring-bg" cx="30" cy="30" r="26" />
            <circle class="mastery-ring-fill mastery-ring-fill-math" cx="30" cy="30" r="26" 
                    stroke-dasharray="${circumference}" stroke-dashoffset="${mathOffset}" />
          </svg>
          <div class="mastery-ring-text">
            <div>Math</div>
            <div style="color:var(--color-gold-dark); font-size:0.95rem;">${mathMastery}%</div>
          </div>
        </div>

        <!-- Science Ring -->
        <div class="mastery-ring-card">
          <svg class="mastery-ring-svg" viewBox="0 0 60 60">
            <circle class="mastery-ring-bg" cx="30" cy="30" r="26" />
            <circle class="mastery-ring-fill mastery-ring-fill-science" cx="30" cy="30" r="26" 
                    stroke-dasharray="${circumference}" stroke-dashoffset="${sciOffset}" />
          </svg>
          <div class="mastery-ring-text">
            <div>Science</div>
            <div style="color:var(--color-teal); font-size:0.95rem;">${sciMastery}%</div>
          </div>
        </div>
      </div>

      <!-- Strengths log -->
      <div class="strengths-container">
        <h3 class="strengths-title">🧭 Explorer Insights</h3>
        <p class="strengths-text">
          ${this.getDynamicStrengthsText(state)}
        </p>
      </div>

      <!-- 7-Day Study Plan -->
      <div class="plan-container">
        <h3 class="plan-title" style="font-family:var(--font-display);">7-Day Island Roadmap</h3>
        <div class="plan-days-list">
    `;

    planDays.forEach(p => {
      let isDayDone = false;
      
      if (p.day <= 5) {
        // checks if all day's quests are completed
        isDayDone = p.quests.every(qid => (state.completedQuests[qid] || 0) >= 70);
      } else if (p.day === 6) {
        // Day 6 is caught up if at least 5 quests are completed
        isDayDone = Object.keys(state.completedQuests).filter(qid => state.completedQuests[qid] >= 70).length >= 5;
      } else if (p.day === 7) {
        // Day 7 is certificate done
        isDayDone = state.badges.includes('badge_english_master') || state.badges.includes('badge_math_master') || state.badges.includes('badge_science_master');
      }

      html += `
        <div class="plan-day-item">
          <div class="plan-day-number">Day ${p.day}</div>
          <div class="plan-day-text">
            <strong>${p.title}</strong>
            <div style="font-size:0.75rem; color:var(--color-text-muted); margin-top:2px;">
              ${this.getPlanSubtext(p.day, state)}
            </div>
          </div>
          <div class="plan-day-status">
            ${p.day === 7 && overallMastery >= 60
              ? `<button class="quest-card-play-btn" id="btn-claim-cert" style="padding:6px 12px; font-size:0.75rem;">Claim</button>`
              : isDayDone 
                ? '✅' 
                : '🌴'
            }
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>

      <!-- Companion Rename & Settings -->
      <div style="background:white; border-radius:var(--border-radius-md); padding:20px; margin:16px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:16px;">
        <h3 style="font-family:var(--font-display); font-size:1.1rem; color:var(--color-text);">Island Settings</h3>
        
        <div>
          <label style="font-size:0.8rem; font-weight:bold; color:var(--color-text-muted); display:block; margin-bottom:6px;">Companion Name</label>
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
            ⚠️ Reset Game
          </button>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.initEvents();
  }

  private initEvents() {
    // Rename Lumi
    const renameBtn = this.container.querySelector('#btn-rename-lumi');
    const nameInput = this.container.querySelector('#companion-name-input') as HTMLInputElement;
    renameBtn?.addEventListener('click', () => {
      const newName = nameInput?.value || 'Lumi';
      gameState.renameCompanion(newName);
      sounds.playPop();
      
      // Flash a quick message from Lumi
      const bubble = document.querySelector('.companion-bubble');
      const bubbleText = bubble?.querySelector('div');
      if (bubble && bubbleText) {
        bubbleText.innerText = `Awesome! I love my new name, ${newName}! 💚`;
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
      if (confirm("Are you sure you want to clear all your progress, stickers, and levels? This cannot be undone!")) {
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
  }

  private getDynamicStrengthsText(state: any): string {
    const companionName = state.companionName;
    const completedList = Object.keys(state.completedQuests).filter(qid => state.completedQuests[qid] >= 70);

    if (completedList.length === 0) {
      return `Welcome aboard, Vera! ${companionName} is excited to sail with you. Open the map, click a location, and let's earn our very first explorer sticker!`;
    }

    let strengths: string[] = [];
    if (state.completedQuests['eng_inference'] >= 70) {
      strengths.push("Inference Detective (spotting hidden clues in text)");
    }
    if (state.completedQuests['eng_sentence'] >= 70) {
      strengths.push("Syntax builder (ordering clauses and clauses components)");
    }
    if (state.completedQuests['math_pizza'] >= 70) {
      strengths.push("Fraction divisions (visual pizza division models)");
    }
    if (state.completedQuests['sci_circuit'] >= 70) {
      strengths.push("Circuit connections (current flows & batteries)");
    }

    if (strengths.length > 0) {
      return `Vera, your explorer skills are growing! You've shown strong mastery in **${strengths[0]}**${strengths.length > 1 ? ` and **${strengths[1]}**` : ''}. ${companionName} is incredibly proud of your focus. Keep sailing!`;
    }

    return `Vera is doing great exploring the island! Log in daily, complete challenges, and keep Lumi updated on your quest progress!`;
  }

  private getPlanSubtext(day: number, state: any): string {
    if (day === 1) {
      const q1 = (state.completedQuests['eng_inference'] || 0) >= 70;
      const q2 = (state.completedQuests['math_pizza'] || 0) >= 70;
      return `${q1 ? '✅' : '⚪'} Inference Detective | ${q2 ? '✅' : '⚪'} Fraction Pizza`;
    }
    if (day === 2) {
      const q1 = (state.completedQuests['sci_circuit'] || 0) >= 70;
      const q2 = (state.completedQuests['eng_sentence'] || 0) >= 70;
      return `${q1 ? '✅' : '⚪'} Circuit Light Up | ${q2 ? '✅' : '⚪'} Sentence Builder`;
    }
    if (day === 3) {
      const q1 = (state.completedQuests['math_gem_sort'] || 0) >= 70;
      const q2 = (state.completedQuests['sci_materials'] || 0) >= 70;
      return `${q1 ? '✅' : '⚪'} Geometry Gem Sort | ${q2 ? '✅' : '⚪'} Material Lab Sorter`;
    }
    if (day === 4) {
      const q1 = (state.completedQuests['eng_figurative'] || 0) >= 70;
      const q2 = (state.completedQuests['math_measurement'] || 0) >= 70;
      return `${q1 ? '✅' : '⚪'} Figurative Island | ${q2 ? '✅' : '⚪'} Measurement Scale`;
    }
    if (day === 5) {
      const q1 = (state.completedQuests['sci_shadow'] || 0) >= 70;
      return `${q1 ? '✅' : '⚪'} Shadow Lab`;
    }
    if (day === 6) {
      const total = Object.keys(state.completedQuests).filter(qid => state.completedQuests[qid] >= 70).length;
      return `Master at least 6/9 quests (Completed: ${total})`;
    }
    if (day === 7) {
      const overall = gameState.getOverallMastery();
      return `Requires 60% overall mastery (Current: ${overall}%)`;
    }
    return '';
  }
}
