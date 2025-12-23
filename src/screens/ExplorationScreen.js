import React from 'react';
import { StyleSheet, View, FlatList, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TaskItem from '../components/TaskItem';
import TaskInput from '../components/TaskInput';
import { useTasks } from '../hooks/useTasks';
import { COLORS, SIZES } from '../constants/theme';

export default function ExplorationScreen() {
    const { tasks, addTask, toggleTask } = useTasks('@exploration_tasks');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Exploration</Text>
                    <Text style={styles.subtitle}>Extra tasks for later.</Text>
                </View>

                <View style={styles.tasksWrapper}>
                    <FlatList
                        data={tasks}
                        renderItem={({ item }) => (
                            <TaskItem
                                task={item}
                                onToggle={toggleTask}
                            />
                        )}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.taskList}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <TaskInput onAddTask={addTask} />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    title: {
        fontSize: SIZES.h1,
        fontWeight: 'bold',
        color: COLORS.onBackground,
    },
    subtitle: {
        fontSize: SIZES.body,
        color: COLORS.onSurface,
        marginTop: 4,
    },
    tasksWrapper: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 80, // Space for TaskInput
    },
    taskList: {
        paddingTop: 10,
        paddingBottom: 20,
    },
});
