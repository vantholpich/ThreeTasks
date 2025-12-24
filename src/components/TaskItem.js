import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeOut } from 'react-native-reanimated';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function TaskItem({ task, onToggle, onDelete }) {
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

                    <Text
                        style={[
                            styles.taskText,
                            task.completed && styles.completedText
                        ]}
                    >
                        {task.text}
                    </Text>
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
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
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
        flex: 1,
    },
    completedText: {
        color: COLORS.onSurface,
        opacity: 0.6,
    },
});
