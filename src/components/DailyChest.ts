import { gameState } from '../game/state';
import { sounds } from '../utils/sounds';
import confetti from 'canvas-confetti';

export class DailyChest {
  private container: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'chest-container screen';
    this.container.id = 'screen-chest';
    parent.appendChild(this.container);

    this.render();
    gameState.subscribe(() => {
      this.render();
    });
  }

  private render() {
    const state = gameState.getState();
    const isOpened = state.dailyChestOpened;
    const currentStreak = state.streak;

    let html = `
      <div class="dashboard-header" style="width:100%; border-radius:var(--border-radius-md); text-align:center; margin-bottom:16px;">
        <h2 class="text-gradient-coral" style="font-size:1.8rem; margin-bottom:4px;">Daily Treasure Chest</h2>
        <p style="font-size:0.9rem; color:var(--color-text-muted)">Log in every day to claim bonus explorer XP!</p>
      </div>

      <div class="chest-box ${!isOpened ? 'chest-box-shake' : ''}" id="treasure-chest">
        ${this.getChestSvg(isOpened)}
      </div>

      <div style="margin: 12px 0;">
        <h3 style="font-size:1.2rem; color:var(--color-text)">
          ${isOpened ? '🎉 Chest Claimed!' : '👉 Tap the chest to open!'}
        </h3>
        <p style="font-size:0.85rem; color:var(--color-text-muted); margin-top:4px;">
          ${isOpened ? 'Come back tomorrow for your next reward!' : 'Extend your daily streak and claim 30 XP!'}
        </p>
      </div>

      <div style="background:var(--color-sand-dark); padding:16px; border-radius:var(--border-radius-sm); width:100%; margin-top:16px;">
        <h4 style="font-family:var(--font-primary); font-size:0.95rem; font-weight:bold; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
          <span>Tropical Study Streak</span>
          <span style="color:var(--color-gold-dark)">🔥 ${currentStreak} Day${currentStreak === 1 ? '' : 's'}</span>
        </h4>
        <div class="streak-calendar">
    `;

    // Render 7 calendar day slots
    for (let i = 1; i <= 7; i++) {
      // Highlights days up to current streak (wrapped around 7)
      const isActive = i <= (currentStreak % 7 === 0 && currentStreak > 0 ? 7 : currentStreak % 7);
      html += `
        <div class="streak-day ${isActive ? 'streak-day-active' : ''}">
          <div class="streak-circle flex-center">
            ${isActive ? '🔥' : i}
          </div>
          <span style="font-size:0.65rem; color:var(--color-text-muted)">Day ${i}</span>
        </div>
      `;
    }

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    // Attach click event to chest
    const chestBox = this.container.querySelector('#treasure-chest');
    chestBox?.addEventListener('click', () => {
      this.openChest();
    });
  }

  private getChestSvg(opened: boolean): string {
    if (opened) {
      // Opened chest SVG
      return `
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <linearGradient id="wood-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#92400E" />
              <stop offset="100%" stop-color="#78350F" />
            </linearGradient>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FBBF24" />
              <stop offset="100%" stop-color="#D97706" />
            </linearGradient>
          </defs>

          <!-- Golden glowing halo -->
          <circle cx="50" cy="55" r="30" fill="#FEF08A" opacity="0.4" filter="blur(4px)" />

          <!-- Opened Chest Lid (tilted back/up) -->
          <g transform="translate(0, 10)">
            <path d="M 15 35 C 15 15, 85 15, 85 35 Z" fill="url(#wood-grad)" stroke="#451A03" stroke-width="2" />
            <path d="M 15 35 L 85 35 L 85 32 L 15 32 Z" fill="url(#gold-grad)" />
            <!-- Inner chest glow (treasures!) -->
            <ellipse cx="50" cy="35" rx="30" ry="8" fill="#FDE047" opacity="0.8" />
          </g>

          <!-- Chest Base -->
          <rect x="15" y="45" width="70" height="40" fill="url(#wood-grad)" stroke="#451A03" stroke-width="2" rx="4" />
          
          <!-- Gold Straps and Trim -->
          <rect x="25" y="45" width="8" height="40" fill="url(#gold-grad)" />
          <rect x="67" y="45" width="8" height="40" fill="url(#gold-grad)" />
          <rect x="15" y="45" width="70" height="6" fill="url(#gold-grad)" />
          
          <!-- Opened Lock latch -->
          <path d="M 45 42 L 55 42 L 53 52 L 47 52 Z" fill="#475569" stroke="#1E293B" />
          <circle cx="50" cy="56" r="6" fill="#1E293B" />
          
          <!-- Sparkles -->
          <text x="22" y="32" font-size="12" fill="#FACC15">✨</text>
          <text x="74" y="36" font-size="10" fill="#FACC15">✨</text>
          <text x="48" y="26" font-size="14" fill="#FACC15">✨</text>
        </svg>
      `;
    } else {
      // Closed chest SVG
      return `
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <linearGradient id="wood-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#78350F" />
              <stop offset="100%" stop-color="#451A03" />
            </linearGradient>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FBBF24" />
              <stop offset="100%" stop-color="#D97706" />
            </linearGradient>
          </defs>

          <!-- Chest Lid -->
          <path d="M 15 45 C 15 20, 85 20, 85 45 Z" fill="url(#wood-grad)" stroke="#451A03" stroke-width="2" />
          <path d="M 15 43 L 85 43 L 85 45 L 15 45 Z" fill="url(#gold-grad)" />
          
          <!-- Lid Straps -->
          <path d="M 25 24 C 26 30, 27 38, 25 43 L 33 43 C 35 38, 34 30, 33 24 Z" fill="url(#gold-grad)" />
          <path d="M 67 24 C 68 30, 69 38, 67 43 L 75 43 C 77 38, 76 30, 75 24 Z" fill="url(#gold-grad)" />

          <!-- Chest Base -->
          <rect x="15" y="45" width="70" height="40" fill="url(#wood-grad)" stroke="#451A03" stroke-width="2" rx="4" />
          
          <!-- Gold Base Straps -->
          <rect x="25" y="45" width="8" height="40" fill="url(#gold-grad)" />
          <rect x="67" y="45" width="8" height="40" fill="url(#gold-grad)" />
          
          <!-- Locking Plate -->
          <rect x="42" y="40" width="16" height="18" fill="url(#gold-grad)" stroke="#78350F" rx="2" />
          <circle cx="50" cy="48" r="4" fill="#1E293B" />
          <path d="M 50 48 L 50 54" stroke="#1E293B" stroke-width="2" stroke-linecap="round" />
        </svg>
      `;
    }
  }

  private openChest() {
    const state = gameState.getState();
    if (state.dailyChestOpened) {
      sounds.playError();
      return;
    }

    // Claim!
    const result = gameState.claimDailyChest();
    
    // Confetti!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Make Lumi say something encouraging
    const companion = document.querySelector('#lumi-companion');
    if (companion) {
      // Find the speech bubble of Lumi
      const bubble = document.querySelector('.companion-bubble');
      const bubbleText = bubble?.querySelector('div');
      if (bubble && bubbleText) {
        bubbleText.innerText = `Great job keeping up the streak, Vera! We got ${result.xpReward} XP! 🌟`;
        bubble.classList.add('companion-bubble-visible');
        setTimeout(() => {
          bubble.classList.remove('companion-bubble-visible');
        }, 4000);
      }
    }
  }
}
