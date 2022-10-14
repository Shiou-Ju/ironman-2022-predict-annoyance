import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import moment from 'moment';
import {Alert} from 'react-native';
import {ISO_WEEKDAY_DICT, NIGHT_PREDICTION} from './constants';

export const daysToMilliseconds = days => {
  return days * 24 * 60 * 60 * 1000;
};

export const hoursToMilliseconds = hours => {
  return hours * 60 * 60 * 1000;
};

export const minsToMilliseconds = mins => {
  return mins * 60 * 1000;
};

export const sevenDaysInterval = daysToMilliseconds(7);

export async function onDisplayNotification() {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: '通知測試',
    body: '測試',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}

export async function onCreateTriggerNotification(
  time: String,
  message: String,
) {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: time,
  };

  // /* eslint-disable */
  // console.log(`============insdie=============`);
  // console.log(time);
  // console.log(new Date(time).getHours());
  // console.log(new Date(time).getMinutes());
  // console.log(Date.now());
  // console.log(new Date().getHours());
  // console.log(`=============================`);
  // /* eslint-enable */

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // const formattedTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      title: '關門通知',
      body: message ? message : '樓下關門即將在 10 分鐘內發生',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );
}

/**
 * 封裝 onCreateTriggerNotification，在這邊處理完星期幾的運算
 */
export const onCreateTriggerNotificationByWeekday = async (
  time: String,
  weekday: String,
) => {
  const paramISOWeekday: Number = ISO_WEEKDAY_DICT[weekday];

  // const weekdayNow = moment().tz('Asia/Taipei').isoWeekday();
  const weekdayNow = moment().isoWeekday();

  const weekdayDiff = weekdayNow - paramISOWeekday;

  const daysDiff =
    weekdayDiff === 0
      ? 0
      : weekdayDiff < 0
      ? Math.abs(weekdayDiff)
      : 7 - weekdayDiff;

  // 如果今天的時間已經超過，那麼就不設定今天
  const [hours, mins] = time.split(':');
  // const hoursInMilliseconds = hoursToMilliseconds(hours);
  // const minsInMilliseconds = minsToMilliseconds(mins);
  // 10 mins before
  // const tenMinutesMs = minsToMilliseconds(10);

  // const absoluteTime =
  //   Date.now() +
  //   daysToMilliseconds(daysDiff) +
  //   hoursInMilliseconds +
  //   minsInMilliseconds -
  //   tenMinutesMs;

  // const hoursLeft = 24 - moment().get('hour');

  const absoluteTime = moment()
    .add(daysDiff, 'days')
    // UTC +8
    // .subtract(1, 'days')
    // .add(hoursLeft, 'hours')
    // .add(hours, 'hours')
    .set('hour', hours)
    .set('minute', mins)
    // .add(8, 'hours');
    // // 10 mins before
    .subtract(10, 'minutes');

  const absoluteTimeInMs =
    absoluteTime.valueOf() > Date.now()
      ? absoluteTime.valueOf()
      : absoluteTime.valueOf() + sevenDaysInterval;

  const message = `樓下關門即將在 ${time} 發生`;

  /* eslint-disable */
  console.log(`=============================`);
  console.log(absoluteTime);
  console.log(absoluteTimeInMs);
  console.log(`=============================`);
  /* eslint-enable */

  onCreateTriggerNotification(absoluteTimeInMs, message);
};

export const setNotificationByWeekDay = () => {
  const nightPrediction = NIGHT_PREDICTION;

  for (const predict of nightPrediction) {
    const {weekday, time} = predict;
    onCreateTriggerNotificationByWeekday(time, weekday);
  }
};
