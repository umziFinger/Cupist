import { Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const PLATFORM_TRACKING_PERMISSION: any = {
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

export default async () => {
  return await hasStoragePermission();
};

const hasStoragePermission = async () => {
  const permissions = PLATFORM_TRACKING_PERMISSION[Platform.OS];
  console.log('permissions : ', permissions);
  const result = await check(permissions);
  return result === RESULTS.GRANTED;
};
