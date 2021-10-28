import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

interface PropTypes {
  list: Array<any>;
}
const EventArea = (props: PropTypes) => {
  const { list } = props;
  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ justifyContent: 'center', backgroundColor: 'pink', height: 300 }} />
      </View>
    </View>
  );
};

export default EventArea;
