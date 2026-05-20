import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: item.image }} style={styles.hero} />

      <View style={styles.body}>
        {/* Meta row */}
        <View style={styles.meta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{item.title}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Full article text (imitated) */}
        <Text style={styles.body_text}>
          {item.description}
          {'\n\n'}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris.
          {'\n\n'}
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          {'\n\n'}
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </Text>

        {/* ID badge */}
        <View style={styles.idBadge}>
          <Text style={styles.idText}>ID: {item.id}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  hero: {
    width: '100%',
    height: 240,
    backgroundColor: '#ddd',
  },
  body: {
    padding: 20,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#4f8ef715',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    color: '#4f8ef7',
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    color: '#aaa',
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
    lineHeight: 30,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e4ef',
    marginBottom: 16,
  },
  body_text: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  idBadge: {
    marginTop: 24,
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  idText: {
    color: '#999',
    fontSize: 11,
  },
});
