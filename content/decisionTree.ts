import type { DecisionNode } from './types';

/**
 * Visual decision tree. Nodes are addressed by id; questions branch to other
 * node ids, results route to a scenario. The engine starts at `root`.
 */
export const decisionTree: Record<string, DecisionNode> = {
  root: {
    id: 'root',
    kind: 'question',
    prompt: 'أين وقعت الوفاة؟',
    hint: 'اختر المكان الأقرب لحالتك.',
    options: [
      { label: 'داخل المغرب', next: 'q-place' },
      { label: 'خارج المغرب', next: 'r-registerAbroad' },
    ],
  },
  'q-place': {
    id: 'q-place',
    kind: 'question',
    prompt: 'ما طبيعة الوفاة؟',
    hint: 'هل هي وفاة طبيعية أم تستدعي تدخّل القضاء؟',
    options: [
      { label: 'طبيعية', next: 'q-where' },
      { label: 'غير طبيعية أو مشتبه فيها', next: 'r-judicial' },
    ],
  },
  'q-where': {
    id: 'q-where',
    kind: 'question',
    prompt: 'أين وقعت الوفاة الطبيعية؟',
    options: [
      { label: 'في البيت', next: 'q-burial' },
      { label: 'في مستشفى أو مصحة', next: 'q-burial-hospital' },
    ],
  },
  'q-burial': {
    id: 'q-burial',
    kind: 'question',
    prompt: 'أين سيتم الدفن؟',
    hint: 'هذا يحدّد ما إذا كنت تحتاج إلى مسطرة نقل.',
    options: [
      { label: 'في نفس المدينة', next: 'r-home' },
      { label: 'في مدينة أخرى', next: 'r-otherCity' },
      { label: 'في الخارج', next: 'r-buryAbroad' },
    ],
  },
  'q-burial-hospital': {
    id: 'q-burial-hospital',
    kind: 'question',
    prompt: 'أين سيتم الدفن؟',
    hint: 'الوفاة في مؤسسة صحية، أين سيكون الدفن؟',
    options: [
      { label: 'في نفس المدينة', next: 'r-hospital' },
      { label: 'في مدينة أخرى', next: 'r-otherCity' },
      { label: 'في الخارج', next: 'r-buryAbroad' },
    ],
  },
  // ── Results ───────────────────────────────────────────────────────────
  'r-home': {
    id: 'r-home',
    kind: 'result',
    prompt: 'وفاة طبيعية في البيت',
    hint: 'مسار محلي معتاد من المعاينة إلى الدفن.',
    scenario: 'home',
  },
  'r-hospital': {
    id: 'r-hospital',
    kind: 'result',
    prompt: 'وفاة في مستشفى أو مصحة',
    hint: 'تتولى المؤسسة الصحية بداية الإجراءات.',
    scenario: 'hospital',
  },
  'r-otherCity': {
    id: 'r-otherCity',
    kind: 'result',
    prompt: 'نقل الجثمان إلى مدينة أخرى',
    hint: 'تُضاف مسطرة رخصة نقل الجثمان.',
    scenario: 'otherCity',
  },
  'r-judicial': {
    id: 'r-judicial',
    kind: 'result',
    prompt: 'وفاة غير طبيعية أو مشتبه فيها',
    hint: 'مسار خاص يتطلب تدخّل النيابة العامة.',
    scenario: 'judicial',
  },
  'r-buryAbroad': {
    id: 'r-buryAbroad',
    kind: 'result',
    prompt: 'وفاة في المغرب ودفن في الخارج',
    hint: 'يتطلب مسطرة نقل دولي وتنسيقًا مع بلد الوجهة.',
    scenario: 'buryAbroad',
  },
  'r-registerAbroad': {
    id: 'r-registerAbroad',
    kind: 'result',
    prompt: 'وفاة وقعت خارج المغرب',
    hint: 'مسار تسجيل عبر القنصلية ثم اختيار وجهة الدفن.',
    scenario: 'registerAbroad',
  },
};

export const decisionRootId = 'root';
