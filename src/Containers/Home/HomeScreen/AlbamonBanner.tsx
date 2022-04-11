import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

const AlbamonBanner = () => {
  return (
    <View style={{ flex: 1, marginTop: 17 }}>
      <View style={{ height: 186, backgroundColor: 'rgb(216, 216, 216)' }}>
        {/* <FastImage */}
        {/*  style={{ width: '100%', height: '100%', borderRadius: 5 }} */}
        {/*  source={images[0].url ? { uri: images[0].url || '' } : require('@/Assets/Images/Common/icNoImage.png')} */}
        {/*  resizeMode={FastImage.resizeMode.cover} */}
        {/* /> */}
      </View>
    </View>
  );
};
export default AlbamonBanner;
