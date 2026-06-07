/**
 * MAGGIE — Demo 1 mock data (100% SYNTHETIC).
 *
 * ⚠️ This file contains NO real patient data. Every value here is invented for a
 * sandbox/classroom demo while Epic SMART on FHIR auth is still pending. Nothing
 * here is medical advice, diagnosis, treatment, or dosing guidance.
 *
 * When Epic integration lands, a deterministic FHIR -> GameContext mapper
 * (see docs/architecture.md) will replace this module. The shapes below are
 * intentionally close to that future GameContext so screens won't need rewrites.
 */

export const DATA_SOURCE = 'SYNTHETIC_SANDBOX_DEMO' as const;

export const DISCLAIMER_SHORT =
  'Synthetic sandbox data only — not a real patient. Not medical advice.';

export const DISCLAIMER_LONG =
  'Maggie is a fictional demo character. All conditions, medications, devices, ' +
  'and symptoms below are made up for a classroom prototype. MAGGIE is a learning ' +
  'game — it does not diagnose, treat, prescribe, change doses, or message your ' +
  'care team. Always rely on your own clinicians and approved sources.';

export type Pronouns = 'she/her';

export interface MaggieProfile {
  displayName: string;
  ageRange: string;
  pronouns: Pronouns;
  personality: string[];
  learningStyle: string[];
  /** Always true for Demo 1 — drives the "synthetic" badges in the UI. */
  isSynthetic: true;
}

export const maggieProfile: MaggieProfile = {
  displayName: 'Maggie',
  ageRange: 'young adult',
  pronouns: 'she/her',
  personality: ['curious', 'playful', 'determined', 'encouraging'],
  learningStyle: [
    'visual learning',
    'hands-on learning',
    'concise explanations',
    'memory recall',
  ],
  isSynthetic: true,
};

/** How confident the app is allowed to be about a fact, for UI framing. */
export type Confidence = 'sandbox-record' | 'maggie-believes';

export interface Condition {
  id: string;
  label: string;
  note?: string;
  confidence: Confidence;
}

export const conditions: Condition[] = [
  { id: 'c-t1d', label: 'Type 1 Diabetes', confidence: 'sandbox-record' },
  {
    id: 'c-retinopathy',
    label: 'Diabetic Retinopathy',
    note: 'Left eye concern',
    confidence: 'sandbox-record',
  },
  {
    id: 'c-bp-kidney',
    label: 'High Blood Pressure / Kidney Function Concern',
    confidence: 'sandbox-record',
  },
  {
    id: 'c-mood',
    label: 'Anxiety and Depression',
    confidence: 'sandbox-record',
  },
  { id: 'c-vit-d', label: 'Low Vitamin D', confidence: 'sandbox-record' },
  { id: 'c-iron', label: 'Low Iron', confidence: 'sandbox-record' },
];

export interface Device {
  id: string;
  label: string;
  kind: string;
  confidence: Confidence;
}

export const devices: Device[] = [
  {
    id: 'd-dexcom',
    label: 'Dexcom G7',
    kind: 'Continuous glucose monitor (CGM)',
    confidence: 'sandbox-record',
  },
  {
    id: 'd-omnipod',
    label: 'Omnipod 5',
    kind: 'Insulin pump',
    confidence: 'sandbox-record',
  },
];

export interface Medication {
  id: string;
  name: string;
  /** Plain-language "what it's generally for" — educational, not prescriptive. */
  generalUse: string;
  /** Links this med to a condition id, used by the Medication Match game. */
  relatedConditionId: string;
  confidence: Confidence;
}

export const medications: Medication[] = [
  {
    id: 'm-novolog',
    name: 'Novolog',
    generalUse: 'fast-acting insulin used in a Type 1 Diabetes insulin plan',
    relatedConditionId: 'c-t1d',
    confidence: 'sandbox-record',
  },
  {
    id: 'm-sertraline',
    name: 'Sertraline',
    generalUse: 'commonly associated with anxiety and depression care',
    relatedConditionId: 'c-mood',
    confidence: 'sandbox-record',
  },
  {
    id: 'm-losartan',
    name: 'Losartan',
    generalUse:
      'commonly associated with blood pressure and kidney-protection plans',
    relatedConditionId: 'c-bp-kidney',
    confidence: 'sandbox-record',
  },
  {
    id: 'm-vit-d',
    name: 'Vitamin D',
    generalUse: 'supplement Maggie tracks for low Vitamin D',
    relatedConditionId: 'c-vit-d',
    confidence: 'sandbox-record',
  },
  {
    id: 'm-vit-b',
    name: 'Vitamin B',
    generalUse: 'supplement Maggie tracks for energy',
    relatedConditionId: 'c-iron',
    confidence: 'sandbox-record',
  },
  {
    id: 'm-vit-c',
    name: 'Vitamin C',
    generalUse: 'supplement Maggie takes',
    relatedConditionId: 'c-iron',
    confidence: 'maggie-believes',
  },
];

/**
 * Things MAGGIE shows as Maggie's *personal belief*, NOT as a verified claim.
 * The UI must frame these as "Maggie believes…" + "ask your care team / an
 * approved source." This is deliberately kept out of the graded quiz content.
 */
export interface Belief {
  id: string;
  maggieBelieves: string;
  checkWith: string;
}

export const beliefs: Belief[] = [
  {
    id: 'b-vitc-dexcom',
    maggieBelieves:
      'Maggie believes Vitamin C might affect her Dexcom CGM glucose readings.',
    checkWith:
      'MAGGIE does not confirm this. Ask your care team or an approved source.',
  },
];

/* ------------------------------------------------------------------ */
/* Symptom cards                                                       */
/* ------------------------------------------------------------------ */

export type GlucoseDirection = 'high' | 'low';

export interface SymptomCard {
  id: string;
  label: string;
  direction: GlucoseDirection;
}

export const highBloodSugarSymptoms: SymptomCard[] = [
  { id: 's-cotton-mouth', label: 'cotton mouth', direction: 'high' },
  { id: 's-headache', label: 'headache', direction: 'high' },
  { id: 's-fatigue', label: 'fatigue', direction: 'high' },
  { id: 's-short-breath', label: 'shortness of breath', direction: 'high' },
  { id: 's-racing-heart', label: 'racing heart', direction: 'high' },
];

export const lowBloodSugarSymptoms: SymptomCard[] = [
  { id: 's-shakiness', label: 'shakiness', direction: 'low' },
  { id: 's-weakness', label: 'weakness', direction: 'low' },
  { id: 's-sweating', label: 'sweating', direction: 'low' },
  { id: 's-disorientation', label: 'disorientation', direction: 'low' },
];

export const allSymptoms: SymptomCard[] = [
  ...lowBloodSugarSymptoms,
  ...highBloodSugarSymptoms,
];

/* ------------------------------------------------------------------ */
/* Medication Match mini-game                                          */
/* ------------------------------------------------------------------ */

export interface MatchOption {
  id: string;
  label: string;
}

export interface MedicationMatchQuestion {
  id: string;
  medicationId: string;
  prompt: string;
  options: MatchOption[];
  correctOptionId: string;
  /** Gentle confirmation shown after a correct match. */
  positive: string;
}

export const medicationMatchQuestions: MedicationMatchQuestion[] = [
  {
    id: 'mm-novolog',
    medicationId: 'm-novolog',
    prompt: 'What does Maggie use Novolog for?',
    options: [
      { id: 'o-t1d', label: 'Type 1 Diabetes / insulin plan' },
      { id: 'o-mood', label: 'Anxiety and Depression' },
      { id: 'o-bp', label: 'High Blood Pressure / Kidney Function' },
    ],
    correctOptionId: 'o-t1d',
    positive: 'Right! Novolog is part of Maggie’s Type 1 Diabetes insulin plan.',
  },
  {
    id: 'mm-sertraline',
    medicationId: 'm-sertraline',
    prompt: 'Which concern does Maggie connect with Sertraline?',
    options: [
      { id: 'o-bp', label: 'High Blood Pressure / Kidney Function' },
      { id: 'o-mood', label: 'Anxiety and Depression' },
      { id: 'o-t1d', label: 'Type 1 Diabetes / insulin plan' },
    ],
    correctOptionId: 'o-mood',
    positive: 'Nice recall! Maggie links Sertraline with anxiety and depression.',
  },
  {
    id: 'mm-losartan',
    medicationId: 'm-losartan',
    prompt: 'What does Maggie associate with Losartan?',
    options: [
      { id: 'o-mood', label: 'Anxiety and Depression' },
      { id: 'o-t1d', label: 'Type 1 Diabetes / insulin plan' },
      { id: 'o-bp', label: 'High Blood Pressure / Kidney Function Concern' },
    ],
    correctOptionId: 'o-bp',
    positive:
      'You got it! Maggie ties Losartan to her blood pressure / kidney plan.',
  },
];

/* ------------------------------------------------------------------ */
/* Symptom Check mini-game                                             */
/* ------------------------------------------------------------------ */

export interface SymptomCheckQuestion {
  id: string;
  prompt: string;
  /** Cards offered (shuffled in the UI). */
  choiceIds: string[];
  /** Correct selection = the low-blood-sugar set. */
  correctIds: string[];
}

export const symptomCheckQuestion: SymptomCheckQuestion = {
  id: 'sc-low-sugar',
  prompt: 'Which symptoms does Maggie associate with LOW blood sugar?',
  choiceIds: allSymptoms.map((s) => s.id),
  correctIds: lowBloodSugarSymptoms.map((s) => s.id),
};

/**
 * Gentle remediation content for the symptom question. Shown as a split card.
 * Tone: encouraging, non-shaming, educational — never corrective about Maggie's
 * own body or prescriptive about what to do.
 */
export const symptomRemediation = {
  title: 'Let’s sort these together',
  encouragement:
    'No worries — high and low blood sugar can feel similar at first. Here’s how Maggie tells them apart.',
  high: {
    heading: 'High blood sugar signs Maggie notices',
    cardIds: highBloodSugarSymptoms.map((s) => s.id),
  },
  low: {
    heading: 'Low blood sugar signs Maggie notices',
    cardIds: lowBloodSugarSymptoms.map((s) => s.id),
  },
  closing:
    'These are Maggie’s personal cues for the game — everyone is different. Check your own plan with your care team.',
} as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const symptomById = (id: string): SymptomCard | undefined =>
  allSymptoms.find((s) => s.id === id);

export const conditionById = (id: string): Condition | undefined =>
  conditions.find((c) => c.id === id);

export const medicationById = (id: string): Medication | undefined =>
  medications.find((m) => m.id === id);
