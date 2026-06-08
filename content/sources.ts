import type { SourceItem } from './types';

/**
 * Official source references, kept deliberately generic and update-ready.
 * They point the family to the competent authority for each topic rather than
 * to a specific (and possibly outdated) document number.
 */
export const sources: SourceItem[] = [
  {
    id: 'civil-status-src',
    title: 'إجراءات الحالة المدنية',
    authority: 'الجهة المكلفة بالحالة المدنية',
    topic: 'التصريح بالوفاة وتسجيلها واستخراج رسم الوفاة',
    reference: 'مكتب الحالة المدنية لمكان الوفاة',
  },
  {
    id: 'local-authority-src',
    title: 'الدفن والنقل المحلي',
    authority: 'السلطة المحلية المختصة',
    topic: 'رخصة الدفن ورخصة نقل الجثمان',
    reference: 'السلطة المحلية لمكان الوفاة أو الدفن',
  },
  {
    id: 'prosecutor-src',
    title: 'الحالات غير الطبيعية',
    authority: 'النيابة العامة',
    topic: 'إذن الدفن في الوفيات غير الطبيعية أو المشتبه فيها',
    reference: 'النيابة العامة المختصة',
  },
  {
    id: 'consulate-src',
    title: 'المسطرة القنصلية',
    authority: 'القنصليات والسفارات المغربية',
    topic: 'نقل الجثمان من وإلى الخارج وتسجيل الوفاة الواقعة بالخارج',
    reference: 'أقرب قنصلية مغربية لمكان الوفاة',
  },
  {
    id: 'health-src',
    title: 'الوثائق الصحية للنقل الدولي',
    authority: 'الجهات الصحية المختصة',
    topic: 'شهادة عدم العدوى ومحضر وضع الجثمان في التابوت',
    reference: 'الجهة الصحية المعنية بالنقل',
  },
];

export const sourceById = (id: string): SourceItem | undefined =>
  sources.find((s) => s.id === id);
