import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '@/Config';
import { navigate } from '@/Services/NavigationService';

let isTokenRefreshing = false;

export const refreshAuthLogic = async (failedRequest?: any) => {
  if (!isTokenRefreshing) {
    isTokenRefreshing = true;
    const token = await AsyncStorage.getItem('refreshToken');
    if (token) {
      console.log('토큰: ', token);
      await axios
        .post(Config.API_URL + Config.AUTH_RENEW_TOKEN_URL, { refreshToken: token })
        .then((tokenRefreshResponse) => {
          console.log('\n\n\n\n만료로 인한 리프레시 로직 start tokenRefreshResponse', tokenRefreshResponse.data);
          console.log('\n\n\n');
          const { accessToken, refreshToken } = tokenRefreshResponse.data.data;
          AsyncStorage.setItem('accessToken', accessToken);
          AsyncStorage.setItem('refreshToken', refreshToken);
        })
        .catch((e) => {
          console.log('catch error refreshAuthLogic :', e);

          AsyncStorage.setItem('userIdx', '');
          AsyncStorage.setItem('accessToken', '');
          AsyncStorage.setItem('refreshToken', '');

          navigate('HomeScreen', { expired: true });
          console.log('[refreshAuthLogic] error:', e);
        });
    } else {
      AsyncStorage.setItem('userIdx', '');
      AsyncStorage.setItem('accessToken', '');
      AsyncStorage.setItem('refreshToken', '');
      navigate('HomeScreen', { expired: true });
    }

    isTokenRefreshing = false;
    return Promise.resolve();
  }
};

async function getAccessToken() {
  const token = await AsyncStorage.getItem('accessToken');
  console.log('토큰: \n', token);
  return token;
}

async function getApiClient(url: string, timeout = 15000) {
  const ApiClient = axios.create({
    baseURL: `${Config.API_URL}/${url}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout,
  });

  ApiClient.interceptors.request.use(async (request) => {
    const token = await getAccessToken();
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
  });

  createAuthRefreshInterceptor(ApiClient, await refreshAuthLogic, {
    statusCodes: [401, 403],
    pauseInstanceWhileRefreshing: true,
  });

  return ApiClient;
}

export const UserService = {
  getApiClient,
};
