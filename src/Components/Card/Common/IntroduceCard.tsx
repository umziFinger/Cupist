import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import { OnCamera } from '@/Components/Picture';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';

const IntroduceCard = () => {
  const dispatch = useDispatch();
  const { userIdx } = useSelector((state: AuthState) => state.auth);

  useEffect(() => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileInit' }));
  }, []);
  const onCamera = async () => {
    // const newAttach = await OnCamera();
    // console.log('newAttach', newAttach);
    // if (newAttach) {
    //   dispatch(CommonActions.fetchCommonReducer({ type: 'attachFile', data: newAttach }));
    //   dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileViewableIdx', data: 0 }));
    //   navigate('RepairCameraScreen');
    // }

    if (!userIdx) {
      dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSimpleLoginRBS', data: true }));
    } else {
      navigate('RepairCameraScreen');
    }
  };
  return (
    <CustomButton onPress={() => onCamera()}>
      <View style={{ height: 327, borderRadius: 24, backgroundColor: Color.Primary1000 }}>
        <View style={{ flex: 1, padding: 24 }}>
          <CustomText style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.33, color: Color.Black1000 }}>
            간편하게 사진으로
          </CustomText>
          <View style={{ marginTop: 11 }}>
            <CustomText
              style={{
                fontSize: 21,
                fontWeight: 'bold',
                letterSpacing: -0.53,
                color: Color.Primary1000,
                lineHeight: 31,
              }}
            >
              {`명품 TOP수선사에게\n무료로 견적을 받아보세요`}
            </CustomText>
          </View>
          <View style={{ marginTop: 18.2, paddingHorizontal: 8, height: 116 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/brokenBagImg.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>

        <View
          style={{
            height: 60,
            backgroundColor: Color.Primary1000,
            borderBottomEndRadius: 24,
            borderBottomStartRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomText
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                letterSpacing: -0.43,
                color: Color.White,
              }}
            >
              사진 찍고 견적 받아보기
            </CustomText>
            <View style={{ width: 6.3, height: 11.1, marginLeft: 11 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Arrow/icSmallRightArrowWhite.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        </View>
      </View>
    </CustomButton>
  );
};
export default IntroduceCard;
