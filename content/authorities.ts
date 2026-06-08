import type { Authority } from './types';

/** Who handles what — roles the family interacts with along the journey. */
export const authorities: Authority[] = [
  {
    id: 'doctor',
    name: 'الطبيب المعاين',
    role: 'إثبات الوفاة',
    handles: [
      'معاينة الجثمان والتأكد من الوفاة',
      'تسليم الشهادة الطبية لإثبات الوفاة',
    ],
    whenInvolved: 'في أول مرحلة، فور حدوث الوفاة',
    icon: 'stethoscope',
  },
  {
    id: 'hospital',
    name: 'المؤسسة الصحية',
    role: 'الوفاة داخل المستشفى أو المصحة',
    handles: [
      'تثبت الوفاة وتسلّم الوثائق الطبية',
      'ترشدك للخطوة الإدارية الموالية',
    ],
    whenInvolved: 'عند الوفاة داخل مستشفى أو مصحة',
    icon: 'hospital',
  },
  {
    id: 'civil-status',
    name: 'مكتب الحالة المدنية',
    role: 'التصريح والتسجيل',
    handles: [
      'تسجيل واقعة الوفاة في السجلات الرسمية',
      'تسليم رسم الوفاة ورخصة الدفن',
    ],
    whenInvolved: 'بعد إثبات الوفاة مباشرة',
    icon: 'file-stamp',
  },
  {
    id: 'local-authority',
    name: 'السلطة المحلية',
    role: 'الدفن والنقل',
    handles: [
      'الإشراف على إجراءات الدفن المحلي',
      'تسليم رخصة نقل الجثمان عند الاقتضاء',
    ],
    whenInvolved: 'عند الدفن المحلي أو نقل الجثمان',
    icon: 'building',
  },
  {
    id: 'prosecutor',
    name: 'النيابة العامة',
    role: 'الحالات غير الطبيعية',
    handles: [
      'تتدخل في الوفيات غير الطبيعية أو المشتبه فيها',
      'تأذن بمتابعة إجراءات الدفن بعد التحقق',
    ],
    whenInvolved: 'في الوفاة غير الطبيعية أو القضائية',
    icon: 'scale',
  },
  {
    id: 'burial-authority',
    name: 'الجهة المكلفة بالمقبرة',
    role: 'تنظيم الدفن',
    handles: [
      'تنظيم مكان الدفن داخل المقبرة',
      'تتأكد من توفر رخصة الدفن قبل الإذن',
    ],
    whenInvolved: 'في المرحلة الأخيرة قبل الدفن',
    icon: 'gate',
  },
  {
    id: 'consulate',
    name: 'القنصلية المغربية',
    role: 'الحالات المرتبطة بالخارج',
    handles: [
      'مرافقة مسطرة نقل الجثمان من الخارج',
      'تسجيل وفاة المغربي الواقعة بالخارج',
    ],
    whenInvolved: 'عند ارتباط الحالة ببلد أجنبي',
    icon: 'globe',
  },
];

export const authorityById = (id: string): Authority | undefined =>
  authorities.find((a) => a.id === id);
