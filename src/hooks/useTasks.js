import { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';

export const useTasks = (storageKey) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            const loadedTasks = await loadTasks(storageKey);
            setTasks(loadedTasks);
            setLoading(false);
        };
        fetchTasks();
    }, [storageKey]);

    useEffect(() => {
        if (!loading) {
            saveTasks(tasks, storageKey);
        }
    }, [tasks, loading, storageKey]);

    const addTask = (text) => {
        const newTask = {
            id: Date.now().toString(),
            text,
            completed: false,
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const toggleTask = (id) => {
        // 1. Mark as completed visually first
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));

        // 2. Remove after a short delay
        setTimeout(() => {
            setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
        }, 600);
    };

    return {
        tasks,
        addTask,
        toggleTask,
        loading
    };
};
