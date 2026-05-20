import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useGame, CHALLENGES } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';

function ChallengeItem({ item, isCompleted, current, target, theme }) {
  const progress = Math.min(current / target, 1);

  return (
    <View style={[styles.item, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.desc, { color: theme.subtext }]}>{item.description}</Text>

        {/* Progress bar */}
        <View style={[styles.barBg, { backgroundColor: theme.border }]}>
          <View
            style={[
              styles.barFill,
              {
                width: `${progress * 100}%`,
                backgroundColor: isCompleted ? theme.success : theme.accent,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: theme.subtext }]}>
          {current}/{target}
        </Text>
      </View>

      <Text style={styles.status}>{isCompleted ? '✅' : '⭕'}</Text>
    </View>
  );
}

export default function ChallengesScreen() {
  const { isCompleted, getProgress, completedCount } = useGame();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <FlatList
        data={CHALLENGES}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={[styles.header, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Завдання</Text>
            <Text style={[styles.headerSub, { color: theme.accent }]}>
              {completedCount}/{CHALLENGES.length} виконано
            </Text>
            {/* Overall progress */}
            <View style={[styles.barBg, { backgroundColor: theme.border, marginTop: 10 }]}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${(completedCount / CHALLENGES.length) * 100}%`,
                    backgroundColor: theme.accent,
                  },
                ]}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ChallengeItem
            item={item}
            isCompleted={isCompleted(item)}
            current={getProgress(item)}
            target={item.target}
            theme={theme}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, paddingBottom: 30 },
  header: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 22, fontWeight: '800' },
  headerSub: { fontSize: 14, fontWeight: '600', marginTop: 4 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4f8ef715',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 22 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  desc: { fontSize: 12, marginBottom: 8 },
  barBg: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: { fontSize: 11, marginTop: 4 },
  status: { fontSize: 20 },
});
