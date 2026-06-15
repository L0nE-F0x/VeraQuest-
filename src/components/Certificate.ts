import { gameState } from '../game/state';
import { sounds } from '../utils/sounds';

export class Certificate {
  private container: HTMLDivElement;
  private onClose: () => void;

  constructor(parent: HTMLElement, onClose: () => void) {
    this.onClose = onClose;

    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.right = '0';
    this.container.style.bottom = '0';
    this.container.style.backgroundColor = 'var(--color-sand)';
    this.container.style.zIndex = '250';
    this.container.className = 'screen flex-center';
    this.container.style.padding = '24px';
    parent.appendChild(this.container);

    this.render();
  }

  private render() {
    const state = gameState.getState();
    const today = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    this.container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px; align-items:center; width:100%; max-width:480px; text-align:center;">
        
        <div class="certificate-frame" id="printable-area">
          <div style="border: 2px solid var(--color-gold-dark); padding: 24px; position:relative;">
            
            <div style="font-size:2rem; margin-bottom:12px;">🏆</div>
            <h1 class="certificate-title">VERAQUEST ISLAND CHAMPION</h1>
            <p style="font-size:0.85rem; text-transform:uppercase; letter-spacing:1.5px; color:var(--color-text-muted); font-weight:bold; margin-bottom:16px;">
              Certificate of Mastery
            </p>
            
            <p style="font-size:0.9rem; color:var(--color-text); margin-bottom:8px;">
              This certifies that the brave explorer
            </p>
            
            <div class="certificate-name">Vera</div>
            
            <p style="font-size:0.9rem; color:var(--color-text); line-height:1.6; margin: 16px 0;">
              has successfully charted the tropical islands of <strong>English Cove</strong>, 
              <strong>Math Peaks</strong>, and <strong>Science Lagoon</strong>, completing quests, 
              collecting stickers, and achieving the rank of:
            </p>
            
            <h3 style="font-size:1.25rem; color:var(--color-teal-dark); font-family:var(--font-display); margin-bottom:24px;">
              🌟 Master Scholar Voyager 🌟
            </h3>
            
            <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top:1.5px solid var(--color-sand-dark); padding-top:16px; margin-top:20px;">
              <div style="text-align:left;">
                <div style="font-size:0.75rem; color:var(--color-text-muted);">Date awarded</div>
                <div style="font-size:0.85rem; font-weight:bold; color:var(--color-text);">${today}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-family:'Fredoka'; font-size:0.95rem; color:var(--color-teal-dark); font-weight:bold;">${state.companionName} 🐢</div>
                <div style="font-size:0.7rem; color:var(--color-text-muted);">Lead Island Companion</div>
              </div>
            </div>

          </div>
        </div>

        <div style="display:flex; gap:12px; width:100%; max-width:320px; margin-top:8px;" class="no-print">
          <button class="btn-secondary" id="btn-cert-back" style="flex:1;">Back</button>
          <button class="btn-primary" id="btn-cert-print" style="flex:2;">Print Keepsake</button>
        </div>
      </div>
    `;

    this.initEvents();
  }

  private initEvents() {
    const backBtn = this.container.querySelector('#btn-cert-back');
    backBtn?.addEventListener('click', () => {
      sounds.playPop();
      this.destroy();
      this.onClose();
    });

    const printBtn = this.container.querySelector('#btn-cert-print');
    printBtn?.addEventListener('click', () => {
      sounds.playQuestSelect();
      window.print();
    });
  }

  private destroy() {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

// Add Print specific styles
const printStyle = document.createElement('style');
printStyle.innerHTML = `
  @media print {
    body * {
      visibility: hidden;
    }
    #printable-area, #printable-area * {
      visibility: visible;
    }
    #printable-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      border: 8px double #CA8A04 !important;
      background: #FFFDF9 !important;
      padding: 30px !important;
    }
    .no-print {
      display: none !important;
    }
  }
`;
document.head.appendChild(printStyle);
