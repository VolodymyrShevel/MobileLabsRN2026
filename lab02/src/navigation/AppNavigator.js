import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// ── Stack for News tab ───────────────────────────────────────────────────────
function NewsStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        // Hamburger button
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16 }}
          >
            <Text style={{ color: '#fff', fontSize: 22 }}>☰</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ title: 'Новини' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        // Dynamic title from route params
        options={({ route }) => ({
          title: route.params?.item?.title
            ? route.params.item.title.slice(0, 30) + '…'
            : 'Деталі',
          // Remove hamburger on details screen, keep back arrow
          headerLeft: undefined,
        })}
      />
    </Stack.Navigator>
  );
}

// ── Root Drawer ──────────────────────────────────────────────────────────────
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false, // Stack handles its own header — no double header
          drawerStyle: { width: 280 },
        }}
      >
        <Drawer.Screen name="NewsStack" component={NewsStack} />
        <Drawer.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#1a1a2e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700', fontSize: 18 },
            title: 'Контакти',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
