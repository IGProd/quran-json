import type { OnboardingSlide } from './types';

/** Short, visual-first onboarding — four calm slides. */
export const onboarding: OnboardingSlide[] = [
  {
    id: 'ob-1',
    illustration: 'courtyard',
    title: 'دليل هادئ في وقت صعب',
    body: 'يشرح لك هذا التطبيق ما ينبغي فعله بعد الوفاة، خطوة بخطوة وبوضوح.',
  },
  {
    id: 'ob-2',
    illustration: 'path',
    title: 'يرشدك حسب حالتك',
    body: 'يوجّهك حسب مكان الوفاة وظروفها ومكان الدفن، دون تعقيد.',
  },
  {
    id: 'ob-3',
    illustration: 'documents',
    title: 'الوثائق في كل مرحلة',
    body: 'يبيّن لك الوثائق المطلوبة في كل خطوة ومن يسلّمها.',
  },
  {
    id: 'ob-4',
    illustration: 'map',
    title: 'حتى إن كان الأمر بين مدينتين أو بلدين',
    body: 'يساعدك إن كان الدفن في مدينة أخرى أو إن كان الأمر متعلقًا بالخارج.',
  },
];
