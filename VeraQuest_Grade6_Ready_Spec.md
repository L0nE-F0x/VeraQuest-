# VeraQuest — Grade 6 Ready  
**Vibe-Coded App Specification (Enhanced Delight Version)**

**Version:** 1.1  
**Date:** 15 June 2026  
**Created by:** Vibe Spec Creator for Vera’s 7-day holiday entrance test prep  
**Intended For:** Claude Code / Cursor / Gemini (or your preferred coding AI)

---

## 🚀 Handoff Prompt for Coding AI (Copy This Block)

```
You are an expert frontend engineer who specializes in creating delightful, high-engagement interactive experiences and lightweight educational games for children aged 9–12. You excel at "vibe coding" — building polished, joyful apps quickly while keeping code clean, modular, and maintainable.

Implement the application exactly according to the full specification below. 

Build it as a modern, modular frontend project (Vite + TypeScript + Tailwind recommended) that feels like a charming tropical adventure game meets supportive study companion. Prioritize buttery-smooth micro-interactions, meaningful progression, visual delight, and emotional warmth. Make Vera feel like the hero of her own little story.

Focus on a working, fun core loop first, then layer on polish. Use Framer Motion (or equivalent smooth animations) for key moments. Everything must work beautifully on a phone.

Here is the complete specification:
```

*(Copy the block above + the full spec below when sending to your coding AI. This version is designed for a richer, more engaging experience than a basic single-file quiz app.)*

---

## 1. Vision & Concept

### Project Name
**VeraQuest — Grade 6 Ready**

### One-Liner
A joyful tropical island adventure where Vera explores, completes fun quests, collects stickers and badges, and levels up her skills in English, Math, and Science — turning holiday test prep into something she actually wants to play every day.

### Full Vision Statement
VeraQuest transforms the pressure of an entrance retake into a delightful 7-day island adventure. Vera becomes an explorer who sails to different locations on a beautiful tropical island (English Cove, Math Peaks, Science Lagoon). Each location has quests that feel like mini-games and creative challenges rather than dry tests. 

A cute companion character travels with her, reacts to her progress, and offers encouragement. Every completed activity gives real visual rewards (stickers, badges, map unlocks, companion reactions). The experience respects that she’s on holiday — short sessions, beautiful visuals, satisfying progression, and zero shame on mistakes. By the end of the week she has a full sticker book, a leveled-up companion, an explorer rank, and genuine confidence heading into the retake.

### Target Audience
Primary: Vera (≈10–11 years old). She should feel excited to open the app, not dutiful.  
Secondary: Parents who can glance at the dashboard and see clear, encouraging progress.

### Core Emotional Vibe / Aesthetic Direction
**Tropical island adventure + warm supportive companion.**  
Color palette: Sunny coral, ocean teal, leafy green, golden yellow, soft sand/cream, sky blue accents.  
Visual language: Clean modern illustrations mixed with playful tropical elements (palm leaves, gentle waves, little huts, seashells). Think "Studio Ghibli meets modern edtech" — warm, slightly whimsical, high quality.  
Tone: Encouraging big-sister energy mixed with game-like excitement. "You did it!" celebrations feel earned and delightful. Mistakes are framed as "interesting tries" with helpful nudges.

---

## 2. Core Experience & User Loops

### Primary User Journey (First 60–90 seconds)
1. Opens app → Beautiful animated welcome screen with island silhouette + "Hi Vera! Ready for today’s adventure?" + cute companion peeking in.
2. Companion greets her and shows today’s suggested quests.
3. Main screen is an **interactive island map**. Tapping locations (English Cove, Math Peaks, Science Lagoon) takes her there.
4. In a location she sees available quests (topics). Some look like small games (sorting, building, matching).
5. Completes a quest → Big satisfying reward animation → stickers/badges pop in → companion reacts happily → map progress updates (maybe a path lights up or a new area unlocks).
6. She can check her Sticker Book or see how her companion has grown.

### Core Game/Interaction Loop (The "Fun Engine")
**Explore Map → Choose Quest → Play Delightful Activity → Earn Rewards + Companion Reaction → See World Change**  
Quests are short (5–12 min) but feel like real mini-games with varied mechanics (not just multiple choice).  
Progress is highly visual: map changes, companion levels up visually, sticker book fills, daily chest rewards.  
Streak + daily login rewards create gentle habit without pressure.

### Key User Stories (MVP)
- As Vera, I want the main screen to feel like a game world I can explore so studying feels like playing.
- As Vera, I want my little companion to react when I do well (or gently encourage me) so I don’t feel alone.
- As Vera, I want beautiful stickers and badges I can collect and look at later.
- As a parent, I want to instantly see that she’s making visible progress and having fun.

### Success Metrics for v1
- The interactive island map + companion + at least 3 varied quest types per subject feel genuinely fun and game-like.
- Full reward loop (activity complete → animation → sticker/badge → companion reaction → map update) works smoothly.
- She can complete 2–3 quests in 20–30 minutes and feel good about it.
- Everything is mobile-optimized and delightful on a phone.

---

## 3. Feature Breakdown

### MVP Features (Must Have)

| Priority | Feature                        | Description                                                                 | Acceptance Criteria |
|----------|--------------------------------|-----------------------------------------------------------------------------|---------------------|
| P0       | Interactive Island Map         | Beautiful clickable tropical island map. Locations = subjects. Visual progress (paths, unlocked areas, little flags) | Smooth interactions, clear visual feedback when locations "level up" |
| P0       | Companion Character (Lumi)     | Cute animated companion (bird/turtle hybrid) that lives on screen, reacts to performance, gives tips, and visually levels up | At least 4–5 emotional states + growth stages. Reacts on quest complete |
| P0       | Varied Quest Activities        | 3–4 topics per subject with **different mechanics** (quiz + drag/drop puzzle + creative builder + simple simulation) | Not repetitive. At least one non-quiz activity per subject |
| P0       | Sticker Book & Badge Collection| Beautiful visual album. Stickers unlock on quest completion/mastery. Badges for bigger milestones | Nice grid + modal detail view. Feels collectible and satisfying |
| P0       | Daily Reward Chest + Streaks   | Login reward chest with nice opening animation + streak calendar with tropical visuals | Chest opens with particles/confetti. Streak feels rewarding |
| P0       | Progress & Explorer Rank       | Overall "Explorer Level", subject mastery %, trajectory to Good band        | Clear, encouraging, visual (rings, stars, map completion %) |
| P1       | 7-Day Gentle Plan              | Suggested daily mix shown nicely, but flexible. "You can do quests in any order" | Integrated into map or a nice "Today’s Adventures" panel |
| P1       | Strengths & Gentle Focus Areas | Positive insights ("You’re becoming a real Inference Explorer!")            | Never shaming. Always growth-oriented language |

### Phase 2 / High-Delight Additions (Strongly Recommended)
- More quest variety (sentence builder story creator, shadow length experiment simulator, fraction pizza party, circuit builder with nice visuals)
- Companion "talks" with short encouraging messages that feel personal
- End-of-week beautiful animated certificate + "share as image" button
- Optional short voice note / text reflection after hard quests ("What felt tricky today?")
- Subtle background sounds or satisfying click/ success sounds (toggleable)

### Future / Stretch
- More locations / secret quests
- Simple photo mode (take "photos" of completed quests for her holiday journal)
- Parent dashboard view (read-only nice summary)
- Offline PWA with install prompt + nice splash

---

## 4. Technical Architecture & Stack

### Recommended Stack (Upgraded for Delight & Maintainability)
**Vite + TypeScript + Tailwind CSS + Framer Motion (or Motion One) + Canvas Confetti**

**Why this stack?**
- Still very "vibe codable" and fast to build with Claude.
- Proper modular file structure (`src/components/`, `src/data/`, `src/game/`, `src/styles/`) so the code stays clean as features grow.
- Excellent mobile performance and smooth 60fps animations (critical for feeling premium and fun).
- Framer Motion makes beautiful entrance/exit animations, companion reactions, and reward celebrations trivial and high quality.
- Easy Netlify deploy (`vite build` + drag `dist/` folder or use Netlify CLI).
- TypeScript helps keep the growing state/logic (map progress, companion mood, sticker collection, quest history) manageable and bug-free.

**Alternative if you want even lighter:** Pure vanilla TypeScript + Tailwind with good module separation. Still excellent, just fewer animation superpowers.

### High-Level Project Structure
```
veraquest/
├── index.html
├── src/
│   ├── main.ts
│   ├── components/
│   │   ├── IslandMap.ts
│   │   ├── Companion.ts          # Handles Lumi's states, animations, dialogue
│   │   ├── QuestCard.ts
│   │   ├── ActivityRenderer.ts   # Switches between different quest mechanics
│   │   ├── StickerBook.ts
│   │   ├── RewardChest.ts
│   │   └── Certificate.ts
│   ├── data/
│   │   ├── topics.ts             # All quest definitions + questions
│   │   └── progress.ts           # Types for state
│   ├── game/
│   │   ├── state.ts              # Central app state + localStorage sync
│   │   ├── companionLogic.ts
│   │   └── mapProgress.ts
│   ├── styles/
│   │   └── globals.css
│   └── utils/
├── public/                       # Static assets (SVGs, generated illustrations)
└── package.json
```

### State Management
Central reactive store (simple class or lightweight signals / Zustand if using React).  
Persist everything important to localStorage: 
- Quest completion & best scores per topic
- Unlocked stickers & badges
- Companion level & mood history
- Streak data + last login date
- Overall explorer XP / level

### Data Models (Key Shapes)
```ts
interface Quest {
  id: string;
  subject: 'english' | 'math' | 'science';
  title: string;
  type: 'quiz' | 'dragdrop' | 'builder' | 'simulator' | 'matching';
  difficulty: number;
  estimatedMinutes: number;
  // ... questions or activity config
}

interface CompanionState {
  level: number;
  currentMood: 'happy' | 'excited' | 'thinking' | 'encouraging' | 'proud';
  // visual stage / accessories unlocked
}

interface PlayerProgress {
  explorerLevel: number;
  xp: number;
  stickers: string[];
  badges: string[];
  subjectMastery: Record<string, number>; // 0-100
  streak: number;
  lastStudyDate: string;
  mapUnlocks: string[]; // which map areas are fully explored
}
```

---

## 5. User Interface & Interaction Design

### Overall Layout & Screens
- **Welcome / Splash** — Atmospheric island scene with gentle animation + companion.
- **Main Hub: The Island Map** — This is the heart of the app. Large, beautiful, touch-friendly interactive map. Tapping a location zooms/focuses and shows available quests for that subject. Visual progress (completed quests light up paths, unlock little decorations, raise flags).
- **Quest / Activity View** — Opens as a beautiful modal or dedicated screen with clear header, companion peeking in corner (or small persistent companion bar), activity area, and progress.
- **Sticker Book** — Full-screen beautiful grid + modal for enlarged sticker + "how I earned this".
- **Companion Panel** (slide-up or dedicated tab) — See her current level, mood, fun facts, and encouragement.
- **Rewards & Profile** — Daily chest, streak calendar, Explorer Rank, overall stats.

### Visual Design Language (Elevated)
- **Colors**: Coral (#FB7185), Teal (#14B8A6), Golden Sun (#FACC15), Leaf Green (#4ADE80), Sky (#7DD3FC), Warm Sand backgrounds.
- **Typography**: Friendly rounded sans-serif. Generous sizing on mobile.
- **Illustrations**: Recommend generating custom assets with Grok Imagine (companion Lumi in different emotions, island map pieces, sticker designs, badge icons). Fall back to high-quality emoji + inline SVGs + CSS for v1 if needed.
- **Animations**: Heavy use of Framer Motion (or equivalent) for:
  - Map location entrances
  - Reward explosions / sticker fly-ins
  - Companion reactions (bounce, spin, color shift, speech bubble pop)
  - Quest complete screen (very satisfying)
  - Chest opening sequence

### Companion Character ("Lumi")
Name idea: **Lumi** (short, friendly, tropical feel — or let Vera rename her).  
A small, cute, expressive creature (bird with shell elements or friendly gecko/parrot hybrid).  
States: Happy, Excited (big eyes + wing flap), Thinking (head tilt), Gentle encouragement (soft smile + speech bubble), Proud (sparkles).  
She "grows" visually across levels (small accessories, brighter colors, slightly bigger).  
She can give contextual tips during quests ("Try looking for the clue in the second paragraph!") and celebrate big wins.

### Quest Activity Variety (Critical for Enjoyment)
Do **not** make everything multiple-choice quizzes. Examples of fun mechanics:

**English**
- Inference Detective → Short story + "What is she really feeling?" with evidence highlighter
- Sentence Builder → Drag words/phrases to create the best complex sentence (scored on grammar + style)
- Figurative Language Match → Match metaphors/similes to their meanings or story moments

**Math**
- Fraction Pizza Party → Drag toppings to show fractions, then combine pizzas
- Geometry Gem Sort → Classify shapes by angles/sides with nice visual feedback
- Measurement Challenge → Visual ruler/protractor interactions or unit conversion puzzles

**Science**
- Circuit Builder → Drag-and-drop components to complete a working (visual) circuit. Bulb actually "lights up"
- Shadow Lab → Slider or drag to change light angle/distance and predict/see shadow length
- Material Sorter → Multi-bin drag & drop (soluble/insoluble, reversible/irreversible, conductor/insulator) with nice particle effects

Each activity ends with clear success criteria, beautiful feedback, and a "What did you learn?" micro moment.

---

## 6. Implementation Roadmap

### Phase 1: Core Fun Loop (Strong Foundation)
- Vite project setup + Tailwind + Framer Motion
- Island Map component (interactive SVG or beautiful CSS + JS grid that feels premium)
- Companion system (state + visual reactions + basic speech bubbles)
- 2–3 fully working varied quest types per subject (mix of quiz + one creative/drag activity)
- Sticker unlock + basic Sticker Book view
- Daily chest + streak logic
- Full localStorage persistence + nice onboarding (name personalization + companion intro)

### Phase 2: Delight & Polish
- More quest variety + richer activity mechanics
- Map visual progression (paths lighting up, decorations appearing)
- Companion growth stages + more emotional reactions
- Beautiful reward animations and celebration screens
- Strengths/Focus Areas written in warm explorer language
- 7-day plan nicely integrated (perhaps as "Captain’s Log" suggestions)
- Printable/shareable end-of-week certificate with canvas export

### Phase 3: Extra Magic
- Sound design (satisfying clicks, gentle success chimes — toggleable)
- Subtle ambient background (soft waves or ukulele loop — very low volume, toggleable)
- PWA install prompt + offline support
- Optional parent summary view

---

## 7. Non-Functional Requirements
- **Performance**: 60fps animations on mid-range phones. Fast quest loading.
- **Mobile-first**: Thumb-friendly everywhere. Tested primarily on 375–414px widths.
- **Delight Budget**: Every major action should have satisfying visual/audio (or visual-only) feedback.
- **Data Safety**: All progress in localStorage. Clear "Reset Progress" in settings with confirmation.
- **Extensibility**: Clean data files so adding new quests/topics later is easy (just edit the topics.ts file).
- **Accessibility**: Still important — large targets, good contrast, ARIA where helpful, screen-reader friendly labels.

---

## 8. Assets, Media & Content Strategy
- **Core Content**: All quest text, questions, explanations, and activity configs live in `src/data/topics.ts` (easy for non-coders to edit later).
- **Illustrations & Stickers**: Strongly recommend generating custom cute assets with Grok Imagine (Lumi in different moods, island map elements, 12–20 unique sticker designs, badge icons). This will make the biggest difference in "she actually enjoys using it".
- **Fallback**: High-quality emoji + inline SVGs + Tailwind for rapid v1 if custom art isn’t ready yet.
- **English Topics**: Still grounded in the Cambridge Primary Stage 5 framework you received (inference, figurative language, complex sentences, punctuation, main ideas, etc.).
- **Math & Science**: High-impact, visual, hands-on topics that lend themselves to interactive mechanics.

---

## 9. Edge Cases & Mitigations
- **Short attention / holiday mood**: Very clear "This quest takes about 8 minutes" + easy exit anytime + big celebration even on partial completion.
- **Frustration on hard questions**: Every activity has hints or "show me why" that feel helpful, not punishing. Companion offers gentle support.
- **Device sharing (mom’s phone)**: Simple, no login required. Progress tied to device (or add optional simple passcode later).
- **Variable internet**: Fully functional offline after first load. PWA recommended.

---

## 10. Definition of Done for v1
The app feels like a small, charming game Vera will want to open every day when:
- The interactive island map + Lumi companion are delightful and responsive.
- At least 9–12 varied, high-quality quests exist (mix of mechanics across 3 subjects).
- Full reward loop (quest complete → animation → sticker/badge → companion reaction → map update) works beautifully.
- Daily chest, streak, and Sticker Book feel satisfying to interact with.
- She can make visible progress in 20–40 minute sessions without feeling overwhelmed.
- Everything is smooth, warm, and encouraging on a phone screen.

---

## 11. Open Questions & Decisions
- Preferred name for the companion? (Lumi / Kiki / something else — or let Vera choose in-app?)
- Any specific interests Vera has (animals, drawing, certain games) we can lean into for themes or sticker designs?
- Comfort level with adding very light sound design?
- Do you want to prioritize maximum visual polish (custom illustrations) even if it means slightly longer Phase 1, or ship a strong functional version first with emoji/SVG and upgrade art later?

---

**End of Specification**

This upgraded version is intentionally more ambitious in delight and game-like qualities because you specifically asked for something Vera will *actually enjoy* using during her holiday — not just tolerate.

The modular Vite + TypeScript structure keeps it maintainable while unlocking much richer interactions, smoother animations, and a real sense of world progression that a single-file app struggles to deliver.

When you're ready, copy the handoff prompt + full spec and give it to Claude. It should produce something special.

Would you like me to adjust anything else (companion name ideas, specific quest mechanics, more emphasis on certain subjects, etc.) before you hand it off? I'm happy to iterate on this spec quickly. 🌴✨

---

**File location:** `/home/workdir/artifacts/VeraQuest_Grade6_Ready_Spec.md` (updated v1.1)