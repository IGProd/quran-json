import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreenAPI from 'expo-splash-screen';
import {
  useFonts,
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
} from '@expo-google-fonts/cairo';

import { enforceRTL } from '@/i18n/rtl';
import { ProgressProvider } from '@/state/ProgressContext';
import { RootNavigator } from '@/navigation/RootNavigator';
import { palette } from '@/theme';

// Lock RTL as early as possible, before first render.
enforceRTL();
SplashScreenAPI.preventAutoHideAsync().catch(() => {});

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.plaster,
    card: palette.paper,
    text: palette.slate,
    border: palette.hairline,
    primary: palette.cedar,
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreenAPI.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  const onLayout = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreenAPI.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  // Keep the native splash visible until fonts resolve (or fail) so the first
  // frame is already styled — no flash of fallback typography.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ProgressProvider>
          <View style={{ flex: 1, backgroundColor: palette.plaster }} onLayout={onLayout}>
            <StatusBar style="dark" />
            <NavigationContainer theme={navTheme}>
              <RootNavigator />
            </NavigationContainer>
          </View>
        </ProgressProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
