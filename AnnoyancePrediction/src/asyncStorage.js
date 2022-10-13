import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTimeRecord = async () => {
  const now = new Date();
  // Monday: 1
  const weekday = now.getDay();
  const preciseHour = now.getHours();
  const preciseMin = now.getMinutes();
  const year = now.getFullYear();
  const month = now.getUTCMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const date = now.getDate();

  // eg. 20221010
  const key = `${year}${formattedMonth}${date}`;
  const value = {
    preciseTime: `${preciseHour}:${preciseMin}`,
    weekday,
  };

  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    Alert.alert('record stored');
  } catch (e) {
    console.error(e);
  }
};

export const getAllStoredRecords = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log(e);
  }

  const records = await Promise.all(
    keys.map(async key => {
      const value = await getData(key);
      return {key, value};
    }),
  );

  const message = JSON.stringify(records);
  Alert.alert(message);
};

/**
 * @param {string} date eg. 20221010
 */
export const getData = async (date: string) => {
  try {
    const value = await AsyncStorage.getItem(date);
    if (value !== null) {
      // Alert.alert(value);
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }

  Alert.alert('All data wiped');
};
