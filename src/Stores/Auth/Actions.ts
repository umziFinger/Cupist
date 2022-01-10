import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchAuthReducer: ['params'],
  fetchAuthSmsSend: ['params'], // sms 인증 번호 받기
  fetchSmsAuth: ['params'], // 받은 sms 인증 번호 확인
  fetchUserJoin: ['params'],
  fetchAuthSocialJoin: ['params'],
  fetchUserLogin: ['params'],
  fetchUserInfo: ['params'],
  fetchFindId: ['params'],
  fetchUserLogout: ['params'],
  fetchAuthTerms: ['params'],
  fetchAuthFindId: ['params'],
  fetchAuthFindPassword: ['params'],
  fetchAuthCheckEmail: ['params'],
  fetchCertificationVerify: ['params'],
  fetchAuthSocialJoin2: ['params'],
});

export const AuthTypes = Types;
export default Creators;
