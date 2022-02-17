import { getProfile, NaverLogin } from '@react-native-seoul/naver-login';

interface naverLoginProps {
  initials: any;
}

export default async function (props: naverLoginProps) {
  const accessToken = await naverLogin(props.initials);
  return accessToken;
}
const naverLogin = async (initials: any) => {
  console.log(initials);
  return new Promise((resolve, reject) => {
    try {
      NaverLogin.logout();
      NaverLogin.login(initials, (err, token) => {
        if (err) {
          console.log('reject', err);
          reject(err);
        } else {
          console.log('Success Naver login');
          resolve(token?.accessToken);
          getUserProfile(token);
        }
      });
    } catch (e) {
      console.error('Error Naver login : ', e);
    }
  });
};
const getUserProfile = async (data: any) => {
  const profileResult = await getProfile(data.accessToken);
  if (profileResult.resultcode === '024') {
    console.log('로그인 실패', profileResult.message);
    return;
  }
  console.log('### profileResult', profileResult);
};
