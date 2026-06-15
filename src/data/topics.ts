export interface BaseQuest {
  id: string;
  subject: 'english' | 'math' | 'science';
  title: string;
  description: string;
  estimatedMinutes: number;
  xpReward: number;
  difficulty: 1 | 2 | 3;
  stickerId: string;
  stickerName: string;
  stickerEmoji: string;
  type: string;
  challenges: any[];
}

export const QUESTS: BaseQuest[] = [
  // ================= ENGLISH =================
  {
    id: 'eng_inference',
    subject: 'english',
    title: 'Inference Detective',
    description: 'Find the hidden clues in the story to unlock secrets!',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_magnifier',
    stickerName: 'Inference Investigator',
    stickerEmoji: '🕵️‍♀️',
    type: 'inference',
    challenges: [
      {
        question: "Find and highlight the sentence that suggests Lumi was feeling nervous about sailing.",
        story: [
          "The small wooden sailboat bobbed gently in the warm harbor waters.",
          "Vera checked the rigging and tightened the sail with a bright smile.",
          "Lumi stood on the bow deck, his tiny flippers trembling slightly as he stared out at the giant waves crash on the distant reef.",
          "He tucked his head into his leafy shell for a brief moment before taking a deep breath.",
          "The tropical breeze was warm, filling their sails as they glided past the protective barrier reef."
        ],
        // The indices of sentences in the story array (0-indexed) that are correct clues
        correctIndices: [2, 3],
        hint: "Watch Lumi's physical actions—trembling flippers and hiding in his shell are clear signs of his feelings!",
        explanation: "Lumi's trembling flippers and tucking his head into his shell show that he is feeling nervous or apprehensive about the open sea."
      },
      {
        question: "Highlight the sentences showing that the beach was once inhabited by island builders.",
        story: [
          "They pulled the boat onto the sparkling white sand of English Cove.",
          "Vera pointed at a series of massive stone arches covered in tropical vines.",
          "The stones were perfectly carved and joined together without mortar, showing ancient engineering.",
          "A small blue crab scuttled past her boot, searching for shells.",
          "Cracked terracotta pottery shards lay buried in the sand, etched with patterns of waves and stars."
        ],
        correctIndices: [2, 4],
        hint: "Look for things that were created by hands: carved arches and etched pottery shards!",
        explanation: "Carved stone arches without mortar and pottery shards with wave and star patterns show that skilled builders lived here in the past."
      }
    ]
  },
  {
    id: 'eng_sentence',
    subject: 'english',
    title: 'Sentence Builder',
    description: 'Assemble floating words to build the perfect sailing vessel!',
    estimatedMinutes: 5,
    xpReward: 50,
    difficulty: 1,
    stickerId: 'sticker_anchor',
    stickerName: 'Syntax Captain',
    stickerEmoji: '⚓',
    type: 'sentence-builder',
    challenges: [
      {
        question: "Drag and arrange the clauses to form a grammatically correct complex sentence:",
        chunks: [
          "Vera steered the sailboat,",
          "while Lumi checked the map",
          "to find the secret cove."
        ],
        correctOrder: [0, 1, 2], // Order is 0 -> 1 -> 2
        hint: "Start with the main action (who did what), then add the coordinating clause showing what the companion did.",
        explanation: "'Vera steered the sailboat' is the main independent clause, followed by 'while Lumi checked the map' as a dependent adverbial clause, and 'to find the secret cove' as an infinitive phrase of purpose."
      },
      {
        question: "Arrange these fragments to show contrast using an adverbial clause:",
        chunks: [
          "Although the volcano was rumbling,",
          "the brave explorers climbed higher,",
          "hoping to find the golden crystal."
        ],
        correctOrder: [0, 1, 2],
        hint: "Conjunctions like 'Although' start a subordinate clause, which should be followed by a comma before the main clause.",
        explanation: "Starting with 'Although the volcano was rumbling' establishes the obstacle, followed by the main clause showing their action, and the participle phrase explaining their goal."
      }
    ]
  },
  {
    id: 'eng_figurative',
    subject: 'english',
    title: 'Figurative Island Match',
    description: 'Connect beautiful similes and metaphors to unlock the ancient chest!',
    estimatedMinutes: 7,
    xpReward: 70,
    difficulty: 2,
    stickerId: 'sticker_book',
    stickerName: 'Word Sorcerer',
    stickerEmoji: '📖',
    type: 'figurative',
    challenges: [
      {
        question: "Match each tropical phrase to its correct figurative language type:",
        pairs: [
          { phrase: "The jungle canopy was a green velvet blanket.", type: "Metaphor" },
          { phrase: "The coconut shell cracked like a gunshot.", type: "Simile" },
          { phrase: "The wind whispered secrets through the palm leaves.", type: "Personification" },
          { phrase: "I have walked a million miles on this hot sand.", type: "Hyperbole" }
        ],
        hint: "A 'Simile' uses 'like' or 'as'; a 'Metaphor' states something IS something else; 'Personification' gives human actions to objects; 'Hyperbole' is extreme exaggeration.",
        explanation: "1) 'Canopy was a blanket' directly equates the two (Metaphor). 2) 'Cracked like a gunshot' uses 'like' (Simile). 3) 'Wind whispered secrets' gives a human throat to wind (Personification). 4) 'Walked a million miles' is an exaggeration (Hyperbole)."
      }
    ]
  },

  // ================= MATH =================
  {
    id: 'math_pizza',
    subject: 'math',
    title: 'Fraction Pizza Party',
    description: 'Feed the hungry sea gulls by preparing pizzas with exact fractional toppings!',
    estimatedMinutes: 8,
    xpReward: 80,
    difficulty: 2,
    stickerId: 'sticker_pizza',
    stickerName: 'Fraction Chef',
    stickerEmoji: '🍕',
    type: 'fraction-pizza',
    challenges: [
      {
        slices: 8,
        instructions: "Cut the pizza into 8 slices. Put cheese on the whole pizza (8/8), pepperoni on exactly 1/2 of it, and mushrooms on 1/4 of it.",
        requirements: [
          { topping: 'cheese', fraction: '8/8', targetCount: 8 },
          { topping: 'pepperoni', fraction: '1/2', targetCount: 4 },
          { topping: 'mushroom', fraction: '1/4', targetCount: 2 }
        ],
        hint: "If a pizza has 8 slices, half of the slices is 4. One quarter of 8 slices is 2. Drop the toppings onto those slices!",
        explanation: "A whole pizza of 8 slices means all 8 slices have cheese. 1/2 of 8 is 4 slices of pepperoni. 1/4 of 8 is 2 slices of mushroom."
      },
      {
        slices: 4,
        instructions: "Cut the pizza into 4 slices. Add pineapple to 3/4 of the pizza, and ham to 1/2 of the pizza.",
        requirements: [
          { topping: 'pineapple', fraction: '3/4', targetCount: 3 },
          { topping: 'ham', fraction: '1/2', targetCount: 2 }
        ],
        hint: "For 4 slices, 3/4 means 3 slices get pineapple. 1/2 of 4 slices means 2 slices get ham.",
        explanation: "3/4 of 4 slices = 3 slices with pineapple. 1/2 of 4 slices = 2 slices with ham."
      }
    ]
  },
  {
    id: 'math_gem_sort',
    subject: 'math',
    title: 'Geometry Gem Sort',
    description: 'Sort the glowing crystals by their mathematical properties.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_gem',
    stickerName: 'Geometry Gemologist',
    stickerEmoji: '💎',
    type: 'gem-sort',
    challenges: [
      {
        instructions: "Sort each mathematical shape gem into the correct treasure chest based on its properties:",
        bins: [
          { id: 'bin_parallel', name: 'Parallel Lines', description: 'Has at least one pair of parallel sides' },
          { id: 'bin_right', name: 'Right Angles', description: 'Has at least one right angle (90°)' },
          { id: 'bin_regular', name: 'Regular Polygons', description: 'All sides and angles are equal' }
        ],
        items: [
          { name: "Square", emoji: "🟩", binId: "bin_regular", propertyText: "4 equal sides & 4 equal angles" },
          { name: "Right Triangle", emoji: "📐", binId: "bin_right", propertyText: "Has a 90-degree corner" },
          { name: "Trapezoid", emoji: "⏢", binId: "bin_parallel", propertyText: "Has one pair of parallel horizontal lines" },
          { name: "Regular Hexagon", emoji: "⬡", binId: "bin_regular", propertyText: "6 equal sides and 6 equal angles" },
          { name: "Rectangle", emoji: "█", binId: "bin_right", propertyText: "Has 4 right angles" }
        ],
        hint: "A square can fit in both, but it matches the strict definition of 'Regular Polygon'. Look at the angle notches and side lines!",
        explanation: "Square and Hexagon are regular polygons. Right Triangle and Rectangle have right angles. Trapezoid has one set of parallel sides."
      }
    ]
  },
  {
    id: 'math_measurement',
    subject: 'math',
    title: 'Measurement Scale',
    description: 'Help Lumi balance the tropical items by reading scales and converting units.',
    estimatedMinutes: 7,
    xpReward: 70,
    difficulty: 3,
    stickerId: 'sticker_scale',
    stickerName: 'Scale Balance Master',
    stickerEmoji: '⚖️',
    type: 'measurement',
    challenges: [
      {
        question: "Fill the coconut flask with exactly 0.6 Liters of freshwater.",
        type: "beaker",
        startValue: 100,
        min: 0,
        max: 1000,
        step: 50,
        targetValue: 600,
        targetUnit: "ml",
        instructions: "Drag the slider to fill the flask. 1 Liter = 1000 ml. How many milliliters (ml) is 0.6 Liters?",
        hint: "To convert Liters to ml, multiply by 1000. So 0.6 * 1000 = ...?",
        explanation: "0.6 Liters equals 600 milliliters. By sliding the water level to 600ml, you have filled it to exactly 0.6L."
      },
      {
        question: "Balance the scale with coconuts. The left side weighs 1.5 kilograms. Add weights in grams to balance it.",
        type: "scale",
        startValue: 500,
        min: 0,
        max: 2000,
        step: 100,
        targetValue: 1500,
        targetUnit: "g",
        instructions: "Adjust the weight scale slider. 1 kilogram (kg) = 1000 grams (g). How many grams is 1.5 kg?",
        hint: "1 kg is 1000g, and 0.5 kg is 500g. Add them together to find the target in grams!",
        explanation: "1.5 kilograms = 1.5 * 1000 = 1500 grams. Aligning the dial to 1500g balances the scale."
      }
    ]
  },

  // ================= SCIENCE =================
  {
    id: 'sci_circuit',
    subject: 'science',
    title: 'Circuit Light Up',
    description: 'Connect the glowing wires to turn on the beacon and guide ships safely.',
    estimatedMinutes: 9,
    xpReward: 90,
    difficulty: 3,
    stickerId: 'sticker_bulb',
    stickerName: 'Circuit Sorcerer',
    stickerEmoji: '💡',
    type: 'circuit',
    challenges: [
      {
        instructions: "Connect the electric circuit! Drag components (Battery, Bulb, Switch, Wires) to their slots, and make sure the switch is closed (ON).",
        slots: [
          { id: 0, expected: 'battery', name: 'Power Source (Battery)' },
          { id: 1, expected: 'wire', name: 'Conductor (Wire)' },
          { id: 2, expected: 'bulb', name: 'Electrical Load (Bulb)' },
          { id: 3, expected: 'switch', name: 'Control (Switch)' }
        ],
        availableComponents: [
          { type: 'battery', name: '🔋 Battery', desc: 'Provides electricity' },
          { type: 'wire', name: '🔌 Wire', desc: 'Allows current to flow' },
          { type: 'bulb', name: '💡 Lightbulb', desc: 'Converts electricity to light' },
          { type: 'switch', name: '🎛️ Switch', desc: 'Opens or closes the loop' }
        ],
        switchOn: false,
        hint: "A working circuit needs a Power Source (Battery) to push energy, a Conductor (Wire) to carry it, a Load (Bulb) to use it, and a Switch (Control) in the closed position to complete the loop.",
        explanation: "An electric circuit requires a continuous path (wires) from a battery through a lightbulb and back to the battery, controlled by a switch."
      }
    ]
  },
  {
    id: 'sci_shadow',
    subject: 'science',
    title: 'Shadow Lab',
    description: 'Move the light source to stretch and shrink shadows, revealing how light travels.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_shadow',
    stickerName: 'Shadow Weaver',
    stickerEmoji: '👤',
    type: 'shadow-lab',
    challenges: [
      {
        instructions: "Slide the sun height to make the palm tree's shadow exactly 8 meters long.",
        treeHeight: 10,
        minAngle: 15,
        maxAngle: 75,
        targetLength: 8,
        hint: "To make a shadow SHORTER, the light source (sun) must be HIGHER (closer to 90 degrees/overhead). To make it LONGER, the light must be LOWER (near the horizon). Check how the length changes!",
        explanation: "Light travels in straight lines. When the light source is low (small angle), the shadow is long. As the light source goes high, the shadow shrinks. At a specific angle, the 10m tree casts an 8m shadow."
      }
    ]
  },
  {
    id: 'sci_materials',
    subject: 'science',
    title: 'Material Lab Sorter',
    description: 'Classify island materials by their solubility and conductivity.',
    estimatedMinutes: 7,
    xpReward: 70,
    difficulty: 2,
    stickerId: 'sticker_flask',
    stickerName: 'Material Alchemist',
    stickerEmoji: '🧪',
    type: 'material-sorter',
    challenges: [
      {
        instructions: "Sort these items into the beaker water: Soluble (dissolves in water) or Insoluble (does not dissolve).",
        mode: 'solubility',
        bins: [
          { id: 'soluble', name: 'Soluble (Dissolves)', desc: 'Stirring makes it blend completely' },
          { id: 'insoluble', name: 'Insoluble (Floats/Sinks)', desc: 'Stays visible even after stirring' }
        ],
        items: [
          { name: "Salt Crystals", emoji: "🧂", binId: "soluble", description: "Dissolves to form brine" },
          { name: "Sea Sand", emoji: "⏳", binId: "insoluble", description: "Settles at the bottom" },
          { name: "Granulated Sugar", emoji: "🍬", binId: "soluble", description: "Dissolves in tea or water" },
          { name: "Wooden Shavings", emoji: "🪵", binId: "insoluble", description: "Floats on top of water" },
          { name: "Iron Nails", emoji: "🔩", binId: "insoluble", description: "Sinks and remains solid" }
        ],
        hint: "Think about cooking: what happens when you stir salt and sugar into water? They disappear! What happens to sand or wood? They remain visible.",
        explanation: "Salt and sugar are soluble in water because they dissolve to form clear solutions. Sand, wood shavings, and iron nails are insoluble."
      },
      {
        instructions: "Test the electrical conductivity of these items. Sort them into Electrical Conductors or Electrical Insulators.",
        mode: 'conductivity',
        bins: [
          { id: 'conductor', name: 'Electrical Conductors', desc: 'Allows electricity to flow' },
          { id: 'insulator', name: 'Electrical Insulators', desc: 'Blocks electricity' }
        ],
        items: [
          { name: "Copper Coin", emoji: "🪙", binId: "conductor", description: "Metals let electric current pass easily" },
          { name: "Rubber Band", emoji: "🛞", binId: "insulator", description: "Blocks electricity completely" },
          { name: "Wooden stick", emoji: "🪵", binId: "insulator", description: "Dry wood does not conduct" },
          { name: "Steel Key", emoji: "🔑", binId: "conductor", description: "Steel conducts electric charge" },
          { name: "Plastic Spoon", emoji: "🥄", binId: "insulator", description: "Plastics do not conduct electricity" }
        ],
        hint: "Metals (like copper and steel) are excellent conductors. Materials like wood, rubber, and plastic block electrical current.",
        explanation: "Metals are electrical conductors because they contain free charges that flow easily. Plastics, rubber, and wood are insulators."
      }
    ]
  }
];
