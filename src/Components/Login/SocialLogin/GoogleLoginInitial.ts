import { GoogleSignin } from '@react-native-community/google-signin';

export default function () {
  GoogleSignin.configure({
    webClientId: '250630186651-19he6jsj8t77qhb4gk290rrd0bk2pg4g.apps.googleusercontent.com',
    offlineAccess: false,
  });
  return true;
}
