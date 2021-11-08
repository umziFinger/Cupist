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
        style={{ flex: 1, fontSize: 14, color: props.textColor, letterSpacing: -0.25, paddingVertical: 1 }}
      >
        {props.text}
        {lengthMore && textShown ? (
          <CustomButton
            onPress={toggleNumberOfLines}
            style={{
              flexDirection: 'row',
              backgroundColor: props.backgroundColor,
            }}
            hitSlop={10}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <CustomText
                style={{
                  color: props.buttonColor,
                  fontSize: 14,
                  letterSpacing: -0.25,
                }}
              >
                {' 접기'}
              </CustomText>
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
          </View>
        </CustomButton>
      ) : null}
    </View>
  );
};

export default CustomShowMore;
