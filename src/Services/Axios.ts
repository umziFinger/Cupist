import { Platform } from 'react-native';
import Config from '@/Config';
import { UserService } from './UserService';

interface AxiosProps {
  url: string;
  params?: any | null;
  formData?: any | null;
}

async function GET(data: AxiosProps) {
  const { url, params } = data;
  const joinApiClient = await UserService.getApiClient(Config.API_URL);
  let result;
  if (joinApiClient === undefined) {
    return result;
  }
  console.log('params@@@@', params);
  return await joinApiClient
    .get(Config.API_URL + url, { params })
    .then((response) => {
      console.log('Success Axios GET StatusCode: ', response.status);
      return response.data;
    })
    .catch((error) => {
      console.log('Error Axios GET API --> ', error);
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
    console.log('POST params', params);
    console.log('POST URL', url);

    return await joinApiClient
      .post(Config.API_URL + url, { ...params, platform: Platform.OS })
      .then((response) => {
        console.log('Success Axios POST StatusCode: ', response.status);
        return response.data;
      })
      .catch((error) => {
        console.log('Error Axios POST API --> ', error);
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
  return await joinApiClient
    .put(Config.API_URL + url, { ...params, platform: Platform.OS })
    .then((response) => {
      console.log('Success Axios PUT StatusCode: ', response.status);
      return response.data;
    })
    .catch((error) => {
      console.log('Error Axios PUT API --> ', url);
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

    console.log('PATCH params@@@@', params);
    console.log('PATCH url@@@@', url);
    console.log('PATCH formData@@@@', formData);

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
    console.log(error);
  }
}

async function DELETE(data: AxiosProps) {
  const { url, params } = data;

  const joinApiClient = await UserService.getApiClient(Config.API_URL);
  let result;
  if (joinApiClient === undefined) {
    return result;
  }

  console.log('DELETE params@@@@', params);
  console.log('DELETE url@@@@', url);
  return await joinApiClient
    .delete(Config.API_URL + url, params)
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
  console.log('formdata@@@@', formData);
  console.log('url@@@@', url);
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
