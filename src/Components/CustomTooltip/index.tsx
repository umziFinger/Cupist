import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Tooltip from 'react-native-walkthrough-tooltip';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';

interface PropTypes {
  isVisible: boolean;
  toggleOpen: (flag: boolean) => void;
  item: any;
}
const CustomTooltip = ({ isVisible, toggleOpen, item }: PropTypes) => {
  return (
    <Tooltip
      isVisible={isVisible}
      tooltipStyle={[{ backgroundColor: 'transparent' }]}
      content={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginVertical: 6,
            paddingHorizontal: 6,
            borderRadius: 12,
          }}
        >
          <CustomText style={{ fontSize: 13, letterSpacing: -0.28, color: Color.Black1000 }}>
            {item?.content || '관리자에게 문의해주세요.'}
          </CustomText>
        </View>
      }
      onClose={() => toggleOpen(!isVisible)}
      placement={'center'}
      arrowSize={{ width: 0, height: 0 }}
      disableShadow
      backgroundColor={'rgba(16, 18, 20, 0.2)'}
      childContentSpacing={10}
    >
      <CustomButton onPress={() => toggleOpen(!isVisible)} hitSlop={10}>
        <View style={{ width: 18, height: 18 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Home/help.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </CustomButton>
    </Tooltip>
  );
};

export default CustomTooltip;
