import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

const USER_ID_KEY = 'three_tasks_user_id';

export const getUserId = async () => {
    try {
        let userId = await AsyncStorage.getItem(USER_ID_KEY);
        if (!userId) {
            userId = uuidv4();
            await AsyncStorage.setItem(USER_ID_KEY, userId);
        }
        return userId;
    } catch (error) {
        console.error('Error retrieving user ID:', error);
        // Return a temporary ID in case of storage failure to avoid crashing apps
        // though distinct per session.
        return uuidv4();
    }
};
