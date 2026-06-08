import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { palette } from '@/theme';

/**
 * Semantic icon layer. Screens and content reference calm, meaningful names;
 * this maps them to a single clean, modern glyph set (Material Community).
 * Centralising the map keeps the icon language consistent and swappable.
 */
const map = {
  // Content / documents
  stethoscope: 'stethoscope',
  'shield-check': 'shield-check-outline',
  'id-card': 'card-account-details-outline',
  book: 'book-outline',
  users: 'account-group-outline',
  'file-stamp': 'file-certificate-outline',
  'file-check': 'file-check-outline',
  truck: 'truck-outline',
  box: 'package-variant-closed',
  route: 'map-marker-path',
  scale: 'scale-balance',
  clipboard: 'clipboard-text-outline',
  globe: 'earth',
  building: 'office-building-outline',
  home: 'home-outline',
  hospital: 'hospital-building',
  pin: 'map-marker-outline',
  'plane-arrival': 'airplane-landing',
  'plane-departure': 'airplane-takeoff',
  gate: 'gate',
  // Navigation / UI
  'home-tab': 'home-variant-outline',
  documents: 'file-document-multiple-outline',
  workflows: 'format-list-checks',
  more: 'dots-horizontal',
  settings: 'cog-outline',
  decision: 'source-branch',
  start: 'flash-outline',
  faq: 'help-circle-outline',
  authorities: 'account-tie-outline',
  sources: 'bookmark-check-outline',
  // Affordances (note: RTL flips chevrons visually via the navigator)
  'chevron-start': 'chevron-right',
  'chevron-end': 'chevron-left',
  'chevron-down': 'chevron-down',
  back: 'arrow-right',
  check: 'check',
  'check-circle': 'check-circle',
  circle: 'checkbox-blank-circle-outline',
  alert: 'alert-outline',
  info: 'information-outline',
  clock: 'clock-outline',
  lock: 'lock-outline',
  phone: 'phone-outline',
  arrowNext: 'arrow-left',
} as const;

export type IconName = keyof typeof map;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 22, color = palette.slate }: IconProps) {
  return <MaterialCommunityIcons name={map[name]} size={size} color={color} />;
}
