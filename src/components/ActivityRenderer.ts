import type { BaseQuest } from '../data/topics';

export class ActivityRenderer {
  private container: HTMLDivElement;
  private currentType: string = '';
  private currentChallenge: any = null;

  // Inference state
  private selectedSentenceIndices: number[] = [];

  // Sentence Builder state
  private assembledOrder: number[] = [];

  // Figurative Match state
  private selectedLeftId: number | null = null;
  private matches: Record<number, string> = {}; // leftIndex -> type

  // Fraction Pizza state
  private selectedTopping: string = 'cheese';
  private pizzaToppings: Record<number, string[]> = {}; // sliceIndex -> toppings[]

  // Gem Sort state
  private selectedGemIndex: number | null = null;
  private gemPlacements: Record<number, string> = {}; // gemIndex -> binId

  // Slider measurement state
  private sliderValue: number = 0;

  // Circuit builder state
  private selectedCompType: string | null = null;
  private circuitSlots: Record<number, string> = {}; // slotId -> componentType
  private switchState: boolean = false;

  // Shadow Lab state
  private sunAngle: number = 45;

  // Material Sorter state
  private selectedMaterialIndex: number | null = null;
  private materialPlacements: Record<number, string> = {}; // materialIndex -> binId

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'quest-workspace';
    parent.appendChild(this.container);
  }

  public render(quest: BaseQuest, challenge: any) {
    this.container.innerHTML = '';
    this.currentType = quest.type;
    this.currentChallenge = challenge;
    
    this.selectedSentenceIndices = [];
    this.assembledOrder = [];
    this.selectedLeftId = null;
    this.matches = {};
    this.selectedTopping = 'cheese';
    this.pizzaToppings = {};
    this.selectedGemIndex = null;
    this.gemPlacements = {};
    this.sliderValue = challenge.startValue || 0;
    this.selectedCompType = null;
    this.circuitSlots = {};
    this.switchState = false;
    this.sunAngle = 45;
    this.selectedMaterialIndex = null;
    this.materialPlacements = {};

    switch (quest.type) {
      case 'inference':
        this.renderInference(challenge);
        break;
      case 'sentence-builder':
        this.renderSentenceBuilder(challenge);
        break;
      case 'figurative':
        this.renderFigurative(challenge);
        break;
      case 'fraction-pizza':
        this.renderFractionPizza(challenge);
        break;
      case 'gem-sort':
        this.renderGemSort(challenge);
        break;
      case 'measurement':
        this.renderMeasurement(challenge);
        break;
      case 'circuit':
        this.renderCircuit(challenge);
        break;
      case 'shadow-lab':
        this.renderShadowLab(challenge);
        break;
      case 'material-sorter':
        this.renderMaterialSorter(challenge);
        break;
      default:
        this.container.innerHTML = `<p>Quest type not recognized.</p>`;
    }
  }

  // ================= INFERENCE DETECTIVE =================
  private renderInference(c: any) {
    let html = `<div>`;
    c.story.forEach((sentence: string, index: number) => {
      html += `
        <span class="inference-sentence" data-index="${index}">
          ${sentence}
        </span>
      `;
    });
    html += `</div>`;
    this.container.innerHTML = html;

    const sentences = this.container.querySelectorAll('.inference-sentence');
    sentences.forEach(s => {
      s.addEventListener('click', () => {
        const idx = parseInt(s.getAttribute('data-index') || '0');
        if (this.selectedSentenceIndices.includes(idx)) {
          this.selectedSentenceIndices = this.selectedSentenceIndices.filter(i => i !== idx);
          s.classList.remove('inference-sentence-selected');
        } else {
          this.selectedSentenceIndices.push(idx);
          s.classList.add('inference-sentence-selected');
        }
      });
    });
  }

  // ================= SENTENCE BUILDER =================
  private renderSentenceBuilder(c: any) {
    // Scramble the chunks for the pool
    const scrambled = c.chunks.map((ch: string, idx: number) => ({ text: ch, origIdx: idx }));
    // Simple pseudo shuffle
    scrambled.sort(() => Math.random() - 0.5);

    let html = `
      <div>
        <p style="font-size:0.8rem; color:var(--color-text-muted); margin-bottom:8px; font-weight:bold;">WORD POOL (Click words to build sentence):</p>
        <div class="sentence-builder-pool" id="sentence-pool">
    `;

    scrambled.forEach((item: any) => {
      html += `<div class="word-chunk" data-orig-idx="${item.origIdx}">${item.text}</div>`;
    });

    html += `
        </div>
        <p style="font-size:0.8rem; color:var(--color-text-muted); margin-bottom:8px; font-weight:bold;">YOUR SENTENCE:</p>
        <div class="sentence-builder-slots" id="sentence-slots">
          <p style="color:var(--color-text-muted); font-size:0.85rem; text-align:center; margin-top:30px;" id="placeholder-text">Click clauses above in the correct order...</p>
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    const pool = this.container.querySelector('#sentence-pool') as HTMLDivElement;
    const slots = this.container.querySelector('#sentence-slots') as HTMLDivElement;
    const placeholder = this.container.querySelector('#placeholder-text') as HTMLParagraphElement;

    pool.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('word-chunk')) {
        const idx = parseInt(target.getAttribute('data-orig-idx') || '0');
        
        // Remove from pool display
        target.style.display = 'none';
        
        // Add to slots
        const clone = document.createElement('div');
        clone.className = 'word-chunk';
        clone.innerText = target.innerText;
        clone.setAttribute('data-orig-idx', idx.toString());
        slots.appendChild(clone);
        
        if (placeholder) placeholder.style.display = 'none';
        this.assembledOrder.push(idx);
      }
    });

    slots.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('word-chunk')) {
        const idx = parseInt(target.getAttribute('data-orig-idx') || '0');
        
        // Remove from slots
        slots.removeChild(target);
        
        // Restore in pool
        const poolItem = pool.querySelector(`[data-orig-idx="${idx}"]`) as HTMLElement;
        if (poolItem) poolItem.style.display = 'block';
        
        this.assembledOrder = this.assembledOrder.filter(i => i !== idx);
        
        if (this.assembledOrder.length === 0 && placeholder) {
          placeholder.style.display = 'block';
        }
      }
    });
  }

  // ================= FIGURATIVE LANGUAGE MATCH =================
  private renderFigurative(c: any) {
    const leftColumn = c.pairs.map((p: any, idx: number) => ({ text: p.phrase, index: idx }));
    const rightColumn = Array.from(new Set(c.pairs.map((p: any) => p.type))).map((t: any) => ({ text: t, id: t }));
    
    // simple sort
    leftColumn.sort(() => Math.random() - 0.5);
    rightColumn.sort(() => Math.random() - 0.5);

    let html = `
      <div class="matching-container">
        <!-- Phrases -->
        <div class="matching-column" id="match-left">
          <p style="font-size:0.8rem; font-weight:bold; color:var(--color-text-muted)">PHRASES</p>
    `;
    leftColumn.forEach((item: any) => {
      html += `<div class="matching-card" data-idx="${item.index}">${item.text}</div>`;
    });

    html += `
        </div>
        <!-- Types -->
        <div class="matching-column" id="match-right">
          <p style="font-size:0.8rem; font-weight:bold; color:var(--color-text-muted)">FIGURE OF SPEECH</p>
    `;
    rightColumn.forEach((item: any) => {
      html += `<div class="matching-card" data-type-id="${item.id}">${item.text}</div>`;
    });

    html += `
        </div>
      </div>
      <p style="font-size:0.75rem; text-align:center; color:var(--color-text-muted); margin-top:16px;">
        Click a Phrase card, then click its correct Figure of Speech card!
      </p>
    `;

    this.container.innerHTML = html;

    const leftCol = this.container.querySelector('#match-left') as HTMLDivElement;
    const rightCol = this.container.querySelector('#match-right') as HTMLDivElement;

    leftCol.addEventListener('click', (e) => {
      const card = e.target as HTMLElement;
      if (card.classList.contains('matching-card') && !card.classList.contains('matching-card-matched')) {
        // Deselect previous
        leftCol.querySelectorAll('.matching-card').forEach(c => c.classList.remove('matching-card-selected'));
        
        this.selectedLeftId = parseInt(card.getAttribute('data-idx') || '0');
        card.classList.add('matching-card-selected');
      }
    });

    rightCol.addEventListener('click', (e) => {
      const card = e.target as HTMLElement;
      if (card.classList.contains('matching-card') && this.selectedLeftId !== null && !card.classList.contains('matching-card-matched')) {
        const typeId = card.getAttribute('data-type-id') || '';
        
        // Record match
        this.matches[this.selectedLeftId] = typeId;
        
        // Visual match indication
        const leftCard = leftCol.querySelector(`[data-idx="${this.selectedLeftId}"]`) as HTMLElement;
        leftCard.classList.remove('matching-card-selected');
        leftCard.classList.add('matching-card-matched');
        
        // Disable type if needed or just highlight
        card.classList.add('matching-card-matched');
        
        // Append a visual indicator tag to left card
        leftCard.innerHTML += `<div style="font-size:0.65rem; font-weight:bold; margin-top:4px; color:var(--color-green-dark)">➔ ${typeId}</div>`;

        this.selectedLeftId = null;
      }
    });
  }

  // ================= FRACTION PIZZA PARTY =================
  private renderFractionPizza(c: any) {
    const totalSlices = c.slices; // 4 or 8

    let html = `
      <div class="pizza-board">
        <p style="font-size:0.85rem; text-align:center; font-weight:600; margin-bottom:8px; line-height:1.4;">
          ${c.instructions}
        </p>
        
        <div class="pizza-visual-container">
          <div class="pizza-plate"></div>
          <div class="pizza-base">
            <div class="pizza-cheese" id="pizza-cheese-surface"></div>
      `;

      // Render slice dividing lines
      for (let i = 0; i < totalSlices; i++) {
        const angle = (360 / totalSlices) * i;
        html += `
          <div class="pizza-slice-line" style="
            width: 180px; 
            height: 2px; 
            top: 89px; 
            left: 0px; 
            transform: rotate(${angle}deg);
            transform-origin: 50% 50%;
          "></div>
        `;
      }

      // Render interactive wedge overlay slices for mouse clicks
      for (let i = 0; i < totalSlices; i++) {
        const angle = (360 / totalSlices) * i;
        const skew = 90 - (360 / totalSlices);
        // Position overlays at center
        html += `
          <div class="pizza-sector" data-slice="${i}" style="
            transform: rotate(${angle}deg) skewY(${skew}deg);
          "></div>
        `;
      }

      html += `
          </div>
          <!-- Topping icons layer -->
          <div id="pizza-toppings-layer" style="position:absolute; width:100%; height:100%; top:0; left:0; z-index:10; pointer-events:none;"></div>
        </div>

        <div class="pizza-topping-select">
          <div class="pizza-topping-option pizza-topping-option-selected" data-topping="cheese">🧀<div style="font-size:0.5rem; text-align:center;">Cheese</div></div>
          <div class="pizza-topping-option" data-topping="pepperoni">🍕<div style="font-size:0.5rem; text-align:center;">Pepp.</div></div>
          <div class="pizza-topping-option" data-topping="mushroom">🍄<div style="font-size:0.5rem; text-align:center;">Mush.</div></div>
          <div class="pizza-topping-option" data-topping="pineapple">🍍<div style="font-size:0.5rem; text-align:center;">Pine.</div></div>
          <div class="pizza-topping-option" data-topping="ham">🍖<div style="font-size:0.5rem; text-align:center;">Ham</div></div>
        </div>
        <p style="font-size:0.7rem; color:var(--color-text-muted)">Select topping, then tap on pizza slices to add/remove them.</p>
      </div>
    `;

    this.container.innerHTML = html;

    const layer = this.container.querySelector('#pizza-toppings-layer') as HTMLDivElement;
    const sectors = this.container.querySelectorAll('.pizza-sector');
    const toppingOptions = this.container.querySelectorAll('.pizza-topping-option');

    toppingOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        toppingOptions.forEach(o => o.classList.remove('pizza-topping-option-selected'));
        opt.classList.add('pizza-topping-option-selected');
        this.selectedTopping = opt.getAttribute('data-topping') || 'cheese';
      });
    });

    sectors.forEach(sec => {
      sec.addEventListener('click', () => {
        const sliceIdx = parseInt(sec.getAttribute('data-slice') || '0');
        if (!this.pizzaToppings[sliceIdx]) {
          this.pizzaToppings[sliceIdx] = [];
        }

        // Toggle topping on this slice
        if (this.pizzaToppings[sliceIdx].includes(this.selectedTopping)) {
          this.pizzaToppings[sliceIdx] = this.pizzaToppings[sliceIdx].filter(t => t !== this.selectedTopping);
        } else {
          this.pizzaToppings[sliceIdx].push(this.selectedTopping);
        }

        this.redrawPizzaToppings(totalSlices, layer);
      });
    });
  }

  private redrawPizzaToppings(totalSlices: number, layer: HTMLDivElement) {
    layer.innerHTML = '';
    const sliceAngle = 360 / totalSlices;
    const radius = 60; // radius distance from center

    for (let s = 0; s < totalSlices; s++) {
      const toppings = this.pizzaToppings[s] || [];
      const angle = (sliceAngle * s) + (sliceAngle / 2); // angle to middle of slice
      const rad = (angle * Math.PI) / 180;

      toppings.forEach((t, index) => {
        // Offset multiple toppings on same slice
        const offsetRadius = radius - (index * 15);
        const x = 100 + offsetRadius * Math.cos(rad);
        const y = 100 + offsetRadius * Math.sin(rad);

        let icon = '🧀';
        if (t === 'pepperoni') icon = '🔴';
        if (t === 'mushroom') icon = '🍄';
        if (t === 'pineapple') icon = '🍍';
        if (t === 'ham') icon = '🍖';

        layer.innerHTML += `
          <div class="pizza-topping-icon" style="left: ${x}px; top: ${y}px;">
            ${icon}
          </div>
        `;
      });
    }
  }

  // ================= GEOMETRY GEM SORT =================
  private renderGemSort(c: any) {
    let html = `
      <div>
        <p style="font-size:0.8rem; font-weight:bold; color:var(--color-text-muted); margin-bottom:12px; text-align:center;">
          Select a gem shape below, then click the correct chest to sort it!
        </p>
        <div class="gems-container" id="gem-pool">
    `;

    c.items.forEach((item: any, index: number) => {
      html += `
        <div class="gem-item" data-gem-idx="${index}">
          <div>${item.emoji}</div>
          <div style="font-size:0.5rem; font-weight:bold; color:var(--color-text-muted); text-align:center; margin-top:2px;">${item.name}</div>
        </div>
      `;
    });

    html += `
        </div>
        <div class="gem-bins-container" id="gem-bins">
    `;

    c.bins.forEach((bin: any) => {
      html += `
        <div class="gem-bin" data-bin-id="${bin.id}">
          <div class="gem-bin-title">${bin.name} (${bin.description})</div>
          <div class="gem-bin-items" id="bin-items-${bin.id}"></div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    const gemPool = this.container.querySelector('#gem-pool') as HTMLDivElement;
    const gemBins = this.container.querySelector('#gem-bins') as HTMLDivElement;

    gemPool.addEventListener('click', (e) => {
      const gem = (e.target as HTMLElement).closest('.gem-item') as HTMLElement;
      if (gem) {
        gemPool.querySelectorAll('.gem-item').forEach(g => g.classList.remove('matching-card-selected'));
        this.selectedGemIndex = parseInt(gem.getAttribute('data-gem-idx') || '0');
        gem.classList.add('matching-card-selected');
      }
    });

    gemBins.addEventListener('click', (e) => {
      const bin = (e.target as HTMLElement).closest('.gem-bin') as HTMLElement;
      if (bin && this.selectedGemIndex !== null) {
        const binId = bin.getAttribute('data-bin-id') || '';
        
        // Save placement
        this.gemPlacements[this.selectedGemIndex] = binId;

        // Visual update
        const gem = gemPool.querySelector(`[data-gem-idx="${this.selectedGemIndex}"]`) as HTMLElement;
        if (gem) {
          gem.style.display = 'none';
        }

        const binItemsContainer = bin.querySelector('.gem-bin-items') as HTMLDivElement;
        const itemObj = c.items[this.selectedGemIndex];
        
        const placedItem = document.createElement('div');
        placedItem.className = 'gem-item';
        placedItem.style.width = '44px';
        placedItem.style.height = '44px';
        placedItem.style.fontSize = '1.1rem';
        placedItem.style.cursor = 'pointer';
        placedItem.innerHTML = `<div>${itemObj.emoji}</div>`;
        placedItem.setAttribute('data-gem-idx', this.selectedGemIndex.toString());
        binItemsContainer.appendChild(placedItem);

        this.selectedGemIndex = null;
      }
    });

    // Let user remove item from bin by clicking it
    gemBins.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.gem-item') as HTMLElement;
      if (target && target.parentElement?.classList.contains('gem-bin-items')) {
        const gemIdx = parseInt(target.getAttribute('data-gem-idx') || '0');
        
        // Remove placement
        delete this.gemPlacements[gemIdx];
        
        // Remove visual
        target.remove();
        
        // Restore pool item
        const poolGem = gemPool.querySelector(`[data-gem-idx="${gemIdx}"]`) as HTMLElement;
        if (poolGem) poolGem.style.display = 'flex';
      }
    });
  }

  // ================= MEASUREMENT SCALE =================
  private renderMeasurement(c: any) {
    let visualHtml = '';

    if (c.type === 'beaker') {
      visualHtml = `
        <div class="beaker-visual">
          <div class="beaker-liquid" id="beaker-fill" style="height: 0%;"></div>
          <div class="beaker-value" id="beaker-label">0</div>
          <div class="beaker-ticks">
      `;
      // Draw markers every 100ml
      for (let i = 1000; i >= 0; i -= 200) {
        visualHtml += `
          <div class="beaker-tick" style="position:relative;">
            <span class="beaker-tick-label">${i}ml</span>
          </div>
        `;
      }
      visualHtml += `</div></div>`;
    } else if (c.type === 'scale') {
      visualHtml = `
        <div class="scale-visual">
          <div class="scale-plate" style="transform:translateY(0px)"></div>
          <div class="scale-stand"></div>
          <div class="scale-base">
            <div class="scale-weight-box" id="scale-label">0 g</div>
          </div>
          <div class="scale-dial">
            <div class="scale-needle" id="scale-needle" style="transform: rotate(0deg);"></div>
          </div>
        </div>
      `;
    }

    let html = `
      <div class="measurement-container">
        <p style="font-size:0.95rem; text-align:center; font-weight:bold; color:var(--color-text); line-height:1.4;">
          ${c.instructions}
        </p>

        ${visualHtml}

        <div class="slider-control">
          <input type="range" class="slider-input" id="measure-slider" 
                 min="${c.min}" max="${c.max}" step="${c.step}" value="${this.sliderValue}" />
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:bold; margin-top:8px;">
            <span>${c.min}</span>
            <span>${c.max}</span>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    const slider = this.container.querySelector('#measure-slider') as HTMLInputElement;
    
    const updateVisual = (val: number) => {
      this.sliderValue = val;
      if (c.type === 'beaker') {
        const fill = this.container.querySelector('#beaker-fill') as HTMLDivElement;
        const label = this.container.querySelector('#beaker-label') as HTMLDivElement;
        const pct = (val / c.max) * 100;
        if (fill) fill.style.height = `${pct}%`;
        if (label) label.innerText = `${val} ${c.targetUnit}`;
      } else if (c.type === 'scale') {
        const label = this.container.querySelector('#scale-label') as HTMLDivElement;
        const needle = this.container.querySelector('#scale-needle') as HTMLDivElement;
        const plate = this.container.querySelector('.scale-plate') as HTMLDivElement;
        
        // needle rotates between -90 and 90 degrees
        const rot = ((val / c.max) * 180) - 90;
        if (needle) needle.style.transform = `rotate(${rot}deg)`;
        if (label) label.innerText = `${val} ${c.targetUnit}`;
        
        // slight plate sag
        const sag = (val / c.max) * 4;
        if (plate) plate.style.transform = `translateY(${sag}px)`;
      }
    };

    slider.addEventListener('input', () => {
      updateVisual(parseInt(slider.value));
    });

    // Set initial layout
    updateVisual(this.sliderValue);
  }

  // ================= CIRCUIT BUILDER =================
  private renderCircuit(c: any) {
    let html = `
      <div>
        <p style="font-size:0.85rem; text-align:center; font-weight:600; margin-bottom:16px; line-height:1.4;">
          ${c.instructions}
        </p>

        <div class="circuit-board">
    `;

    c.slots.forEach((s: any) => {
      html += `
        <div class="circuit-slot" data-slot-id="${s.id}">
          <div class="circuit-slot-label">${s.name}</div>
          <div class="circuit-slot-content" id="slot-c-${s.id}">❓ Empty</div>
        </div>
      `;
    });

    html += `
        </div>
        
        <p style="font-size:0.8rem; font-weight:bold; color:var(--color-text-muted); margin-bottom:8px; text-anchor:middle; text-align:center;">
          Select a component, then click its slot to install it:
        </p>
        <div class="circuit-components" id="circuit-pool">
    `;

    c.availableComponents.forEach((comp: any) => {
      html += `
        <div class="circuit-comp-card" data-comp-type="${comp.type}">
          ${comp.name}
        </div>
      `;
    });

    html += `
        </div>

        <div style="margin-top:20px; display:flex; justify-content:center; align-items:center; gap:12px;">
          <button id="btn-circuit-switch" class="btn-secondary" style="max-width:160px;">🔌 Switch: OFF</button>
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    const pool = this.container.querySelector('#circuit-pool') as HTMLDivElement;
    const board = this.container.querySelector('.circuit-board') as HTMLDivElement;
    const switchBtn = this.container.querySelector('#btn-circuit-switch') as HTMLButtonElement;

    pool.addEventListener('click', (e) => {
      const card = e.target as HTMLElement;
      if (card.classList.contains('circuit-comp-card')) {
        pool.querySelectorAll('.circuit-comp-card').forEach(c => c.classList.remove('matching-card-selected'));
        this.selectedCompType = card.getAttribute('data-comp-type');
        card.classList.add('matching-card-selected');
      }
    });

    board.addEventListener('click', (e) => {
      const slot = (e.target as HTMLElement).closest('.circuit-slot') as HTMLElement;
      if (slot && this.selectedCompType !== null) {
        const slotId = parseInt(slot.getAttribute('data-slot-id') || '0');
        const compObj = c.availableComponents.find((co: any) => co.type === this.selectedCompType);

        // Place component
        this.circuitSlots[slotId] = this.selectedCompType;
        
        // Update Slot Visual
        slot.classList.add('circuit-slot-filled');
        const content = slot.querySelector('.circuit-slot-content') as HTMLDivElement;
        if (content) content.innerHTML = `<strong>${compObj.name}</strong>`;

        // Hide card in pool
        const card = pool.querySelector(`[data-comp-type="${this.selectedCompType}"]`) as HTMLElement;
        if (card) card.style.display = 'none';

        this.selectedCompType = null;
        pool.querySelectorAll('.circuit-comp-card').forEach(c => c.classList.remove('matching-card-selected'));
        this.updateCircuitBulbGlow();
      }
    });

    // Remove component
    board.addEventListener('click', (e) => {
      const slot = (e.target as HTMLElement).closest('.circuit-slot') as HTMLElement;
      const target = e.target as HTMLElement;
      if (slot && slot.classList.contains('circuit-slot-filled') && !target.classList.contains('circuit-slot-label')) {
        const slotId = parseInt(slot.getAttribute('data-slot-id') || '0');
        const removedType = this.circuitSlots[slotId];

        // Remove
        delete this.circuitSlots[slotId];
        slot.classList.remove('circuit-slot-filled');
        const content = slot.querySelector('.circuit-slot-content') as HTMLDivElement;
        if (content) content.innerHTML = `❓ Empty`;

        // Restore pool card
        const card = pool.querySelector(`[data-comp-type="${removedType}"]`) as HTMLElement;
        if (card) card.style.display = 'block';

        this.updateCircuitBulbGlow();
      }
    });

    switchBtn.addEventListener('click', () => {
      this.switchState = !this.switchState;
      switchBtn.innerHTML = `🔌 Switch: ${this.switchState ? 'ON' : 'OFF'}`;
      switchBtn.className = this.switchState ? 'btn-primary' : 'btn-secondary';
      this.updateCircuitBulbGlow();
    });
  }

  private updateCircuitBulbGlow() {
    const slots = this.container.querySelectorAll('.circuit-slot');
    const bulbSlotIdx = 2; // Slot index for load (bulb)
    const isCircuitComplete = this.circuitSlots[0] === 'battery' && 
                             this.circuitSlots[1] === 'wire' && 
                             this.circuitSlots[2] === 'bulb' && 
                             this.circuitSlots[3] === 'switch';

    slots.forEach(slot => {
      const id = parseInt(slot.getAttribute('data-slot-id') || '0');
      slot.classList.remove('circuit-slot-glow');
      
      if (id === bulbSlotIdx && isCircuitComplete && this.switchState) {
        // Bulb glows!
        slot.classList.add('circuit-slot-glow');
        const content = slot.querySelector('.circuit-slot-content') as HTMLDivElement;
        if (content) content.innerHTML = `💡 <strong style="color:var(--color-gold-dark)">GLOWING!</strong>`;
      } else if (id === bulbSlotIdx && this.circuitSlots[bulbSlotIdx] === 'bulb') {
        const content = slot.querySelector('.circuit-slot-content') as HTMLDivElement;
        if (content) content.innerHTML = `<strong>💡 Lightbulb</strong>`;
      }
    });
  }

  // ================= SHADOW LAB =================
  private renderShadowLab(c: any) {
    let html = `
      <div>
        <p style="font-size:0.85rem; text-align:center; font-weight:600; margin-bottom:16px; line-height:1.4;">
          ${c.instructions}
        </p>

        <div class="shadow-lab-visual" id="shadow-lab-board">
          <div class="shadow-lightsource" id="shadow-sun">☀️</div>
          <div class="shadow-tree">🌴</div>
          <div class="shadow-projection" id="shadow-project"></div>
          <div class="shadow-ground"></div>
        </div>

        <div class="slider-control" style="margin-top:16px;">
          <label style="font-size:0.75rem; font-weight:bold; color:var(--color-text-muted); display:block; margin-bottom:6px;">Sun elevation angle (degrees)</label>
          <input type="range" class="slider-input" id="shadow-angle-slider" 
                 min="${c.minAngle}" max="${c.maxAngle}" step="1" value="${this.sunAngle}" />
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:bold; margin-top:4px;">
            <span>15° (Low sun)</span>
            <span id="shadow-lbl-deg">45°</span>
            <span>75° (High sun)</span>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    const slider = this.container.querySelector('#shadow-angle-slider') as HTMLInputElement;
    const label = this.container.querySelector('#shadow-lbl-deg') as HTMLSpanElement;
    const sun = this.container.querySelector('#shadow-sun') as HTMLDivElement;
    const shadow = this.container.querySelector('#shadow-project') as HTMLDivElement;

    const updateShadowVisual = (angle: number) => {
      this.sunAngle = angle;
      if (label) label.innerText = `${angle}°`;

      // Update sun location along an arc: center is around (120px, 150px)
      // x = 120 + r * cos(theta), y = 150 - r * sin(theta)
      const rad = (angle * Math.PI) / 180;
      const r = 110;
      const x = 120 + r * Math.cos(rad);
      const y = 140 - r * Math.sin(rad);
      
      if (sun) {
        sun.style.left = `${x}px`;
        sun.style.top = `${y}px`;
      }

      // Calculate shadow length: length = treeHeight / tan(angle)
      const len = c.treeHeight / Math.tan(rad);
      
      if (shadow) {
        // scale visual length
        const visualWidth = len * 11; 
        shadow.style.width = `${visualWidth}px`;
        
        // skew shadow away from sun
        // if sun is on the right (angle < 90), shadow points to the left
        const skewAngle = 90 - angle;
        shadow.style.transform = `skewX(${skewAngle}deg) scaleX(${Math.cos(rad) > 0 ? -1 : 1})`;
      }
    };

    slider.addEventListener('input', () => {
      updateShadowVisual(parseInt(slider.value));
    });

    updateShadowVisual(this.sunAngle);
  }

  // ================= MATERIAL LAB SORTER =================
  private renderMaterialSorter(c: any) {
    let html = `
      <div class="material-lab-workspace">
        <p style="font-size:0.85rem; text-align:center; font-weight:600; line-height:1.4;">
          ${c.instructions}
        </p>

        <div class="material-source-bin" id="material-pool">
    `;

    c.items.forEach((item: any, idx: number) => {
      html += `
        <div class="material-item" data-item-idx="${idx}">
          <span>${item.emoji}</span>
          <span>${item.name}</span>
        </div>
      `;
    });

    html += `
        </div>
        <div class="material-bins" id="material-bins">
    `;

    c.bins.forEach((bin: any) => {
      html += `
        <div class="material-bin" data-bin-id="${bin.id}">
          <div class="material-bin-title">${bin.name}</div>
          <div class="material-bin-contents" id="bin-c-${bin.id}"></div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    const mPool = this.container.querySelector('#material-pool') as HTMLDivElement;
    const mBins = this.container.querySelector('#material-bins') as HTMLDivElement;

    mPool.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest('.material-item') as HTMLElement;
      if (item) {
        mPool.querySelectorAll('.material-item').forEach(i => i.classList.remove('matching-card-selected'));
        this.selectedMaterialIndex = parseInt(item.getAttribute('data-item-idx') || '0');
        item.classList.add('matching-card-selected');
      }
    });

    mBins.addEventListener('click', (e) => {
      const bin = (e.target as HTMLElement).closest('.material-bin') as HTMLElement;
      if (bin && this.selectedMaterialIndex !== null) {
        const binId = bin.getAttribute('data-bin-id') || '';
        
        // Save
        this.materialPlacements[this.selectedMaterialIndex] = binId;

        // Visual
        const item = mPool.querySelector(`[data-item-idx="${this.selectedMaterialIndex}"]`) as HTMLElement;
        if (item) item.style.display = 'none';

        const itemObj = c.items[this.selectedMaterialIndex];
        const binContents = bin.querySelector('.material-bin-contents') as HTMLDivElement;

        const placedItem = document.createElement('div');
        placedItem.className = 'material-item';
        placedItem.style.fontSize = '0.75rem';
        placedItem.style.padding = '4px 8px';
        placedItem.style.cursor = 'pointer';
        placedItem.innerHTML = `<span>${itemObj.emoji}</span><span>${itemObj.name}</span>`;
        placedItem.setAttribute('data-item-idx', this.selectedMaterialIndex.toString());
        binContents.appendChild(placedItem);

        this.selectedMaterialIndex = null;
      }
    });

    // Remove item from bin
    mBins.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.material-item') as HTMLElement;
      if (target && target.parentElement?.classList.contains('material-bin-contents')) {
        const itemIdx = parseInt(target.getAttribute('data-item-idx') || '0');
        
        // Remove visual
        delete this.materialPlacements[itemIdx];
        target.remove();
        
        const poolItem = mPool.querySelector(`[data-item-idx="${itemIdx}"]`) as HTMLElement;
        if (poolItem) poolItem.style.display = 'flex';
      }
    });
  }

  // ================= ANSWER CHECKING LOGIC =================
  public checkAnswer(): { correct: boolean; score: number; feedback: string } {
    const c = this.currentChallenge;
    let correct = false;
    let score = 0;
    let feedback = '';

    switch (this.currentType) {
      case 'inference': {
        const selected = [...this.selectedSentenceIndices].sort();
        const expected = [...c.correctIndices].sort();
        correct = selected.length === expected.length && selected.every((v, i) => v === expected[i]);
        score = correct ? 100 : 0;
        feedback = correct ? "Correct! Excellent inference." : "Not quite. Check the sentences that reveal physical actions or shapes!";
        break;
      }
      case 'sentence-builder': {
        const expectedOrder = c.correctOrder;
        correct = this.assembledOrder.length === expectedOrder.length && 
                  this.assembledOrder.every((v, i) => v === expectedOrder[i]);
        score = correct ? 100 : 0;
        feedback = correct ? "Brilliant syntax building! The boat is steady!" : "The grammar isn't quite right. Tap items to rearrange them!";
        break;
      }
      case 'figurative': {
        // Pairs contains 4 items. Matches has form leftIndex -> type
        let correctCount = 0;
        c.pairs.forEach((p: any, idx: number) => {
          if (this.matches[idx] === p.type) {
            correctCount++;
          }
        });
        
        correct = correctCount === c.pairs.length;
        score = Math.round((correctCount / c.pairs.length) * 100);
        feedback = correct 
          ? "Amazing match! You're a figurative language wizard!" 
          : `You matched ${correctCount}/${c.pairs.length} correctly. Give it another try!`;
        break;
      }
      case 'fraction-pizza': {
        let allMet = true;
        c.requirements.forEach((req: any) => {
          let count = 0;
          for (let s = 0; s < c.slices; s++) {
            if (this.pizzaToppings[s]?.includes(req.topping)) {
              count++;
            }
          }
          if (count !== req.targetCount) {
            allMet = false;
          }
        });
        
        correct = allMet;
        score = correct ? 100 : 0;
        feedback = correct ? "Delizioso! Perfect fractions, Chef Vera!" : "The toppings do not match the orders. Re-read the fractions!";
        break;
      }
      case 'gem-sort': {
        let correctCount = 0;
        c.items.forEach((item: any, idx: number) => {
          if (this.gemPlacements[idx] === item.binId) {
            correctCount++;
          }
        });
        
        correct = correctCount === c.items.length;
        score = Math.round((correctCount / c.items.length) * 100);
        feedback = correct ? "Spot on! The shapes fit perfectly." : `Sorted ${correctCount}/${c.items.length} shapes correctly. Tap sorted gems to pull them back.`;
        break;
      }
      case 'measurement': {
        const diff = Math.abs(this.sliderValue - c.targetValue);
        const tolerance = c.tolerance || 10;
        correct = diff <= tolerance;
        score = correct ? 100 : 0;
        feedback = correct 
          ? `Perfect! You matched ${c.targetValue} ${c.targetUnit}!` 
          : `That is off by ${diff} ${c.targetUnit}. Slide closer to ${c.targetValue}!`;
        break;
      }
      case 'circuit': {
        const slotsFilled = this.circuitSlots[0] === 'battery' && 
                             this.circuitSlots[1] === 'wire' && 
                             this.circuitSlots[2] === 'bulb' && 
                             this.circuitSlots[3] === 'switch';
        
        if (!slotsFilled) {
          correct = false;
          feedback = "The components aren't in the correct slots. Drag battery, wires, bulb, and switch to their places.";
        } else if (!this.switchState) {
          correct = false;
          feedback = "The circuit is arranged correctly, but the switch is OPEN (OFF). Close the switch to light it up!";
        } else {
          correct = true;
          score = 100;
          feedback = "Woohoo! The beacon is lit! Safe voyages!";
        }
        break;
      }
      case 'shadow-lab': {
        const rad = (this.sunAngle * Math.PI) / 180;
        const currentLen = c.treeHeight / Math.tan(rad);
        const diff = Math.abs(currentLen - c.targetLength);
        
        correct = diff <= 0.6; // tolerance
        score = correct ? 100 : 0;
        feedback = correct 
          ? `Spectacular! The shadow is exactly ${c.targetLength}m long!` 
          : `The shadow is currently ${currentLen.toFixed(1)}m. Slide to adjust the sun!`;
        break;
      }
      case 'material-sorter': {
        let correctCount = 0;
        c.items.forEach((item: any, idx: number) => {
          if (this.materialPlacements[idx] === item.binId) {
            correctCount++;
          }
        });
        
        correct = correctCount === c.items.length;
        score = Math.round((correctCount / c.items.length) * 100);
        feedback = correct ? "Fantastic chemist! All materials sorted." : `Sorted ${correctCount}/${c.items.length} items correctly. Check your conduction and solubility!`;
        break;
      }
    }

    return { correct, score, feedback };
  }
}
