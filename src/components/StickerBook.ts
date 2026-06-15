import { gameState } from '../game/state';
import { sounds } from '../utils/sounds';
import { QUESTS } from '../data/topics';

interface StickerDef {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlockRequirement: string;
}

export class StickerBook {
  private container: HTMLDivElement;
  private modal: HTMLDivElement | null = null;

  // Sticker catalog is built directly from the quest list so it always stays in
  // sync with the curriculum content, plus the three subject "mastery" badges.
  private stickersList: StickerDef[] = [
    ...QUESTS.map(q => ({
      id: q.stickerId,
      name: q.stickerName,
      emoji: q.stickerEmoji,
      description: `Earned by completing "${q.title}" — ${q.topic}.`,
      unlockRequirement: `Score 70%+ on ${q.title}`
    })),
    {
      id: 'badge_english_master',
      name: 'English Cove Master',
      emoji: '🏆',
      description: 'Reached the Good standard across every English Cove topic. A true master of the English language!',
      unlockRequirement: 'Master every English quest'
    },
    {
      id: 'badge_math_master',
      name: 'Math Peaks Master',
      emoji: '👑',
      description: 'Reached the Good standard across every Math Peaks topic. You have conquered the mountains of calculation!',
      unlockRequirement: 'Master every Math quest'
    },
    {
      id: 'badge_science_master',
      name: 'Science Lagoon Master',
      emoji: '🔬',
      description: 'Reached the Good standard across every Science Lagoon topic. You understand the secrets of science!',
      unlockRequirement: 'Master every Science quest'
    }
  ];

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'screen';
    this.container.id = 'screen-stickers';
    parent.appendChild(this.container);

    this.render();
    gameState.subscribe(() => {
      this.render();
    });
  }

  private render() {
    const state = gameState.getState();
    const unlockedStickers = [...state.stickers, ...state.badges];

    let html = `
      <div class="dashboard-header" style="width:100%; border-radius:var(--border-radius-md); margin-bottom:16px;">
        <h2 class="text-gradient-teal" style="font-size:1.8rem; margin-bottom:4px;">Vera's Sticker Album</h2>
        <p style="font-size:0.9rem; color:var(--color-text-muted)">Earn badges and stickers by completing island quests!</p>
      </div>

      <div style="padding:0 16px; font-weight:bold; font-size:0.9rem; display:flex; justify-content:space-between; margin-bottom:8px;">
        <span>Stickers Unlocked</span>
        <span style="color:var(--color-teal-dark)">${unlockedStickers.length} / ${this.stickersList.length}</span>
      </div>

      <div class="sticker-grid">
    `;

    this.stickersList.forEach(sticker => {
      const isUnlocked = unlockedStickers.includes(sticker.id);
      const isBadge = sticker.id.startsWith('badge_');

      html += `
        <div class="sticker-slot ${isUnlocked ? 'sticker-slot-unlocked' : ''} ${isBadge && isUnlocked ? 'badge-unlocked' : ''}" data-sticker-id="${sticker.id}">
          ${isUnlocked 
            ? `<span class="sticker-emoji">${sticker.emoji}</span>
               <span class="sticker-title">${sticker.name}</span>`
            : `<span class="sticker-locked-icon">🔒</span>
               <span class="sticker-title" style="color:var(--color-text-muted); font-size:0.65rem;">Locked</span>`
          }
        </div>
      `;
    });

    html += `</div>`;
    this.container.innerHTML = html;

    // Attach click events to slots
    const slots = this.container.querySelectorAll('.sticker-slot');
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        const stickerId = slot.getAttribute('data-sticker-id');
        if (stickerId) {
          this.showStickerDetail(stickerId);
        }
      });
    });
  }

  private showStickerDetail(stickerId: string) {
    const sticker = this.stickersList.find(s => s.id === stickerId);
    if (!sticker) return;

    sounds.playPop();

    const state = gameState.getState();
    const unlockedStickers = [...state.stickers, ...state.badges];
    const isUnlocked = unlockedStickers.includes(stickerId);

    // Create modal
    this.modal = document.createElement('div');
    this.modal.style.position = 'absolute';
    this.modal.style.top = '0';
    this.modal.style.left = '0';
    this.modal.style.right = '0';
    this.modal.style.bottom = '0';
    this.modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    this.modal.style.zIndex = '300';
    this.modal.className = 'flex-center';
    this.modal.style.padding = '24px';

    this.modal.innerHTML = `
      <div class="glass" style="padding:32px; border-radius:var(--border-radius-md); text-align:center; max-width:320px; width:100%; display:flex; flex-direction:column; align-items:center; gap:16px;">
        <span style="font-size:4.5rem; filter:drop-shadow(0 8px 12px rgba(0,0,0,0.1));">${isUnlocked ? sticker.emoji : '🔒'}</span>
        <h3 style="font-family:var(--font-display); font-size:1.35rem; color:var(--color-text);">${sticker.name}</h3>
        <p style="font-size:0.88rem; line-height:1.6; color:var(--color-text-muted);">
          ${isUnlocked ? sticker.description : `Unlock by doing: <strong>${sticker.unlockRequirement}</strong>`}
        </p>
        <button id="btn-close-sticker" class="btn-primary" style="width:100%; font-weight:bold; margin-top:8px;">Close</button>
      </div>
    `;

    this.container.appendChild(this.modal);

    const closeBtn = this.modal.querySelector('#btn-close-sticker');
    closeBtn?.addEventListener('click', () => {
      this.closeModal();
    });
  }

  private closeModal() {
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
      this.modal = null;
    }
  }
}
