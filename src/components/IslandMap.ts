import { QUESTS } from '../data/topics';
import { gameState } from '../game/state';
import { sounds } from '../utils/sounds';

export class IslandMap {
  private container: HTMLDivElement;
  private svgEl: SVGElement | null = null;
  private drawer: HTMLDivElement;
  private onSelectQuest: (questId: string) => void;


  constructor(parent: HTMLElement, onSelectQuest: (questId: string) => void) {
    this.onSelectQuest = onSelectQuest;

    this.container = document.createElement('div');
    this.container.className = 'map-container screen';
    this.container.id = 'screen-map';

    this.drawer = document.createElement('div');
    this.drawer.className = 'quest-drawer';
    
    parent.appendChild(this.container);
    parent.appendChild(this.drawer);

    this.render();
    this.initEvents();

    gameState.subscribe(() => {
      this.updateProgressFlags();
    });
  }

  private render() {
    this.container.innerHTML = `
      <svg class="map-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sea-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#BAE6FD" />
            <stop offset="100%" stop-color="#7DD3FC" />
          </linearGradient>
          <linearGradient id="sand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FEF3C7" />
            <stop offset="100%" stop-color="#FDE68A" />
          </linearGradient>
          <linearGradient id="grass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4ADE80" />
            <stop offset="100%" stop-color="#22C55E" />
          </linearGradient>
          <linearGradient id="rock-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#94A3B8" />
            <stop offset="100%" stop-color="#475569" />
          </linearGradient>
          <linearGradient id="lagoon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#A7F3D0" />
            <stop offset="100%" stop-color="#059669" />
          </linearGradient>
        </defs>

        <!-- Sea background -->
        <rect width="400" height="400" fill="url(#sea-grad)" />

        <!-- Sea Waves (aesthetic SVGs) -->
        <path d="M 30,50 Q 45,45 60,50" fill="none" stroke="#E0F2FE" stroke-width="2" stroke-linecap="round" opacity="0.8" />
        <path d="M 330,80 Q 345,75 360,80" fill="none" stroke="#E0F2FE" stroke-width="2" stroke-linecap="round" opacity="0.8" />
        <path d="M 80,320 Q 95,315 110,320" fill="none" stroke="#E0F2FE" stroke-width="2" stroke-linecap="round" opacity="0.8" />
        
        <!-- Connecting Paths (Dotted routes) -->
        <path id="path-cove-peaks" d="M 140,260 Q 150,170 210,130" fill="none" stroke="#475569" stroke-width="3" stroke-dasharray="6,6" opacity="0.4" />
        <path id="path-peaks-lagoon" d="M 230,130 Q 280,180 300,240" fill="none" stroke="#475569" stroke-width="3" stroke-dasharray="6,6" opacity="0.4" />

        <!-- ENGLISH COVE (Bottom Left) -->
        <g class="map-location-btn" id="loc-english">
          <!-- Island Base / Sand -->
          <path d="M 60,280 C 60,230 110,210 160,230 C 200,245 190,300 160,320 C 110,340 60,330 60,280 Z" fill="url(#sand-grad)" />
          <!-- Greenery -->
          <path d="M 80,270 C 80,240 110,230 140,250 C 160,265 160,290 140,305 C 110,320 80,300 80,270 Z" fill="url(#grass-grad)" />
          <!-- Little Dock -->
          <rect x="155" y="270" width="25" height="6" fill="#78350F" rx="1" />
          <line x1="160" y1="276" x2="160" y2="282" stroke="#78350F" stroke-width="2" />
          <line x1="175" y1="276" x2="175" y2="282" stroke="#78350F" stroke-width="2" />
          <!-- Palm Trees -->
          <text x="75" y="265" font-size="20">🌴</text>
          <text x="95" y="295" font-size="16">🌴</text>
          <!-- Pin -->
          <g class="map-pin" transform="translate(130, 275)">
            <circle cx="0" cy="-15" r="12" fill="#FB7185" stroke="white" stroke-width="2" />
            <path d="M -12 -15 L 0 0 L 12 -15 Z" fill="#FB7185" />
            <circle cx="0" cy="-15" r="4" fill="white" />
            <text x="0" y="20" font-family="Fredoka" font-size="10" font-weight="bold" fill="#1E293B" text-anchor="middle">English Cove</text>
          </g>
          <!-- Star Flag (Progress) -->
          <g class="map-flag" id="flag-english" transform="translate(148, 250)">
            <line x1="0" y1="0" x2="0" y2="-20" stroke="#475569" stroke-width="2" />
            <polygon points="0,-20 16,-15 0,-10" fill="#FB7185" stroke="white" stroke-width="0.5" />
          </g>
        </g>

        <!-- MATH PEAKS (Top Center) -->
        <g class="map-location-btn" id="loc-math">
          <!-- Island Base / Sand -->
          <path d="M 160,110 C 170,70 240,60 270,90 C 290,110 270,160 230,160 C 180,160 150,140 160,110 Z" fill="url(#sand-grad)" />
          <!-- Mountains -->
          <path d="M 180,130 L 210,80 L 240,130 Z" fill="url(#rock-grad)" />
          <path d="M 215,140 L 245,90 L 275,140 Z" fill="url(#rock-grad)" />
          <!-- Snow Peaks -->
          <polygon points="204,90 210,80 216,90 210,93" fill="white" />
          <polygon points="239,100 245,90 251,100 245,103" fill="white" />
          <!-- Pin -->
          <g class="map-pin" transform="translate(225, 125)">
            <circle cx="0" cy="-15" r="12" fill="#FACC15" stroke="white" stroke-width="2" />
            <path d="M -12 -15 L 0 0 L 12 -15 Z" fill="#FACC15" />
            <circle cx="0" cy="-15" r="4" fill="white" />
            <text x="0" y="20" font-family="Fredoka" font-size="10" font-weight="bold" fill="#1E293B" text-anchor="middle">Math Peaks</text>
          </g>
          <!-- Star Flag -->
          <g class="map-flag" id="flag-math" transform="translate(245, 95)">
            <line x1="0" y1="0" x2="0" y2="-20" stroke="#475569" stroke-width="2" />
            <polygon points="0,-20 16,-15 0,-10" fill="#FACC15" stroke="white" stroke-width="0.5" />
          </g>
        </g>

        <!-- SCIENCE LAGOON (Bottom Right) -->
        <g class="map-location-btn" id="loc-science">
          <!-- Island Base -->
          <path d="M 240,280 C 240,230 320,220 350,260 C 370,290 350,340 310,340 C 260,340 240,310 240,280 Z" fill="url(#sand-grad)" />
          <!-- Lagoon Water -->
          <path d="M 270,290 C 270,270 310,260 330,280 C 340,295 330,320 310,320 C 280,320 270,305 270,290 Z" fill="url(#lagoon-grad)" stroke="#047857" stroke-width="2" />
          <!-- Tent / Lab -->
          <rect x="255" y="260" width="16" height="12" fill="#F8FAFC" stroke="#475569" rx="2" />
          <polygon points="252,260 263,252 274,260" fill="#EF4444" />
          <!-- Pin -->
          <g class="map-pin" transform="translate(305, 290)">
            <circle cx="0" cy="-15" r="12" fill="#14B8A6" stroke="white" stroke-width="2" />
            <path d="M -12 -15 L 0 0 L 12 -15 Z" fill="#14B8A6" />
            <circle cx="0" cy="-15" r="4" fill="white" />
            <text x="0" y="20" font-family="Fredoka" font-size="10" font-weight="bold" fill="#1E293B" text-anchor="middle">Science Lagoon</text>
          </g>
          <!-- Star Flag -->
          <g class="map-flag" id="flag-science" transform="translate(325, 255)">
            <line x1="0" y1="0" x2="0" y2="-20" stroke="#475569" stroke-width="2" />
            <polygon points="0,-20 16,-15 0,-10" fill="#14B8A6" stroke="white" stroke-width="0.5" />
          </g>
        </g>
      </svg>
    `;
    this.svgEl = this.container.querySelector('.map-svg');
  }

  private initEvents() {
    const locEnglish = this.container.querySelector('#loc-english');
    const locMath = this.container.querySelector('#loc-math');
    const locScience = this.container.querySelector('#loc-science');

    locEnglish?.addEventListener('click', (e) => { e.stopPropagation(); this.zoomTo('english'); });
    locMath?.addEventListener('click', (e) => { e.stopPropagation(); this.zoomTo('math'); });
    locScience?.addEventListener('click', (e) => { e.stopPropagation(); this.zoomTo('science'); });

    // Click anywhere else on map resets zoom
    this.container.addEventListener('click', () => {
      this.resetZoom();
    });
  }

  private zoomTo(subject: 'english' | 'math' | 'science') {
    if (!this.svgEl) return;
    sounds.playQuestSelect();
    
    // Reset any previous zoom classes
    this.svgEl.classList.remove('map-zoom-english', 'map-zoom-math', 'map-zoom-science');
    
    // Add active zoom class
    this.svgEl.classList.add(`map-zoom-${subject}`);

    // Show drawer
    this.openDrawer(subject);
  }

  public resetZoom() {
    if (!this.svgEl) return;
    this.svgEl.classList.remove('map-zoom-english', 'map-zoom-math', 'map-zoom-science');
    this.closeDrawer();
  }

  private openDrawer(subject: 'english' | 'math' | 'science') {
    const subjectQuests = QUESTS.filter(q => q.subject === subject);
    const completedQuests = gameState.getState().completedQuests;

    let drawerHtml = `
      <div class="drawer-header">
        <h3 class="drawer-title text-gradient-${subject === 'english' ? 'coral' : subject === 'science' ? 'teal' : 'coral'}">
          ${subject.toUpperCase()} QUESTS
        </h3>
        <button class="close-btn flex-center" id="btn-close-drawer">&times;</button>
      </div>
      <div class="quest-list">
    `;

    subjectQuests.forEach(quest => {
      const bestScore = completedQuests[quest.id] || 0;
      const isCompleted = bestScore >= 70;
      const difficultyStars = '⭐'.repeat(quest.difficulty);

      drawerHtml += `
        <div class="quest-card ${isCompleted ? 'quest-card-completed' : ''}" id="qcard-${quest.id}">
          <div class="quest-card-info">
            <div class="quest-card-title">${quest.title}</div>
            <div class="quest-card-meta">
              <span>${quest.estimatedMinutes} min</span>
              <span>${difficultyStars}</span>
              ${isCompleted ? `<span style="color:var(--color-green-dark)">Best: ${bestScore}%</span>` : ''}
            </div>
            <div class="quest-card-reward">🎁 ${quest.xpReward} XP + ${quest.stickerEmoji} Sticker</div>
          </div>
          <button class="quest-card-play-btn" data-quest-id="${quest.id}">
            ${isCompleted ? 'Replay' : 'Start'}
          </button>
        </div>
      `;
    });

    drawerHtml += `</div>`;
    this.drawer.innerHTML = drawerHtml;
    this.drawer.classList.add('quest-drawer-open');

    // Add drawer event listeners
    const closeBtn = this.drawer.querySelector('#btn-close-drawer');
    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.resetZoom();
    });

    const playBtns = this.drawer.querySelectorAll('.quest-card-play-btn');
    playBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const questId = btn.getAttribute('data-quest-id');
        if (questId) {
          this.onSelectQuest(questId);
          this.resetZoom();
        }
      });
    });
  }

  private closeDrawer() {
    this.drawer.classList.remove('quest-drawer-open');
  }

  private updateProgressFlags() {
    // Show/hide or change flags depending on subject completion
    const subjects: ('english' | 'math' | 'science')[] = ['english', 'math', 'science'];
    
    subjects.forEach(sub => {
      const flagEl = this.container.querySelector(`#flag-${sub}`) as SVGElement;
      if (!flagEl) return;
      
      const subjectQuests = QUESTS.filter(q => q.subject === sub);
      const completed = subjectQuests.filter(q => (gameState.getState().completedQuests[q.id] || 0) >= 70);
      
      if (completed.length === subjectQuests.length) {
        // Fully mastered - show gold flag!
        const polygon = flagEl.querySelector('polygon');
        if (polygon) polygon.setAttribute('fill', 'var(--color-gold)');
        flagEl.style.display = 'block';
      } else if (completed.length > 0) {
        // In progress - show base subject color
        const polygon = flagEl.querySelector('polygon');
        if (polygon) polygon.setAttribute('fill', sub === 'english' ? 'var(--color-coral)' : sub === 'math' ? 'var(--color-gold)' : 'var(--color-teal)');
        flagEl.style.display = 'block';
      } else {
        // Unstarted - hide flag
        flagEl.style.display = 'none';
      }
    });

    // Animate connecting paths as locations are unlocked
    const engMastered = QUESTS.filter(q => q.subject === 'english').every(q => (gameState.getState().completedQuests[q.id] || 0) >= 70);
    const mathMastered = QUESTS.filter(q => q.subject === 'math').every(q => (gameState.getState().completedQuests[q.id] || 0) >= 70);

    const pathCovePeaks = this.container.querySelector('#path-cove-peaks') as SVGPathElement;
    const pathPeaksLagoon = this.container.querySelector('#path-peaks-lagoon') as SVGPathElement;

    if (pathCovePeaks) {
      if (engMastered) {
        pathCovePeaks.style.stroke = 'var(--color-coral)';
        pathCovePeaks.style.opacity = '1';
      } else {
        pathCovePeaks.style.stroke = '#475569';
        pathCovePeaks.style.opacity = '0.4';
      }
    }

    if (pathPeaksLagoon) {
      if (mathMastered) {
        pathPeaksLagoon.style.stroke = 'var(--color-gold)';
        pathPeaksLagoon.style.opacity = '1';
      } else {
        pathPeaksLagoon.style.stroke = '#475569';
        pathPeaksLagoon.style.opacity = '0.4';
      }
    }
  }
}
