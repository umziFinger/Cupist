import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { useSelector } from 'react-redux';
import Animation from 'lottie-react-native';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';

const OptimizationScreen = () => {
  const { codePushPercent = 0 } = useSelector((state: CommonState) => state.common);

  console.log('tempCodePushPercent', codePushPercent);

  return (
    <View style={{ flex: 1, backgroundColor: Color.grayBg, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ marginTop: 0 }}>
        <CustomText style={{ color: Color.gray, fontSize: 13, letterSpacing: -0.32 }}>
          앱을 최적화하는 중입니다.
        </CustomText>
      </View>
      <View style={{ marginTop: 4 }}>
        <CustomText
          style={{ color: Color.gray, fontSize: 15, letterSpacing: -0.38, fontWeight: 'bold' }}
        >{`${codePushPercent}%`}</CustomText>
      </View>

      <View style={{ width: 85, height: 79.2, marginTop: 18 }}>
        <Animation
          style={{
            width: '100%',
            height: '100%',
          }}
          autoPlay
          loop
          source={require('@/Assets/Lottie/Optimization.json')}
          imageAssetsFolder={'images'}
        />
      </View>
      <View style={{ justifyContent: 'center', marginTop: 23 }}>
        <CustomText style={{ color: Color.Black1000, letterSpacing: -0.42, fontSize: 17, fontWeight: 'bold' }}>
          명품을 샀다면, <CustomText style={{ color: Color.Primary1000 }}>럭셔리앤올</CustomText>
        </CustomText>
      </View>
    </View>
  );
};

export default OptimizationScreen;
