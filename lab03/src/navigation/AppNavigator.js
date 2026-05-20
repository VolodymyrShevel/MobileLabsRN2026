import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.header },
          headerTintColor: theme.headerText,
          headerTitleStyle: { fontWeight: '700' },
          tabBarStyle: { backgroundColor: theme.card, borderTopColor: theme.border },
          tabBarActiveTintColor: theme.accent,
          tabBarInactiveTintColor: theme.subtext,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Gesture Clicker',
            tabBarLabel: 'Гра',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🎮</Text>,
          }}
        />
        <Tab.Screen
          name="Challenges"
          component={ChallengesScreen}
          options={{
            title: 'Завдання',
            tabBarLabel: 'Завдання',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏆</Text>,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Налаштування',
            tabBarLabel: 'Налаштування',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⚙️</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
