import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@three_tasks_data';

export const saveTasks = async (tasks) => {
    try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Error saving tasks:', e);
    }
};

export const loadTasks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error loading tasks:', e);
        return [];
    }
};
