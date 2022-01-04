import { Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUniqueId, getDeviceId } from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
import messaging from '@react-native-firebase/messaging';
import Config from '@/Config';
import { Axios } from '@/Services/Axios';

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
      uniqueId,
      deviceId,
      token: fcmToken,
      appVersion,
      marketVersion: marketVersion.toString(),
    };
    console.log('\n\nfcm token info-->>', params);

    const token = await AsyncStorage.getItem('accessToken');
    const url = `auth/fcmToken`;
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };
    console.log('@@@@@@@@@@@@@@@ call auth/fcmToken API');
    const payload = {
      params,
      url,
    };
    const response = await Axios.POST(payload);
    // .post(url, params, config)
    // .then((result: any) => console.log('fcm update api success'))
    // .catch((e: any) => console.log('fcm get token error :', e));
    return response;
  } catch (e) {
    console.log('fcm get token error :', e);
    return false;
  }
}
