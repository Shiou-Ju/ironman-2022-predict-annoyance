import React from 'react';
import type {Node} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const storeTimeRecord = async () => {
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

const getAllStoredRecords = async () => {
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
const getData = async (date: string) => {
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

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }

  Alert.alert('All data wiped');
};

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title={'Annoyance Notification'} />
          <Section title="記錄關門聲">
            {/* TODO: how to make the button same size */}
            {/* <Button title="點我" onPress={() => Alert.alert('關門聲已記錄')} /> */}
            <Button title="點我" onPress={storeTimeRecord} />
          </Section>
          <Section title="輸出檔案">
            {/* TODO: how to export file */}
            {/* <Button title="點我" onPress={() => Alert.alert('檔案已輸出')} /> */}
            <Button title="點我" onPress={getAllStoredRecords} />
          </Section>
          <Section title="清除所有儲存資料(開發用)">
            {/* TODO: how to export file */}
            {/* <Button title="點我" onPress={() => Alert.alert('檔案已輸出')} /> */}
            <Button title="確定點我？" onPress={clearAll} />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
