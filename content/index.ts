export * from './types';
export * from './badges';
export { documents, documentById, docCategoryLabels, stageLabels } from './documents';
export { authorities, authorityById } from './authorities';
export { scenarios, scenarioById } from './scenarios';
export { faq } from './faq';
export { sources, sourceById } from './sources';
export { decisionTree, decisionRootId } from './decisionTree';
export { onboarding } from './onboarding';

import { scenarios } from './scenarios';
import type { ScenarioId } from './types';

/** Total number of completable steps across all scenarios. */
export const totalSteps = scenarios.reduce((n, s) => n + s.steps.length, 0);

/** Scenario ids in display order. */
export const scenarioOrder: ScenarioId[] = scenarios.map((s) => s.id);
