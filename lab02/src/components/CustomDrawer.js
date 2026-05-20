import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const USER = {
  name: 'Іваненко Іван Іванович',
  group: 'ПЗ-21',
  avatar: 'https://i.pravatar.cc/150?img=11',
};

export default function CustomDrawer(props) {
  const { navigation, state } = props;
  const activeIndex = state.index;

  const menuItems = [
    { label: 'Новини', icon: '📰', screen: 'NewsStack' },
    { label: 'Контакти', icon: '👥', screen: 'Contacts' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* Profile block */}
        <View style={styles.profileBlock}>
          <Image source={{ uri: USER.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{USER.name}</Text>
          <View style={styles.groupBadge}>
            <Text style={styles.groupText}>Група: {USER.group}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu items */}
        <View style={styles.menuBlock}>
          {menuItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <TouchableOpacity
                key={item.screen}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.7}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Лабораторна робота №2</Text>
        <Text style={styles.footerSubText}>React Native · 2025</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileBlock: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#16213e',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: '#4f8ef7',
    marginBottom: 12,
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  groupBadge: {
    backgroundColor: '#4f8ef7',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  groupText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#2d2d4e',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  menuBlock: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 6,
  },
  menuItemActive: {
    backgroundColor: '#4f8ef720',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuLabel: {
    color: '#a0a0c0',
    fontSize: 15,
    fontWeight: '500',
  },
  menuLabelActive: {
    color: '#4f8ef7',
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2d2d4e',
    alignItems: 'center',
  },
  footerText: {
    color: '#606080',
    fontSize: 12,
  },
  footerSubText: {
    color: '#404060',
    fontSize: 11,
    marginTop: 2,
  },
});
