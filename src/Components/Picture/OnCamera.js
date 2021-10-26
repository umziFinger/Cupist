import { Alert, Linking } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageUpload } from '@/Components/Picture/index';

export default async function (idx) {
  const resultFiles = await File();
  let result;
  if (resultFiles) {
    result = await ImageUpload('camera', resultFiles);
  }
  console.log('file', result);

  return result;
}
const File = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.openCamera({
      cropping: false,
      includeExif: true,
      mediaType: 'photo',
    })
      .then((files) => resolve(files))
      .catch((e) => {
        console.log('사진 촬영 에러', e);
        if (e.message === 'User did not grant camera permission.') {
          Alert.alert('게시글작성, 리뷰작성, 프로필사진 변경시 사진등록에 직접 촬영하는데 사용됩니다.', '', [
            { text: '설정', style: 'destructive', onPress: () => Linking.openSettings() },
            { text: '허용 안함' },
          ]);
        }
      });
  });
};
