import { Alert, Linking, Platform } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default async function () {
  const result = await hasLocationPermission();
  return result;
}

const hasLocationPermission = async () => {
  const permissions =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  const result = await request(permissions);

  if (result === RESULTS.GRANTED) {
    return true;
  }
  Alert.alert('회원님의 현재 위치를 바탕으로\n내 주변 볼링장을 안내하기 위해\n위치정보를 사용합니다.', '', [
    { text: '설정', style: 'destructive', onPress: () => Linking.openSettings() },
    { text: '허용 안함' },
  ]);

  return false;
};
