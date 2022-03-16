import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import CommonActions from '@/Stores/Common/Actions';

const OptimizationScreen = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'codePushPercent',
        data: 0,
      }),
    );
  }, []);

  const { codePushPercent = 0, heightInfo } = useSelector((state: CommonState) => state.common);

  return (
    <View
      style={{ flex: 1, backgroundColor: Color.Primary1000, paddingTop: heightInfo.statusHeight, alignItems: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 115, height: 170 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/logoSplash.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </View>
      <View>
        <CustomText
          style={{ color: Color.White, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.23 }}
        >{`${codePushPercent}%`}</CustomText>
      </View>
      <View style={{ marginTop: 4 }}>
        <CustomText style={{ color: Color.White, fontSize: 13, letterSpacing: -0.23 }}>
          앱을 최적화하는 중입니다.
        </CustomText>
      </View>
      <View style={{ marginBottom: 120, marginTop: 30 }}>
        <Progress.Bar
          progress={codePushPercent || 0 / 100}
          width={294}
          color="#fff"
          unfilledColor="#785909"
          borderWidth={0}
          style={{ marginLeft: 5 }}
        />
      </View>
    </View>
  );
};

export default OptimizationScreen;
