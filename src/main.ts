import './styles/globals.css';
import { Companion } from './components/Companion';
import { IslandMap } from './components/IslandMap';
import { ExplorerDashboard } from './components/ExplorerDashboard';
import { StickerBook } from './components/StickerBook';
import { DailyChest } from './components/DailyChest';
import { QuestOverlay } from './components/QuestOverlay';
import { Certificate } from './components/Certificate';
import { PaperPractice } from './components/PaperPractice';
import { QUESTS } from './data/topics';
import { sounds } from './utils/sounds';

class AppController {
  private root: HTMLDivElement;
  // Components
  private companion: Companion | null = null;
  private islandMap: IslandMap | null = null;


  constructor() {
    this.root = document.querySelector('#app') as HTMLDivElement;
    this.showSplashScreen();
  }

  private showSplashScreen() {
    // Beautiful welcome splash screen
    this.root.innerHTML = `
      <div class="splash-screen screen">
        <div class="splash-logo-container">
          <h1 class="splash-title">VeraQuest</h1>
          <p class="splash-subtitle text-gradient-coral">🌴 Grade 6 Ready 🌴</p>
        </div>

        <div class="splash-island">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <!-- Cute island silhouette -->
            <path d="M 10 70 Q 50 40 90 70 Z" fill="#2DD4BF" opacity="0.4" />
            <path d="M 15 70 C 15 55, 35 48, 50 60 C 65 48, 85 55, 85 70 Z" fill="#0D9488" />
            <ellipse cx="50" cy="73" rx="42" ry="8" fill="#FDE68A" /> <!-- sand bank -->
            <text x="35" y="52" font-size="14">🌴</text>
            <text x="58" y="55" font-size="12">🌴</text>
            <text x="47" y="68" font-size="12">🐢</text>
          </svg>
        </div>

        <div style="margin-bottom:40px; display:flex; flex-direction:column; gap:16px; align-items:center;">
          <p style="font-size:0.95rem; font-weight:600; max-width:300px; color:var(--color-text-muted); line-height:1.55;">
            Hi Vera! These island quests cover the Cambridge <strong>Stage 5</strong> topics in English, Math and Science for your Grade 6 retake. Each one teaches the idea first, then lets you practise. Learn a little every day — you've got this. 🌱
          </p>
          <button id="btn-start-voyage" class="splash-start-btn">
            Start Studying
          </button>
        </div>
      </div>
    `;

    const startBtn = this.root.querySelector('#btn-start-voyage');
    startBtn?.addEventListener('click', () => {
      sounds.playQuestSelect();
      this.initMainApp();
    });
  }

  private initMainApp() {
    // Main App Core Grid
    this.root.innerHTML = `
      <!-- Active screen containers -->
      <div id="screen-container" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative;"></div>
      
      <!-- Tab navigation -->
      <div class="tab-bar">
        <button class="tab-btn tab-btn-active" data-screen="screen-map">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Map
        </button>
        
        <button class="tab-btn" data-screen="screen-dashboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          Captain Log
        </button>
        
        <button class="tab-btn" data-screen="screen-stickers">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
          Album
        </button>
        
        <button class="tab-btn" data-screen="screen-chest">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          Treasure
        </button>
      </div>
    `;

    const container = this.root.querySelector('#screen-container') as HTMLDivElement;

    // Instantiate Screens
    this.islandMap = new IslandMap(container, (questId) => this.startQuest(questId));
    new ExplorerDashboard(container, () => this.showCertificate(), () => this.showPaperPractice());
    new StickerBook(container);
    new DailyChest(container);

    // Instantiate Companion
    this.companion = new Companion(this.root);

    this.initNavigation();
    this.switchScreen('screen-map');
  }

  private initNavigation() {
    const tabs = this.root.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetScreen = tab.getAttribute('data-screen') || 'screen-map';
        this.switchScreen(targetScreen);
      });
    });
  }

  private switchScreen(screenId: string) {
    sounds.playPop();

    // Update Tab UI
    const tabs = this.root.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-screen') === screenId) {
        tab.classList.add('tab-btn-active');
      } else {
        tab.classList.remove('tab-btn-active');
      }
    });

    // Update screen visibility
    const screens = this.root.querySelectorAll('.screen');
    screens.forEach(screen => {
      if (screen.id === screenId) {
        screen.classList.remove('screen-hidden');
        screen.classList.add('screen-active');
      } else {
        screen.classList.add('screen-hidden');
        screen.classList.remove('screen-active');
      }
    });

    // Zoom out map if leaving map
    if (screenId !== 'screen-map' && this.islandMap) {
      this.islandMap.resetZoom();
    }

    // Set Lumi's mood or speech bubble depending on screen
    if (this.companion) {
      if (screenId === 'screen-map') {
        this.companion.setMood('happy');
      } else if (screenId === 'screen-dashboard') {
        this.companion.setMood('encouraging');
        this.companion.speak("Check out our study progress here, Vera!");
      } else if (screenId === 'screen-stickers') {
        this.companion.setMood('happy');
        this.companion.speak("Wow! Look at all the stickers we've unlocked!");
      } else if (screenId === 'screen-chest') {
        this.companion.setMood('excited');
        this.companion.speak("Let's unlock today's treasure chest!");
      }
    }
  }

  private startQuest(questId: string) {
    const quest = QUESTS.find(q => q.id === questId);
    if (!quest || !this.companion) return;

    // Instantiates the Quest Overlay on the fly
    new QuestOverlay(this.root, quest, this.companion, () => {
      // Refresh state and return
      this.switchScreen('screen-map');
    });
  }

  private showCertificate() {
    new Certificate(this.root, () => {
      this.switchScreen('screen-dashboard');
    });
  }

  private showPaperPractice() {
    new PaperPractice(this.root, () => {
      this.switchScreen('screen-dashboard');
    });
  }
}

// Start application
window.addEventListener('DOMContentLoaded', () => {
  new AppController();
});
