import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '@/Config';
import { navigate } from '@/Services/NavigationService';

const refreshAuthLogic = async (failedRequest: any) => {
  const token = await AsyncStorage.getItem('refreshToken');
  if (token) {
    await axios
      .post(Config.API_URL + Config.AUTH_RENEW_TOKEN_URL, { refresh_token: token })
      .then((tokenRefreshResponse) => {
        console.log('\n\n\n\n만료로 인한 리프레시 로직 start tokenRefreshResponse', tokenRefreshResponse.data);
        console.log('\n\n\n');
        const { access_token, refresh_token } = tokenRefreshResponse.data.data;
        AsyncStorage.setItem('accessToken', access_token);
        AsyncStorage.setItem('refreshToken', refresh_token);
      })
      .catch((e) => {
        console.log('error:', e);

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

  return Promise.resolve();
};

async function getAccessToken() {
  const token = await AsyncStorage.getItem('accessToken');
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
