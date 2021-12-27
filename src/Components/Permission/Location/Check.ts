import { Platform } from 'react-native';
import { PERMISSIONS, check } from 'react-native-permissions';

const PLATFORM_LOCATION_PERMISSIONS: any = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

export default async function () {
  const result = await hasLocationPermission();
  return result;
}

const hasLocationPermission = async () => {
  const permissions = PLATFORM_LOCATION_PERMISSIONS[Platform.OS];
  const result = await check(permissions);
  if (result === 'granted') {
    return true;
  }
  return false;
};
