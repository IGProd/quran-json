import type { StateKey } from '@/theme/tokens';
import type { BadgeKey } from './types';

/** Maps a semantic step badge to its color state and short Arabic label. */
export const badgeMeta: Record<BadgeKey, { state: StateKey; label: string }> = {
  now: { state: 'urgent', label: 'الآن' },
  next: { state: 'info', label: 'الخطوة التالية' },
  caseDependent: { state: 'warning', label: 'حسب حالتك' },
  mandatory: { state: 'required', label: 'إلزامي' },
  mayBeRequired: { state: 'warning', label: 'قد يُطلب' },
  judicial: { state: 'judicial', label: 'حالة قضائية' },
  transfer: { state: 'transfer', label: 'متعلق بالنقل' },
  abroad: { state: 'abroad', label: 'متعلق بالخارج' },
  completed: { state: 'completed', label: 'مرحلة ختامية' },
};
