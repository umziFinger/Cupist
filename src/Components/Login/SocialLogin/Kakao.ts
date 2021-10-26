import { login } from '@react-native-seoul/kakao-login';

export default async function () {
  const accessToken = await kakaoLogin();
  return accessToken;
}
const kakaoLogin = async () => {
  try {
    return new Promise((resolve, reject) => {
      login()
        .then((result) => {
          console.log('Success Kakao login');
          resolve(result.accessToken);
        })
        .catch((e) => {
          console.log('error kakao', e);
          reject(e);
        });
    });
  } catch (e) {
    console.error('Error Kakao login : ', e);
    return null;
  }
};
