import {
  WordScrambleChallenge,
  MistakeChallenge,
  QuizQuestion,
  FillBlankChallenge,
  DetectiveMission,
} from '../types';

export const SCRAMBLE_CHALLENGES: WordScrambleChallenge[] = [
  {
    id: 's1',
    prompt: 'Build the affirmative sentence: (condition first)',
    words: ['If', 'I', 'study', 'hard,', 'I', 'will', 'pass', 'the', 'exam.'],
    correctOrder: ['If', 'I', 'study', 'hard,', 'I', 'will', 'pass', 'the', 'exam.'],
    hasComma: true,
    ruleTip: 'When "If" starts the sentence, don\'t forget the comma before the main clause!',
  },
  {
    id: 's2',
    prompt: 'Build the inverted sentence: (main clause first, NO comma!)',
    words: ['We', 'will', 'study', 'indoors', 'if', 'it', 'rains', 'tomorrow.'],
    correctOrder: ['We', 'will', 'study', 'indoors', 'if', 'it', 'rains', 'tomorrow.'],
    hasComma: false,
    ruleTip: 'When the main clause comes first, do NOT put a comma before "if".',
  },
  {
    id: 's3',
    prompt: 'Build the negative First Conditional sentence:',
    words: ['If', 'he', "doesn't", 'practice,', 'he', "won't", 'improve', 'his', 'skills.'],
    correctOrder: ['If', 'he', "doesn't", 'practice,', 'he', "won't", 'improve', 'his', 'skills.'],
    hasComma: true,
    ruleTip: 'Use "doesn\'t" in the if-clause and "won\'t" in the main clause.',
  },
  {
    id: 's4',
    prompt: 'Build the teamwork sentence:',
    words: ['If', 'we', 'work', 'as', 'a', 'team,', 'we', 'will', 'succeed.'],
    correctOrder: ['If', 'we', 'work', 'as', 'a', 'team,', 'we', 'will', 'succeed.'],
    hasComma: true,
    ruleTip: 'Present Simple in the condition + will + base verb in the result.',
  },
  {
    id: 's5',
    prompt: 'Build the question form:',
    words: ['What', 'will', 'you', 'do', 'if', 'you', 'finish', 'early?'],
    correctOrder: ['What', 'will', 'you', 'do', 'if', 'you', 'finish', 'early?'],
    hasComma: false,
    ruleTip: 'For questions, invert "will" and subject: "What will you do...?"',
  },
  {
    id: 's6',
    prompt: 'Build the technology sentence:',
    words: ['If', 'she', 'uses', 'an', 'educational', 'app,', 'she', 'will', 'learn', 'faster.'],
    correctOrder: ['If', 'she', 'uses', 'an', 'educational', 'app,', 'she', 'will', 'learn', 'faster.'],
    hasComma: true,
    ruleTip: 'Notice "she uses" has the 3rd person singular -s in Present Simple.',
  },
];

export const FILL_BLANK_CHALLENGES: FillBlankChallenge[] = [
  {
    id: 'fb1',
    sentencePrompt: 'If I study regularly, I _______ improve my English.',
    options: ['will', 'did', 'am', 'was'],
    correctOption: 'will',
    explanation: 'The main clause uses "will + base verb" to express the probable future result.',
    clauseFocus: 'Result (will + verb)',
  },
  {
    id: 'fb2',
    sentencePrompt: 'If she _______ her homework early, she will have more free time.',
    options: ['finishes', 'will finish', 'finished', 'is finishing'],
    correctOption: 'finishes',
    explanation: 'The if-clause requires the Present Simple. With "she", add -es to make "finishes".',
    clauseFocus: 'Condition (Present Simple)',
  },
  {
    id: 'fb3',
    sentencePrompt: 'We will protect natural resources if we _______ water at school.',
    options: ['save', 'will save', 'saved', 'are saving'],
    correctOption: 'save',
    explanation: 'Even when the if-clause comes second, it always takes the Present Simple form ("save").',
    clauseFocus: 'Condition (Present Simple)',
  },
  {
    id: 'fb4',
    sentencePrompt: 'If he doesn\'t review his vocabulary notes, he _______ pass the quiz.',
    options: ['won\'t', 'doesn\'t', 'isn\'t', 'wasn\'t'],
    correctOption: 'won\'t',
    explanation: '"won\'t" (will not) expresses the negative future result.',
    clauseFocus: 'Result (will + verb)',
  },
  {
    id: 'fb5',
    sentencePrompt: 'What _______ you do if you arrive at school late?',
    options: ['will', 'do', 'did', 'are'],
    correctOption: 'will',
    explanation: 'In question form, use "will" before the subject: "What will you do if...?"',
    clauseFocus: 'Result (will + verb)',
  },
];

export const DETECTIVE_MISSIONS: DetectiveMission[] = [
  {
    id: 'det-1',
    title: 'The Case of the Missing English Trophy',
    location: 'Oakridge Academy Library',
    briefing:
      'The prestigious First Conditional Challenge Trophy has vanished from the library display case! Detective Alex needs your grammar deductive skills to interrogate suspects and follow clues.',
    resolution:
      'Mystery Solved! By correctly forecasting the conditional events, you found the trophy safely in the auditorium where the rehearsal team placed it!',
    clues: [
      {
        id: 'clue-1',
        stepTitle: 'Step 1: Check the Library Camera Logs',
        storySnippet:
          'The librarian states that a student borrowed the display key earlier today.',
        conditionalChoice: {
          prompt: 'Predict the clue outcome: "If we inspect the visitor logbook, _______"',
          options: [
            {
              text: 'we will identify who signed out the key.',
              isCorrect: true,
              feedback: 'Spot on! The logbook reveals student Leo took the key for class decorating.',
            },
            {
              text: 'we will identifying the locker room.',
              isCorrect: false,
              feedback: 'Incorrect verb form! Modal "will" must be followed by base verb "identify".',
            },
            {
              text: 'we identified the trophy yesterday.',
              isCorrect: false,
              feedback: 'That is past tense. The detective is looking forward into future evidence.',
            },
          ],
        },
      },
      {
        id: 'clue-2',
        stepTitle: 'Step 2: Follow Leo to the School Auditorium',
        storySnippet:
          'Leo is rehearsing on the auditorium stage with the school presentation team.',
        conditionalChoice: {
          prompt: 'Interview Leo: "If you ask Leo politely about the trophy, _______"',
          options: [
            {
              text: 'he will explain why he moved it to the stage podium.',
              isCorrect: true,
              feedback: 'Excellent! Leo says: "I moved it for the award ceremony rehearsal!"',
            },
            {
              text: 'he will explaining the science lab.',
              isCorrect: false,
              feedback: 'Remember to use the base verb after "will": "will explain".',
            },
            {
              text: 'he explained it last week.',
              isCorrect: false,
              feedback: 'The conversation is happening right now with future consequences.',
            },
          ],
        },
      },
      {
        id: 'clue-3',
        stepTitle: 'Step 3: Return the Trophy to the Showcase',
        storySnippet:
          'The team finishes the rehearsal and is ready to restore the trophy.',
        conditionalChoice: {
          prompt: 'Conclude the investigation: "If we return the trophy to the glass case, _______"',
          options: [
            {
              text: 'the school principal will congratulate the team.',
              isCorrect: true,
              feedback: 'Case Closed! The principal awards you the "Mission Complete" detective badge!',
            },
            {
              text: 'the school principal will congratulated the team.',
              isCorrect: false,
              feedback: 'Do not use past participle (-ed) after "will". Use base verb "congratulate".',
            },
            {
              text: 'the principal will be congratulating yesterday.',
              isCorrect: false,
              feedback: 'Incompatible time marker.',
            },
          ],
        },
      },
    ],
  },
];

export const MISTAKE_CHALLENGES: MistakeChallenge[] = [
  {
    id: 'err1',
    sentence: 'If I will study hard, I will pass the exam.',
    hasError: true,
    errorPart: 'will study',
    correctedSentence: 'If I study hard, I will pass the exam.',
    explanation: 'Never use "will" in the if-clause! In First Conditional, use Present Simple after "if".',
    ruleCategory: 'No Will in If-Clause',
  },
  {
    id: 'err2',
    sentence: 'If she practices English, she will speak more confidently.',
    hasError: false,
    correctedSentence: 'If she practices English, she will speak more confidently.',
    explanation: 'Perfect! "practices" is correctly conjugated in Present Simple, and "will speak" is in the main clause with a comma separating them.',
    ruleCategory: 'Present Simple Verb',
  },
  {
    id: 'err3',
    sentence: 'We will study indoors, if it rains tomorrow.',
    hasError: true,
    errorPart: 'indoors, if',
    correctedSentence: 'We will study indoors if it rains tomorrow.',
    explanation: 'When the main clause comes first and "if" is in the middle, DO NOT use a comma!',
    ruleCategory: 'Comma Rule',
  },
  {
    id: 'err4',
    sentence: 'If he don\'t finish his homework, his teacher will be upset.',
    hasError: true,
    errorPart: "don't finish",
    correctedSentence: 'If he doesn\'t finish his homework, his teacher will be upset.',
    explanation: 'Subject "he" takes "doesn\'t" in the Present Simple, not "don\'t"!',
    ruleCategory: 'Present Simple Verb',
  },
  {
    id: 'err5',
    sentence: 'If you ask the teacher, you will understood the lesson.',
    hasError: true,
    errorPart: 'will understood',
    correctedSentence: 'If you ask the teacher, you will understand the lesson.',
    explanation: 'After "will", always use the base verb (infinitive without to): "will understand", not "will understood".',
    ruleCategory: 'Base Verb After Will',
  },
  {
    id: 'err6',
    sentence: 'If students recycle paper, they will help the planet.',
    hasError: false,
    correctedSentence: 'If students recycle paper, they will help the planet.',
    explanation: 'Completely correct! "recycle" is Present Simple, followed by a comma and "will help".',
    ruleCategory: 'No Will in If-Clause',
  },
  {
    id: 'err7',
    sentence: 'What you will do if you miss the school bus?',
    hasError: true,
    errorPart: 'you will do',
    correctedSentence: 'What will you do if you miss the school bus?',
    explanation: 'In question form, invert the auxiliary "will" and subject: "What will you do...?"',
    ruleCategory: 'Base Verb After Will',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which is the correct formula for the First Conditional?',
    options: [
      'If + Past Simple, would + base verb',
      'If + Present Simple, will + base verb',
      'If + will + verb, Present Simple',
      'If + Present Continuous, will + -ing',
    ],
    correctIndex: 1,
    explanation: 'The First Conditional formula is: If + Present Simple, will + base verb.',
    ruleCategory: 'Structure & Form',
  },
  {
    id: 'q2',
    question: 'Which sentence is grammatically CORRECT?',
    options: [
      'If it will rain tomorrow, we will stay at home.',
      'If it rains tomorrow, we will stay at home.',
      'If it rains tomorrow, we would stay at home.',
      'If it rain tomorrow, we will stays at home.',
    ],
    correctIndex: 1,
    explanation: 'We must use Present Simple in the if-clause: "If it rains..." (never "will rain").',
    ruleCategory: 'No Will in If-Clause',
  },
  {
    id: 'q3',
    question: 'When the main clause comes FIRST, do we need a comma?',
    options: [
      'Yes, always put a comma before "if".',
      'No, do not use a comma when "if" is in the middle of the sentence.',
      'Only if the sentence is very long.',
      'Yes, before and after "if".',
    ],
    correctIndex: 1,
    explanation: 'Example: "We will go to the park if the sun shines." No comma is used when the main clause comes first!',
    ruleCategory: 'Punctuation & Comma',
  },
  {
    id: 'q4',
    question: 'Complete the sentence: "If she _______ hard, she _______ her driving test."',
    options: [
      'studies / will pass',
      'will study / passes',
      'study / will pass',
      'studies / pass',
    ],
    correctIndex: 0,
    explanation: 'Third-person singular "she" takes "studies" in Present Simple, and the main clause uses "will pass".',
    ruleCategory: 'Subject-Verb Agreement',
  },
  {
    id: 'q5',
    question: 'Choose the correct negative form: "If he _______ his jacket, he _______ cold."',
    options: [
      'doesn\'t wear / will be',
      'won\'t wear / is',
      'don\'t wear / will be',
      'not wear / will be',
    ],
    correctIndex: 0,
    explanation: 'In the if-clause, use "doesn\'t wear" for "he", and "will be" in the main clause.',
    ruleCategory: 'Negative Form',
  },
  {
    id: 'q6',
    question: 'What is the short form of "will not"?',
    options: [
      'wont',
      'won\'t',
      'willn\'t',
      'wouldn\'t',
    ],
    correctIndex: 1,
    explanation: '"won\'t" is the contraction for "will not" (e.g., "He won\'t be late").',
    ruleCategory: 'Negative Form',
  },
  {
    id: 'q7',
    question: 'Choose the correct question form:',
    options: [
      'What you will do if you get 100 on the exam?',
      'What will you do if you get 100 on the exam?',
      'What do you will do if you will get 100 on the exam?',
      'What will you do if you will get 100 on the exam?',
    ],
    correctIndex: 1,
    explanation: 'In questions: Question word + will + subject + base verb + if-clause: "What will you do if you get...?"',
    ruleCategory: 'Question Form',
  },
  {
    id: 'q8',
    question: 'Identify the probable result: "If we save water in the school restrooms, _______"',
    options: [
      'we will protect natural resources.',
      'we protected natural resources yesterday.',
      'we will protecting water bottles.',
      'we would have more water last week.',
    ],
    correctIndex: 0,
    explanation: '"we will protect natural resources" is the probable future result in First Conditional.',
    ruleCategory: 'Meaning & Result',
  },
  {
    id: 'q9',
    question: 'Which verb form goes AFTER "will" or "won\'t"?',
    options: [
      'Past participle (-ed)',
      'Gerund (-ing)',
      'Base verb (infinitive without to)',
      'Third-person verb with -s',
    ],
    correctIndex: 2,
    explanation: 'Always use the base verb after modal "will" (e.g. "will help", "will study", "won\'t fail").',
    ruleCategory: 'Modal Verb Structure',
  },
  {
    id: 'q10',
    question: '"If teachers include games, students will enjoy practicing English." What is "If teachers include games"?',
    options: [
      'The main result clause',
      'The condition (if-clause)',
      'A past regret',
      'An impossible situation',
    ],
    correctIndex: 1,
    explanation: 'The clause starting with "if" is the condition: it describes the possible situation that triggers the result.',
    ruleCategory: 'Clause Identification',
  },
];
