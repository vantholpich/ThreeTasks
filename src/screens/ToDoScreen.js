import React from 'react';
import { StyleSheet, View, FlatList, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';



import TaskItem from '../components/TaskItem';
import TaskInput from '../components/TaskInput';
import { useTasks } from '../hooks/useTasks';
import { COLORS, SIZES } from '../constants/theme';

export default function ToDoScreen() {
    const { tasks, addTask, toggleTask, deleteTask } = useTasks('@three_tasks_data', { deleteOnComplete: false, useDueDateAsCompletionDate: true });

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

    const markedDates = React.useMemo(() => {
        const dates = {};
        const tasksByDate = {};

        // Group tasks by date
        tasks.forEach(task => {
            if (task.dueDate) {
                let dateStr = '';
                if (typeof task.dueDate === 'string') {
                    dateStr = task.dueDate.split('T')[0];
                } else {
                    dateStr = new Date(task.dueDate).toISOString().split('T')[0];
                }

                if (!tasksByDate[dateStr]) {
                    tasksByDate[dateStr] = [];
                }
                tasksByDate[dateStr].push(task);
            }
        });

        // Check completion status for each date
        Object.keys(tasksByDate).forEach(date => {
            const tasksOnDate = tasksByDate[date];
            if (tasksOnDate.length > 0) {
                const allCompleted = tasksOnDate.every(t => t.completed);
                if (allCompleted) {
                    dates[date] = {
                        marked: true,
                        dotColor: COLORS.primary,
                        activeOpacity: 0
                    };
                }
            }
        });

        return dates;
    }, [tasks]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>Three todos</Text>
                    <Text style={styles.subtitle}>Your main to-dos for the day</Text>
                </View>

                {/* Calendar View */}
                <View style={styles.calendarContainer}>
                    <Calendar
                        markingType={'simple'}
                        markedDates={markedDates}
                        theme={{
                            backgroundColor: COLORS.background,
                            calendarBackground: COLORS.background,
                            textSectionTitleColor: COLORS.onSurface,
                            selectedDayBackgroundColor: COLORS.primary,
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: COLORS.primary,
                            dayTextColor: COLORS.onBackground,
                            textDisabledColor: '#d9e1e8',
                            dotColor: COLORS.primary,
                            selectedDotColor: '#ffffff',
                            arrowColor: COLORS.primary,
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: COLORS.onBackground,
                            indicatorColor: COLORS.primary,
                            textDayFontFamily: 'System',
                            textMonthFontFamily: 'System',
                            textDayHeaderFontFamily: 'System',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 14,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 14
                        }}
                    />
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
                                    showDate={true}
                                />
                            </View>
                        )}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.taskList}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <TaskInput onAddTask={addTask} showDate={true} />
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
    calendarContainer: {
        paddingHorizontal: 10,
        marginBottom: 10,
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
    }
});
