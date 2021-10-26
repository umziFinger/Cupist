import { Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUniqueId, getDeviceId } from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
import messaging from '@react-native-firebase/messaging';
import Config from '@/Config';

export default async function TokenUpdate() {
  try {
    const fcmToken = await messaging().getToken();
    const platform = Platform.OS;
    const uniqueId = getUniqueId();
    const deviceId = getDeviceId();
    const appVersion = Config.APP_VERSION;
    let marketVersion = await VersionCheck.getCurrentVersion();
    if (!marketVersion) {
      marketVersion = '';
    }

    const params = {
      platform,
      unique_id: uniqueId,
      device_id: deviceId,
      token: fcmToken,
      app_version: appVersion,
      market_version: marketVersion.toString(),
    };
    console.log('\n\nfcm token info-->>', params);

    const token = await AsyncStorage.getItem('accessToken');
    const url = `${Config.API_URL}auth/fcmToken`;
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };
    axios.post(url, params, config).then((result) => console.log('fcm update api success'));
    return true;
  } catch (e) {
    console.log('fcm get token error :', e);
    return false;
  }
}
