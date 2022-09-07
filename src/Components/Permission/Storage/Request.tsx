import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default async () => {
  return await hasTrackingPermission();
};

const hasTrackingPermission = async () => {
  const permissions = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
  const result = await request(permissions);
  console.log('result', result);
  return result === RESULTS.GRANTED;
};
