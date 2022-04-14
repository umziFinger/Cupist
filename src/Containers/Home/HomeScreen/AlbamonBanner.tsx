import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomButton from '@/Components/CustomButton';

const AlbamonBanner = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, marginTop: 17, alignItems: 'center' }}>
      <CustomButton style={{ height: (width / 375) * 186, width }}>
        <FastImage
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
          source={require('@/Assets/Images/Albamon/homeBanner.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </CustomButton>
    </View>
  );
};
export default AlbamonBanner;
