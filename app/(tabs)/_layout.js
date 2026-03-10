import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/constants/theme';
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
        <NativeTabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.onSurface,
                headerShown: false,
            }}
        >
            <NativeTabs.Screen
                name="index"
                options={{
                    title: 'To-Do',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'list' : 'list-outline'} size={24} color={color} />
                    ),
                }}
            />
            <NativeTabs.Screen
                name="exploration"
                options={{
                    title: 'Exploration',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'compass' : 'compass-outline'} size={24} color={color} />
                    ),
                }}
            />
            <NativeTabs.Screen
                name="life"
                options={{
                    title: 'To-Dos for Life',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'heart' : 'heart-outline'} size={24} color={color} />
                    ),
                }}
            />
            <NativeTabs.Screen
                name="notes"
                options={{
                    title: 'Notes',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={color} />
                    ),
                }}
            />
        </NativeTabs>
    );
}
