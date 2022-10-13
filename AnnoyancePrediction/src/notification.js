import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

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

export async function onCreateTriggerNotification() {
  const date = new Date(Date.now());
  date.setSeconds(date.getSeconds() + 3);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      title: 'Test',
      body: 'test body',
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
