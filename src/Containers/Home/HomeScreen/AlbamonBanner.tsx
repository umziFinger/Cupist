import React from 'react';
import { useWindowDimensions, View } from 'react-native';
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
        onPress={() => navigate('AlbamonDetailScreen')}
      >
        <FastImage
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
          source={{
            uri: `https://s3.ap-northeast-2.amazonaws.com/cdn.bolimi.kr/bolimi/static/event/albamon/homeBanner%403x.png`,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </CustomButton>
    </View>
  );
};
export default AlbamonBanner;
