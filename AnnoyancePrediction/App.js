// node modules
import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Button, lightColors, darkColors, Text} from '@rneui/themed';
import {Divider} from '@rneui/base';
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
        h4
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? lightColors.white : darkColors.white,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? lightColors.white : darkColors.white,
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
    backgroundColor: isDarkMode ? darkColors.white : lightColors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        style={backgroundStyle}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={backgroundStyle}>
          {/* <Section title={'Annoyance Notification'}> */}
          <Text
            h3
            style={[
              // TODO:
              // eslint-disable-next-line react-native/no-inline-styles
              {
                marginTop: 20,
                marginLeft: 25,
                marginBottom: 10,
                color: isDarkMode ? lightColors.white : darkColors.white,
              },
            ]}>
            Annoyance Notification
          </Text>
          {/* </Section> */}
          <Divider
            // TODO:
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: '80%', marginLeft: 20}}
            color={isDarkMode ? lightColors.white : darkColors.white}
            insetType="left"
            subHeaderStyle={{}}
            width={1}
            orientation="horizontal"
          />
          <Section title="記錄🌚關門聲">
            {/* TODO: how to make the button same size */}
            <Button size="lg" onPress={storeNightRecord}>
              <Text h4>點我</Text>
            </Button>
          </Section>
          <Section title="記錄🌝關門聲">
            <Button size="lg" onPress={storeDayRecord}>
              <Text h4>點我</Text>
            </Button>
          </Section>
          <Section title="單純記錄關門聲">
            <Button size="lg" onPress={storeSimpleRecord}>
              <Text h4>點我</Text>
            </Button>
          </Section>
          <Section title="輸出檔案">
            <Button size="lg" onPress={shareStoredRecords}>
              <Text h4>點我</Text>
            </Button>
          </Section>
          <Section title="清除所有儲存資料">
            <Button size="sm" color="warning" onPress={confirmClearAll}>
              <Text h4>考慮一下吧</Text>
            </Button>
          </Section>
          {/* TODO: temp for not showing a bar down there */}
          <Section />
          {/* TODO: temp for not showing a bar down there */}
          <Section />
          {/* TODO: temp for not showing a bar down there */}
          <Section />
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
