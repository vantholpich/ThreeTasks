import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, StatusBar, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import TaskItem from './src/components/TaskItem';
import TaskInput from './src/components/TaskInput';
import { loadTasks, saveTasks } from './src/utils/storage';
import { COLORS, SIZES } from './src/constants/theme';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id) => {
    // 1. Mark as completed visually first
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));

    // 2. Remove after a short delay
    setTimeout(() => {
      setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
    }, 600);
  };

  // handleDeleteTask removed as per request


  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" backgroundColor={COLORS.gradientStart} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.tasksWrapper}>
            <FlatList
              data={tasks}
              renderItem={({ item }) => (
                <TaskItem
                  task={item}
                  onToggle={handleToggleTask}
                />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.taskList}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <TaskInput onAddTask={handleAddTask} />
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.onBackground,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.onSurface,
    opacity: 0.8,
  },
  tasksWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 100, // Space for TaskInput
  },
  taskList: {
    paddingBottom: 20,
  },
});
