import { PERMISSIONS, check } from 'react-native-permissions';
import { Platform } from 'react-native';

export default async function () {
  const result =
    Platform.OS === 'android' ? await check(PERMISSIONS.ANDROID.CAMERA) : await check(PERMISSIONS.IOS.CAMERA);
  return result;
}
