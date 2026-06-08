import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Icon, type IconName } from '@/components';
import { palette, fonts } from '@/theme';
import { HomeScreen, ScenariosScreen, DocumentsScreen, MoreScreen } from '@/screens';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const tabIcons: Record<keyof TabParamList, IconName> = {
  Home: 'home-tab',
  Scenarios: 'workflows',
  DocumentsTab: 'documents',
  More: 'more',
};

const tabLabels: Record<keyof TabParamList, string> = {
  Home: 'الرئيسية',
  Scenarios: 'الحالات',
  DocumentsTab: 'الوثائق',
  More: 'المزيد',
};

/** Bottom tabs: Home, Scenarios, Documents, More. Calm, RTL-aware. */
export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.cedar,
        tabBarInactiveTintColor: palette.slateFaint,
        tabBarStyle: {
          backgroundColor: palette.paper,
          borderTopColor: palette.hairline,
          height: Platform.OS === 'ios' ? 86 : 66,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
        },
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarLabel: tabLabels[route.name],
        tabBarIcon: ({ color, focused }) => (
          <Icon name={tabIcons[route.name]} size={focused ? 25 : 23} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scenarios" component={ScenariosScreen} />
      <Tab.Screen name="DocumentsTab" component={DocumentsScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
