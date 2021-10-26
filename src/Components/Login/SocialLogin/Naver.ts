import { NaverLogin } from '@react-native-seoul/naver-login';

interface naverLoginProps {
  initials: any;
}

export default async function (props: naverLoginProps) {
  const accessToken = await naverLogin(props.initials);
  return accessToken;
}
const naverLogin = async (initials: any) => {
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
        }
      });
    } catch (e) {
      console.error('Error Naver login : ', e);
    }
  });
};
