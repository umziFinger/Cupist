import React from 'react';
import { Text, Platform, TextProps } from 'react-native';

const defaultStyle = Platform.select({
  ios: { fontFamily: 'SpoqaHanSansNeo-Regular' },
  android: {
    fontFamily: 'SpoqaHanSansNeo-Regular',
    includeFontPadding: false,
  },
});
const CustomText: React.SFC<TextProps> = (props) => {
  const { children, style } = props;
  return (
    <Text {...props} style={[defaultStyle, style]} allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default CustomText;
