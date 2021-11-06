import React, { useEffect } from 'react';
import { View, Platform, Dimensions } from 'react-native';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { useDispatch, useSelector } from 'react-redux';
import CodePush from 'react-native-code-push';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';

const { width, height } = Dimensions.get('window');
const SplashScreen = () => {
  const dispatch = useDispatch();
  const { codePushStatus } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    saveBottomHeight();
    // navigate('HomeScreen');
  }, []);

  // useEffect(() => {
  //   console.log('codePushStatus', codePushStatus);
  //   const getStorage = async () => {
  //     setTimeout(() => {
  //     }, 5000);
  //   };
  //
  //   getStorage();
  // }, [codePushStatus]);

  const saveBottomHeight = () => {
    const statusHeight = getStatusBarHeight(true);
    const headerMenuHeight = 68;
    let bottomBarHeight, tabBarBottomHeight;

    if (Platform.OS === 'android') {
      bottomBarHeight = 0;
      tabBarBottomHeight = 70;
    } else if (isIphoneX()) {
      bottomBarHeight = getBottomSpace();
      tabBarBottomHeight = 90;
    } else {
      bottomBarHeight = 0;
      tabBarBottomHeight = 70;
    }

    const mainBottomHeight = statusHeight + bottomBarHeight + headerMenuHeight + tabBarBottomHeight;
    const subBottomHeight = statusHeight + bottomBarHeight + headerMenuHeight;

    const info = {
      mainBottomHeight,
      subBottomHeight,
      fixBottomHeight: bottomBarHeight,
      tabBarBottomHeight,
      statusHeight,
    };
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'heightInfo',
        data: { info },
      }),
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.White, width, height }}>
      <View style={{ width, height }}>
        <FastImage
          style={{ width: '100%', height: '100%', paddingVertical: getStatusBarHeight(true), paddingHorizontal: 54 }}
          source={require('@/Assets/Images/Splash/splashBackground.png')}
          resizeMode={FastImage.resizeMode.stretch}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.White, fontSize: 29, letterSpacing: -0.72 }}>명품을 샀다면,</CustomText>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.White, fontSize: 43, fontWeight: 'bold', letterSpacing: -1.08 }}>
                럭셔리앤올
              </CustomText>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 133 }}>
            <View style={{ width: 117.5, height: 42.2 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Splash/splashBottom.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </FastImage>
      </View>
    </View>
  );
};

const codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

// export default SplashScreen;
export default CodePush(codePushOptions)(SplashScreen);
