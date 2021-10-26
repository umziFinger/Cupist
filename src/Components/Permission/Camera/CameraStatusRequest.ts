import { PERMISSIONS, request } from 'react-native-permissions';
import { Platform } from 'react-native';

export default async function () {
  const result =
    Platform.OS === 'android' ? await request(PERMISSIONS.ANDROID.CAMERA) : await request(PERMISSIONS.IOS.CAMERA);
  console.log('result check  : ', result);
  return result;
}
