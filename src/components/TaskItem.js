import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function TaskItem({ task, onToggle }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.taskContainer}
                onPress={() => onToggle(task.id)}
                activeOpacity={0.7}
            >
                <TouchableOpacity
                    style={[styles.checkbox, task.completed && styles.checked]}
                    onPress={() => onToggle(task.id)}
                >
                    {task.completed && (
                        <Ionicons name="checkmark" size={16} color="white" />
                    )}
                </TouchableOpacity>

                <Text
                    style={[
                        styles.taskText,
                        task.completed && styles.completedText
                    ]}
                >
                    {task.text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        ...SHADOWS.light,
    },
    taskContainer: {
        backgroundColor: COLORS.surface,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent', // Can be used for selection state if needed
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    checked: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    taskText: {
        fontSize: SIZES.body,
        color: COLORS.onBackground,
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: COLORS.onSurface,
        opacity: 0.6,
    },
});
