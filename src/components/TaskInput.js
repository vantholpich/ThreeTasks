import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function TaskInput({ onAddTask }) {
    const [task, setTask] = useState('');

    const handleAddTask = () => {
        if (task.trim()) {
            onAddTask(task);
            setTask('');
            Keyboard.dismiss();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={styles.container}
        >
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={'Write a task'}
                    placeholderTextColor={'#C0C0C0'}
                    value={task}
                    onChangeText={text => setTask(text)}
                />
                <TouchableOpacity onPress={handleAddTask} disabled={!task.trim()}>
                    <View style={[styles.addWrapper, !task.trim() && styles.disabledWrapper]}>
                        <Ionicons name="arrow-up" size={24} color={task.trim() ? "white" : "#AAAAAA"} />
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        ...SHADOWS.medium,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: SIZES.body,
        color: COLORS.onBackground,
    },
    addWrapper: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    disabledWrapper: {
        backgroundColor: COLORS.background, // Or a lighter gray
    },
});
