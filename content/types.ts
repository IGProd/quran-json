/**
 * Content model — source-ready and update-friendly.
 *
 * All user-facing knowledge (scenarios, steps, documents, authorities, FAQ,
 * sources) is described by these types so the data layer stays a single,
 * editable source of truth. Replace the data files without touching UI.
 */

import type { StateKey } from '@/theme/tokens';

/**
 * Semantic step badges. These describe a step's role in the flow and map to a
 * system-state color + Arabic label in content/badges.ts.
 */
export type BadgeKey =
  | 'now'
  | 'next'
  | 'caseDependent'
  | 'mandatory'
  | 'mayBeRequired'
  | 'judicial'
  | 'transfer'
  | 'abroad'
  | 'completed';

/** Stable identifiers for the eight branches of the procedure. */
export type ScenarioId =
  | 'home' // وفاة طبيعية في البيت
  | 'hospital' // وفاة في مستشفى أو مصحة
  | 'judicial' // وفاة غير طبيعية / قضائية
  | 'sameCity' // الدفن في نفس المدينة
  | 'otherCity' // نقل الجثمان ودفنه في مدينة أخرى
  | 'fromAbroad' // دخول الجثمان إلى المغرب من الخارج
  | 'buryAbroad' // وفاة في المغرب ودفن في الخارج
  | 'registerAbroad'; // تسجيل وفاة مغربي وقعت بالخارج

/** Stage of the overall journey, used to group documents and steps. */
export type Stage =
  | 'confirm' // إثبات الوفاة
  | 'declare' // التصريح والتسجيل
  | 'authorize' // رخصة الدفن
  | 'transfer' // النقل
  | 'judicial' // المسطرة القضائية
  | 'consular' // المسطرة القنصلية
  | 'burial'; // الدفن

export type DocCategory =
  | 'personal' // وثائق شخصية
  | 'medical' // وثائق طبية
  | 'administrative' // وثائق إدارية
  | 'transfer' // وثائق النقل
  | 'judicial' // وثائق قضائية
  | 'consular'; // وثائق قنصلية

export interface DocumentItem {
  id: string;
  name: string;
  /** When this document is needed (short). */
  whenNeeded: string;
  /** Who usually issues or requests it. */
  issuedBy: string;
  /** Essential everywhere, or only in some cases. */
  necessity: 'essential' | 'conditional';
  category: DocCategory;
  /** Stage at which it first becomes relevant. */
  stage: Stage;
  /** Short expandable note with practical guidance. */
  note: string;
  /** Icon name from the app icon set. */
  icon: string;
}

export interface Authority {
  id: string;
  name: string;
  role: string;
  /** Two–three short lines describing what they handle. */
  handles: string[];
  icon: string;
  /** When the family typically deals with them. */
  whenInvolved: string;
}

/** A single guided step inside a scenario workflow. */
export interface WorkflowStep {
  id: string;
  title: string;
  /** Two to three short lines, no long paragraphs. */
  summary: string;
  /** Why this step matters — reassurance + context. */
  why: string;
  /** "ماذا تفعل الآن" */
  doNow: string;
  /** Who handles this step. */
  handledBy: string;
  /** Document ids required at this step. */
  documents: string[];
  /** "ما الذي يأتي بعد ذلك" */
  next: string;
  /** Optional warning when the step depends on another authority. */
  dependsOn?: string;
  stage: Stage;
  badges: BadgeKey[];
}

export interface Scenario {
  id: ScenarioId;
  title: string;
  /** One-line subtitle for cards. */
  subtitle: string;
  /** Hero description shown at the top of the workflow. */
  hero: string;
  icon: string;
  /** Illustration key (text-free vector). */
  illustration: IllustrationKey;
  /** Accent state used to tint the scenario. */
  accent: StateKey;
  /** Estimated number of main stages (for the card meta). */
  stepsCount: number;
  steps: WorkflowStep[];
  /** Related source ids. */
  sources: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** Optional scenario this question relates to, for filtering. */
  scenario?: ScenarioId;
}

export interface SourceItem {
  id: string;
  title: string;
  authority: string;
  /** What topics this source covers. */
  topic: string;
  /** Optional reference label (kept generic and update-ready). */
  reference?: string;
}

/** Keys for the in-app, text-free vector illustrations. */
export type IllustrationKey =
  | 'home'
  | 'hospital'
  | 'judicial'
  | 'sameCity'
  | 'transfer'
  | 'arrival'
  | 'departure'
  | 'consulate'
  | 'documents'
  | 'courtyard'
  | 'path'
  | 'map';

/** Decision-tree node: either a question with branches, or a result. */
export interface DecisionNode {
  id: string;
  kind: 'question' | 'result';
  /** Question prompt or result title. */
  prompt: string;
  /** Optional supporting line. */
  hint?: string;
  /** For questions: the available answers. */
  options?: { label: string; next: string }[];
  /** For results: scenario to route to. */
  scenario?: ScenarioId;
}

export interface OnboardingSlide {
  id: string;
  illustration: IllustrationKey;
  title: string;
  body: string;
}
