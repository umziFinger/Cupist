import React from 'react';
import { Platform, View } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '../CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';

interface PropTypes {
  calendarDate: any;
  headerHeight: number;
}
const TopDateSelector = (props: PropTypes) => {
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { calendarDate, headerHeight } = props;

  const onPressDate = () => {
    console.log('onPressDate');
  };

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 999,
        top: headerHeight,
        bottom: 0,
        left: 0,
        right: 0,
        height: 24 + 24 + 2 + 9,
        backgroundColor: Color.White,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(240,240,240)',
      }}
    >
      <CustomButton onPress={() => onPressDate()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Color.Gray200,
            borderWidth: 1,
            borderColor: Color.Gray300,
            paddingVertical: 12,
            paddingLeft: 12,
            paddingRight: 8,
          }}
        >
          <View style={{ width: 16, height: 16, marginRight: 9 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/icCalendar.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13 }}>
              {moment(calendarDate).format('YYYY.MM.DD(dd)')}
            </CustomText>
          </View>
          <View style={{ width: 24, height: 24 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Arrow/icArrowDw.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
      </CustomButton>
    </View>
  );
};

export default TopDateSelector;
