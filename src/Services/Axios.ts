import { Platform } from 'react-native';
import { AxiosRequestConfig } from 'axios';
import Config from '@/Config';
import { UserService } from './UserService';

interface AxiosProps {
  url: string;
  params?: any | null;
  formData?: any | null;
  data?: any | null;
}

async function GET(data: AxiosProps) {
  const { url, params } = data;
  const joinApiClient = await UserService.getApiClient(Config.API_URL);
  let result;
  if (joinApiClient === undefined) {
    return result;
  }
  console.log(`| GET | ${Config.API_URL}${url}`);
  console.log(`| params ->`, params);
  return await joinApiClient
    .get(`${Config.API_URL}${url}`, { params })
    .then((response) => {
      console.log('Success Axios GET StatusCode: ', response.status);
      console.log('Success Axios GET URL: ', url);
      return response.data;
    })
    .catch((error) => {
      console.log('Error Axios GET API --> ', error);
      console.log('Error Axios GET URL --> ', url);
      return error.response.data;
    })
    .finally(() => {
      // console.log('call Axios get Finally');
    });
}

async function POST(data: AxiosProps) {
  try {
    const { params, url } = data;
    const joinApiClient = await UserService.getApiClient(Config.API_URL);
    let result;
    if (joinApiClient === undefined) {
      return result;
    }
    console.log(`| POST | ${Config.API_URL}${url}`);
    console.log(`| params ->`, params);
    return await joinApiClient
      .post(`${Config.API_URL}${url}`, { ...params, platform: Platform.OS })
      .then((response) => {
        console.log('Success Axios POST StatusCode: ', response.status);
        console.log('Success Axios POST URL: ', url);
        return response.data;
      })
      .catch((error) => {
        console.log('Error Axios POST API --> ', error);
        console.log('Error Axios POST URL --> ', url);
        return error.response.data;
      })
      .finally(() => {
        // console.log('call Axios post Finally');
      });
  } catch (error) {
    console.log(error);
  }
}

async function PUT(data: AxiosProps) {
  const { url, params } = data;
  const joinApiClient = await UserService.getApiClient(Config.API_URL);
  let result;
  if (joinApiClient === undefined) {
    return result;
  }
  console.log(`| PUT | /${url}`);
  console.log(`| params ->`, params);
  return await joinApiClient
    .put(Config.API_URL + url, { ...params, platform: Platform.OS })
    .then((response) => {
      console.log('Success Axios PUT StatusCode: ', response.status);
      console.log('Success Axios PUT URL: ', url);
      return response.data;
    })
    .catch((error) => {
      console.log('Error Axios PUT API --> ', error);
      console.log('Error Axios PUT URL --> ', url);
      return error.response.data;
    })
    .finally(() => {
      // console.log('call Axios put Finally');
    });
}

async function PATCH(data: AxiosProps) {
  try {
    const { url, params, formData } = data;
    const joinApiClient = await UserService.getApiClient(Config.API_URL);
    let result;
    if (joinApiClient === undefined) {
      return result;
    }
    console.log(`| PATCH | /${url}`);
    console.log(`| params ->`, params);
    console.log(`| formData ->`, formData);
    return await joinApiClient
      .patch(Config.API_URL + url, formData || { ...params, platform: Platform.OS })
      .then((response) => {
        console.log('Success Axios PATCH StatusCode: ', response.status);
        return response.data;
      })
      .catch((error) => {
        console.log('Error Axios PATCH API --> ', error);
        return error.response.data;
      })
      .finally(() => {
        // console.log('call Axios put Finally');
      });
  } catch (error) {
    console.log('패치 API 에러: ', error);
  }
}

async function DELETE(item: AxiosRequestConfig) {
  const { url, params, data } = item;

  const joinApiClient = await UserService.getApiClient(Config.API_URL);
  let result;
  if (joinApiClient === undefined) {
    return result;
  }
  console.log(`| DELETE | /${url}`);
  console.log(`| params ->`, params);
  console.log(`| data ->`, data);
  return await joinApiClient
    .delete(Config.API_URL + url, { data } || { ...params })
    .then((response) => {
      console.log('Success Axios DELETE StatusCode: ', response.status);
      return response.data;
    })
    .catch((error) => {
      console.log('Error Axios DELETE API --> ', error.response);
      return error.response.data;
    })
    .finally(() => {
      // console.log('call Axios delete Finally');
    });
}

async function FILE(data: AxiosProps) {
  const { url, formData } = data;
  const joinApiClient = await UserService.getApiClient(Config.API_URL);
  let result;
  if (joinApiClient === undefined) {
    return result;
  }
  console.log(`| POST(File) | /${url}`);
  console.log(`| formData ->`, formData);
  const config = {
    headers: {
      accept: 'application/json',
      'content-type': 'multipart/form-data',
    },
  };

  return await joinApiClient
    .post(Config.API_URL + url, formData, config)
    .then((response) => {
      console.log('Success Axios FileUpload : ', response.status);
      return response.data;
    })
    .catch((error) => {
      console.log('Error Axios FileUpload API --> ', error);
      return error.response.data;
    })
    .finally(() => {
      // console.log('call Axios FileUpload Finally');
    });
}

export const Axios = {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  FILE,
};
