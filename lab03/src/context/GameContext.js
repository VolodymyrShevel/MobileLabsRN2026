import React, { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext();

export const CHALLENGES = [
  { id: '1', title: 'Зробити 10 кліків', description: 'Натисніть на об\'єкт 10 разів', icon: '👆', target: 10, type: 'taps' },
  { id: '2', title: 'Подвійний клік 5 разів', description: 'Використайте подвійний клік 5 разів', icon: '✌️', target: 5, type: 'doubleTaps' },
  { id: '3', title: 'Утримувати 3 секунди', description: 'Утримуйте об\'єкт 3 секунди', icon: '⏱️', target: 1, type: 'longPress' },
  { id: '4', title: 'Перетягнути об\'єкт', description: 'Перемістіть об\'єкт по екрану', icon: '🖐️', target: 1, type: 'pan' },
  { id: '5', title: 'Свайп вправо', description: 'Зробіть швидкий свайп вправо', icon: '👉', target: 1, type: 'flingRight' },
  { id: '6', title: 'Свайп вліво', description: 'Зробіть швидкий свайп вліво', icon: '👈', target: 1, type: 'flingLeft' },
  { id: '7', title: 'Змінити розмір об\'єкта', description: 'Використайте pinch-жест', icon: '🤏', target: 1, type: 'pinch' },
  { id: '8', title: 'Отримати 100 очок', description: 'Набрати загалом 100 очок', icon: '🏆', target: 100, type: 'score' },
  { id: '9', title: 'Зробити 3 свайпи підряд', description: 'Власне завдання: свайпніть 3 рази поспіль', icon: '⚡', target: 3, type: 'flingStreak' },
];

export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState({
    taps: 0,
    doubleTaps: 0,
    longPress: 0,
    pan: 0,
    flingRight: 0,
    flingLeft: 0,
    pinch: 0,
    flingStreak: 0,
  });

  const addScore = useCallback((points) => {
    setScore((prev) => prev + points);
  }, []);

  const increment = useCallback((type, amount = 1) => {
    setProgress((prev) => ({ ...prev, [type]: prev[type] + amount }));
  }, []);

  const isCompleted = useCallback(
    (challenge) => {
      if (challenge.type === 'score') return score >= challenge.target;
      return (progress[challenge.type] || 0) >= challenge.target;
    },
    [score, progress]
  );

  const getProgress = useCallback(
    (challenge) => {
      if (challenge.type === 'score') return Math.min(score, challenge.target);
      return Math.min(progress[challenge.type] || 0, challenge.target);
    },
    [score, progress]
  );

  const completedCount = CHALLENGES.filter(isCompleted).length;

  return (
    <GameContext.Provider value={{ score, progress, addScore, increment, isCompleted, getProgress, completedCount }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
