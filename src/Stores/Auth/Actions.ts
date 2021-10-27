import { createActions } from 'reduxsauce';
import { fetchAuthSocialLogin } from '@/Sagas/AuthSaga';

const { Types, Creators } = createActions({
  fetchAuthReducer: ['params'],
  fetchAuthSmsSend: ['params'],
  fetchSmsAuth: ['params'],
  fetchUserJoin: ['params'],
  fetchAuthSocialJoin: ['params'],
  fetchUserLogin: ['params'],
  fetchUserInfo: ['params'],
  fetchFindId: ['params'],
  fetchFindPassword: ['params'],
  fetchUserLogout: ['params'],
  fetchAuthTerms: ['params'],
  fetchAuthFindId: ['params'],
  fetchAuthFindPassword: ['params'],
});

export const AuthTypes = Types;
export default Creators;
