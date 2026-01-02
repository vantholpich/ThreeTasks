import React from 'react';
import { StyleSheet, View, FlatList, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TaskItem from '../components/TaskItem';
import TaskInput from '../components/TaskInput';
import { useTasks } from '../hooks/useTasks';
import { COLORS, SIZES } from '../constants/theme';

export default function ToDoScreen() {
    const { tasks, addTask, toggleTask, deleteTask } = useTasks('@three_tasks_data', { deleteOnComplete: false });

    const sortedTasks = React.useMemo(() => {
        return [...tasks].sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1; // Uncompleted first
            }
            if (a.completed) {
                // Completed: Newest first (Descending)
                return (b.completedAt || 0) - (a.completedAt || 0);
            }
            return 0; // Uncompleted: Keep original order
        });
    }, [tasks]);

    const firstCompletedIndex = sortedTasks.findIndex(task => task.completed);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Three to-dos</Text>
                    <Text style={styles.subtitle}>Your main to-dos for the day</Text>
                </View>

                <View style={styles.tasksWrapper}>
                    <FlatList
                        data={sortedTasks}
                        renderItem={({ item, index }) => (
                            <View>
                                {index === firstCompletedIndex && (
                                    <Text style={styles.sectionHeader}>Completed</Text>
                                )}
                                <TaskItem
                                    task={item}
                                    onToggle={toggleTask}
                                    onDelete={deleteTask}
                                    showDate={item.completed}
                                />
                            </View>
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
    tasksWrapper: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 80, // Space for TaskInput
    },
    taskList: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    sectionHeader: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: SIZES.body,
        color: COLORS.onSurface,
        marginTop: 4,
    }
});
