import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';

const ReportList = ({ item, onCheck }: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
      }}
    >
      <CustomText
        style={{
          fontSize: 14,
          letterSpacing: -0.25,
          color: Color.Gray800,
        }}
      >
        {item.code}
      </CustomText>

      <CustomButton onPress={() => onCheck(item.idx)}>
        <View style={{ width: 24, height: 24 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={
              item.check
                ? require('@/Assets/Images/Button/icCheck.png')
                : require('@/Assets/Images/Button/icCheckOff.png')
            }
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </CustomButton>
    </View>
  );
};

export default ReportList;