export interface GrammarRuleSection {
  id: string;
  title: string;
  summary: string;
  formula: string;
  explanation: string;
  examples: {
    sentence: string;
    condition: string;
    result: string;
    note: string;
  }[];
}

export const GRAMMAR_STRUCTURE_DATA = {
  title: 'Structure & Form of the First Conditional',
  description: 'We use the First Conditional to talk about real and possible situations in the present or future, and their probable results.',
  formula: 'If + Present Simple, will + base verb',
  mainComponents: [
    {
      part: 'If-Clause (Condition)',
      tense: 'Present Simple',
      function: 'Presents a realistic condition or action that might happen.',
      example: 'If students study regularly...',
      color: 'emerald',
      ruleHighlight: 'Use Present Simple here. NEVER use "will" after "if"!',
    },
    {
      part: 'Main Clause (Result)',
      tense: 'Will + Base Verb',
      function: 'Expresses the likely future result or consequence of the condition.',
      example: '...they will improve their English.',
      color: 'blue',
      ruleHighlight: 'Use will / won\'t followed by the pure infinitive without "to".',
    },
  ],
  standardExamples: [
    {
      full: 'If students study regularly, they will improve their English.',
      ifPart: 'If students study regularly',
      resultPart: 'they will improve their English',
      situation: 'Regular habit leads to noticeable language progress.',
    },
    {
      full: 'If I finish my homework, I will watch a movie.',
      ifPart: 'If I finish my homework',
      resultPart: 'I will watch a movie',
      situation: 'Completing responsibility unlocks leisure time.',
    },
    {
      full: 'If she practices English, she will speak more confidently.',
      ifPart: 'If she practices English',
      resultPart: 'she will speak more confidently',
      situation: 'Daily practice builds speaking courage.',
    },
    {
      full: 'If we use educational apps, we will learn new vocabulary.',
      ifPart: 'If we use educational apps',
      resultPart: 'we will learn new vocabulary',
      situation: 'Digital tools make vocabulary expansion fun and active.',
    },
    {
      full: 'If you ask questions, you will understand the lesson better.',
      ifPart: 'If you ask questions',
      resultPart: 'you will understand the lesson better',
      situation: 'Curiosity in the classroom creates deeper understanding.',
    },
  ],
};

export const GRAMMAR_FORMS_DATA = [
  {
    type: 'Affirmative (+)',
    formula: 'If + subject + present simple verb, subject + will + base verb',
    example: 'If I study hard, I will pass the exam.',
    breakdown: [
      { text: 'If I study hard', tag: 'Condition (Present Simple)' },
      { text: ',', tag: 'Comma' },
      { text: 'I will pass the exam.', tag: 'Result (will + pass)' },
    ],
    explanation: 'Both the condition and the result are positive actions.',
    extraExample: 'If we practice every day, we will win the school spelling bee.',
  },
  {
    type: 'Negative (-)',
    formula: 'If + subject + don\'t/doesn\'t + verb, subject + won\'t + base verb',
    example: 'If he doesn\'t study, he won\'t pass the exam.',
    breakdown: [
      { text: 'If he doesn\'t study', tag: 'Negative Condition (doesn\'t)' },
      { text: ',', tag: 'Comma' },
      { text: 'he won\'t pass the exam.', tag: 'Negative Result (won\'t = will not)' },
    ],
    explanation: 'Notice that you use "don\'t" or "doesn\'t" in the if-clause, and "won\'t" (will not) in the main clause.',
    extraExample: 'If you don\'t set an alarm, you won\'t wake up on time.',
  },
  {
    type: 'Question (?)',
    formula: '(Wh- question word) + will + subject + base verb + if + subject + present simple?',
    example: 'What will you do if you finish your homework early?',
    breakdown: [
      { text: 'What will you do', tag: 'Result Question (will + subject + verb)' },
      { text: 'if you finish your homework early?', tag: 'Condition (if-clause at the end, NO comma!)' },
    ],
    explanation: 'To ask a question, invert the subject and "will" in the main clause. If the "if-clause" comes second, do not use a comma!',
    extraExample: 'Will you help me if I don\'t understand the grammar rules?',
  },
];

export const GRAMMAR_COMMON_MISTAKES = [
  {
    id: 'mistake-1',
    title: 'The "Will in the If-Clause" Trap',
    wrong: 'If I will study, I will pass the exam.',
    correct: 'If I study, I will pass the exam.',
    ruleExplanation: 'Never put "will" inside the "if" clause! Even though both events are in the future, English grammar requires the Present Simple after "if".',
    tip: 'Remember: "If" is allergic to "will"!',
    badge: 'Crucial Rule #1',
  },
  {
    id: 'mistake-2',
    title: 'Clause Position & The Comma Rule',
    wrong: 'We will study indoors, if it rains.',
    correct: 'We will study indoors if it rains.  OR  If it rains, we will study indoors.',
    ruleExplanation: 'When the "if-clause" comes first, use a comma (,). When the "if-clause" comes second, DO NOT use a comma.',
    tip: 'If first = Comma inside! Main clause first = No comma needed!',
    badge: 'Punctuation Rule',
  },
  {
    id: 'mistake-3',
    title: 'Third-Person Singular (-s / -es) in Condition',
    wrong: 'If she practice English, she will speak fluently.',
    correct: 'If she practices English, she will speak fluently.',
    ruleExplanation: 'Since the if-clause is in the Present Simple, don\'t forget the third-person -s or -es for he, she, and it.',
    tip: 'He, She, It needs an -s in the present simple condition!',
    badge: 'Verb Agreement',
  },
  {
    id: 'mistake-4',
    title: 'Base Verb After Will',
    wrong: 'If we work together, we will finished the project faster.',
    correct: 'If we work together, we will finish the project faster.',
    ruleExplanation: 'After modal verbs like "will" or "won\'t", always use the clean base form of the verb (bare infinitive). Never add -ed, -s, or -ing.',
    tip: 'will + clean verb (no -ing, no -ed, no -s)!',
    badge: 'Modal Verb Rule',
  },
];
