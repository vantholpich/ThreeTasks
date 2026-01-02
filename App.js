import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ToDoScreen from './src/screens/ToDoScreen';
import ExplorationScreen from './src/screens/ExplorationScreen';
import LifeToDoScreen from './src/screens/LifeToDoScreen';
import NotesScreen from './src/screens/NotesScreen';
import { COLORS } from './src/constants/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'To-Do') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'Exploration') {
                  iconName = focused ? 'compass' : 'compass-outline';
                } else if (route.name === 'To-Dos for Life') {
                  iconName = focused ? 'heart' : 'heart-outline';
                } else if (route.name === 'Notes') {
                  iconName = focused ? 'document-text' : 'document-text-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.onSurface,
              tabBarStyle: {
                backgroundColor: COLORS.surface,
                borderTopColor: 'rgba(255,255,255,0.1)',
                height: 60,
                paddingBottom: 10,
                paddingTop: 10,
              },
              headerShown: false,
            })}
          >
            <Tab.Screen name="To-Do" component={ToDoScreen} />
            <Tab.Screen name="Exploration" component={ExplorationScreen} />
            <Tab.Screen name="To-Dos for Life" component={LifeToDoScreen} />
            <Tab.Screen name="Notes" component={NotesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
