import messaging from '@react-native-firebase/messaging';
import { FirebaseTokenUpdate } from '@/Components/Firebase/messaging';

export default async function Check() {
  const authStatus = await messaging().hasPermission();
  if (authStatus === 1) {
    await FirebaseTokenUpdate();
    return true;
  }
  return false;
}
