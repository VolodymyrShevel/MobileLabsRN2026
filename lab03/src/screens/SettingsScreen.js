import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useGame, CHALLENGES } from '../context/GameContext';

function SettingRow({ label, value, onValueChange, theme }) {
  return (
    <View style={[styles.row, { borderBottomColor: theme.border }]}>
      <Text style={[styles.rowLabel, { color: theme.text }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#ccc', true: '#4f8ef7' }}
        thumbColor="#fff"
      />
    </View>
  );
}

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { score, completedCount, isCompleted } = useGame();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Theme */}
      <Text style={[styles.section, { color: theme.subtext }]}>ЗОВНІШНІЙ ВИГЛЯД</Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <SettingRow
          label="Темна тема"
          value={isDark}
          onValueChange={toggleTheme}
          theme={theme}
        />
      </View>

      {/* Stats */}
      <Text style={[styles.section, { color: theme.subtext }]}>СТАТИСТИКА</Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.statRow}>
          <Text style={[styles.statLabel, { color: theme.subtext }]}>Загальний рахунок</Text>
          <Text style={[styles.statValue, { color: theme.accent }]}>{score}</Text>
        </View>
        <View style={[styles.statRow, { borderTopWidth: 1, borderTopColor: theme.border }]}>
          <Text style={[styles.statLabel, { color: theme.subtext }]}>Виконано завдань</Text>
          <Text style={[styles.statValue, { color: theme.accent }]}>{completedCount}/{CHALLENGES.length}</Text>
        </View>
      </View>

      {/* Completed challenges */}
      <Text style={[styles.section, { color: theme.subtext }]}>ВИКОНАНІ ЗАВДАННЯ</Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {CHALLENGES.map((ch, i) => {
          const done = isCompleted(ch);
          return (
            <View
              key={ch.id}
              style={[
                styles.challengeRow,
                i > 0 && { borderTopWidth: 1, borderTopColor: theme.border },
              ]}
            >
              <Text style={styles.challengeIcon}>{ch.icon}</Text>
              <Text style={[styles.challengeTitle, { color: done ? theme.success : theme.subtext }]}>
                {ch.title}
              </Text>
              <Text>{done ? '✅' : '⭕'}</Text>
            </View>
          );
        })}
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  rowLabel: { fontSize: 15 },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  statLabel: { fontSize: 14 },
  statValue: { fontSize: 18, fontWeight: '800' },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  challengeIcon: { fontSize: 18 },
  challengeTitle: { flex: 1, fontSize: 13 },
});
