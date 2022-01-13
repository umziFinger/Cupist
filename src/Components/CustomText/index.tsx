import React, { ReactChild, ReactNode } from 'react';
import { Text, Platform, TextStyle, TextProps } from 'react-native';

interface PropsType {
  children: ReactChild | Array<ReactChild> | ReactNode;
  style: TextStyle;
}

const CustomText = (props: PropsType & TextProps) => {
  const { children, style } = props;

  const defaultStyle = Platform.select({
    ios: { fontFamily: 'SpoqaHanSansNeo-Regular' },
    android: {
      fontFamily: 'SpoqaHanSansNeo-Regular',
      includeFontPadding: false,
    },
  });

  if (style?.fontWeight === '500') {
    return (
      <Text {...props} style={[defaultStyle, style, { fontFamily: 'SpoqaHanSansNeo-Medium' }]} allowFontScaling={false}>
        {children}
      </Text>
    );
  }
  if (style?.fontWeight === 'bold') {
    return (
      <Text
        {...props}
        style={[
          defaultStyle,
          style,
          { fontFamily: 'SpoqaHanSansNeo-Bold', fontWeight: Platform.OS === 'ios' ? style?.fontWeight : 'normal' },
        ]}
        allowFontScaling={false}
      >
        {children}
      </Text>
    );
  }
  return (
    <Text {...props} style={[defaultStyle, style]} allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default CustomText;
