import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';

interface CustomMoreLessProps {
  text: string;
  linesToTruncate: number;
}
const CustomMoreLess = ({ text, linesToTruncate }: CustomMoreLessProps) => {
  const [clippedText, setClippedText] = React.useState(false);

  const MoreLessComponent = ({ truncatedText, fullText }: any) => {
    const [more, setMore] = React.useState(false);
    return (
      <CustomText>
        {!more ? `${truncatedText}... ` : fullText}
        <CustomButton onPress={() => setMore(!more)} style={{ flexDirection: 'row' }}>
          <CustomText
            style={{
              color: Color.Primary1000,
              fontSize: 13,
              letterSpacing: -0.32,
              paddingBottom: 2,
            }}
          >
            {more ? ' 접기' : '더보기'}
          </CustomText>
          <View style={{ width: 16, height: 16 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={
                more
                  ? require('@/Assets/Images/Repair/icArrowUpSmallBrand.png')
                  : require('@/Assets/Images/Repair/icArrowDownSmallBrand.png')
              }
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
      </CustomText>
    );
  };

  return clippedText ? (
    <MoreLessComponent truncatedText={clippedText} fullText={text} />
  ) : (
    <CustomText
      numberOfLines={linesToTruncate}
      ellipsizeMode={'tail'}
      onTextLayout={(event) => {
        // get all lines
        const { lines } = event.nativeEvent;

        const text = lines
          .splice(0, linesToTruncate)
          .map((line) => line.text)
          .join('');
        console.log('asdf', text.length);
        setClippedText(text.substr(0, 90));
      }}
    >
      {text}
    </CustomText>
  );
};

export default CustomMoreLess;
