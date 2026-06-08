import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ScenarioId } from '@/content';

/** Root stack routes. */
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<TabParamList> | undefined;
  Workflow: { scenarioId: ScenarioId };
  StartNow: undefined;
  DecisionTree: undefined;
  Authorities: undefined;
  Faq: undefined;
  Sources: undefined;
  Settings: undefined;
  Transfer: undefined;
  FromAbroad: undefined;
  DeathAbroad: undefined;
  Judicial: undefined;
  Documents: undefined;
};

/** Bottom tab routes. */
export type TabParamList = {
  Home: undefined;
  Scenarios: undefined;
  DocumentsTab: undefined;
  More: undefined;
};
