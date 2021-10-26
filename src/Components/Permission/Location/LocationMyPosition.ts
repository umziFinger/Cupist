import { Platform } from 'react-native';
import LocationUpdateIOS from '@/Components/Permission/Location/LocationUpdateIOS';
import LocationUpdateAndroid from '@/Components/Permission/Location/LocationUpdateAndroid';
import { LocationRequest } from '@/Components/Permission/Location';

export default async function LocationMyPosition() {
  const result = await LocationRequest();
  if (result) {
    return Platform.OS === 'ios' ? await LocationUpdateIOS() : await LocationUpdateAndroid();
  }
  return '위치권한 필요';
}
