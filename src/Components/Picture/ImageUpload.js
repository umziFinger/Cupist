import moment from 'moment';
import path from 'path';
import ImageResizer from 'react-native-image-resizer';
import Geolocation from '@react-native-community/geolocation';

export default async function (type, file) {
  const tempArr = [];
  // let tempIdx = idx;
  const dataLength = file?.length;
  if (type === 'camera') {
    // 업로드 파일 용량 체크 필요 path? base path?
    const url = file.path;
    const name = `${moment().format('YYYYMMDDHHmmss')}.jpg}`;
    return ImageResizer.createResizedImage(url, 1024, 1024, 'JPEG', 90, 0, null).then((response) => {
      const fileResult = {
        // idx: tempIdx,
        name,
        uri: response.uri,
        url: response.uri,
        type: file.mime,
      };
      tempArr.push(fileResult);
      // tempIdx += 1;
      return tempArr;
    });
  }
  return new Promise((resolve) => {
    file.map(async (x, i) => {
      const url = x.path;
      const name = `${moment().format('YYYYMMDDHHmmss')}${i}.jpg`;
      const [result] = await Promise.all([
        resize(url).then((response) => {
          const fileResult = {
            // idx: tempIdx,
            name,
            uri: response.uri,
            url: response.uri,
            type: 'image/jpeg',
          };
          tempArr.push(fileResult);
          // tempIdx += 1;
          return tempArr;
        }),
      ]);
      if (dataLength === result.length) resolve(result);
    });
  });
}

const resize = (url) => {
  return new Promise((resolve) => {
    ImageResizer.createResizedImage(url, 1024, 1024, 'JPEG', 90, 0, null).then((response) => {
      resolve(response);
    });
  });
};
