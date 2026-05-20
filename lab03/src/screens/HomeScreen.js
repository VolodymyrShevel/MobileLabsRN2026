import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';

const CLICKER_SIZE = 130;

export default function HomeScreen() {
  const { score, addScore, increment } = useGame();
  const { theme } = useTheme();

  const tapScale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const lastPinchScale = useRef(1);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const [floatLabel, setFloatLabel] = useState('');
  const floatOpacity = useRef(new Animated.Value(0)).current;
  const floatY = useRef(new Animated.Value(0)).current;

  const showFloat = (text) => {
    setFloatLabel(text);
    floatOpacity.setValue(1);
    floatY.setValue(0);
    Animated.parallel([
      Animated.timing(floatOpacity, { toValue: 0, duration: 900, useNativeDriver: true }),
      Animated.timing(floatY, { toValue: -70, duration: 900, useNativeDriver: true }),
    ]).start();
  };

  const animateTap = () => {
    Animated.sequence([
      Animated.spring(tapScale, { toValue: 0.88, useNativeDriver: true, speed: 50 }),
      Animated.spring(tapScale, { toValue: 1, useNativeDriver: true, speed: 20 }),
    ]).start();
  };

  // ── Tap / LongPress / Pan / Pinch на кнопці ──
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .runOnJS(true)
    .onEnd(() => {
      addScore(2);
      increment('taps', 2);
      increment('doubleTaps');
      animateTap();
      showFloat('+2 ✌️');
    });

  const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .runOnJS(true)
    .requireExternalGestureToFail(doubleTap)
    .onEnd(() => {
      addScore(1);
      increment('taps');
      animateTap();
      showFloat('+1');
    });

  const longPress = Gesture.LongPress()
    .minDuration(2000)
    .runOnJS(true)
    .onStart(() => {
      addScore(5);
      increment('taps');
      increment('longPress');
      showFloat('+5 ⏱️');
    });

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((e) => {
      translateX.setValue(offsetX.current + e.translationX);
      translateY.setValue(offsetY.current + e.translationY);
    })
    .onEnd((e) => {
      offsetX.current += e.translationX;
      offsetY.current += e.translationY;
      increment('pan');
    });

  const pinch = Gesture.Pinch()
    .runOnJS(true)
    .onUpdate((e) => {
      pinchScale.setValue(lastPinchScale.current * e.scale);
    })
    .onEnd((e) => {
      lastPinchScale.current *= e.scale;
      addScore(3);
      increment('pinch');
      showFloat('+3 🤏');
    });

  const clickerGestures = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTap, singleTap),
    longPress,
    Gesture.Simultaneous(pan, pinch)
  );

  // ── Fling — окремий детектор на весь екран ──
  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .runOnJS(true)
    .onEnd(() => {
      const pts = Math.floor(Math.random() * 10) + 1;
      addScore(pts);
      increment('flingRight');
      increment('flingStreak');
      showFloat(`+${pts} 👉`);
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .runOnJS(true)
    .onEnd(() => {
      const pts = Math.floor(Math.random() * 10) + 1;
      addScore(pts);
      increment('flingLeft');
      increment('flingStreak');
      showFloat(`+${pts} 👈`);
    });

  const flingGestures = Gesture.Exclusive(flingRight, flingLeft);

  const hints = [
    { icon: '👆', text: 'Tap: +1 point' },
    { icon: '✌️', text: 'Double-tap: +2 points' },
    { icon: '⏱️', text: 'Long-press (2s): +5 points' },
    { icon: '👉👈', text: 'Swipe anywhere: +1-10 points' },
    { icon: '🤏', text: 'Pinch: +3 points' },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Fling зона — весь екран */}
      <GestureDetector gesture={flingGestures}>
        <View style={[styles.container, { backgroundColor: theme.bg }]}>

          {/* Score */}
          <View style={[styles.scoreCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.scoreLabel, { color: theme.subtext }]}>SCORE</Text>
            <Text style={[styles.scoreValue, { color: theme.accent }]}>{score}</Text>
          </View>

          {/* Clicker */}
          <View style={styles.clickerArea}>
            <GestureDetector gesture={clickerGestures}>
              <Animated.View
                style={[
                  styles.clicker,
                  {
                    transform: [
                      { translateX },
                      { translateY },
                      { scale: Animated.multiply(tapScale, pinchScale) },
                    ],
                  },
                ]}
              >
                <Text style={styles.clickerEmoji}>👆</Text>
                <Text style={styles.clickerLabel}>TAP ME</Text>
              </Animated.View>
            </GestureDetector>

            <Animated.Text
              pointerEvents="none"
              style={[
                styles.floatLabel,
                { opacity: floatOpacity, transform: [{ translateY: floatY }] },
              ]}
            >
              {floatLabel}
            </Animated.Text>
          </View>

          {/* Hints */}
          <View style={[styles.hintsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {hints.map((h, i) => (
              <Text key={i} style={[styles.hintText, { color: theme.subtext }]}>
                {h.icon}  {h.text}
              </Text>
            ))}
          </View>

        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  scoreCard: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '900',
  },
  clickerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clicker: {
    width: CLICKER_SIZE,
    height: CLICKER_SIZE,
    borderRadius: CLICKER_SIZE / 2,
    backgroundColor: '#4f8ef7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4f8ef7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  clickerEmoji: { fontSize: 36 },
  clickerLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
  },
  floatLabel: {
    position: 'absolute',
    top: -30,
    fontSize: 22,
    fontWeight: '800',
    color: '#4f8ef7',
  },
  hintsCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    gap: 6,
  },
  hintText: {
    fontSize: 13,
    lineHeight: 22,
  },
});
