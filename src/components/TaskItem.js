import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeOut } from 'react-native-reanimated';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function TaskItem({ task, onToggle, onDelete, showDate }) {
    const isSwiping = useRef(false);

    const renderRightActions = () => {
        return <View style={{ width: 100 }} />;
    };

    return (
        <Animated.View
            exiting={FadeOut.duration(1)}
            style={styles.container}
        >
            <Swipeable
                renderRightActions={renderRightActions}
                overshootRight={false}
                onSwipeableWillOpen={() => {
                    isSwiping.current = true;
                    onDelete(task.id);
                }}
                onSwipeableClose={() => {
                    isSwiping.current = false;
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskContainer}
                    onPress={() => {
                        if (!isSwiping.current) {
                            onToggle(task.id);
                        }
                    }}
                >
                    <TouchableOpacity
                        style={[styles.checkbox, task.completed && styles.checked]}
                        onPress={() => onToggle(task.id)}
                    >
                        {task.completed && (
                            <Ionicons name="checkmark" size={16} color="white" />
                        )}
                    </TouchableOpacity>

                    <View style={styles.textContainer}>
                        <Text
                            style={[
                                styles.taskText,
                                task.completed && styles.completedText
                            ]}
                        >
                            {task.text}
                        </Text>

                        {/* Show Due Date if not completed */}
                        {showDate && !task.completed && task.dueDate && (
                            <Text style={styles.dateText}>
                                {new Date(task.dueDate).toLocaleDateString()}
                            </Text>
                        )}

                        {/* Show Completed Date if completed and showDate is true */}
                        {showDate && task.completedAt && (
                            <Text style={styles.dateText}>
                                {new Date(task.completedAt).toLocaleDateString()}
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    taskContainer: {
        backgroundColor: COLORS.surface,
        padding: 5,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: 'transparent',
        ...SHADOWS.light,
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
    },
    completedText: {
        color: COLORS.onSurface,
        opacity: 0.6,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 12,
        color: COLORS.onSurface,
        marginTop: 2,
    },
});
