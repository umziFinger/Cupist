import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { OnCamera } from '@/Components/Picture';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';

const ImageUploadCard = () => {
  const dispatch = useDispatch();
  const { userIdx } = useSelector((authState: AuthState) => authState.auth);

  const onCamera = async () => {
    // const newAttach = await OnCamera();
    // console.log('newAttach', newAttach);
    // if (newAttach) {
    //   dispatch(CommonActions.fetchCommonReducer({ type: 'attachFile', data: newAttach }));
    if (!userIdx) {
      dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSimpleLoginRBS', data: true }));
    } else {
      dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileViewableIdx', data: 0 }));
      navigate('RepairCameraScreen');
    }

    // }
  };
  return (
    <View
      style={{
        // height: 156,
        flex: 1,
        borderRadius: 24,
        paddingVertical: 26,
        backgroundColor: Color.Primary1000,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
        <View>
          <CustomText
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              lineHeight: 23,
              letterSpacing: -0.43,
              color: Color.Primary1000,
            }}
          >
            {`간편하게 사진으로 \n견적을 받아보세요`}
          </CustomText>
          <CustomButton style={{ marginTop: 14 }} onPress={() => onCamera()}>
            <View style={{ width: 129, height: 48 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Button/btnImageUpload.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </CustomButton>
        </View>

        <View style={{}}>
          <View style={{ width: 126.8, height: 118.2 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Home/imgBag2.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ImageUploadCard;
