import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { useProgress } from '@/state/ProgressContext';
import {
  SplashScreen,
  OnboardingScreen,
  WorkflowScreen,
  DocumentsScreen,
  StartNowScreen,
  DecisionTreeScreen,
  TransferScreen,
  FromAbroadScreen,
  DeathAbroadScreen,
  JudicialScreen,
  AuthoritiesScreen,
  FaqScreen,
  SourcesScreen,
  SettingsScreen,
} from '@/screens';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root stack. Always starts on Splash (which routes to Onboarding or Main
 * depending on stored onboarding state). Headers are hidden — every screen
 * draws its own RTL-correct Header. A calm fade is used between screens.
 */
export function RootNavigator() {
  // Touch progress so the navigator re-renders once storage hydrates; keeps
  // Splash's onboarding decision accurate without flashing the wrong route.
  useProgress();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#F6F1E7' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Group screenOptions={{ animation: 'slide_from_left' }}>
        <Stack.Screen name="Workflow" component={WorkflowScreen} />
        <Stack.Screen name="Documents" component={DocumentsScreen} />
        <Stack.Screen name="StartNow" component={StartNowScreen} />
        <Stack.Screen name="DecisionTree" component={DecisionTreeScreen} />
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="FromAbroad" component={FromAbroadScreen} />
        <Stack.Screen name="DeathAbroad" component={DeathAbroadScreen} />
        <Stack.Screen name="Judicial" component={JudicialScreen} />
        <Stack.Screen name="Authorities" component={AuthoritiesScreen} />
        <Stack.Screen name="Faq" component={FaqScreen} />
        <Stack.Screen name="Sources" component={SourcesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
