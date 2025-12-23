import { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';

export const useTasks = (storageKey, { deleteOnComplete = true } = {}) => {
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
        setTasks(prevTasks => {
            const newTasks = [...prevTasks, newTask];
            // If we are not deleting on complete, we might want to ensure sort order on add?
            // But usually adding puts it at the end or top.
            // Let's assume standard append behavior for now, but if we need to enforce "ticked at bottom",
            // we might need to sort.
            // For now, simple append is fine.
            if (!deleteOnComplete) {
                return newTasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
            }
            return newTasks;
        });
    };

    const toggleTask = (id) => {
        if (deleteOnComplete) {
            // Original behavior: Mark compliant, then delete
            setTasks(prevTasks => prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ));

            setTimeout(() => {
                setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
            }, 600);
        } else {
            // New behavior: Mark compliant, then sort (move to bottom)
            setTasks(prevTasks => {
                const updatedTasks = prevTasks.map(task =>
                    task.id === id ? { ...task, completed: !task.completed } : task
                );
                // Sort: Uncompleted (false) first, Completed (true) last
                return updatedTasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
            });
        }
    };

    return {
        tasks,
        addTask,
        toggleTask,
        loading
    };
};
