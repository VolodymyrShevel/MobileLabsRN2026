import React from 'react';
import {
  View,
  Text,
  SectionList,
  Image,
  StyleSheet,
} from 'react-native';
import { contactsSections } from '../data/contactsData';

function ContactItem({ item }) {
  return (
    <View style={styles.contactItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  );
}

function SectionHeader({ section }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>{section.data.length}</Text>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

function ListHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>👥 Контакти</Text>
      <Text style={styles.headerSubtitle}>Всі ваші контакти в одному місці</Text>
    </View>
  );
}

export default function ContactsScreen() {
  return (
    <SectionList
      sections={contactsSections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ContactItem item={item} />}
      renderSectionHeader={({ section }) => <SectionHeader section={section} />}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={<ListHeader />}
      stickySectionHeadersEnabled={true}
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
    paddingBottom: 30,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eef1fb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#4f8ef7',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4f8ef7',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionCount: {
    fontSize: 12,
    color: '#4f8ef7',
    backgroundColor: '#4f8ef720',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontWeight: '600',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 3,
  },
  phone: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  email: {
    fontSize: 12,
    color: '#4f8ef7',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f8',
    marginLeft: 84,
  },
});
