import type { BaseQuest } from '../data/topics';
import { gameState } from '../game/state';
import { sounds } from '../utils/sounds';
import { ActivityRenderer } from './ActivityRenderer';
import { Companion } from './Companion';
import confetti from 'canvas-confetti';

export class QuestOverlay {
  private container: HTMLDivElement;
  private quest: BaseQuest;
  private currentStep: number = 0;
  private totalSteps: number = 0;
  private activityRenderer: ActivityRenderer;
  private parentCompanion: Companion;
  
  private answersChecked: boolean = false;
  private stepScores: number[] = [];

  private onClose: () => void;

  constructor(parent: HTMLElement, quest: BaseQuest, companion: Companion, onClose: () => void) {
    this.quest = quest;
    this.parentCompanion = companion;
    this.onClose = onClose;
    this.totalSteps = quest.challenges.length;

    this.container = document.createElement('div');
    this.container.className = 'quest-overlay';
    parent.appendChild(this.container);

    this.renderLayout();
    
    const workspaceEl = this.container.querySelector('#quest-workspace-anchor') as HTMLDivElement;
    this.activityRenderer = new ActivityRenderer(workspaceEl);

    this.loadStep();
    this.initEvents();
  }

  private renderLayout() {
    this.container.innerHTML = `
      <!-- Quest header -->
      <div class="quest-header">
        <button class="close-btn flex-center" id="btn-quest-back">➔</button>
        <div class="quest-progress-bar">
          <div class="quest-progress-fill" id="quest-progress"></div>
        </div>
        <div style="font-size:0.8rem; font-weight:bold; color:var(--color-text-muted);" id="quest-step-label">
          Step 1 / 1
        </div>
      </div>

      <!-- Quest body -->
      <div class="quest-body">
        <div class="quest-question" id="quest-question-text">
          Question goes here?
        </div>
        
        <!-- Interactive Workspace -->
        <div id="quest-workspace-anchor" style="flex:1; display:flex; flex-direction:column; justify-content:center;"></div>
        
        <!-- Hint Panel -->
        <div class="hint-panel" id="quest-hint-panel">
          💡 Lumi's Tip: Hint text
        </div>

        <!-- Feedback Banner -->
        <div class="feedback-banner" id="quest-feedback-banner">
          Feedback
        </div>
      </div>

      <!-- Quest Footer -->
      <div class="quest-footer">
        <button class="btn-secondary" id="btn-quest-hint">Hint</button>
        <button class="btn-primary" id="btn-quest-submit">Check Answer</button>
      </div>
    `;
  }

  private loadStep() {
    const challenge = this.quest.challenges[this.currentStep];
    this.answersChecked = false;

    // Reset UI elements
    const questionText = this.container.querySelector('#quest-question-text') as HTMLDivElement;
    const stepLabel = this.container.querySelector('#quest-step-label') as HTMLDivElement;
    const progressFill = this.container.querySelector('#quest-progress') as HTMLDivElement;
    const hintPanel = this.container.querySelector('#quest-hint-panel') as HTMLDivElement;
    const feedbackBanner = this.container.querySelector('#quest-feedback-banner') as HTMLDivElement;
    const submitBtn = this.container.querySelector('#btn-quest-submit') as HTMLButtonElement;

    questionText.innerText = challenge.question || this.quest.description;
    stepLabel.innerText = `Step ${this.currentStep + 1} / ${this.totalSteps}`;
    
    const progressPct = ((this.currentStep) / this.totalSteps) * 100;
    progressFill.style.width = `${progressPct}%`;

    hintPanel.classList.remove('hint-panel-visible');
    hintPanel.innerHTML = `🐢 <strong>Lumi:</strong> ${challenge.hint}`;

    feedbackBanner.className = 'feedback-banner';
    feedbackBanner.innerText = '';
    
    submitBtn.innerText = 'Check Answer';
    submitBtn.className = 'btn-primary';

    // Tell Companion to think
    this.parentCompanion.setMood('thinking');

    // Render current activity
    this.activityRenderer.render(this.quest, challenge);
  }

  private initEvents() {
    const backBtn = this.container.querySelector('#btn-quest-back') as HTMLButtonElement;
    backBtn.style.transform = 'scaleX(-1)'; // flip arrow
    
    backBtn.addEventListener('click', () => {
      sounds.playPop();
      if (confirm("Are you sure you want to exit this quest? Progress for this session will not be saved.")) {
        this.destroy();
        this.onClose();
      }
    });

    const hintBtn = this.container.querySelector('#btn-quest-hint') as HTMLButtonElement;
    hintBtn.addEventListener('click', () => {
      sounds.playPop();
      const hintPanel = this.container.querySelector('#quest-hint-panel') as HTMLDivElement;
      hintPanel.classList.toggle('hint-panel-visible');
    });

    const submitBtn = this.container.querySelector('#btn-quest-submit') as HTMLButtonElement;
    submitBtn.addEventListener('click', () => {
      this.handleSubmit();
    });
  }

  private handleSubmit() {
    const submitBtn = this.container.querySelector('#btn-quest-submit') as HTMLButtonElement;
    const feedbackBanner = this.container.querySelector('#quest-feedback-banner') as HTMLDivElement;

    if (this.answersChecked) {
      // If we already checked and it was correct, go to next step
      sounds.playPop();
      this.currentStep++;
      if (this.currentStep < this.totalSteps) {
        this.loadStep();
      } else {
        this.handleQuestComplete();
      }
      return;
    }

    // Check answers from activity renderer
    const result = this.activityRenderer.checkAnswer();
    this.answersChecked = result.correct;

    if (result.correct) {
      sounds.playChime();
      
      // confetti spark
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      feedbackBanner.className = 'feedback-banner feedback-correct';
      feedbackBanner.innerHTML = `🌟 ${result.feedback}`;

      submitBtn.innerText = this.currentStep + 1 < this.totalSteps ? 'Next Step' : 'Finish Quest';
      submitBtn.className = 'btn-primary';
      submitBtn.style.background = 'var(--color-green)';

      // Save score
      this.stepScores[this.currentStep] = result.score;

      // Lumi celebrates
      this.parentCompanion.setMood('excited');
      this.parentCompanion.speak("You did it, Vera! Brilliant work!");
    } else {
      sounds.playError();
      feedbackBanner.className = 'feedback-banner feedback-wrong';
      feedbackBanner.innerHTML = `❌ ${result.feedback}`;
      
      // Lumi encourages
      this.parentCompanion.setMood('encouraging');
      this.parentCompanion.speak("Ah, let's try that again! Check my hint for details!");
    }
  }

  private handleQuestComplete() {
    // Calculate final score: average of steps
    const sum = this.stepScores.reduce((a, b) => a + b, 0);
    const finalScore = Math.round(sum / this.totalSteps);

    // Save progress
    const saveResult = gameState.completeQuest(this.quest.id, finalScore);
    
    // Display full screen celebration
    this.container.innerHTML = '';
    
    // Full screen Confetti!
    sounds.playLevelUp();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 }
    });

    const body = document.createElement('div');
    body.className = 'success-screen';

    const state = gameState.getState();
    const companionName = state.companionName;

    let stickerDetails = '';
    if (saveResult.stickerUnlocked) {
      stickerDetails = `
        <div style="background:var(--color-sand); border:2px dashed var(--color-teal); border-radius:var(--border-radius-md); padding:20px; width:100%; max-width:280px; margin-top:20px; display:flex; flex-direction:column; align-items:center; gap:12px;">
          <div class="success-badge">${this.quest.stickerEmoji}</div>
          <h3 style="font-family:var(--font-display); font-size:1.2rem;">${this.quest.stickerName} Sticker Unlocked!</h3>
          <p style="font-size:0.75rem; color:var(--color-text-muted);">Added to your Sticker Book Album!</p>
        </div>
      `;
    }

    let badgeDetails = '';
    if (saveResult.badgeUnlocked) {
      badgeDetails = `
        <div style="background:#FFFDF0; border:2px solid var(--color-gold); border-radius:var(--border-radius-md); padding:20px; width:100%; max-width:280px; margin-top:20px; display:flex; flex-direction:column; align-items:center; gap:12px;">
          <div class="success-badge">🏆</div>
          <h3 style="font-family:var(--font-display); font-size:1.2rem; color:var(--color-gold-dark);">Subject Crown Unlocked!</h3>
          <p style="font-size:0.75rem; color:var(--color-text-muted);">You fully mastered ${this.quest.subject.toUpperCase()}!</p>
        </div>
      `;
    }

    body.innerHTML = `
      <div class="splash-logo-container" style="margin-top:20px;">
        <h1 class="text-gradient-teal" style="font-size:2.4rem;">Quest Completed!</h1>
        <p style="font-size:1rem; color:var(--color-text-muted); font-weight:bold; margin-top:6px;">Final Score: ${finalScore}%</p>
      </div>

      <div style="display:flex; flex-direction:column; align-items:center; gap:16px;">
        <p style="font-size:0.95rem; max-width:320px; font-weight:600; line-height:1.5;">
          Spectacular exploring, Vera! You claimed <strong>+${saveResult.xpReward} XP</strong> and helped ${companionName} learn more about the island!
        </p>
        ${stickerDetails}
        ${badgeDetails}
      </div>

      <button id="btn-success-close" class="btn-primary" style="width:100%; max-width:240px; font-size:1.1rem; padding:14px; border-radius:var(--border-radius-lg);">
        Back to Island Map
      </button>
    `;

    this.container.appendChild(body);

    const closeBtn = this.container.querySelector('#btn-success-close');
    closeBtn?.addEventListener('click', () => {
      this.destroy();
      this.onClose();
    });

    this.parentCompanion.setMood('happy');
  }

  private destroy() {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
