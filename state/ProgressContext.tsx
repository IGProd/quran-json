import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scenarioById } from '@/content';

/**
 * Tracks which workflow steps the family has marked as completed, and whether
 * onboarding was seen. Persisted to device storage so the app is offline-first
 * and remembers progress between launches.
 */

const STORAGE_KEY = 'wafat.progress.v1';
const ONBOARDING_KEY = 'wafat.onboarded.v1';

interface ProgressState {
  /** Set of completed step ids. */
  completed: Record<string, true>;
  onboarded: boolean;
  ready: boolean;
}

interface ProgressContextValue extends ProgressState {
  toggleStep: (stepId: string) => void;
  isCompleted: (stepId: string) => boolean;
  scenarioProgress: (scenarioId: string) => { done: number; total: number; ratio: number };
  resetScenario: (scenarioId: string) => void;
  resetAll: () => void;
  completeOnboarding: () => void;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<Record<string, true>>({});
  const [onboarded, setOnboarded] = useState(false);
  const [ready, setReady] = useState(false);

  // Hydrate from storage on first mount.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [rawProgress, rawOnboarded] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY),
          AsyncStorage.getItem(ONBOARDING_KEY),
        ]);
        if (!active) return;
        if (rawProgress) setCompleted(JSON.parse(rawProgress));
        if (rawOnboarded === 'true') setOnboarded(true);
      } catch {
        // Corrupt or missing storage — start fresh, app still works.
      } finally {
        if (active) setReady(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Persist completion changes (skip the very first render before hydration).
  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(completed)).catch(() => {});
  }, [completed, ready]);

  const toggleStep = useCallback((stepId: string) => {
    setCompleted((prev) => {
      const next = { ...prev };
      if (next[stepId]) delete next[stepId];
      else next[stepId] = true;
      return next;
    });
  }, []);

  const isCompleted = useCallback((stepId: string) => Boolean(completed[stepId]), [completed]);

  const scenarioProgress = useCallback(
    (scenarioId: string) => {
      const scenario = scenarioById(scenarioId);
      const total = scenario?.steps.length ?? 0;
      const done = scenario ? scenario.steps.filter((s) => completed[s.id]).length : 0;
      return { done, total, ratio: total ? done / total : 0 };
    },
    [completed]
  );

  const resetScenario = useCallback((scenarioId: string) => {
    const scenario = scenarioById(scenarioId);
    if (!scenario) return;
    setCompleted((prev) => {
      const next = { ...prev };
      scenario.steps.forEach((s) => delete next[s.id]);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => setCompleted({}), []);

  const completeOnboarding = useCallback(() => {
    setOnboarded(true);
    AsyncStorage.setItem(ONBOARDING_KEY, 'true').catch(() => {});
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      completed,
      onboarded,
      ready,
      toggleStep,
      isCompleted,
      scenarioProgress,
      resetScenario,
      resetAll,
      completeOnboarding,
    }),
    [completed, onboarded, ready, toggleStep, isCompleted, scenarioProgress, resetScenario, resetAll, completeOnboarding]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider');
  return ctx;
}
