# دليل إجراءات الوفاة — Wafat Guide

تطبيق محمول عربي (RTL) هادئ ومحترم، يساعد الأسر في المغرب على فهم إجراءات تسجيل الوفاة والدفن
خطوة بخطوة — من إثبات الوفاة حتى الدفن — مع التركيز على الفهم السريع في وقت الصدمة، عبر
مسارات إرشادية ومرئيات بدلاً من النصوص الطويلة.

A calm, respectful Arabic **RTL** mobile app that guides Moroccan families through death
registration and burial procedures — from death confirmation to burial — using guided
workflows, decision assistance, document organisation and subtle motion instead of long text.

> ⚠️ **إشعار:** هذا التطبيق دليل مبسّط للتوجيه، وليس وثيقة رسمية. تحقّق دائمًا من الجهة المختصة المحلية.
> This is a simplified guide, not an official document. Always verify with the competent local authority.

---

## Stack

- **React Native + Expo (SDK 51) + TypeScript**
- **react-navigation** (native-stack + bottom-tabs)
- **react-native-reanimated** for motion, **react-native-svg** for text-free illustrations & motifs
- **@react-native-async-storage/async-storage** for offline-first progress
- **Cairo** (modern, highly legible Arabic UI font) — no decorative display typography
- Forced **RTL** layout

## Run

```bash
cd wafat-app
npm install
npm start          # then press i / a, or scan with Expo Go
npm run typecheck  # tsc --noEmit
```

## Architecture

```
wafat-app/
├─ App.tsx                 # fonts, RTL lock, providers, navigation host
├─ src/
│  ├─ theme/               # design tokens (color, type, spacing, motion, states)
│  ├─ i18n/                # RTL enforcement
│  ├─ content/             # ← single source of truth (update-ready content model)
│  │   ├─ types.ts         # Scenario / WorkflowStep / DocumentItem / Authority / …
│  │   ├─ scenarios.ts     # the 8 branches + their step workflows
│  │   ├─ documents.ts     # document catalogue (referenced by step ids)
│  │   ├─ authorities.ts   # who handles what
│  │   ├─ decisionTree.ts  # branching decision assistant
│  │   ├─ faq.ts / sources.ts / onboarding.ts / badges.ts
│  ├─ state/               # ProgressContext (completion + onboarding, persisted)
│  ├─ components/          # reusable UI (see list below) + decor/ + Illustration
│  ├─ navigation/          # Root stack + bottom tabs (typed)
│  └─ screens/             # all 16 screens
```

### Content model = source-ready
All knowledge lives in `src/content/*` as typed data. To update procedures, edit those
files only — every screen reads from them, so nothing in the UI needs to change. Step cards
reference documents by id, so workflows and the Documents page stay in sync automatically.

## The 8 branches (scenarios)
1. وفاة طبيعية في البيت · 2. وفاة في مستشفى/مصحة · 3. وفاة غير طبيعية/قضائية ·
4. الدفن في نفس المدينة · 5. النقل إلى مدينة أخرى · 6. جثمان قادم من الخارج ·
7. وفاة في المغرب ودفن في الخارج · 8. تسجيل وفاة مغربي وقعت بالخارج

## Screens
Splash · Onboarding · Home · Scenarios · **Workflow engine** · Documents · Start Now ·
Decision Tree · Transfer (another city) · From Abroad · Death Abroad · Judicial ·
Authorities (who handles what) · FAQ · Sources & Legal · Settings.

## Reusable components
`ScenarioCard` · `WorkflowTimeline` · `StepCard` · `DocumentChip` · `DocumentPanel` ·
`AuthorityCard` · `LegalNoticeCard` · `TransferMapCard` · `QuickActionButton` · `StatusBadge` ·
`CompletionToggle` · `EmergencyStartPanel` · `AccordionSection` · `ScenarioTabs` · `SourceBadge` ·
`WarningBanner` · `CalmInfoBanner` · `ChecklistCard` (+ `Screen`, `Header`, `Button`, `ProgressBar`,
`EmptyState`, `Illustration`, `Arch`, `Zellige`, `Logo`).

## Motion language
Spring-led and purposeful (Emil Kowalski discipline): pressable scale, staggered timeline
reveals, advancing progress line, stamp/seal completion micro-interaction, smoothly opening
decision branches and accordions, calm screen fades. Never childish, never heavy.

## Design tokens
See `src/theme/tokens.ts` — palette, system states (info / warning / urgent / judicial /
completed / required / transfer / abroad), spacing scale, radii, type scale, elevation, and
motion (durations + springs).

## Illustrations
Rendered as text-free vector SVG (`src/components/Illustration.tsx`). Generation prompts (if
ever replaced by raster art) and the hard rules are in `src/assets/illustrations/PROMPTS.md`.
