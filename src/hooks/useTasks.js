import { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';

export const useTasks = (storageKey, { deleteOnComplete = true, prepend = false } = {}) => {
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
            createdAt: Date.now(),
        };
        setTasks(prevTasks => {
            const newTasks = prepend ? [newTask, ...prevTasks] : [...prevTasks, newTask];
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
                    task.id === id ? {
                        ...task,
                        completed: !task.completed,
                        completedAt: !task.completed ? Date.now() : null // Set timestamp if completing
                    } : task
                );

                // Sort: 
                // 1. Uncompleted (false) first
                // 2. Completed: Sort by completedAt ascending (oldest completed at top? No, we want newly ticked at bottom)
                // Wait, if I tick it now, it has largest timestamp.
                // "Go to the bottom of the ticked tasks list" -> Latest one at bottom.
                // So Ascending completedAt.
                return updatedTasks.sort((a, b) => {
                    if (a.completed === b.completed) {
                        if (a.completed) {
                            return (a.completedAt || 0) - (b.completedAt || 0);
                        }
                        return 0; // Maintain order for uncompleted? Or maybe by id?
                    }
                    return a.completed ? 1 : -1;
                });
            });
        }
    };

    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    return {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        loading
    };
};
