import { GoogleSignin } from '@react-native-community/google-signin';
import { Alert } from 'react-native';

export default async function () {
  const accessToken = await googleLogin();
  return accessToken;
}
const googleLogin = async () => {
  try {
    return new Promise((resolve, reject) => {
      GoogleSignin.getCurrentUser().then(async (result) => {
        if (result !== null) {
          await GoogleSignin.signOut();
        } else {
          await GoogleSignin.signIn()
            .then((data) => {
              console.log('Success Google login');
              resolve(data.idToken);
            })
            .catch((error) => {
              console.error('Error Google login : ', error);
              reject(error);
            });
        }
      });
    });
  } catch (e) {
    console.error('Error Google login : ', e);
  }

  return null;
};
