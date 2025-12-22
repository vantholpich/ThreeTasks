import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const TaskInput = ({ onAddTask }) => {
    const [task, setTask] = useState('');

    const handleAddTask = () => {
        if (task.trim().length > 0) {
            onAddTask(task);
            setTask('');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TextInput
                style={styles.input}
                placeholder={'Write a task'}
                placeholderTextColor={COLORS.gray}
                value={task}
                onChangeText={text => setTask(text)}
            />
            <TouchableOpacity onPress={handleAddTask}>
                <View style={styles.addWrapper}>
                    <Ionicons name="add" size={30} color={COLORS.onPrimary} />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: COLORS.surface,
        borderRadius: 30,
        borderColor: COLORS.darkGray,
        borderWidth: 1,
        color: COLORS.onSurface,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.darkGray,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default TaskInput;
