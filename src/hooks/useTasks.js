import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getUserId } from '../utils/identity';

export const useTasks = (storageKey, { deleteOnComplete = true, prepend = false } = {}) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const userId = await getUserId();
            if (!userId) return;

            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', userId)
                .eq('list_id', storageKey)
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching tasks:', error);
            } else {
                // Apply the same client-side sorting as before to maintain behavior
                const sortedTasks = (data || []).sort((a, b) => {
                    if (a.completed === b.completed) {
                        if (a.completed) {
                            return (new Date(a.completed_at || 0).getTime()) - (new Date(b.completed_at || 0).getTime());
                        }
                        return 0;
                    }
                    return a.completed ? 1 : -1;
                });

                // Map DB snake_case to app camelCase
                const formattedTasks = sortedTasks.map(task => ({
                    ...task,
                    createdAt: new Date(task.created_at).getTime(),
                    completedAt: task.completed_at ? new Date(task.completed_at).getTime() : null,
                    dueDate: task.due_date ? new Date(task.due_date).getTime() : null,
                }));

                setTasks(formattedTasks);
            }
        } catch (err) {
            console.error('Unexpected error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [storageKey]);

    const addTask = async (text, dueDate = null) => {
        try {
            const userId = await getUserId();
            if (!userId) return;

            const { data, error } = await supabase
                .from('tasks')
                .insert([{
                    text,
                    user_id: userId,
                    list_id: storageKey,
                    completed: false,
                    due_date: dueDate ? dueDate.toISOString() : null
                }])
                .select()
                .single();

            if (error) {
                console.error('Error adding task:', error);
                return;
            }

            if (data) {
                const newTask = {
                    ...data,
                    createdAt: new Date(data.created_at).getTime(),
                    completedAt: null,
                    dueDate: data.due_date ? new Date(data.due_date).getTime() : null,
                };

                setTasks(prevTasks => {
                    const newTasks = prepend ? [newTask, ...prevTasks] : [...prevTasks, newTask];
                    // Re-sort if needed
                    if (!deleteOnComplete) {
                        return newTasks.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
                    }
                    return newTasks;
                });
            }
        } catch (err) {
            console.error('Error in addTask:', err);
        }
    };

    const toggleTask = async (id) => {
        // Optimistic update
        const originalTasks = [...tasks];

        let newCompleted = false;
        let newCompletedAt = null;

        // Find task to get current state
        const taskToUpdate = tasks.find(t => t.id === id);
        if (taskToUpdate) {
            newCompleted = !taskToUpdate.completed;

            if (newCompleted) {
                const now = new Date();
                const dueDate = taskToUpdate.dueDate ? new Date(taskToUpdate.dueDate) : null;

                // User logic: If task is for tomorrow and finished today, completedAt should be tomorrow
                if (dueDate && dueDate > now) {
                    newCompletedAt = dueDate.toISOString();
                } else {
                    newCompletedAt = now.toISOString();
                }
            } else {
                newCompletedAt = null;
            }
        }

        if (deleteOnComplete) {
            setTasks(prevTasks => prevTasks.map(task =>
                task.id === id ? { ...task, completed: newCompleted } : task
            ));

            setTimeout(() => {
                setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
            }, 600);
        } else {
            setTasks(prevTasks => {
                const updatedTasks = prevTasks.map(task =>
                    task.id === id ? {
                        ...task,
                        completed: newCompleted,
                        completedAt: newCompletedAt ? new Date(newCompletedAt).getTime() : null
                    } : task
                );

                return updatedTasks.sort((a, b) => {
                    if (a.completed === b.completed) {
                        if (a.completed) {
                            const timeA = a.id === id ? (newCompletedAt ? new Date(newCompletedAt).getTime() : Date.now()) : (a.completedAt || 0);
                            const timeB = b.id === id ? (newCompletedAt ? new Date(newCompletedAt).getTime() : Date.now()) : (b.completedAt || 0);
                            return timeA - timeB;
                        }
                        return 0;
                    }
                    return a.completed ? 1 : -1;
                });
            });
        }

        // DB Update
        try {
            const { error } = await supabase
                .from('tasks')
                .update({
                    completed: newCompleted,
                    completed_at: newCompletedAt
                })
                .eq('id', id);

            if (error) {
                console.error('Error toggling task:', error);
                // In ideal world, we revert state, but avoiding complexity for now
            }
        } catch (err) {
            console.error('Error in toggleTask:', err);
        }
    };

    const deleteTask = async (id) => {
        // Optimistic update
        const originalTasks = [...tasks];
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting task:', error);
                // setBack
            }
        } catch (err) {
            console.error('Error in deleteTask:', err);
        }
    };

    return {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        loading
    };
};
