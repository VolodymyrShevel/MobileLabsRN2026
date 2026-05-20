import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NewsCard from '../components/NewsCard';
import { initialNews, generateNews } from '../data/newsData';

// ── List sub-components ──────────────────────────────────────────────────────

function ListHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>📰 Останні новини</Text>
      <Text style={styles.headerSubtitle}>Залишайтесь у курсі подій</Text>
    </View>
  );
}

function ListFooter({ loading }) {
  if (!loading) return <View style={styles.footerSpacer} />;
  return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color="#4f8ef7" />
      <Text style={styles.footerText}>Завантаження...</Text>
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

// ── Screen ───────────────────────────────────────────────────────────────────

export default function MainScreen() {
  const navigation = useNavigation();
  const [news, setNews] = useState(initialNews);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextId, setNextId] = useState(initialNews.length + 1);

  // Pull-to-refresh: imitate network request
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const fresh = generateNews(1, 15);
      setNews(fresh);
      setNextId(16);
      setRefreshing(false);
    }, 1500);
  }, []);

  // Infinite scroll: load next batch
  const onEndReached = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const more = generateNews(nextId, 10);
      setNews((prev) => [...prev, ...more]);
      setNextId((prev) => prev + 10);
      setLoadingMore(false);
    }, 1200);
  }, [loadingMore, nextId]);

  const renderItem = useCallback(
    ({ item }) => (
      <NewsCard
        item={item}
        onPress={() => navigation.navigate('Details', { item })}
      />
    ),
    [navigation]
  );

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      // Header / Footer / Separator
      ListHeaderComponent={<ListHeader />}
      ListFooterComponent={<ListFooter loading={loadingMore} />}
      ItemSeparatorComponent={ItemSeparator}
      // Pull-to-Refresh
      refreshing={refreshing}
      onRefresh={onRefresh}
      // Infinite Scroll
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      // Optimization
      initialNumToRender={8}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  separator: {
    height: 12,
  },
  footerSpacer: {
    height: 20,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  footerText: {
    color: '#888',
    fontSize: 13,
  },
});
