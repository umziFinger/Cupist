import { GoogleSignin } from '@react-native-community/google-signin';

export default function () {
  GoogleSignin.configure({
    webClientId: '812978165702-i0kouh631omi4go6cbinuipoh3o77i23.apps.googleusercontent.com\n',
    offlineAccess: false,
  });
  return true;
}
