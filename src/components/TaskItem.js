import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { COLORS, SIZES } from '../constants/theme';

const TaskItem = ({ task, onToggle }) => {
    return (
        <View style={styles.container}>
            <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
                <TouchableOpacity style={styles.contentContainer} onPress={() => onToggle(task.id)}>
                    <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
                        {task.completed && <Ionicons name="checkmark" size={16} color={COLORS.onPrimary} />}
                    </View>
                    <Text style={[styles.text, task.completed && styles.textCompleted]}>
                        {task.text}
                    </Text>
                </TouchableOpacity>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        borderRadius: SIZES.borderRadius,
        overflow: 'hidden',
    },
    blurContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.padding,
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12, // Circular
        borderWidth: 2,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    checkboxChecked: {
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.onSurface,
        fontSize: SIZES.body,
        flex: 1,
        fontWeight: '500', // Slightly bolder for iOS feel
    },
    textCompleted: {
        color: COLORS.gray,
    },
});

export default TaskItem;
