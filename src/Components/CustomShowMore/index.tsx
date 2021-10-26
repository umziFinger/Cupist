import React, { useState } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';

interface PropTypes {
  text: string;
  targetLines: number | 1;
  textColor: string | '#333';
  buttonColor: string | '#333';
  backgroundColor: string | 'transparent';
}

const CustomShowMore = (props: PropTypes) => {
  const [textShown, setTextShown] = useState<boolean>(false);
  const [lengthMore, setLengthMore] = useState<boolean>(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = (e: any) => {
    const { lines } = e.nativeEvent;

    if (lines && Array.isArray(lines) && lines.length > 0) {
      setLengthMore(lines.length >= props.targetLines);
    }
  };

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <CustomText
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : props.targetLines || 1}
        style={{ flex: 1, fontSize: 13, color: props.textColor, lineHeight: 21, letterSpacing: -0.32 }}
      >
        {props.text}
        {lengthMore && textShown ? (
          <CustomButton
            onPress={toggleNumberOfLines}
            style={{
              flexDirection: 'row',
              backgroundColor: props.backgroundColor,
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            hitSlop={10}
          >
            <View>
              <CustomText
                style={{
                  color: props.buttonColor,
                  fontSize: 13,
                  letterSpacing: -0.32,
                  // lineHeight: Platform.OS === 'ios' ? 0 : 10,
                }}
              >
                {' 접기'}
              </CustomText>
            </View>
            <View style={{ width: 16, height: 16 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={
                  textShown
                    ? require('@/Assets/Images/Repair/icArrowUpSmallBrand.png')
                    : require('@/Assets/Images/Repair/icArrowDownSmallBrand.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </CustomButton>
        ) : null}
      </CustomText>
      {lengthMore && !textShown ? (
        <CustomButton
          onPress={toggleNumberOfLines}
          style={{
            flexDirection: 'row',
            flex: 0.2,
            backgroundColor: props.backgroundColor,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
          hitSlop={10}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{}}>
              <CustomText
                style={{
                  color: props.buttonColor,
                  fontSize: 13,
                  letterSpacing: -0.32,
                  lineHeight: 21,
                }}
              >
                {' 더보기'}
              </CustomText>
            </View>
            <View style={{ width: 16, height: 16, paddingBottom: Platform.OS === 'ios' ? 2 : 0 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={
                  textShown
                    ? require('@/Assets/Images/Repair/icArrowUpSmallBrand.png')
                    : require('@/Assets/Images/Repair/icArrowDownSmallBrand.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </CustomButton>
      ) : null}
    </View>
  );
};

export default CustomShowMore;
