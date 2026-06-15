import { gameState } from '../game/state';
import { sounds } from '../utils/sounds';

export class Companion {
  private container: HTMLDivElement;
  private bubble: HTMLDivElement;
  private bubbleText: HTMLDivElement;
  private bubbleTimeout: number | null = null;

  private dialogues = [
    "Hi Vera! Ready to explore today?",
    "You're doing amazing! Let's find some stickers!",
    "Math Peaks looks sunny today. Let's solve some puzzles!",
    "Let's check out the tide pools at English Cove!",
    "Did you know current flows through closed circuits? Let's try it in the Lagoon!",
    "I believe in you! Take your time, there is no rush.",
    "Ooh! That was a clever answer!",
    "Every mistake is just a stepping stone to finding the treasure!",
    "Wow, look at all the stickers we've collected!"
  ];

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'companion-container companion-interactive';
    this.container.id = 'lumi-companion';
    
    this.bubble = document.createElement('div');
    this.bubble.className = 'companion-bubble';
    
    this.bubbleText = document.createElement('div');
    this.bubble.appendChild(this.bubbleText);
    
    parent.appendChild(this.bubble);
    parent.appendChild(this.container);

    this.render();
    this.initEvents();
    
    // Subscribe to state to update accessories if Lumi levels up
    gameState.subscribe(() => {
      this.updateAccessories();
    });

    // Initial greeting
    setTimeout(() => {
      this.speak("Welcome to VeraQuest! Tap on me for hints, or tap locations on the map to start a quest!");
    }, 1000);
  }

  private render() {
    // Lumi is a cute sea turtle with big round eyes, a leafy shell, and customizable accessories.
    this.container.innerHTML = `
      <svg class="companion-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="lumi-skin" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#2DD4BF" />
            <stop offset="100%" stop-color="#0D9488" />
          </radialGradient>
          <linearGradient id="lumi-shell-normal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4ADE80" />
            <stop offset="100%" stop-color="#15803D" />
          </linearGradient>
          <linearGradient id="lumi-hat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="100%" stop-color="#D97706" />
          </linearGradient>
        </defs>

        <!-- Back Flippers -->
        <ellipse cx="30" cy="80" rx="10" ry="6" fill="url(#lumi-skin)" transform="rotate(-20 30 80)" />
        <ellipse cx="70" cy="80" rx="10" ry="6" fill="url(#lumi-skin)" transform="rotate(20 70 80)" />

        <!-- Front Flippers (wings) -->
        <g id="lumi-flipper-left" class="lumi-flipper">
          <path d="M 24 55 C 10 50, 8 70, 24 65 Z" fill="url(#lumi-skin)" />
        </g>
        <g id="lumi-flipper-right" class="lumi-flipper">
          <path d="M 76 55 C 90 50, 92 70, 76 65 Z" fill="url(#lumi-skin)" />
        </g>

        <!-- Tail -->
        <path d="M 50 85 L 47 92 L 53 92 Z" fill="url(#lumi-skin)" />

        <!-- Shell (body) -->
        <circle cx="50" cy="65" r="22" fill="url(#lumi-shell-normal)" class="lumi-accessory-shell" stroke="#14532D" stroke-width="2" />
        
        <!-- Shell details (hexagons) -->
        <polygon points="50,53 58,58 58,68 50,73 42,68 42,58" fill="none" stroke="#14532D" stroke-width="1.5" opacity="0.6" />
        <line x1="50" y1="53" x2="50" y2="45" stroke="#14532D" stroke-width="1.5" opacity="0.6" />
        <line x1="58" y1="58" x2="68" y2="54" stroke="#14532D" stroke-width="1.5" opacity="0.6" />
        <line x1="58" y1="68" x2="68" y2="72" stroke="#14532D" stroke-width="1.5" opacity="0.6" />
        <line x1="50" y1="73" x2="50" y2="82" stroke="#14532D" stroke-width="1.5" opacity="0.6" />
        <line x1="42" y1="68" x2="32" y2="72" stroke="#14532D" stroke-width="1.5" opacity="0.6" />
        <line x1="42" y1="58" x2="32" y2="54" stroke="#14532D" stroke-width="1.5" opacity="0.6" />

        <!-- Neck -->
        <rect x="44" y="36" width="12" height="15" rx="5" fill="url(#lumi-skin)" />

        <!-- Head -->
        <g id="lumi-head">
          <circle cx="50" cy="32" r="14" fill="url(#lumi-skin)" stroke="#0F766E" stroke-width="1" />
          
          <!-- Cheeks -->
          <circle cx="40" cy="35" r="3" fill="#FDA4AF" opacity="0.6" />
          <circle cx="60" cy="35" r="3" fill="#FDA4AF" opacity="0.6" />

          <!-- Eyes -->
          <g id="lumi-eyes">
            <!-- Left Eye -->
            <circle cx="42" cy="30" r="4.5" fill="white" />
            <circle cx="43" cy="29" r="2.5" fill="#1E293B" id="lumi-pupil-l" />
            <circle cx="44.5" cy="27.5" r="1" fill="white" />
            
            <!-- Right Eye -->
            <circle cx="58" cy="30" r="4.5" fill="white" />
            <circle cx="57" cy="29" r="2.5" fill="#1E293B" id="lumi-pupil-r" />
            <circle cx="55.5" cy="27.5" r="1" fill="white" />
          </g>

          <!-- Cute Smile -->
          <path d="M 46 36 Q 50 40 54 36" fill="none" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round" id="lumi-mouth" />
          
          <!-- Thinking Question Mark (visible when thinking) -->
          <text x="50" y="14" font-family="Fredoka" font-size="12" fill="#FACC15" font-weight="bold" opacity="0" id="lumi-thinking-mark" text-anchor="middle">?</text>

          <!-- ACCESSORY: Straw Hat (Level 2) -->
          <g class="lumi-accessory-hat">
            <ellipse cx="50" cy="20" rx="16" ry="4" fill="url(#lumi-hat-grad)" stroke="#92400E" stroke-width="1" />
            <path d="M 39 19 C 39 12, 61 12, 61 19 Z" fill="url(#lumi-hat-grad)" stroke="#92400E" stroke-width="1" />
            <rect x="39" y="17" width="22" height="2" fill="#EF4444" /> <!-- Red Hat Ribbon -->
          </g>

          <!-- ACCESSORY: Explorer Goggles (Level 3) -->
          <g class="lumi-accessory-goggles">
            <rect x="34" y="27" width="32" height="2" fill="#1E293B" /> <!-- Goggle Strap -->
            <circle cx="42" cy="29" r="5.5" fill="none" stroke="#FBBF24" stroke-width="1.5" />
            <circle cx="42" cy="29" r="4" fill="rgba(56, 189, 248, 0.4)" />
            <circle cx="58" cy="29" r="5.5" fill="none" stroke="#FBBF24" stroke-width="1.5" />
            <circle cx="58" cy="29" r="4" fill="rgba(56, 189, 248, 0.4)" />
          </g>
        </g>
      </svg>
    `;
  }

  private initEvents() {
    this.container.addEventListener('click', () => {
      sounds.playPop();
      this.bounce();
      this.speakRandom();
    });
  }

  private updateAccessories() {
    const companionLevel = gameState.getCompanionLevel();
    const svgEl = this.container.querySelector('svg');
    if (!svgEl) return;

    // Remove old classes
    svgEl.classList.remove('has-accessory-hat', 'has-accessory-goggles', 'has-accessory-shell');

    // Add classes based on level
    if (companionLevel >= 2) {
      svgEl.classList.add('has-accessory-hat');
    }
    if (companionLevel >= 3) {
      svgEl.classList.add('has-accessory-goggles');
    }
    if (companionLevel >= 4) {
      svgEl.classList.add('has-accessory-shell');
    }
  }

  public speak(message: string, durationMs: number = 4000) {
    if (this.bubbleTimeout) {
      clearTimeout(this.bubbleTimeout);
    }
    
    this.bubbleText.innerText = message;
    this.bubble.classList.add('companion-bubble-visible');
    
    this.bubbleTimeout = window.setTimeout(() => {
      this.bubble.classList.remove('companion-bubble-visible');
    }, durationMs);
  }

  public speakRandom() {
    const randomMsg = this.dialogues[Math.floor(Math.random() * this.dialogues.length)];
    // Customize with Lumi's named setting
    const companionName = gameState.getState().companionName;
    const msg = randomMsg.replace('Lumi', companionName);
    this.speak(msg);
  }

  public setMood(mood: 'happy' | 'thinking' | 'excited' | 'encouraging') {
    const svgEl = this.container.querySelector('.companion-svg') as SVGElement;
    if (!svgEl) return;

    // Reset styles
    const mouth = svgEl.querySelector('#lumi-mouth') as SVGPathElement;
    const leftPupil = svgEl.querySelector('#lumi-pupil-l') as SVGCircleElement;
    const rightPupil = svgEl.querySelector('#lumi-pupil-r') as SVGCircleElement;
    const thinkingMark = svgEl.querySelector('#lumi-thinking-mark') as SVGTextElement;
    
    thinkingMark.style.opacity = '0';
    mouth.setAttribute('d', 'M 46 36 Q 50 40 54 36'); // standard smile
    leftPupil.setAttribute('r', '2.5');
    rightPupil.setAttribute('r', '2.5');
    svgEl.style.animation = 'floaty 4s ease-in-out infinite alternate';

    if (mood === 'thinking') {
      thinkingMark.style.opacity = '1';
      mouth.setAttribute('d', 'M 46 38 Q 50 38 54 38'); // flat mouth
      svgEl.style.animation = 'none';
    } else if (mood === 'excited') {
      mouth.setAttribute('d', 'M 45 35 Q 50 43 55 35'); // big smile
      leftPupil.setAttribute('r', '3.5');
      rightPupil.setAttribute('r', '3.5');
      svgEl.style.animation = 'excitedBounce 0.5s ease infinite alternate';
    } else if (mood === 'encouraging') {
      mouth.setAttribute('d', 'M 46 36 Q 50 42 54 36'); // cute grin
    }
  }

  public bounce() {
    const svgEl = this.container.querySelector('.companion-svg') as SVGElement;
    if (!svgEl) return;
    
    svgEl.style.transition = 'transform 0.15s ease-out';
    svgEl.style.transform = 'scale(1.2) translateY(-15px)';
    
    setTimeout(() => {
      svgEl.style.transform = 'scale(1) translateY(0)';
      setTimeout(() => {
        svgEl.style.transition = '';
      }, 150);
    }, 150);
  }
}

// Add CSS keyframes for Lumi custom motions if not defined in globals.css
const style = document.createElement('style');
style.innerHTML = `
  @keyframes excitedBounce {
    0% { transform: translateY(0px) scale(1); }
    100% { transform: translateY(-12px) scaleY(1.1) scaleX(0.95); }
  }
`;
document.head.appendChild(style);
