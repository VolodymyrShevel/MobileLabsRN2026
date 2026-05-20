import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { GameProvider } from './src/context/GameContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </ThemeProvider>
  );
}
