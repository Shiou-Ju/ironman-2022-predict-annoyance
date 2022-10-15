// node modules
import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
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
// local modules
import {setNotificationByWeekDay, sevenDaysInterval} from './src/notification';
import {
  confirmClearAll,
  shareStoredRecords,
  storeDayRecord,
  storeNightRecord,
  storeSimpleRecord,
} from './src/asyncStorage';
import {checkAndroidBackgroundRestrictions} from './src/checkAndroidBackgroundRestrictions';

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

  useEffect(() => {
    process.env.TZ = 'Asia/Taipei';

    checkAndroidBackgroundRestrictions();
    setNotificationByWeekDay();

    // trigger every 7 days
    setInterval(setNotificationByWeekDay, sevenDaysInterval);
  }, []);

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
          <Section title="記錄🌚關門聲">
            {/* TODO: how to make the button same size */}
            <Button title="點我" onPress={storeNightRecord} />
          </Section>
          <Section title="記錄🌝關門聲">
            <Button title="點我" onPress={storeDayRecord} />
          </Section>
          <Section title="單純記錄關門聲">
            <Button title="點我" onPress={storeSimpleRecord} />
          </Section>
          <Section title="輸出檔案">
            <Button title="點我" onPress={shareStoredRecords} />
          </Section>
          <Section title="清除所有儲存資料">
            <Button title="考慮一下吧" onPress={confirmClearAll} />
          </Section>
          {/* TODO: make a modal to add customized notification */}
          {/* <Section title="modal">
            <Button title="modal" onPress={modalOpen} />
          </Section> */}
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
