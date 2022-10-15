import {Alert, Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeTimeRecord = async isNight => {
  const now = new Date();
  // Monday: 1
  const weekday = now.getDay();
  const preciseHour = now.getHours();
  const preciseMin = now.getMinutes();
  const year = now.getFullYear();
  const month = now.getUTCMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const date = now.getDate();

  // eg. 20221010-night
  const key =
    isNight === null
      ? `${year}${formattedMonth}${date}`
      : isNight === true
      ? `${year}${formattedMonth}${date}-night`
      : `${year}${formattedMonth}${date}-day`;

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

export const storeNightRecord = storeTimeRecord.bind(null, true);
export const storeDayRecord = storeTimeRecord.bind(null, false);
export const storeSimpleRecord = storeTimeRecord.bind(null, null);

const getAllKeys = async () => {
  let keys = [];

  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log(e);
  }

  return keys;
};

export const getAllStoredRecords = async () => {
  const keys = await getAllKeys();

  const records = await Promise.all(
    keys.map(async key => {
      const value = await getData(key);
      return {key, value};
    }),
  );

  const formattedRecords = JSON.stringify(records);

  return formattedRecords;
};

/**
 * @param {string} date eg. 20221010
 */
export const getData = async (date: string) => {
  try {
    const value = await AsyncStorage.getItem(date);
    if (value !== null) {
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

export const shareStoredRecords = async (customMessage: String) => {
  const message = await getAllStoredRecords();

  try {
    await Share.share({
      message: message,
      url: message,
    });
  } catch (error) {
    console.error(error.message);
  }
};
