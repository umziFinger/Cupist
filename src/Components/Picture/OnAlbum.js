import { Alert, Linking } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ImageUpload } from '@/Components/Picture/index';

export default async function (idx) {
  const resultFiles = await File();
  let result;
  if (resultFiles) {
    result = await ImageUpload('album', resultFiles);
  }
  console.log('result', result);
  return result;
}
const File = () => {
  return new Promise((resolve) => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: false,
      includeExif: true,
      mediaType: 'photo',
      maxFiles: 5,
    })
      .then((files) => resolve(files))
      .catch((e) => {
        console.log('사진 갤러리 에러', e);
        if (e.message === 'Cannot access images. Please allow access if you want to be able to select images.') {
          Alert.alert('게시글작성, 리뷰작성, 프로필사진 변경시 사진등록에 회원님 앨범에 접근하는데 사용됩니다.', '', [
            { text: '설정', style: 'destructive', onPress: () => Linking.openSettings() },
            { text: '허용 안함' },
          ]);
        }
      });
  });
};
