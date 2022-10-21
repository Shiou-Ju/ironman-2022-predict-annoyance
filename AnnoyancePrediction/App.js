// node modules
import React, {
  useEffect,
  // useState
} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';
import {Button, lightColors, darkColors, Text} from '@rneui/themed';
import {Divider} from '@rneui/base';
// local modules
import {setNotificationByWeekDay} from './src/notification';
import {
  confirmClearAll,
  shareStoredRecords,
  storeDayRecord,
  storeNightRecord,
  storeSimpleRecord,
} from './src/asyncStorage';
import {checkAndroidBackgroundRestrictions} from './src/checkAndroidBackgroundRestrictions';
// TODO: remove if not used
// import notifee from '@notifee/react-native';

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

    // TODO: on my device, warnings will show up even you already canceled optimization for this app.
    // and the app still killed after a certain while
    checkAndroidBackgroundRestrictions();

    // TODO: maybe duplication of notification is orginated from here
    // new missions are set even the old ones exist
    // see: node_modules/@notifee/react-native/dist/types/Module.d.ts
    // getTriggerNotifications()
    setNotificationByWeekDay();
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
        <View
          style={{
            backgroundColor: backgroundStyle.backgroundColor,
            // make window height 100vh
            height: Dimensions.get('window').height,
          }}>
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
          {/* TODO: remove if not used */}
          {/* <Test /> */}
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
          {/* TODO: make a modal to add customized notification */}
          {/* <Section title="modal">
            <Button title="modal" onPress={modalOpen} />
          </Section> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// TODO: remove after the issue is solved
// const Test = () => {
//   const [data, setData] = useState(null);

//   const show = async () => {
//     const managerInfo = await notifee.getPowerManagerInfo();

//     const optimization = await notifee.isBatteryOptimizationEnabled();

//     const result =
//       'managerInfo: ' +
//       JSON.stringify(managerInfo) +
//       '\n\n' +
//       'optimization: ' +
//       JSON.stringify(optimization);

//     setData(result);
//   };

//   show();

//   return (
//     // eslint-disable-next-line react-native/no-inline-styles
//     <Text h4 style={{backgroundColor: 'white'}}>
//       {data}
//     </Text>
//   );
// };

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
