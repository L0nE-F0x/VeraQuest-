import { QUESTS } from '../data/topics';
import { gameState } from '../game/state';
import { sounds } from '../utils/sounds';

export class IslandMap {
  private container: HTMLDivElement;
  private svgEl: SVGElement | null = null;
  private drawer: HTMLDivElement;
  private onSelectQuest: (questId: string) => void;
  private parallaxPaused = false;


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
    this.initParallax();

    gameState.subscribe(() => {
      this.updateProgressFlags();
    });
  }

  /** Subtle multi-layer parallax driven by pointer movement and (on mobile) device tilt. */
  private initParallax() {
    if (!this.svgEl) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layers = Array.from(this.svgEl.querySelectorAll('[data-depth]')) as SVGElement[];
    if (!layers.length) return;

    const MAX = 9; // max pixel shift at depth 1
    let tx = 0, ty = 0; // target normalized offset (-1..1)
    let cx = 0, cy = 0; // current (eased)
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    this.container.addEventListener('pointermove', (e: PointerEvent) => {
      const r = this.container.getBoundingClientRect();
      tx = clamp(((e.clientX - r.left) / r.width - 0.5) * 2);
      ty = clamp(((e.clientY - r.top) / r.height - 0.5) * 2);
    });
    this.container.addEventListener('pointerleave', () => { tx = 0; ty = 0; });

    // Device tilt for mobile (iOS needs permission requested from a user gesture)
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tx = clamp(e.gamma / 28);
      ty = clamp((e.beta - 45) / 28);
    };
    const DOE: any = (window as any).DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === 'function') {
      this.container.addEventListener('pointerdown', () => {
        DOE.requestPermission()
          .then((s: string) => { if (s === 'granted') window.addEventListener('deviceorientation', onOrient); })
          .catch(() => {});
      }, { capture: true, once: true });
    } else if (DOE) {
      window.addEventListener('deviceorientation', onOrient);
    }

    const loop = () => {
      const gx = this.parallaxPaused ? 0 : tx;
      const gy = this.parallaxPaused ? 0 : ty;
      cx += (gx - cx) * 0.08;
      cy += (gy - cy) * 0.08;
      for (const l of layers) {
        const d = parseFloat(l.getAttribute('data-depth') || '0');
        l.setAttribute('transform', `translate(${(cx * d * MAX).toFixed(2)} ${(cy * d * MAX).toFixed(2)})`);
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private render() {
    this.container.innerHTML = `
      <svg class="map-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#CDEBFF" />
            <stop offset="100%" stop-color="#BAE6FD" />
          </linearGradient>
          <linearGradient id="sea-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#7DD3FC" />
            <stop offset="55%" stop-color="#33B6F2" />
            <stop offset="100%" stop-color="#0C8FD6" />
          </linearGradient>
          <radialGradient id="sand-top" cx="42%" cy="35%" r="75%">
            <stop offset="0%" stop-color="#FEF0BE" />
            <stop offset="100%" stop-color="#F4C766" />
          </radialGradient>
          <linearGradient id="sand-side" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#E0A93F" />
            <stop offset="100%" stop-color="#B9822A" />
          </linearGradient>
          <radialGradient id="grass-top" cx="42%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#86EFAC" />
            <stop offset="100%" stop-color="#22C55E" />
          </radialGradient>
          <linearGradient id="rock-lit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#B7C2D2" />
            <stop offset="100%" stop-color="#7E8CA3" />
          </linearGradient>
          <linearGradient id="rock-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#5D6A82" />
            <stop offset="100%" stop-color="#3A4660" />
          </linearGradient>
          <radialGradient id="lagoon-grad" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stop-color="#CFFAFE" />
            <stop offset="55%" stop-color="#2DD4BF" />
            <stop offset="100%" stop-color="#0D9488" />
          </radialGradient>
          <radialGradient id="vignette" cx="50%" cy="46%" r="62%">
            <stop offset="62%" stop-color="#082F49" stop-opacity="0" />
            <stop offset="100%" stop-color="#082F49" stop-opacity="0.28" />
          </radialGradient>
          <filter id="f-island-shadow" x="-40%" y="-40%" width="180%" height="200%">
            <feDropShadow dx="0" dy="7" stdDeviation="6" flood-color="#075985" flood-opacity="0.35" />
          </filter>
          <filter id="f-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <!-- Static full-bleed background (no parallax, so edges never gap) -->
        <rect width="400" height="400" fill="url(#sea-grad)" />
        <rect width="400" height="150" fill="url(#sky-grad)" />

        <!-- PARALLAX: sky layer (sun + gulls) -->
        <g class="plx" data-depth="0.5" style="pointer-events:none">
          <circle cx="58" cy="52" r="30" fill="#FFE39A" filter="url(#f-glow)" opacity="0.9" />
          <circle cx="58" cy="52" r="19" fill="#FFD45E" />
          <g stroke="#52708A" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7">
            <path d="M 120,70 q 6,-7 12,0 q 6,-7 12,0" />
            <path d="M 330,110 q 5,-6 10,0 q 5,-6 10,0" />
          </g>
        </g>

        <!-- PARALLAX: drifting clouds -->
        <g class="plx" data-depth="1.5" style="pointer-events:none">
          <g class="cloud cloud-1" fill="#FFFFFF" opacity="0.95">
            <ellipse cx="300" cy="40" rx="26" ry="12" />
            <ellipse cx="320" cy="46" rx="20" ry="11" />
            <ellipse cx="284" cy="48" rx="16" ry="9" />
          </g>
          <g class="cloud cloud-2" fill="#FFFFFF" opacity="0.88">
            <ellipse cx="150" cy="28" rx="22" ry="10" />
            <ellipse cx="168" cy="33" rx="16" ry="9" />
          </g>
        </g>

        <!-- PARALLAX: sea decoration (halos, caustics, waves, sailboat) -->
        <g class="plx" data-depth="0.32" style="pointer-events:none">
          <ellipse cx="128" cy="298" rx="92" ry="46" fill="#BFF0FF" opacity="0.5" />
          <ellipse cx="223" cy="120" rx="84" ry="40" fill="#BFF0FF" opacity="0.5" />
          <ellipse cx="305" cy="298" rx="86" ry="44" fill="#BFF0FF" opacity="0.5" />
          <g class="waves" stroke="#EAF9FF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8">
            <path d="M 36,150 q 10,-6 20,0 t 20,0" />
            <path d="M 250,70 q 10,-6 20,0 t 20,0" />
            <path d="M 60,360 q 10,-6 20,0 t 20,0" />
            <path d="M 300,360 q 10,-6 20,0 t 20,0" />
            <path d="M 190,345 q 10,-6 20,0 t 20,0" />
            <path d="M 110,210 q 8,-5 16,0 t 16,0" />
          </g>
          <!-- Little sailboat -->
          <g transform="translate(196,236)">
            <path d="M -11,6 L 11,6 L 7,13 L -7,13 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="0.6" />
            <line x1="0" y1="6" x2="0" y2="-14" stroke="#7B5230" stroke-width="1.6" />
            <path d="M 0,-13 L 0,3 L 12,3 Z" fill="#FB7185" />
            <path d="M 0,-13 L 0,3 L -9,3 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="0.5" />
          </g>
        </g>

        <!-- ISLANDS (interactive — kept on a stable plane) -->
        <g class="isles-layer">
        <!-- Connecting routes (dotted) -->
        <path id="path-cove-peaks" d="M 150,250 Q 160,175 205,135" fill="none" stroke="#0B2A45" stroke-width="3" stroke-dasharray="2,8" stroke-linecap="round" opacity="0.45" />
        <path id="path-peaks-lagoon" d="M 245,135 Q 295,185 305,250" fill="none" stroke="#0B2A45" stroke-width="3" stroke-dasharray="2,8" stroke-linecap="round" opacity="0.45" />

        <!-- ================= ENGLISH COVE (bottom-left) ================= -->
        <g class="map-location-btn isle isle-1" id="loc-english">
          <ellipse cx="128" cy="305" rx="74" ry="22" fill="url(#sand-side)" />
          <ellipse class="map-island-piece" cx="128" cy="293" rx="74" ry="26" fill="url(#sand-top)" filter="url(#f-island-shadow)" />
          <ellipse cx="124" cy="287" rx="50" ry="17" fill="url(#grass-top)" />
          <!-- Lighthouse -->
          <g transform="translate(108,250)">
            <polygon points="-7,34 7,34 5,0 -5,0" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="0.8" />
            <rect x="-5" y="6" width="10" height="6" fill="#EF4444" />
            <rect x="-6" y="20" width="12" height="6" fill="#EF4444" />
            <rect x="-6.5" y="-7" width="13" height="7" rx="1.5" fill="#FDE68A" stroke="#CA8A04" stroke-width="0.8" />
            <polygon points="-7,-7 7,-7 0,-15" fill="#DC2626" />
            <circle cx="0" cy="-3.5" r="2" fill="#FFF7CC" filter="url(#f-glow)" />
          </g>
          <!-- Palms -->
          <g transform="translate(158,278)">
            <path d="M 0,0 Q -4,-16 3,-30" stroke="#A9744F" stroke-width="3.5" fill="none" stroke-linecap="round" />
            <path d="M 3,-30 Q -10,-36 -20,-30 M 3,-30 Q -6,-40 -16,-40 M 3,-30 Q 6,-42 16,-40 M 3,-30 Q 12,-38 22,-30" stroke="#27AE60" stroke-width="4" fill="none" stroke-linecap="round" />
          </g>
          <g class="map-pin" transform="translate(132, 270)">
            <circle cx="0" cy="-15" r="12" fill="#FB7185" stroke="white" stroke-width="2.5" />
            <path d="M -11 -16 L 0 1 L 11 -16 Z" fill="#FB7185" />
            <circle cx="0" cy="-15" r="4.5" fill="white" />
            <text x="0" y="22" font-family="Fredoka" font-size="11" font-weight="bold" fill="#0F2A43" text-anchor="middle">English Cove</text>
          </g>
          <g class="map-flag" id="flag-english" transform="translate(150, 252)">
            <line x1="0" y1="0" x2="0" y2="-22" stroke="#475569" stroke-width="2" />
            <polygon points="0,-22 16,-17 0,-12" fill="#FB7185" stroke="white" stroke-width="0.5" />
          </g>
        </g>

        <!-- ================= MATH PEAKS (top-center) ================= -->
        <g class="map-location-btn isle isle-2" id="loc-math">
          <ellipse cx="223" cy="132" rx="66" ry="20" fill="url(#sand-side)" />
          <ellipse class="map-island-piece" cx="223" cy="122" rx="66" ry="23" fill="url(#sand-top)" filter="url(#f-island-shadow)" />
          <!-- Back mountain -->
          <polygon points="232,118 258,66 286,118" fill="url(#rock-shadow)" />
          <polygon points="258,66 286,118 262,118" fill="#2F3A52" opacity="0.55" />
          <polygon points="250,79 258,66 266,79 258,84" fill="#FFFFFF" />
          <!-- Front mountain (lit) -->
          <polygon points="160,120 192,58 224,120" fill="url(#rock-lit)" />
          <polygon points="192,58 224,120 200,120" fill="#5E6B82" opacity="0.5" />
          <polygon points="184,73 192,58 200,73 192,79" fill="#FFFFFF" />
          <g class="map-pin" transform="translate(214, 120)">
            <circle cx="0" cy="-15" r="12" fill="#FACC15" stroke="white" stroke-width="2.5" />
            <path d="M -11 -16 L 0 1 L 11 -16 Z" fill="#FACC15" />
            <circle cx="0" cy="-15" r="4.5" fill="white" />
            <text x="6" y="22" font-family="Fredoka" font-size="11" font-weight="bold" fill="#0F2A43" text-anchor="middle">Math Peaks</text>
          </g>
          <g class="map-flag" id="flag-math" transform="translate(258, 64)">
            <line x1="0" y1="0" x2="0" y2="-18" stroke="#475569" stroke-width="2" />
            <polygon points="0,-18 15,-14 0,-9" fill="#FACC15" stroke="white" stroke-width="0.5" />
          </g>
        </g>

        <!-- ================= SCIENCE LAGOON (bottom-right) ================= -->
        <g class="map-location-btn isle isle-3" id="loc-science">
          <ellipse cx="305" cy="306" rx="70" ry="22" fill="url(#sand-side)" />
          <ellipse class="map-island-piece" cx="305" cy="294" rx="70" ry="26" fill="url(#sand-top)" filter="url(#f-island-shadow)" />
          <!-- Glowing lagoon -->
          <ellipse cx="312" cy="296" rx="34" ry="15" fill="url(#lagoon-grad)" filter="url(#f-glow)" />
          <ellipse cx="305" cy="292" rx="9" ry="3.5" fill="#ECFEFF" opacity="0.7" />
          <!-- Research tent -->
          <g transform="translate(280,268)">
            <polygon points="-12,16 12,16 12,4 0,-8 -12,4" fill="#F1F5F9" stroke="#94A3B8" stroke-width="0.8" />
            <polygon points="0,-8 12,4 -12,4" fill="#EF4444" />
            <rect x="-4" y="6" width="8" height="10" fill="#0D9488" />
          </g>
          <!-- Bubbles -->
          <circle cx="330" cy="284" r="2.4" fill="#ECFEFF" opacity="0.85" />
          <circle cx="336" cy="290" r="1.6" fill="#ECFEFF" opacity="0.7" />
          <g class="map-pin" transform="translate(312, 290)">
            <circle cx="0" cy="-15" r="12" fill="#14B8A6" stroke="white" stroke-width="2.5" />
            <path d="M -11 -16 L 0 1 L 11 -16 Z" fill="#14B8A6" />
            <circle cx="0" cy="-15" r="4.5" fill="white" />
            <text x="0" y="22" font-family="Fredoka" font-size="11" font-weight="bold" fill="#0F2A43" text-anchor="middle">Science Lagoon</text>
          </g>
          <g class="map-flag" id="flag-science" transform="translate(332, 256)">
            <line x1="0" y1="0" x2="0" y2="-22" stroke="#475569" stroke-width="2" />
            <polygon points="0,-22 16,-17 0,-12" fill="#14B8A6" stroke="white" stroke-width="0.5" />
          </g>
        </g>
        </g><!-- /isles-layer -->

        <!-- PARALLAX: foreground foliage framing (nearest, moves most) -->
        <g class="plx" data-depth="2.1" style="pointer-events:none">
          <g fill="#0E3B22" opacity="0.9">
            <path d="M -12,414 C 20,360 72,372 80,400 C 50,392 16,404 -12,414 Z" />
            <path d="M -12,414 C 6,372 46,350 62,360 C 40,380 12,400 -12,414 Z" />
          </g>
          <g fill="#0E3B22" opacity="0.9">
            <path d="M 412,414 C 380,360 328,372 320,400 C 350,392 384,404 412,414 Z" />
            <path d="M 412,414 C 394,372 354,350 338,360 C 360,380 388,400 412,414 Z" />
          </g>
        </g>

        <!-- Soft vignette for depth (non-interactive) -->
        <rect width="400" height="400" fill="url(#vignette)" style="pointer-events:none" />
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
    this.parallaxPaused = true;

    // Show drawer
    this.openDrawer(subject);
  }

  public resetZoom() {
    if (!this.svgEl) return;
    this.svgEl.classList.remove('map-zoom-english', 'map-zoom-math', 'map-zoom-science');
    this.parallaxPaused = false;
    this.closeDrawer();
  }

  private openDrawer(subject: 'english' | 'math' | 'science') {
    const subjectQuests = QUESTS.filter(q => q.subject === subject);
    const completedQuests = gameState.getState().completedQuests;

    const meta = {
      english: { name: 'English Cove', scope: 'Reading · Writing · Grammar · Vocabulary', grad: 'coral' },
      math: { name: 'Math Peaks', scope: 'Number · Fractions · Geometry · Data', grad: 'coral' },
      science: { name: 'Science Lagoon', scope: 'Forces · Life · Materials · Earth & Space', grad: 'teal' }
    }[subject];

    const doneCount = subjectQuests.filter(q => (completedQuests[q.id] || 0) >= 70).length;

    let drawerHtml = `
      <div class="drawer-header">
        <div>
          <h3 class="drawer-title text-gradient-${meta.grad}">${meta.name}</h3>
          <p class="drawer-subtitle">${meta.scope}</p>
          <p class="drawer-progress">${doneCount} / ${subjectQuests.length} topics at Good standard (70%+)</p>
        </div>
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
            <div class="quest-card-topic">${quest.topic}</div>
            <div class="quest-card-meta">
              <span>⏱ ${quest.estimatedMinutes} min</span>
              <span>${difficultyStars}</span>
              ${isCompleted ? `<span style="color:var(--color-green-dark); font-weight:bold;">Best: ${bestScore}%</span>` : ''}
            </div>
          </div>
          <button class="quest-card-play-btn" data-quest-id="${quest.id}">
            ${isCompleted ? 'Revise' : 'Start'}
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
