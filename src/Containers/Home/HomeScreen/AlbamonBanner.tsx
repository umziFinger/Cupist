import React from 'react';
import { Linking, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

const AlbamonBanner = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, marginTop: 17, alignItems: 'center' }}>
      <CustomButton
        style={{ height: ((width - 40) / 336) * 186, width: width - 40 }}
        onPress={() => {
          Linking.openURL('vnd.youtube://channel/UCDB9dSAZh5jDE2adRfHbrrw').catch((e) => {
            console.log(e);
            Linking.openURL('https://www.youtube.com/channel/UCDB9dSAZh5jDE2adRfHbrrw');
          });
        }}
      >
        <FastImage
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
          source={require('@/Assets/Images/Albamon/v31.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </CustomButton>
    </View>
  );
};
export default AlbamonBanner;
