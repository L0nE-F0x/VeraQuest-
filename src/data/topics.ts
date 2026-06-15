/**
 * VeraQuest — Grade 6 Ready
 * Content aligned to the Cambridge Primary curriculum, STAGE 5 — the level assessed
 * by the Cambridge Primary Progression Test Stage 5 used for the Grade 6 entrance test.
 *
 * Sources (official Cambridge International curriculum frameworks):
 *   • English 0058  — Stage 5 learning objectives, pp. 35–40 (the exact pages the school referenced)
 *   • Mathematics 0096 — Stage 5 learning objectives, pp. 27–29
 *   • Science 0097  — Stage 5 learning objectives, pp. 24–26
 *
 * Each quest is tagged with the Cambridge objective code(s) it practises, a short
 * `studyNote` that teaches the idea first, and questions written at Stage 5 standard.
 * A couple of Science quests are clearly labelled "Foundation review (Stage 4)" — they
 * rebuild assumed prior knowledge that Stage 5 builds on.
 */

export interface BaseQuest {
  id: string;
  subject: 'english' | 'math' | 'science';
  title: string;
  /** Academic topic label, e.g. "Place value & decimals". */
  topic: string;
  /** Cambridge Primary Stage 5 objective codes this quest practises. */
  objectiveCodes: string[];
  /** A short teaching recap shown to Vera before she answers. */
  studyNote: string;
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
  // ============================================================
  // ============== ENGLISH COVE — Cambridge Stage 5 ============
  // ============================================================
  {
    id: 'eng_vocab',
    subject: 'english',
    title: 'Word Explorer',
    topic: 'Vocabulary in context, root words & idioms',
    objectiveCodes: ['5Rv.01', '5Rv.02', '5Rv.03'],
    studyNote:
      "You can often work out a new word without a dictionary. Use the CONTEXT (the words and sentences around it) and look inside the word for a ROOT, PREFIX or SUFFIX you know — e.g. 'un-' means not, 'tele-' means far, '-able' means can be done. An IDIOM is a phrase that doesn't mean its literal words, e.g. 'a piece of cake' means 'very easy'.",
    description: 'Use clues inside and around words to unlock their meaning.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_compass',
    stickerName: 'Vocabulary Voyager',
    stickerEmoji: '🧭',
    type: 'quiz',
    challenges: [
      {
        question: "Read the sentence: \"The path was so OVERGROWN that we could barely push through the leaves.\" What does 'overgrown' most likely mean?",
        options: [
          'Covered with too many plants that have grown wild',
          'Very clean and tidy',
          'Made of stone',
          'Too short to walk on'
        ],
        correctIndex: 0,
        explanation: "'Over-' means too much, and 'grown' refers to plants growing. The context ('leaves', 'push through') confirms it means covered with plants that have grown wildly.",
        hint: "Break the word up: 'over' + 'grown'. What is growing too much?",
        code: '5Rv.01'
      },
      {
        question: "The prefix 'in-' in 'invisible' means the same as the prefix in which word?",
        options: ['impossible', 'replay', 'preview', 'mislead'],
        correctIndex: 0,
        explanation: "'in-' and 'im-' both mean 'not'. Invisible = not visible; impossible = not possible. ('im-' is used before m, b and p.)",
        hint: "'Invisible' means NOT visible. Which other prefix means 'not'?",
        code: '5Rv.01'
      },
      {
        question: "Someone says: \"Learning to ride a bike was a piece of cake.\" What do they mean?",
        options: ['It was very easy', 'They ate cake', 'It was delicious', 'It took many years'],
        correctIndex: 0,
        explanation: "'A piece of cake' is an idiom meaning something is very easy — it has nothing to do with real cake.",
        hint: "It's an idiom — the words don't mean exactly what they say.",
        code: '5Rv.02'
      },
      {
        question: "Which word is the best SYNONYM (a word with a similar meaning) for 'enormous'?",
        options: ['gigantic', 'tiny', 'gentle', 'noisy'],
        correctIndex: 0,
        explanation: "A synonym has a similar meaning. 'Enormous' means very large, so 'gigantic' is the closest synonym. 'Tiny' is an antonym (opposite).",
        hint: "Which word also means 'very big'?",
        code: '5Rv.03'
      },
      {
        question: "\"She felt UNEASY waiting for her results.\" Using the prefix 'un-', 'uneasy' means:",
        options: ['not relaxed; worried', 'very tired', 'extremely happy', 'unable to sit'],
        correctIndex: 0,
        explanation: "'un-' means 'not', so 'uneasy' means 'not easy in your mind' — worried or anxious. The context (waiting for results) supports this.",
        hint: "'un-' + 'easy'. If you are not at ease, how do you feel?",
        code: '5Rv.01'
      }
    ]
  },
  {
    id: 'eng_spelling',
    subject: 'english',
    title: 'Spelling Reef',
    topic: 'Prefixes, suffixes & homophones',
    objectiveCodes: ['5Ww.04', '5Ww.06', '6Ww.04'],
    studyNote:
      "PREFIXES go at the front (un-, dis-, re-, pre-) and SUFFIXES at the end (-ful, -less, -ment, -ness). To make an opposite, add un- or im- (happy→unhappy, possible→impossible). HOMOPHONES sound the same but are spelled differently and mean different things — there/their/they're, to/too/two, past/passed. Choose the spelling that fits the meaning.",
    description: 'Build words with prefixes and suffixes, and pick the right homophone.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_quill',
    stickerName: 'Spelling Captain',
    stickerEmoji: '🪶',
    type: 'quiz',
    challenges: [
      {
        question: "Choose the correct sentence:",
        options: [
          "They left their books over there because they're going home.",
          "They left there books over their because their going home.",
          "They left they're books over there because their going home.",
          "They left their books over they're because there going home."
        ],
        correctIndex: 0,
        explanation: "'their' = belonging to them (their books); 'there' = a place (over there); 'they're' = they are (they're going).",
        hint: "their = belonging to them · there = a place · they're = they are.",
        code: '6Ww.04'
      },
      {
        question: "What is the OPPOSITE of 'possible', made by adding a prefix?",
        options: ['impossible', 'unpossible', 'dispossible', 'repossible'],
        correctIndex: 0,
        explanation: "Before words starting with 'p', we use 'im-' to mean 'not'. So possible → impossible.",
        hint: "Use a prefix meaning 'not'. Before 'p' we use im-, not un-.",
        code: '5Ww.04'
      },
      {
        question: "Add the suffix '-ful' to 'beauty'. The correct spelling is:",
        options: ['beautiful', 'beautyful', 'beautifull', 'beutiful'],
        correctIndex: 0,
        explanation: "When a word ends in a consonant + 'y', the 'y' changes to 'i' before most suffixes: beauty → beautiful. Note '-ful' has only one 'l'.",
        hint: "The 'y' in 'beauty' changes to 'i', and '-ful' ends in a single 'l'.",
        code: '5Ww.04'
      },
      {
        question: "Choose the correct word: \"Yesterday we ___ the old lighthouse on our walk.\"",
        options: ['passed', 'past', 'paste', 'passt'],
        correctIndex: 0,
        explanation: "'passed' is the past tense of the verb 'to pass' (we passed it). 'past' is used for time or position (in the past / walked past).",
        hint: "You need the action word (verb) for something that happened. Verb = passed.",
        code: '6Ww.04'
      }
    ]
  },
  {
    id: 'eng_grammar',
    subject: 'english',
    title: 'Grammar Reef',
    topic: 'Clauses, nouns, pronouns & modal verbs',
    objectiveCodes: ['5Rg.02', '5Rg.03', '5Rg.04', '5Rg.05', '5Wg.06'],
    studyNote:
      "A CLAUSE is a part of a sentence with its own verb. A MAIN clause makes sense on its own; a SUBORDINATE clause does not (it starts with words like because, although, when, while). QUANTIFIERS: use 'fewer' for things you can count (fewer apples) and 'less' for things you can't (less water). POSSESSIVE PRONOUNS (mine, yours, hers, theirs) avoid repeating a noun. MODAL VERBS (can, could, may, might, should, must, would) show how possible or certain something is.",
    description: 'Master clauses, the right quantifiers, pronouns and modal verbs.',
    estimatedMinutes: 7,
    xpReward: 70,
    difficulty: 2,
    stickerId: 'sticker_scroll',
    stickerName: 'Grammar Navigator',
    stickerEmoji: '📜',
    type: 'quiz',
    challenges: [
      {
        question: "In the sentence \"Although it was raining, we explored the cove,\" which part is the SUBORDINATE clause?",
        options: [
          'Although it was raining',
          'we explored the cove',
          'the cove',
          'it was raining we explored'
        ],
        correctIndex: 0,
        explanation: "'Although it was raining' cannot stand alone as a sentence — it depends on the main clause 'we explored the cove'. Words like 'although' begin subordinate clauses.",
        hint: "Which part does NOT make sense on its own?",
        code: '5Rg.02'
      },
      {
        question: "Choose the correct sentence:",
        options: [
          'There were fewer boats in the harbour and less wind today.',
          'There were less boats in the harbour and fewer wind today.',
          'There were fewer boats in the harbour and fewer wind today.',
          'There were less boats in the harbour and less wind today.'
        ],
        correctIndex: 0,
        explanation: "Use 'fewer' for things you can count (boats) and 'less' for things you can't count (wind).",
        hint: "Count them or not? Boats can be counted; wind cannot.",
        code: '5Rg.03'
      },
      {
        question: "Replace the underlined words: \"This bag is ___.\" (the bag belongs to me). Which possessive pronoun fits?",
        options: ['mine', 'my', 'me', "mine's"],
        correctIndex: 0,
        explanation: "'mine' is a possessive pronoun used on its own (This bag is mine). 'my' must be followed by a noun (my bag).",
        hint: "We say 'my bag' but 'the bag is ___'. Which word stands alone?",
        code: '5Wg.06'
      },
      {
        question: "Which sentence uses a modal verb to show something is ONLY POSSIBLE (not certain)?",
        options: [
          'It might rain later.',
          'It is raining now.',
          'It rained yesterday.',
          'It rains every winter.'
        ],
        correctIndex: 0,
        explanation: "'might' is a modal verb showing possibility — it may or may not happen. The others state facts.",
        hint: "Look for a word like can/could/may/might/should that shows something isn't certain.",
        code: '5Rg.05'
      }
    ]
  },
  {
    id: 'eng_punctuation',
    subject: 'english',
    title: 'Punctuation Lagoon',
    topic: 'Apostrophes, commas & speech punctuation',
    objectiveCodes: ['5Wg.01', '5Wg.02', '5Wg.03', '5Rg.01'],
    studyNote:
      "APOSTROPHES do two jobs: contractions (do not → don't) and possession (Vera's boat; for a plural ending in s, put it after the s: the sailors' boat). Use a COMMA after a subordinate clause that starts a sentence: 'When the sun set, we sailed home.' DIRECT SPEECH puts the exact words in speech marks with a comma and capital letter: She said, \"Land ahoy!\"",
    description: 'Punctuate possession, contractions, commas and direct speech.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_pen',
    stickerName: 'Punctuation Pilot',
    stickerEmoji: '✒️',
    type: 'quiz',
    challenges: [
      {
        question: "Which sentence uses the apostrophe correctly to show the boat belongs to Vera?",
        options: [
          "Vera's boat was painted blue.",
          "Veras' boat was painted blue.",
          "Veras boat was painted blue.",
          "Vera's' boat was painted blue."
        ],
        correctIndex: 0,
        explanation: "For a singular owner, add apostrophe + s: Vera's boat. (Veras' would mean more than one Vera.)",
        hint: "One owner (Vera) → add 's after the name.",
        code: '5Wg.02'
      },
      {
        question: "Which is the correct contraction of 'they will'?",
        options: ["they'll", "theyll'", "theyl'l", "the'yll"],
        correctIndex: 0,
        explanation: "The apostrophe replaces the missing letters 'wi' in 'they will' → they'll.",
        hint: "The apostrophe goes where letters are missing.",
        code: '5Wg.02'
      },
      {
        question: "Which sentence has the comma in the right place?",
        options: [
          'When the storm passed, the sailors cheered.',
          'When the storm, passed the sailors cheered.',
          'When the storm passed the sailors, cheered.',
          'When, the storm passed the sailors cheered.'
        ],
        correctIndex: 0,
        explanation: "The subordinate clause 'When the storm passed' starts the sentence, so a comma comes right after it, before the main clause.",
        hint: "Put the comma at the end of the opening 'When…' part.",
        code: '5Wg.01'
      },
      {
        question: "Which sentence punctuates the direct speech correctly?",
        options: [
          'Lumi shouted, "Look at the dolphins!"',
          'Lumi shouted "Look at the dolphins!"',
          'Lumi shouted, "look at the dolphins!"',
          'Lumi shouted, Look at the dolphins!'
        ],
        correctIndex: 0,
        explanation: "Direct speech needs a comma before the opening speech marks, a capital letter to start the spoken words, and the end punctuation inside the speech marks.",
        hint: "You need a comma, speech marks, AND a capital letter to begin the spoken words.",
        code: '5Wg.03'
      }
    ]
  },
  {
    id: 'eng_sentence',
    subject: 'english',
    title: 'Sentence Builder',
    topic: 'Simple, compound & complex sentences',
    objectiveCodes: ['5Wg.04'],
    studyNote:
      "A SIMPLE sentence has one main clause. A COMPOUND sentence joins two main clauses with and/but/or. A COMPLEX sentence adds a subordinate clause (using because, although, while, when…). Starting with the subordinate clause? Put a comma after it. Read your sentence aloud to check it flows.",
    description: 'Assemble floating clauses into well-formed complex sentences.',
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
        correctOrder: [0, 1, 2],
        hint: "Start with the main action (who did what), then add the clause showing what the companion did.",
        explanation: "'Vera steered the sailboat' is the main independent clause, followed by 'while Lumi checked the map' as a subordinate clause, and 'to find the secret cove' as a phrase of purpose."
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
        explanation: "Starting with 'Although the volcano was rumbling' establishes the obstacle, followed by the main clause showing their action, and the phrase explaining their goal."
      },
      {
        question: "Build a clear cause-and-effect sentence by ordering the clauses:",
        chunks: [
          "Because the tide was rising quickly,",
          "the children pulled their boat",
          "higher up the beach."
        ],
        correctOrder: [0, 1, 2],
        hint: "Begin with the cause ('Because…'), add a comma, then say what happened as a result.",
        explanation: "'Because the tide was rising quickly' is the subordinate clause giving the reason; the main clause 'the children pulled their boat higher up the beach' gives the result."
      }
    ]
  },
  {
    id: 'eng_figurative',
    subject: 'english',
    title: 'Figurative Island Match',
    topic: 'Figurative language & imagery',
    objectiveCodes: ['5Rv.06', '5Rv.07'],
    studyNote:
      "Writers use FIGURATIVE LANGUAGE to paint pictures in your mind. A SIMILE compares using 'like' or 'as' (as cold as ice). A METAPHOR says one thing IS another (the sea was a sheet of glass). PERSONIFICATION gives human actions to non-human things (the wind whispered). HYPERBOLE is huge exaggeration (I've told you a million times).",
    description: 'Connect similes, metaphors and personification to their types.',
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
        explanation: "1) 'Canopy was a blanket' directly equates the two (Metaphor). 2) 'Cracked like a gunshot' uses 'like' (Simile). 3) 'Wind whispered secrets' gives a human action to wind (Personification). 4) 'Walked a million miles' is an exaggeration (Hyperbole)."
      },
      {
        question: "Match each sentence to the technique the writer has used:",
        pairs: [
          { phrase: "The waves were as tall as houses.", type: "Simile" },
          { phrase: "The sun smiled down on the harbour.", type: "Personification" },
          { phrase: "The old ship was a tired giant resting on the sand.", type: "Metaphor" },
          { phrase: "My backpack weighed a thousand tonnes by the end.", type: "Hyperbole" }
        ],
        hint: "Look for the word 'as' (simile), a human action (personification), a direct 'is/was' comparison (metaphor), or impossible exaggeration (hyperbole).",
        explanation: "'as tall as houses' uses 'as' (Simile). The sun cannot really smile — that's Personification. Calling the ship 'a tired giant' is a Metaphor. 'a thousand tonnes' is impossible exaggeration (Hyperbole)."
      }
    ]
  },
  {
    id: 'eng_inference',
    subject: 'english',
    title: 'Inference Detective',
    topic: 'Inference & prediction from clues',
    objectiveCodes: ['5Ri.09', '5Ri.10', '5Ri.11'],
    studyNote:
      "INFERENCE means reading between the lines — working out what the writer hints at but does not say directly. Look for clues in characters' ACTIONS and WORDS (trembling hands suggest fear). PREDICTION uses those clues to guess what might happen next. Always be ready to point to the evidence in the text.",
    description: 'Find the hidden clues in the story to reveal feelings and facts.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_magnifier',
    stickerName: 'Inference Investigator',
    stickerEmoji: '🕵️‍♀️',
    type: 'inference',
    challenges: [
      {
        question: "Find and highlight the sentence(s) that suggest Lumi was feeling nervous about sailing.",
        story: [
          "The small wooden sailboat bobbed gently in the warm harbor waters.",
          "Vera checked the rigging and tightened the sail with a bright smile.",
          "Lumi stood on the bow deck, his tiny flippers trembling slightly as he stared out at the giant waves crashing on the distant reef.",
          "He tucked his head into his leafy shell for a brief moment before taking a deep breath.",
          "The tropical breeze was warm, filling their sails as they glided past the protective barrier reef."
        ],
        correctIndices: [2, 3],
        hint: "Watch Lumi's physical actions — trembling flippers and hiding in his shell are clues about his feelings!",
        explanation: "Lumi's trembling flippers and tucking his head into his shell show he is feeling nervous or apprehensive — the text never says 'nervous', so you infer it from his actions."
      },
      {
        question: "Highlight the sentences showing that the beach was once inhabited by island builders.",
        story: [
          "They pulled the boat onto the sparkling white sand of English Cove.",
          "Vera pointed at a series of massive stone arches covered in tropical vines.",
          "The stones were perfectly carved and joined together without mortar, showing skilled engineering.",
          "A small blue crab scuttled past her boot, searching for shells.",
          "Cracked terracotta pottery shards lay buried in the sand, etched with patterns of waves and stars."
        ],
        correctIndices: [2, 4],
        hint: "Look for things that were MADE by people: carved arches and etched pottery shards.",
        explanation: "Carved stone arches joined without mortar, and pottery shards etched with patterns, are clues that skilled people once lived and built here."
      }
    ]
  },
  {
    id: 'eng_comprehension',
    subject: 'english',
    title: 'Reading Detective',
    topic: 'Comprehension: main idea, fact vs opinion, retrieval',
    objectiveCodes: ['5Ri.06', '5Ri.07', '5Ri.12', '5Ri.13', '5Ri.15'],
    studyNote:
      "When answering comprehension questions, RETRIEVE the answer straight from the text where you can. The MAIN IDEA is what the whole passage is mostly about. A FACT can be proven true (the sea covers most of Earth); an OPINION is what someone believes (the sea is beautiful). SCAN for a key word to find a detail quickly; SKIM to get the general gist.",
    description: 'Read a short passage and answer like a true reading detective.',
    estimatedMinutes: 7,
    xpReward: 70,
    difficulty: 3,
    stickerId: 'sticker_lens',
    stickerName: 'Comprehension Detective',
    stickerEmoji: '🔍',
    type: 'quiz',
    challenges: [
      {
        question: "PASSAGE: \"Sea turtles are remarkable travellers. A green turtle can swim thousands of kilometres across the ocean and still return to the very beach where it hatched to lay its own eggs. Sadly, plastic waste and the loss of nesting beaches now threaten these gentle creatures.\"\n\nWhat is the MAIN idea of this passage?",
        options: [
          'Sea turtles are amazing travellers but now face dangers',
          'Plastic is made in factories',
          'Green turtles are a type of fish',
          'Beaches are made of sand'
        ],
        correctIndex: 0,
        explanation: "The passage as a whole is about how impressive sea turtles are AND the threats they face — that is the main idea, not one small detail.",
        hint: "What is the WHOLE passage mostly about, not just one sentence?",
        code: '5Ri.07'
      },
      {
        question: "Using the same passage, which statement is a FACT (can be proven), not an opinion?",
        options: [
          'A green turtle can return to the beach where it hatched.',
          'Sea turtles are the most beautiful animals in the world.',
          'Everyone should love turtles.',
          'Turtles are nicer than dolphins.'
        ],
        correctIndex: 0,
        explanation: "That a turtle returns to its hatching beach can be observed and proven — it's a fact. The others are beliefs or feelings (opinions).",
        hint: "Which one could you check and prove true?",
        code: '5Ri.12'
      },
      {
        question: "Scan the passage. What now threatens sea turtles, according to the text?",
        options: [
          'Plastic waste and the loss of nesting beaches',
          'Too much swimming',
          'Other turtles',
          'Cold weather'
        ],
        correctIndex: 0,
        explanation: "The last sentence states the threats directly: 'plastic waste and the loss of nesting beaches'. Scanning for the word 'threaten' helps you find it fast.",
        hint: "Find the sentence with the word 'threaten' and read what comes before it.",
        code: '5Ri.13'
      },
      {
        question: "The passage says turtles return to 'the very beach where it hatched'. What does this tell you about turtles?",
        options: [
          'They have a strong sense of where they were born',
          'They cannot swim far',
          'They never lay eggs',
          'They live only on land'
        ],
        correctIndex: 0,
        explanation: "Returning to the exact beach where they hatched is evidence that turtles have a remarkable ability to navigate back to their birthplace — an inference supported by the text.",
        hint: "Why is it special that they return to the EXACT beach they came from?",
        code: '5Ri.15'
      }
    ]
  },

  {
    id: 'eng_mock',
    subject: 'english',
    title: 'English Mock Test',
    topic: 'Mixed exam practice (all English topics)',
    objectiveCodes: ['Mixed'],
    studyNote:
      "Exam tips: read every question carefully — twice if you need to. Watch out for words like NOT or MOST. Answer every question (an unanswered one scores nothing, but a sensible guess might be right). If you have time at the end, check your answers. Work calmly; you know this!",
    description: 'A mixed test covering vocabulary, grammar, punctuation, comprehension and figurative language.',
    estimatedMinutes: 12,
    xpReward: 120,
    difficulty: 3,
    stickerId: 'sticker_eng_medal',
    stickerName: 'English Test Ace',
    stickerEmoji: '🎖️',
    type: 'quiz',
    challenges: [
      {
        question: "\"The explorers were RELUCTANT to enter the dark cave.\" What does 'reluctant' mean?",
        options: ['Unwilling; hesitant', 'Excited and eager', 'Very tired', 'Extremely fast'],
        correctIndex: 0,
        explanation: "The context (a dark cave) and the word suggest they did not really want to go in — 'reluctant' means unwilling or hesitant.",
        hint: "Would you feel keen or unwilling to enter a dark cave?",
        code: 'Mixed'
      },
      {
        question: "Choose the correctly spelled sentence:",
        options: [
          "They're going to leave their boats over there.",
          "Their going to leave there boats over they're.",
          "There going to leave they're boats over their.",
          "They're going to leave there boats over their."
        ],
        correctIndex: 0,
        explanation: "they're = they are; their = belonging to them; there = a place.",
        hint: "they're = they are · their = belonging to them · there = a place.",
        code: 'Mixed'
      },
      {
        question: "In \"We sailed home because the storm was coming,\" which is the SUBORDINATE clause?",
        options: ['because the storm was coming', 'We sailed home', 'the storm', 'We sailed'],
        correctIndex: 0,
        explanation: "'because the storm was coming' cannot stand alone — it depends on the main clause 'We sailed home'.",
        hint: "Which part can't be a sentence on its own?",
        code: 'Mixed'
      },
      {
        question: "Which sentence uses the apostrophe correctly?",
        options: [
          "The sailor's compass pointed north.",
          "The sailors compass pointed north.",
          "The sailor's compass' pointed north.",
          "The sailors' compass's pointed north."
        ],
        correctIndex: 0,
        explanation: "One sailor owns the compass, so add apostrophe + s: the sailor's compass.",
        hint: "One owner → 's after the noun.",
        code: 'Mixed'
      },
      {
        question: "Which sentence contains a SIMILE?",
        options: [
          'The sea was as smooth as glass.',
          'The sea was a roaring monster.',
          'The waves whispered to the shore.',
          'I have told you a thousand times.'
        ],
        correctIndex: 0,
        explanation: "A simile compares using 'like' or 'as'. 'as smooth as glass' uses 'as'. The others are a metaphor, personification and hyperbole.",
        hint: "Look for the comparison word 'like' or 'as'.",
        code: 'Mixed'
      },
      {
        question: "\"Maya packed her bag quickly, glancing again and again at the clock.\" What can you INFER about Maya?",
        options: [
          'She is in a hurry or worried about time',
          'She is bored and relaxed',
          'She has lost her bag',
          'She dislikes clocks'
        ],
        correctIndex: 0,
        explanation: "Packing quickly and repeatedly checking the clock are clues that Maya is rushing or anxious about time — you infer it from her actions.",
        hint: "What do 'quickly' and checking the clock again and again suggest?",
        code: 'Mixed'
      },
      {
        question: "Which of these is an OPINION, not a fact?",
        options: [
          'Sea turtles are the most wonderful animals of all.',
          'Sea turtles lay their eggs on beaches.',
          'A green turtle can swim long distances.',
          'Turtles are reptiles.'
        ],
        correctIndex: 0,
        explanation: "'most wonderful animals of all' is a belief that cannot be proven — that makes it an opinion. The others can be checked and proven (facts).",
        hint: "Which statement is what someone feels, not something you can prove?",
        code: 'Mixed'
      },
      {
        question: "Choose the correct word: \"There were ___ visitors at the cove today than yesterday.\"",
        options: ['fewer', 'less', 'lesser', 'little'],
        correctIndex: 0,
        explanation: "Visitors can be counted, so use 'fewer'. (Use 'less' for things you can't count, like water.)",
        hint: "Can you count visitors? Use 'fewer' for things you can count.",
        code: 'Mixed'
      }
    ]
  },

  // ============================================================
  // ============== MATH PEAKS — Cambridge Stage 5 =============
  // ============================================================
  {
    id: 'math_place_value',
    subject: 'math',
    title: 'Place Value Peak',
    topic: 'Place value, decimals & rounding',
    objectiveCodes: ['5Np.01', '5Np.02', '5Np.03', '5Np.05'],
    studyNote:
      "Each digit's value depends on its place. In 3.47, the 4 is in the TENTHS place (worth 0.4) and the 7 is in the HUNDREDTHS place (worth 0.07). Multiplying by 10, 100 or 1000 moves every digit LEFT; dividing moves them RIGHT. To round to the nearest whole number, look at the tenths digit: 5 or more rounds up, 4 or less rounds down.",
    description: 'Read the value of digits, multiply and divide by powers of ten, and round.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_abacus',
    stickerName: 'Place Value Pro',
    stickerEmoji: '🧮',
    type: 'quiz',
    challenges: [
      {
        question: "In the number 5.36, what is the value of the digit 6?",
        options: ['6 hundredths (0.06)', '6 tenths (0.6)', '6 ones (6)', '6 tens (60)'],
        correctIndex: 0,
        explanation: "After the decimal point the places are tenths, then hundredths. The 6 is in the second place, so it is 6 hundredths = 0.06.",
        hint: "First place after the point = tenths, second place = hundredths.",
        code: '5Np.01'
      },
      {
        question: "What is 4.7 × 100?",
        options: ['470', '47', '4700', '0.047'],
        correctIndex: 0,
        explanation: "Multiplying by 100 moves every digit two places to the left: 4.7 → 470.",
        hint: "×100 moves the digits two places left.",
        code: '5Np.03'
      },
      {
        question: "What is 3200 ÷ 1000?",
        options: ['3.2', '32', '320', '0.32'],
        correctIndex: 0,
        explanation: "Dividing by 1000 moves every digit three places to the right: 3200 → 3.2.",
        hint: "÷1000 moves the digits three places right.",
        code: '5Np.02'
      },
      {
        question: "Round 6.8 to the nearest whole number.",
        options: ['7', '6', '6.5', '8'],
        correctIndex: 0,
        explanation: "The tenths digit is 8, which is 5 or more, so we round UP: 6.8 → 7.",
        hint: "Look at the tenths digit. Is it 5 or more?",
        code: '5Np.05'
      }
    ]
  },
  {
    id: 'math_operations',
    subject: 'math',
    title: 'Operation Summit',
    topic: 'Order of operations, integers & negatives',
    objectiveCodes: ['5Ni.01', '5Ni.03', '5Ni.04', '5Nc.01'],
    studyNote:
      "Calculations follow an ORDER (BIDMAS): Brackets first, then Indices, then Division and Multiplication (left to right), then Addition and Subtraction. NEGATIVE numbers are less than zero — on a number line they sit to the LEFT of 0. Counting back past zero gives negatives: 2, 1, 0, −1, −2.",
    description: 'Use the correct order of operations and work with negative numbers.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_plusminus',
    stickerName: 'Operations Ace',
    stickerEmoji: '➗',
    type: 'quiz',
    challenges: [
      {
        question: "Work out: 2 + 3 × 4",
        options: ['14', '20', '24', '9'],
        correctIndex: 0,
        explanation: "Multiplication comes before addition: 3 × 4 = 12, then 2 + 12 = 14.",
        hint: "Do the multiplication before the addition.",
        code: '5Ni.03'
      },
      {
        question: "Work out: (8 − 3) × 2",
        options: ['10', '2', '13', '5'],
        correctIndex: 0,
        explanation: "Brackets first: 8 − 3 = 5, then 5 × 2 = 10.",
        hint: "Always do what's inside the brackets first.",
        code: '5Ni.03'
      },
      {
        question: "The temperature is 3°C and drops by 7°C. What is the new temperature?",
        options: ['−4°C', '4°C', '−10°C', '10°C'],
        correctIndex: 0,
        explanation: "Count back 7 from 3: 3 → 0 is 3 steps, then 4 more steps below zero gives −4°C.",
        hint: "Count down from 3 on a number line, going past zero.",
        code: '5Nc.01'
      },
      {
        question: "Which number is the SMALLEST?",
        options: ['−5', '−2', '0', '3'],
        correctIndex: 0,
        explanation: "On a number line, the further left a number is, the smaller it is. −5 is furthest left, so it is the smallest.",
        hint: "The most negative number is the smallest.",
        code: '5Nc.01'
      }
    ]
  },
  {
    id: 'math_factors',
    subject: 'math',
    title: 'Prime Cavern',
    topic: 'Primes, factors, multiples & square numbers',
    objectiveCodes: ['5Ni.06', '5Ni.08', '5Nc.04'],
    studyNote:
      "A PRIME number has exactly two factors: 1 and itself (2, 3, 5, 7, 11, 13…). Note: 1 is NOT prime, and 2 is the only even prime. A COMPOSITE number has more than two factors. A SQUARE number is a whole number multiplied by itself: 1, 4, 9, 16, 25, 36… (because 1×1, 2×2, 3×3, 4×4, 5×5, 6×6).",
    description: 'Sort primes from composites and recognise square numbers.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_crystal',
    stickerName: 'Number Theorist',
    stickerEmoji: '🔢',
    type: 'quiz',
    challenges: [
      {
        question: "Which of these is a PRIME number?",
        options: ['13', '15', '21', '9'],
        correctIndex: 0,
        explanation: "13 has only two factors: 1 and 13. The others can be divided by more numbers (15 = 3×5, 21 = 3×7, 9 = 3×3).",
        hint: "A prime can only be divided by 1 and itself.",
        code: '5Ni.06'
      },
      {
        question: "Which number is NOT prime?",
        options: ['9', '2', '5', '7'],
        correctIndex: 0,
        explanation: "9 = 3 × 3, so it has factors 1, 3 and 9 — that makes it composite, not prime. 2, 5 and 7 are all prime.",
        hint: "Which one has a factor other than 1 and itself?",
        code: '5Ni.06'
      },
      {
        question: "Which of these is a SQUARE number?",
        options: ['36', '30', '40', '50'],
        correctIndex: 0,
        explanation: "36 = 6 × 6, so it is a square number. The others are not the product of a whole number times itself.",
        hint: "Which number is something multiplied by itself?",
        code: '5Ni.08'
      },
      {
        question: "What is the next square number after 16?",
        options: ['25', '20', '24', '32'],
        correctIndex: 0,
        explanation: "16 = 4×4. The next is 5×5 = 25. (Square numbers: 1, 4, 9, 16, 25, 36…)",
        hint: "16 is 4×4, so try 5×5.",
        code: '5Ni.08'
      }
    ]
  },
  {
    id: 'math_pizza',
    subject: 'math',
    title: 'Fraction Pizza Party',
    topic: 'Fractions of a whole (visual model)',
    objectiveCodes: ['5Nf.01', '5Nf.02'],
    studyNote:
      "A fraction tells you how many equal parts you have out of the whole. The bottom number (denominator) is how many equal slices the whole is cut into; the top number (numerator) is how many you take. To find 1/2 of 8 slices, share 8 into 2 equal groups → 4. To find 1/4 of 8, share into 4 groups → 2.",
    description: 'Prepare pizzas with exact fractional toppings to feed the hungry gulls!',
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
      },
      {
        slices: 8,
        instructions: "Cut the pizza into 8 slices. Put pepperoni on 3/4 of the pizza and mushrooms on 1/8 of it.",
        requirements: [
          { topping: 'pepperoni', fraction: '3/4', targetCount: 6 },
          { topping: 'mushroom', fraction: '1/8', targetCount: 1 }
        ],
        hint: "3/4 of 8 slices: split 8 into 4 groups of 2, then take 3 groups = 6. 1/8 of 8 is just 1 slice.",
        explanation: "3/4 of 8 = 6 slices of pepperoni (each quarter is 2 slices, and 3 quarters is 6). 1/8 of 8 = 1 slice of mushroom."
      }
    ]
  },
  {
    id: 'math_fractions',
    subject: 'math',
    title: 'Fraction Falls',
    topic: 'Equivalence: fractions, decimals & percentages',
    objectiveCodes: ['5Nf.04', '5Nf.05', '5Nf.07', '5Nf.08'],
    studyNote:
      "EQUIVALENT fractions have the same value: 1/2 = 2/4 = 5/10. A fraction, a decimal and a percentage can all show the same amount: 1/2 = 0.5 = 50%; 1/4 = 0.25 = 25%; 3/4 = 0.75 = 75%. To ADD fractions with the SAME denominator, just add the top numbers: 2/5 + 1/5 = 3/5.",
    description: 'Match equivalent fractions, decimals and percentages, and add fractions.',
    estimatedMinutes: 7,
    xpReward: 70,
    difficulty: 3,
    stickerId: 'sticker_waterfall',
    stickerName: 'Fraction Master',
    stickerEmoji: '💧',
    type: 'quiz',
    challenges: [
      {
        question: "Which fraction is equivalent to 1/2?",
        options: ['4/8', '1/4', '2/3', '3/8'],
        correctIndex: 0,
        explanation: "4/8 simplifies to 1/2 (divide top and bottom by 4). They have the same value.",
        hint: "Which fraction, when simplified, equals one half?",
        code: '5Nf.04'
      },
      {
        question: "What is 1/2 written as a percentage?",
        options: ['50%', '5%', '25%', '12%'],
        correctIndex: 0,
        explanation: "1/2 means one out of two equal parts, which is 50 out of 100 = 50%.",
        hint: "Half of 100 is…?",
        code: '5Nf.07'
      },
      {
        question: "Work out: 2/5 + 1/5",
        options: ['3/5', '3/10', '2/10', '1/5'],
        correctIndex: 0,
        explanation: "The denominators are the same, so add only the numerators: 2 + 1 = 3, giving 3/5. The denominator stays 5.",
        hint: "Same bottom number — just add the top numbers.",
        code: '5Nf.05'
      },
      {
        question: "Which decimal is the same as 3/4?",
        options: ['0.75', '0.34', '0.4', '0.25'],
        correctIndex: 0,
        explanation: "3/4 = 75 hundredths = 0.75 (and 75%).",
        hint: "Three quarters as money out of one dollar is…?",
        code: '5Nf.04'
      },
      {
        question: "Order these from SMALLEST to largest: 0.5, 1/4, 60%",
        options: ['1/4, 0.5, 60%', '0.5, 1/4, 60%', '60%, 0.5, 1/4', '1/4, 60%, 0.5'],
        correctIndex: 0,
        explanation: "Convert all to the same form: 1/4 = 25%, 0.5 = 50%, 60% = 60%. So smallest to largest is 1/4 (25%), 0.5 (50%), 60%.",
        hint: "Turn them all into percentages first.",
        code: '5Nf.08'
      }
    ]
  },
  {
    id: 'math_gem_sort',
    subject: 'math',
    title: 'Geometry Gem Sort',
    topic: '2D shape properties',
    objectiveCodes: ['5Gg.01', '5Gg.07'],
    studyNote:
      "Sort shapes by their PROPERTIES. PARALLEL sides are always the same distance apart and never meet. A RIGHT ANGLE is exactly 90° (a square corner). A REGULAR polygon has ALL sides equal AND all angles equal (like a square or regular hexagon). Check each shape carefully — some fit more than one description.",
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
          { name: "Rectangle", emoji: "▭", binId: "bin_right", propertyText: "Has 4 right angles" }
        ],
        hint: "A square has right angles AND equal sides, but its strictest description is 'Regular Polygon'. Look at the angle corners and side lengths!",
        explanation: "Square and Hexagon are regular polygons. Right Triangle and Rectangle have right angles. Trapezoid has one set of parallel sides."
      }
    ]
  },
  {
    id: 'math_angles',
    subject: 'math',
    title: 'Angle Ridge',
    topic: 'Angles & triangle classification',
    objectiveCodes: ['5Gg.01', '5Gg.07', '5Gg.08'],
    studyNote:
      "Angles: ACUTE is less than 90°, a RIGHT angle is exactly 90°, OBTUSE is between 90° and 180°, and a REFLEX angle is more than 180°. Angles on a STRAIGHT LINE add up to 180°. Triangles: EQUILATERAL has 3 equal sides (and three 60° angles), ISOSCELES has 2 equal sides, SCALENE has all sides different.",
    description: 'Classify angles and triangles and find missing angles on a line.',
    estimatedMinutes: 6,
    xpReward: 70,
    difficulty: 3,
    stickerId: 'sticker_protractor',
    stickerName: 'Angle Architect',
    stickerEmoji: '📐',
    type: 'quiz',
    challenges: [
      {
        question: "An angle measures 120°. What type of angle is it?",
        options: ['Obtuse', 'Acute', 'Right', 'Reflex'],
        correctIndex: 0,
        explanation: "120° is between 90° and 180°, so it is an obtuse angle.",
        hint: "Is it less than 90°, exactly 90°, between 90° and 180°, or more than 180°?",
        code: '5Gg.07'
      },
      {
        question: "Two angles sit on a straight line. One is 110°. What is the other?",
        options: ['70°', '90°', '250°', '110°'],
        correctIndex: 0,
        explanation: "Angles on a straight line add up to 180°. So 180° − 110° = 70°.",
        hint: "Angles on a straight line total 180°.",
        code: '5Gg.08'
      },
      {
        question: "A triangle has all three sides the same length. What is it called?",
        options: ['Equilateral', 'Isosceles', 'Scalene', 'Right-angled'],
        correctIndex: 0,
        explanation: "A triangle with all three sides equal is equilateral — and all its angles are 60°.",
        hint: "All sides equal = 'equal-lateral'.",
        code: '5Gg.01'
      },
      {
        question: "A triangle has exactly two equal sides. What type is it?",
        options: ['Isosceles', 'Equilateral', 'Scalene', 'Reflex'],
        correctIndex: 0,
        explanation: "A triangle with two equal sides (and two equal angles) is isosceles.",
        hint: "Two equal sides — not all three, not none.",
        code: '5Gg.01'
      }
    ]
  },
  {
    id: 'math_geometry',
    subject: 'math',
    title: 'Survey Plateau',
    topic: 'Perimeter, area & coordinates',
    objectiveCodes: ['5Gg.02', '5Gg.03', '5Gp.01', '5Gp.02'],
    studyNote:
      "PERIMETER is the total distance all the way around a shape — add up every side. AREA is the space inside, measured in squares; for a rectangle, AREA = length × width. COORDINATES locate a point on a grid as (x, y): the first number tells you how far ACROSS, the second how far UP. Remember: 'along the corridor, then up the stairs'.",
    description: 'Calculate perimeter and area, and plot points on a coordinate grid.',
    estimatedMinutes: 7,
    xpReward: 70,
    difficulty: 3,
    stickerId: 'sticker_ruler',
    stickerName: 'Survey Captain',
    stickerEmoji: '📏',
    type: 'quiz',
    challenges: [
      {
        question: "A rectangle is 6 cm long and 4 cm wide. What is its PERIMETER?",
        options: ['20 cm', '24 cm', '10 cm', '14 cm'],
        correctIndex: 0,
        explanation: "Perimeter adds all four sides: 6 + 4 + 6 + 4 = 20 cm.",
        hint: "Add up all four sides (two lengths and two widths).",
        code: '5Gg.02'
      },
      {
        question: "What is the AREA of a rectangle that is 6 cm long and 4 cm wide?",
        options: ['24 cm²', '20 cm²', '10 cm²', '12 cm²'],
        correctIndex: 0,
        explanation: "Area of a rectangle = length × width = 6 × 4 = 24 cm².",
        hint: "Multiply length by width.",
        code: '5Gg.03'
      },
      {
        question: "On a grid, which instruction correctly describes the point (3, 2)?",
        options: [
          'Go 3 across, then 2 up',
          'Go 2 across, then 3 up',
          'Go 3 up, then 2 across',
          'Go 5 across'
        ],
        correctIndex: 0,
        explanation: "Coordinates are (x, y): the first number is across (x), the second is up (y). So (3, 2) is 3 across and 2 up.",
        hint: "Along the corridor first (x), then up the stairs (y).",
        code: '5Gp.01'
      },
      {
        question: "A square has a side of 5 cm. What is its area?",
        options: ['25 cm²', '20 cm²', '10 cm²', '15 cm²'],
        correctIndex: 0,
        explanation: "A square's area = side × side = 5 × 5 = 25 cm².",
        hint: "All sides are equal, so multiply the side by itself.",
        code: '5Gg.03'
      }
    ]
  },
  {
    id: 'math_measurement',
    subject: 'math',
    title: 'Measurement Scale',
    topic: 'Measurement & converting units',
    objectiveCodes: ['5Gg.09', '4Gg.09'],
    studyNote:
      "Metric units convert by multiplying or dividing by 1000 (or 100). 1 litre = 1000 millilitres, so 0.6 L = 600 ml. 1 kilogram = 1000 grams, so 1.5 kg = 1500 g. To go from the bigger unit to the smaller unit, MULTIPLY; from smaller to bigger, DIVIDE.",
    description: 'Read scales and convert between litres/millilitres and kilograms/grams.',
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
        hint: "To convert Liters to ml, multiply by 1000. So 0.6 × 1000 = ...?",
        explanation: "0.6 Liters equals 600 milliliters. By sliding the water level to 600 ml, you have filled it to exactly 0.6 L."
      },
      {
        question: "Balance the scale. The left side weighs 1.5 kilograms. Add weights in grams to balance it.",
        type: "scale",
        startValue: 500,
        min: 0,
        max: 2000,
        step: 100,
        targetValue: 1500,
        targetUnit: "g",
        instructions: "Adjust the weight slider. 1 kilogram (kg) = 1000 grams (g). How many grams is 1.5 kg?",
        hint: "1 kg is 1000 g, and 0.5 kg is 500 g. Add them together to find the target in grams!",
        explanation: "1.5 kilograms = 1.5 × 1000 = 1500 grams. Aligning the dial to 1500 g balances the scale."
      }
    ]
  },
  {
    id: 'math_statistics',
    subject: 'math',
    title: 'Data Harbour',
    topic: 'Averages, data & probability',
    objectiveCodes: ['5Ss.03', '5Sp.01', '5Gt.03'],
    studyNote:
      "The MODE is the value that appears MOST often. The MEDIAN is the MIDDLE value when the data is put in order from smallest to largest. We describe chance with words: impossible, unlikely, even chance, likely, certain. Time: 1 minute = 60 seconds, 1 hour = 60 minutes.",
    description: 'Find the mode and median, read data, and judge how likely events are.',
    estimatedMinutes: 7,
    xpReward: 70,
    difficulty: 3,
    stickerId: 'sticker_chart',
    stickerName: 'Data Detective',
    stickerEmoji: '📊',
    type: 'quiz',
    challenges: [
      {
        question: "Find the MODE of this data set: 4, 2, 5, 4, 3, 4, 2",
        options: ['4', '2', '3', '5'],
        correctIndex: 0,
        explanation: "The mode is the value that appears most often. 4 appears three times — more than any other number.",
        hint: "Which number appears the most times?",
        code: '5Ss.03'
      },
      {
        question: "Find the MEDIAN of: 7, 3, 9, 5, 1 (put them in order first).",
        options: ['5', '9', '3', '7'],
        correctIndex: 0,
        explanation: "Ordered: 1, 3, 5, 7, 9. The middle value is 5.",
        hint: "Order them smallest to largest, then pick the middle one.",
        code: '5Ss.03'
      },
      {
        question: "When you roll an ordinary six-sided dice, getting a number from 1 to 6 is:",
        options: ['Certain', 'Impossible', 'Unlikely', 'Even chance'],
        correctIndex: 0,
        explanation: "Every face shows a number from 1 to 6, so you are certain to roll one of them.",
        hint: "Could you ever roll a number that ISN'T 1–6 on a normal dice?",
        code: '5Sp.01'
      },
      {
        question: "How many seconds are there in 2 and a half minutes?",
        options: ['150 seconds', '120 seconds', '125 seconds', '250 seconds'],
        correctIndex: 0,
        explanation: "1 minute = 60 seconds, so 2 minutes = 120 s, and half a minute = 30 s. 120 + 30 = 150 seconds.",
        hint: "60 seconds per minute. Work out 2 × 60, then add half of 60.",
        code: '5Gt.03'
      }
    ]
  },

  {
    id: 'math_mock',
    subject: 'math',
    title: 'Math Mock Test',
    topic: 'Mixed exam practice (all Math topics)',
    objectiveCodes: ['Mixed'],
    studyNote:
      "Exam tips: show your working on paper — it helps you avoid silly mistakes and you can check it. Read carefully whether a question wants perimeter or area, fewer or more. Estimate first so you can tell if your answer is sensible. Attempt every question.",
    description: 'A mixed test covering place value, operations, fractions, percentages, angles, area and data.',
    estimatedMinutes: 12,
    xpReward: 120,
    difficulty: 3,
    stickerId: 'sticker_math_medal',
    stickerName: 'Math Test Ace',
    stickerEmoji: '🏅',
    type: 'quiz',
    challenges: [
      {
        question: "What is the value of the digit 7 in the number 4.27?",
        options: ['7 hundredths (0.07)', '7 tenths (0.7)', '7 ones (7)', '7 thousandths'],
        correctIndex: 0,
        explanation: "The 7 is in the second place after the decimal point — the hundredths place — so it is worth 0.07.",
        hint: "First place = tenths, second place = hundredths.",
        code: 'Mixed'
      },
      {
        question: "Work out: 12 − 2 × 3",
        options: ['6', '30', '10', '36'],
        correctIndex: 0,
        explanation: "Multiplication before subtraction: 2 × 3 = 6, then 12 − 6 = 6.",
        hint: "Do the multiplication first (order of operations).",
        code: 'Mixed'
      },
      {
        question: "Work out: 3/8 + 2/8",
        options: ['5/8', '5/16', '6/8', '1/8'],
        correctIndex: 0,
        explanation: "Same denominator, so add the numerators: 3 + 2 = 5, giving 5/8.",
        hint: "Same bottom number — add only the top numbers.",
        code: 'Mixed'
      },
      {
        question: "What is 1/4 as a percentage?",
        options: ['25%', '40%', '14%', '50%'],
        correctIndex: 0,
        explanation: "1/4 = 25 out of 100 = 25%.",
        hint: "How many quarters make 100%? Each quarter is…?",
        code: 'Mixed'
      },
      {
        question: "Which of these is a PRIME number?",
        options: ['11', '9', '15', '21'],
        correctIndex: 0,
        explanation: "11 has only two factors, 1 and 11, so it is prime. The others all have extra factors.",
        hint: "A prime divides only by 1 and itself.",
        code: 'Mixed'
      },
      {
        question: "Two angles lie on a straight line. One is 65°. What is the other?",
        options: ['115°', '125°', '35°', '90°'],
        correctIndex: 0,
        explanation: "Angles on a straight line add to 180°: 180 − 65 = 115°.",
        hint: "They must total 180°.",
        code: 'Mixed'
      },
      {
        question: "What is the AREA of a rectangle 7 cm long and 3 cm wide?",
        options: ['21 cm²', '20 cm²', '10 cm²', '24 cm²'],
        correctIndex: 0,
        explanation: "Area = length × width = 7 × 3 = 21 cm².",
        hint: "Multiply length by width.",
        code: 'Mixed'
      },
      {
        question: "Find the MEDIAN of: 2, 8, 5, 1, 9",
        options: ['5', '8', '2', '9'],
        correctIndex: 0,
        explanation: "Ordered: 1, 2, 5, 8, 9. The middle value is 5.",
        hint: "Put them in order, then take the middle number.",
        code: 'Mixed'
      }
    ]
  },

  // ============================================================
  // ============== SCIENCE LAGOON — Cambridge Stage 5 =========
  // ============================================================
  {
    id: 'sci_forces',
    subject: 'science',
    title: 'Forces Lab',
    topic: 'Forces: gravity, friction, upthrust & resistance',
    objectiveCodes: ['5Pf.01', '5Pf.02', '5Pf.03'],
    studyNote:
      "A FORCE is a push or a pull. GRAVITY pulls objects down towards Earth. FRICTION acts between surfaces that rub and slows things down. UPTHRUST is the upward push of a liquid (it's why boats float). AIR RESISTANCE and WATER RESISTANCE slow objects moving through air or water. An object can have several forces on it at once — even when it is sitting still and the forces are balanced.",
    description: 'Identify the forces acting on objects all around the island.',
    estimatedMinutes: 7,
    xpReward: 80,
    difficulty: 2,
    stickerId: 'sticker_force',
    stickerName: 'Force Investigator',
    stickerEmoji: '🧲',
    type: 'quiz',
    challenges: [
      {
        question: "Which force pulls a dropped coconut down to the ground?",
        options: ['Gravity', 'Friction', 'Upthrust', 'Air resistance'],
        correctIndex: 0,
        explanation: "Gravity is the force that pulls all objects down towards the centre of the Earth.",
        hint: "Which force always pulls things towards the Earth?",
        code: '5Pf.01'
      },
      {
        question: "A boat floats because of an upward push from the water. What is this push called?",
        options: ['Upthrust', 'Friction', 'Gravity', 'Magnetism'],
        correctIndex: 0,
        explanation: "Upthrust is the upward force a liquid exerts on an object. When upthrust balances gravity, the object floats.",
        hint: "It's the upward force from a liquid that helps things float.",
        code: '5Pf.01'
      },
      {
        question: "A book rests on a table without moving. What is true about the forces on it?",
        options: [
          'Gravity pulls it down while the table pushes up — the forces are balanced',
          'There are no forces on it because it is not moving',
          'Only gravity acts on it',
          'Friction is pulling it sideways'
        ],
        correctIndex: 0,
        explanation: "Even at rest, multiple forces act: gravity pulls the book down and the table pushes up with an equal force. Because they are balanced, the book stays still.",
        hint: "An object at rest can still have forces — if they are balanced it won't move.",
        code: '5Pf.02'
      },
      {
        question: "A parachute makes a falling skydiver slow down. Which force does the parachute increase?",
        options: ['Air resistance', 'Gravity', 'Upthrust', 'Water resistance'],
        correctIndex: 0,
        explanation: "The large parachute catches a lot of air, increasing air resistance, which pushes up against the fall and slows the skydiver down.",
        hint: "What force acts against an object moving through the air?",
        code: '5Pf.01'
      }
    ]
  },
  {
    id: 'sci_sound',
    subject: 'science',
    title: 'Sound Cove',
    topic: 'Sound: vibration, pitch & volume',
    objectiveCodes: ['5Ps.01', '5Ps.02', '5Ps.03'],
    studyNote:
      "Sounds are made by something VIBRATING (shaking back and forth). PITCH is how high or low a sound is — faster, smaller or tighter vibrations make a HIGHER pitch. VOLUME (loudness) depends on the SIZE of the vibration — a bigger vibration makes a LOUDER sound. So plucking a string harder makes it louder; shortening or tightening it makes it higher.",
    description: 'Explore how vibrations create sound, pitch and volume.',
    estimatedMinutes: 6,
    xpReward: 70,
    difficulty: 2,
    stickerId: 'sticker_note',
    stickerName: 'Sound Scientist',
    stickerEmoji: '🎵',
    type: 'quiz',
    challenges: [
      {
        question: "How is sound made?",
        options: [
          'By something vibrating',
          'By something getting hot',
          'By light shining',
          'By a magnet moving'
        ],
        correctIndex: 0,
        explanation: "All sounds are produced by vibrations — for example, a guitar string or a drum skin shaking back and forth.",
        hint: "Think about what a guitar string does when you pluck it.",
        code: '5Ps.01'
      },
      {
        question: "What makes a sound LOUDER?",
        options: [
          'A bigger vibration',
          'A faster vibration',
          'A colder string',
          'A shorter string'
        ],
        correctIndex: 0,
        explanation: "Volume depends on the size of the vibration. The bigger the vibration (more energy), the louder the sound.",
        hint: "Loudness is about how BIG the vibration is.",
        code: '5Ps.03'
      },
      {
        question: "A short, tight guitar string is plucked. Compared to a long, loose string, its pitch will be:",
        options: ['Higher', 'Lower', 'The same', 'Silent'],
        correctIndex: 0,
        explanation: "Shorter, tighter strings vibrate faster, producing a higher pitch. Longer, looser strings vibrate slowly and sound lower.",
        hint: "Faster vibrations = higher pitch. Short tight strings vibrate fast.",
        code: '5Ps.02'
      },
      {
        question: "Which word describes a sound that is very HIGH, like a tiny bird's chirp?",
        options: ['High pitch', 'Low pitch', 'Loud volume', 'Quiet volume'],
        correctIndex: 0,
        explanation: "How high or low a sound is describes its pitch. A bird's chirp is a high-pitched sound. (Pitch is different from volume, which is about loudness.)",
        hint: "High vs low describes pitch; loud vs quiet describes volume.",
        code: '5Ps.02'
      }
    ]
  },
  {
    id: 'sci_magnets',
    subject: 'science',
    title: 'Magnet Bay',
    topic: 'Magnets & magnetic materials',
    objectiveCodes: ['5Pe.01', '5Pe.02', '5Pe.03'],
    studyNote:
      "A MAGNET attracts MAGNETIC MATERIALS — iron, steel, nickel and cobalt. Most metals (like copper, aluminium and gold) are NOT magnetic. A magnet's pull works over a DISTANCE without touching (a non-contact force). Magnets have north and south poles: like poles repel, opposite poles attract. Some magnets are stronger than others.",
    description: 'Discover which materials magnets attract and how their pull works.',
    estimatedMinutes: 6,
    xpReward: 70,
    difficulty: 2,
    stickerId: 'sticker_magnet',
    stickerName: 'Magnet Master',
    stickerEmoji: '🧲',
    type: 'quiz',
    challenges: [
      {
        question: "Which material will a magnet attract?",
        options: ['An iron nail', 'A plastic spoon', 'A wooden block', 'A glass marble'],
        correctIndex: 0,
        explanation: "Magnets attract magnetic materials such as iron and steel. Plastic, wood and glass are not magnetic.",
        hint: "Magnets attract certain metals — especially iron and steel.",
        code: '5Pe.01'
      },
      {
        question: "Which of these metals is NOT magnetic?",
        options: ['Copper', 'Iron', 'Steel', 'Nickel'],
        correctIndex: 0,
        explanation: "Not all metals are magnetic. Iron, steel and nickel are magnetic, but copper is not.",
        hint: "Only some metals are magnetic — one of these is a common non-magnetic metal.",
        code: '5Pe.01'
      },
      {
        question: "A magnet can pick up a paperclip even before touching it. This shows that the magnetic force…",
        options: [
          'acts over a distance',
          'needs to touch the object',
          'only works underwater',
          'is the same as gravity'
        ],
        correctIndex: 0,
        explanation: "Magnetism is a non-contact force — it acts over a distance, so a magnet can pull a paperclip before they touch.",
        hint: "Did the magnet need to touch the paperclip to start pulling it?",
        code: '5Pe.02'
      },
      {
        question: "Two north poles of two magnets are pushed towards each other. What happens?",
        options: ['They repel (push apart)', 'They attract (pull together)', 'Nothing happens', 'They melt'],
        correctIndex: 0,
        explanation: "Like poles repel. Two norths (or two souths) push each other away; only opposite poles attract.",
        hint: "Like poles repel; opposite poles attract.",
        code: '5Pe.02'
      }
    ]
  },
  {
    id: 'sci_states',
    subject: 'science',
    title: 'Matter Lab',
    topic: 'States of matter & the particle model',
    objectiveCodes: ['5Cm.01', '5Cm.02', '5Cp.02', '5Cc.01'],
    studyNote:
      "Everything is made of tiny PARTICLES. In a SOLID they are packed tightly in fixed positions (fixed shape). In a LIQUID they are close but can slide past each other (takes the shape of its container). In a GAS they are far apart and move freely (fills all the space). Water FREEZES at 0°C and BOILS at 100°C. EVAPORATION is liquid → gas; CONDENSATION is gas → liquid (when it cools).",
    description: 'Use the particle model to explain solids, liquids and gases.',
    estimatedMinutes: 7,
    xpReward: 80,
    difficulty: 3,
    stickerId: 'sticker_atom',
    stickerName: 'Particle Pioneer',
    stickerEmoji: '⚛️',
    type: 'quiz',
    challenges: [
      {
        question: "In which state of matter are the particles packed tightly together in fixed positions?",
        options: ['Solid', 'Liquid', 'Gas', 'They are the same in all'],
        correctIndex: 0,
        explanation: "In a solid, particles are tightly packed in a fixed arrangement, which is why solids keep their shape.",
        hint: "Which state keeps its own shape?",
        code: '5Cm.01'
      },
      {
        question: "Why can a gas fill a whole room?",
        options: [
          'Its particles are far apart and move freely in all directions',
          'Its particles are stuck in fixed positions',
          'It has no particles',
          'Its particles are frozen'
        ],
        correctIndex: 0,
        explanation: "In a gas, particles are far apart and move quickly in every direction, so a gas spreads out to fill its container.",
        hint: "Gas particles are spread out and move freely.",
        code: '5Cm.01'
      },
      {
        question: "At what temperature does pure water FREEZE?",
        options: ['0°C', '100°C', '50°C', '−10°C'],
        correctIndex: 0,
        explanation: "Water freezes (turns to ice) at 0°C and boils at 100°C.",
        hint: "It's the temperature at which water turns to ice.",
        code: '5Cp.02'
      },
      {
        question: "Water droplets form on the outside of a cold glass on a hot day. What process is this?",
        options: ['Condensation', 'Evaporation', 'Freezing', 'Melting'],
        correctIndex: 0,
        explanation: "Water vapour in the warm air cools when it touches the cold glass and turns back into liquid — that is condensation (gas → liquid).",
        hint: "Gas turning into liquid as it cools is called…?",
        code: '5Cc.01'
      }
    ]
  },
  {
    id: 'sci_materials',
    subject: 'science',
    title: 'Dissolving Lab',
    topic: 'Dissolving, solubility & separating solutions',
    objectiveCodes: ['5Cp.01', '5Cc.02', '5Cc.03'],
    studyNote:
      "A SOLUBLE substance DISSOLVES in a liquid to make a solution (salt and sugar dissolve in water). An INSOLUBLE substance does not (sand and chalk stay visible). The liquid that does the dissolving is the SOLVENT; the substance that dissolves is the SOLUTE. Dissolving is REVERSIBLE — if you let the water evaporate, the solid is left behind.",
    description: 'Classify island materials by what dissolves in water.',
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
          { id: 'insoluble', name: 'Insoluble (Stays visible)', desc: 'Stays visible even after stirring' }
        ],
        items: [
          { name: "Salt Crystals", emoji: "🧂", binId: "soluble", description: "Dissolves to form brine" },
          { name: "Sea Sand", emoji: "⏳", binId: "insoluble", description: "Settles at the bottom" },
          { name: "Granulated Sugar", emoji: "🍬", binId: "soluble", description: "Dissolves in tea or water" },
          { name: "Wooden Shavings", emoji: "🪵", binId: "insoluble", description: "Floats on top of water" },
          { name: "Chalk Powder", emoji: "🪨", binId: "insoluble", description: "Makes the water cloudy but does not dissolve" }
        ],
        hint: "Think about cooking: stir salt or sugar into water and they disappear (soluble). Sand, wood and chalk stay visible (insoluble).",
        explanation: "Salt and sugar are soluble — they dissolve to form clear solutions. Sand, wood shavings and chalk are insoluble; they stay visible in the water."
      },
      {
        instructions: "A scientist needs to separate mixtures. Sort each method by what it separates.",
        mode: 'solubility',
        bins: [
          { id: 'soluble', name: 'Get salt back from salty water', desc: 'The salt dissolved' },
          { id: 'insoluble', name: 'Get sand out of sandy water', desc: 'The sand did not dissolve' }
        ],
        items: [
          { name: "Evaporate the water", emoji: "☀️", binId: "soluble", description: "Leaves the dissolved salt behind" },
          { name: "Filter through paper", emoji: "🧫", binId: "insoluble", description: "Traps the undissolved sand" },
          { name: "Leave it in the sun to dry", emoji: "🌞", binId: "soluble", description: "Water turns to vapour, salt remains" },
          { name: "Pour through a sieve/filter", emoji: "🕳️", binId: "insoluble", description: "Solid particles get caught" }
        ],
        hint: "Dissolved things (salt) come back by evaporating the water. Undissolved things (sand) are caught by filtering.",
        explanation: "Salt dissolves, so you separate it by EVAPORATING the water (dissolving is reversible). Sand does not dissolve, so you FILTER it out."
      }
    ]
  },
  {
    id: 'sci_plants',
    subject: 'science',
    title: 'Botany Grove',
    topic: 'Flowering plants: parts, reproduction & germination',
    objectiveCodes: ['5Bs.02', '5Bs.03', '5Bp.03', '5Bp.04'],
    studyNote:
      "FLOWERS help plants reproduce. The PETALS attract insects; the ANTHER makes pollen; the STIGMA receives pollen; the OVARY holds the ovules that become seeds. POLLINATION is the transfer of pollen from anther to stigma (often by insects or wind). Afterwards seeds form and are spread (dispersed). To GERMINATE (start growing), a seed needs WATER and WARMTH — it does NOT need light yet.",
    description: 'Learn how flowering plants make and spread new seeds.',
    estimatedMinutes: 7,
    xpReward: 80,
    difficulty: 3,
    stickerId: 'sticker_flower',
    stickerName: 'Botany Explorer',
    stickerEmoji: '🌸',
    type: 'quiz',
    challenges: [
      {
        question: "Which part of a flower makes pollen?",
        options: ['The anther', 'The stigma', 'The petal', 'The root'],
        correctIndex: 0,
        explanation: "The anther is the male part that produces pollen. The stigma is the female part that receives it.",
        hint: "It's the male part, held up by the filament.",
        code: '5Bs.02'
      },
      {
        question: "What is pollination?",
        options: [
          'The transfer of pollen from the anther to the stigma',
          'A seed growing into a plant',
          'A plant making its own food from light',
          'Roots taking in water'
        ],
        correctIndex: 0,
        explanation: "Pollination is when pollen is carried from the anther to the stigma — often by insects or the wind — so the plant can make seeds.",
        hint: "It's about moving pollen from one flower part to another.",
        code: '5Bp.03'
      },
      {
        question: "Brightly coloured, scented petals mainly help a flower to…",
        options: [
          'attract insects to pollinate it',
          'make its roots grow',
          'keep it warm at night',
          'frighten away bees'
        ],
        correctIndex: 0,
        explanation: "Colourful, scented petals are an adaptation to attract pollinators such as bees and butterflies, which then carry pollen between flowers.",
        hint: "Why would a flower want to be noticed by a bee?",
        code: '5Bp.03'
      },
      {
        question: "What does a seed need to GERMINATE (begin to grow)?",
        options: ['Water and warmth', 'Only sunlight', 'Only soil', 'Salt water'],
        correctIndex: 0,
        explanation: "Seeds need water and a suitable (warm) temperature to germinate. They do not need light until after the shoot appears.",
        hint: "Think about what you'd give a seed before it pokes above the soil.",
        code: '5Bp.04'
      }
    ]
  },
  {
    id: 'sci_body_eco',
    subject: 'science',
    title: 'Body & Habitat',
    topic: 'Human digestion, diet & adaptations',
    objectiveCodes: ['5Bs.04', '5Bp.01', '5Be.01', '5Be.03'],
    studyNote:
      "Food travels through the DIGESTIVE SYSTEM: mouth → oesophagus → stomach → small intestine (absorbs nutrients) → large intestine (absorbs water) → out. A BALANCED DIET has carbohydrates, proteins, fats, vitamins, minerals, fibre and water. Animals and plants have ADAPTATIONS that suit their habitat: a cactus stores water and has spines for the desert; a polar bear has thick fur and fat for the cold.",
    description: 'Explore how the body digests food and how living things adapt.',
    estimatedMinutes: 7,
    xpReward: 80,
    difficulty: 3,
    stickerId: 'sticker_leaf',
    stickerName: 'Life Scientist',
    stickerEmoji: '🍃',
    type: 'quiz',
    challenges: [
      {
        question: "Where does food go straight after it is swallowed in the mouth?",
        options: ['Down the oesophagus to the stomach', 'Into the lungs', 'Into the small intestine first', 'To the brain'],
        correctIndex: 0,
        explanation: "After chewing, food is swallowed and travels down the oesophagus (food pipe) to the stomach.",
        hint: "It goes down the 'food pipe' to the stomach.",
        code: '5Bs.04'
      },
      {
        question: "Which organ absorbs most of the nutrients from digested food into the blood?",
        options: ['The small intestine', 'The large intestine', 'The stomach', 'The mouth'],
        correctIndex: 0,
        explanation: "The small intestine is where most nutrients are absorbed into the bloodstream. The large intestine mainly absorbs water.",
        hint: "It's the long, narrow part after the stomach.",
        code: '5Bs.04'
      },
      {
        question: "A cactus has a thick stem to store water and spines instead of leaves. These adaptations suit which habitat?",
        options: ['A hot, dry desert', 'A cold, snowy mountain', 'A deep ocean', 'A rainy forest floor'],
        correctIndex: 0,
        explanation: "Storing water and having spines (which lose less water and deter animals) are adaptations to a hot, dry desert.",
        hint: "Where would storing water be most useful?",
        code: '5Be.01'
      },
      {
        question: "A cheetah has long legs and a flexible spine for sprinting. This adaptation mainly helps it to…",
        options: ['catch prey', 'hide underground', 'swim faster', 'climb trees for fruit'],
        correctIndex: 0,
        explanation: "Speed is a predator adaptation that helps the cheetah chase and catch fast-moving prey.",
        hint: "Is a cheetah a predator or prey? What does great speed help it do?",
        code: '5Be.03'
      }
    ]
  },
  {
    id: 'sci_earth_space',
    subject: 'science',
    title: 'Earth & Sky',
    topic: 'Atmosphere, water cycle & Earth in space',
    objectiveCodes: ['5ESp.01', '5ESc.01', '5ESs.01', '5ESs.02'],
    studyNote:
      "The ATMOSPHERE is the layer of gases around Earth — mostly nitrogen, with oxygen and a little carbon dioxide. The WATER CYCLE: the Sun's heat causes EVAPORATION (water → vapour), the vapour cools and CONDENSES into clouds, then falls as PRECIPITATION (rain or snow). Earth ORBITS the Sun once a year. SEASONS are caused by the TILT of the Earth's axis, not by how close we are to the Sun.",
    description: "Investigate Earth's air, the water cycle and our journey around the Sun.",
    estimatedMinutes: 7,
    xpReward: 80,
    difficulty: 3,
    stickerId: 'sticker_globe',
    stickerName: 'Earth Explorer',
    stickerEmoji: '🌍',
    type: 'quiz',
    challenges: [
      {
        question: "Which gas makes up most of the Earth's atmosphere?",
        options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Hydrogen'],
        correctIndex: 0,
        explanation: "About 78% of the air is nitrogen. Oxygen is about 21%, and carbon dioxide only a tiny amount.",
        hint: "It's not oxygen — it's the gas that makes up nearly four-fifths of the air.",
        code: '5ESp.01'
      },
      {
        question: "In the water cycle, what is it called when the Sun heats water and it turns into water vapour?",
        options: ['Evaporation', 'Condensation', 'Precipitation', 'Freezing'],
        correctIndex: 0,
        explanation: "Evaporation is liquid water turning into water vapour (a gas) when it is heated by the Sun.",
        hint: "Liquid water turning into a gas is called…?",
        code: '5ESc.01'
      },
      {
        question: "Clouds form when water vapour high in the sky cools down. What is this step called?",
        options: ['Condensation', 'Evaporation', 'Precipitation', 'Melting'],
        correctIndex: 0,
        explanation: "When vapour cools, it condenses into tiny water droplets that form clouds — this is condensation.",
        hint: "Gas cooling into liquid droplets is…?",
        code: '5ESc.01'
      },
      {
        question: "What causes the Earth to have different seasons?",
        options: [
          "The tilt of the Earth's axis as it orbits the Sun",
          'The Earth getting much closer to the Sun in summer',
          'The Sun switching off at night',
          'The Moon blocking the Sun'
        ],
        correctIndex: 0,
        explanation: "Seasons happen because the Earth's axis is tilted. The part tilted towards the Sun has summer; the part tilted away has winter. It is not about distance from the Sun.",
        hint: "It's about the angle (tilt) of the Earth, not its distance from the Sun.",
        code: '5ESs.02'
      }
    ]
  },
  {
    id: 'sci_enquiry',
    subject: 'science',
    title: 'Investigator Camp',
    topic: 'Working scientifically: fair tests & results',
    objectiveCodes: ['5TWSp.03', '5TWSp.04', '5TWSa.02', '5TWSa.05'],
    studyNote:
      "In a FAIR TEST you change just ONE thing (the INDEPENDENT variable), measure what happens (the DEPENDENT variable), and keep everything else the SAME (the CONTROL variables). A PREDICTION is a sensible guess using what you know. An ANOMALOUS result is an odd one that doesn't fit the pattern. We show results in tables, bar charts and line graphs to spot patterns.",
    description: 'Plan a fair test, make predictions and read scientific results.',
    estimatedMinutes: 6,
    xpReward: 70,
    difficulty: 2,
    stickerId: 'sticker_microscope',
    stickerName: 'Chief Investigator',
    stickerEmoji: '🔬',
    type: 'quiz',
    challenges: [
      {
        question: "Vera tests how the length of a string affects the pitch of its sound. To make it a FAIR TEST, what should she keep the SAME?",
        options: [
          'The type and tightness of the string',
          'The length of the string',
          'The pitch she hears',
          'Nothing — she can change everything'
        ],
        correctIndex: 0,
        explanation: "She changes only the length (the independent variable) and measures the pitch (the dependent variable). Everything else — the type and tightness of string — must stay the same to keep it fair.",
        hint: "In a fair test you change ONE thing and keep the rest the same. She's changing length, so what stays fixed?",
        code: '5TWSp.04'
      },
      {
        question: "In that test, the thing Vera deliberately changes (the string's length) is called the…",
        options: ['independent variable', 'dependent variable', 'control variable', 'anomalous result'],
        correctIndex: 0,
        explanation: "The variable you choose to change is the independent variable. What you measure as a result is the dependent variable.",
        hint: "The one you CHANGE on purpose has a special name.",
        code: '5TWSp.04'
      },
      {
        question: "A plant grows 2 cm, 4 cm, 6 cm, 20 cm, 10 cm over five weeks. Which result looks ANOMALOUS (doesn't fit the pattern)?",
        options: ['20 cm', '2 cm', '6 cm', '10 cm'],
        correctIndex: 0,
        explanation: "The values rise steadily until the sudden jump to 20 cm, which breaks the pattern — that is the anomalous result and may be a mistake.",
        hint: "Which number suddenly jumps far away from the smooth pattern?",
        code: '5TWSa.02'
      },
      {
        question: "You record how temperature changes every hour through the day. Which is the BEST way to show this data?",
        options: ['A line graph', 'A single number', 'A list of names', 'A photograph'],
        correctIndex: 0,
        explanation: "A line graph is best for showing how something changes over time, so you can see the pattern clearly.",
        hint: "Which chart is best for showing change over time?",
        code: '5TWSa.05'
      }
    ]
  },
  {
    id: 'sci_circuit',
    subject: 'science',
    title: 'Circuit Light Up',
    topic: 'Electric circuits (Foundation review — Stage 4)',
    objectiveCodes: ['4Pe.01', '4Pe.02'],
    studyNote:
      "FOUNDATION REVIEW: A circuit needs a complete, unbroken loop for electricity to flow. It needs a power source (battery/cell), wires to carry the current, a component such as a bulb, and the SWITCH must be closed (ON) to complete the loop. If there is any gap, the bulb will not light. This Stage 4 idea is the foundation for the Stage 5 work on magnets and electricity.",
    description: 'Connect the glowing wires to light the beacon and guide ships safely.',
    estimatedMinutes: 8,
    xpReward: 60,
    difficulty: 2,
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
        hint: "A working circuit needs a Power Source (Battery), a Conductor (Wire), a Load (Bulb), and a Switch closed to complete the loop.",
        explanation: "An electric circuit requires a continuous path (wires) from a battery through a lightbulb and back to the battery, controlled by a switch that must be closed."
      }
    ]
  },
  {
    id: 'sci_shadow',
    subject: 'science',
    title: 'Shadow Lab',
    topic: 'Light & shadows (Foundation review — Stage 4)',
    objectiveCodes: ['4Ps.01'],
    studyNote:
      "FOUNDATION REVIEW: Light travels in straight lines. A SHADOW forms when an opaque object blocks the light. When the light source is LOW (near the horizon), shadows are LONG; when it is HIGH (overhead), shadows are SHORT. This Stage 4 idea supports the Stage 5 work on the Sun, Earth and how shadows change through the day.",
    description: 'Move the light source to stretch and shrink shadows.',
    estimatedMinutes: 6,
    xpReward: 60,
    difficulty: 2,
    stickerId: 'sticker_shadow',
    stickerName: 'Shadow Weaver',
    stickerEmoji: '🌗',
    type: 'shadow-lab',
    challenges: [
      {
        instructions: "Slide the sun height to make the palm tree's shadow exactly 8 meters long.",
        treeHeight: 10,
        minAngle: 15,
        maxAngle: 75,
        targetLength: 8,
        hint: "To make a shadow SHORTER, the sun must be HIGHER (closer to overhead). To make it LONGER, the sun must be LOWER (near the horizon).",
        explanation: "Light travels in straight lines. When the light source is low (small angle), the shadow is long. As the light source rises, the shadow shrinks. At the right angle, the 10 m tree casts an 8 m shadow."
      }
    ]
  },
  {
    id: 'sci_mock',
    subject: 'science',
    title: 'Science Mock Test',
    topic: 'Mixed exam practice (all Science topics)',
    objectiveCodes: ['Mixed'],
    studyNote:
      "Exam tips: science questions often test whether you can explain WHY, not just name something. Use the keyword in your head (gravity, vibration, particles, anther…). Read each option fully before choosing. Attempt every question, even if you have to make your best sensible guess.",
    description: 'A mixed test covering forces, sound, magnets, materials, living things and Earth & space.',
    estimatedMinutes: 12,
    xpReward: 120,
    difficulty: 3,
    stickerId: 'sticker_sci_medal',
    stickerName: 'Science Test Ace',
    stickerEmoji: '🥇',
    type: 'quiz',
    challenges: [
      {
        question: "Which force pulls a falling apple towards the ground?",
        options: ['Gravity', 'Friction', 'Upthrust', 'Magnetism'],
        correctIndex: 0,
        explanation: "Gravity pulls objects down towards the Earth.",
        hint: "Which force always pulls objects towards the Earth?",
        code: 'Mixed'
      },
      {
        question: "What makes a drum sound LOUDER?",
        options: ['Hitting it harder so it vibrates more', 'Making it colder', 'Using a shorter stick', 'Hitting it more gently'],
        correctIndex: 0,
        explanation: "A bigger vibration carries more energy and makes a louder sound, so hitting it harder makes it louder.",
        hint: "Loudness depends on the SIZE of the vibration.",
        code: 'Mixed'
      },
      {
        question: "A magnet will attract which object?",
        options: ['A steel paperclip', 'A plastic ruler', 'A glass marble', 'A wooden peg'],
        correctIndex: 0,
        explanation: "Magnets attract magnetic materials like iron and steel. Plastic, glass and wood are not magnetic.",
        hint: "Magnets attract certain metals such as steel.",
        code: 'Mixed'
      },
      {
        question: "In which state of matter are the particles tightly packed and unable to move from their places?",
        options: ['Solid', 'Liquid', 'Gas', 'None of them'],
        correctIndex: 0,
        explanation: "In a solid, particles are packed tightly in fixed positions, giving the solid a fixed shape.",
        hint: "Which state keeps its own shape?",
        code: 'Mixed'
      },
      {
        question: "Which part of a flower produces pollen?",
        options: ['The anther', 'The stigma', 'The ovary', 'The petal'],
        correctIndex: 0,
        explanation: "The anther is the male part that makes pollen.",
        hint: "It's the male part held up on a filament.",
        code: 'Mixed'
      },
      {
        question: "Where are most nutrients from food absorbed into the blood?",
        options: ['The small intestine', 'The stomach', 'The large intestine', 'The mouth'],
        correctIndex: 0,
        explanation: "The small intestine absorbs most nutrients into the bloodstream; the large intestine mainly absorbs water.",
        hint: "It's the long, narrow part after the stomach.",
        code: 'Mixed'
      },
      {
        question: "Which gas makes up most of the air in Earth's atmosphere?",
        options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Helium'],
        correctIndex: 0,
        explanation: "About 78% of the air is nitrogen; oxygen is about 21%.",
        hint: "It's not oxygen — it makes up nearly four-fifths of the air.",
        code: 'Mixed'
      },
      {
        question: "In a fair test, what should you do with all the variables EXCEPT the one you are investigating?",
        options: ['Keep them the same', 'Change them all', 'Ignore them', 'Measure them as results'],
        correctIndex: 0,
        explanation: "A fair test changes only one variable and keeps all the others the same, so the test is fair.",
        hint: "Change ONE thing; keep the rest the same.",
        code: 'Mixed'
      }
    ]
  }
];
