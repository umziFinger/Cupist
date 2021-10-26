import messaging from '@react-native-firebase/messaging';
import { FirebaseTokenUpdate } from '@/Components/Firebase/messaging';

export default async function Request() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      await FirebaseTokenUpdate();
      return true;
    }
    return false;
  } catch (e) {
    console.log('fcm request error', e);
  }
}
