import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Keyboard,
    Text,
    Modal,
    Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function TaskInput({ onAddTask, showDate = false }) {
    const [task, setTask] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddTask = () => {
        if (task.trim()) {
            onAddTask(task, date);
            setTask('');
            setDate(new Date());
            Keyboard.dismiss();
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={styles.container}
        >
            <View style={styles.inputWrapper}>
                {/* Date Picker */}
                {/* Date Picker */}
                {showDate && (
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.dateButton}
                    >
                        <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
                        <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
                    </TouchableOpacity>
                )}

                {/* Task Input */}
                <TextInput
                    style={styles.input}
                    placeholder={'Write a task'}
                    placeholderTextColor={'#C0C0C0'}
                    value={task}
                    onChangeText={text => setTask(text)}
                />

                {/* Add Button */}
                <TouchableOpacity onPress={handleAddTask} disabled={!task.trim()}>
                    <View style={[styles.addWrapper, !task.trim() && styles.disabledWrapper]}>
                        <Ionicons name="arrow-up" size={24} color={task.trim() ? "white" : "#AAAAAA"} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Mobile Pickers */}
            {Platform.OS === 'android' && showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {Platform.OS === 'ios' && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showDatePicker}
                    onRequestClose={() => setShowDatePicker(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={() => setShowDatePicker(false)}
                    >
                        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                is24Hour={true}
                                display="inline"
                                onChange={handleDateChange}
                                style={styles.iosPicker}
                                themeVariant="light"
                            />
                            <TouchableOpacity
                                style={styles.doneButton}
                                onPress={() => setShowDatePicker(false)}
                            >
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}

            {Platform.OS === 'web' && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showDatePicker}
                    onRequestClose={() => setShowDatePicker(false)}
                >
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowDatePicker(false)}
                    >
                        <Pressable
                            style={styles.modalContent}
                            onPress={(e) => {
                                // Stop propagation for web to prevent closing when clicking content
                                if (Platform.OS === 'web' && e.stopPropagation) {
                                    e.stopPropagation();
                                }
                            }}
                        >
                            <ReactDatePicker
                                selected={date}
                                onChange={(d) => {
                                    setDate(d);
                                }}
                                inline
                            />
                            <TouchableOpacity
                                style={styles.doneButton}
                                onPress={() => setShowDatePicker(false)}
                            >
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </Pressable>
                </Modal>
            )}
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
        flexGrow: 1,
        flexShrink: 1,        // ✅ important for iOS Safari
        minWidth: 0,          // ✅ prevents overflow bugs
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: SIZES.body,
        color: COLORS.onBackground,
        outlineStyle: 'none',
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
        backgroundColor: COLORS.background,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: '#eee',
        marginRight: 5,
        flexShrink: 0,
    },
    dateButtonText: {
        marginLeft: 5,
        color: COLORS.primary,
        fontSize: SIZES.body,
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        width: '90%',
        maxWidth: 400,
        ...SHADOWS.medium,
    },
    iosPicker: {
        width: '100%',
        height: 320,
    },
    doneButton: {
        marginTop: 10,
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    doneButtonText: {
        color: 'white',
        fontSize: SIZES.body,
        fontWeight: 'bold',
    },
    webDatePickerWrapper: {
        flexShrink: 0,
    },
});
