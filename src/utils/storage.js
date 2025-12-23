import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_KEY = '@three_tasks_data';

export const saveTasks = async (tasks, key = DEFAULT_KEY) => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error('Error saving tasks:', e);
    }
};

export const loadTasks = async (key = DEFAULT_KEY) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error loading tasks:', e);
        return [];
    }
};
