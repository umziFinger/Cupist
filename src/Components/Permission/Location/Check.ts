import { Platform } from 'react-native';
import { check, PERMISSIONS } from 'react-native-permissions';

interface PlatformType {
  ios: string;
  android: string;
  windows?: string;
  macos?: string;
  web?: string;
}
const PLATFORM_LOCATION_PERMISSIONS: PlatformType = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

export default async function LocationCheck() {
  return await hasLocationPermission();
}

const hasLocationPermission = async () => {
  const permissions = PLATFORM_LOCATION_PERMISSIONS[Platform.OS];
  const result = await check(<any>permissions);
  return result === 'granted';
};
