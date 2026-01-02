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
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function TaskInput({ onAddTask }) {
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
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={styles.container}
        >
            <View style={styles.inputWrapper}>
                {/* Date Picker */}
                {Platform.OS === 'web' ? (
                    <div style={styles.webDatePickerWrapper}>
                        <ReactDatePicker
                            selected={date}
                            onChange={(d) => setDate(d)}
                            dateFormat="MMM d"   // ✅ Jan 12
                            showPopperArrow={false}
                            customInput={
                                <View style={styles.dateButton}>
                                    <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
                                    <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
                                </View>
                            }
                        />
                    </div>
                ) : (
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
        outlineStyle: 'none', // For Web
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
        padding: 20,
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
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        border: '1px solid #eee',
        marginRight: 10,
        backgroundColor: COLORS.surface,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
});
