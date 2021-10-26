import React, { useState } from 'react';
import { View, Pressable, StyleProp, ViewStyle } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

interface CustomSwitchProps {
  trackColor: { true: string; false: string };
  onValueChange: () => void;
  value: boolean;
  style: ViewStyle;
}

const CustomSwitch = (props: CustomSwitchProps) => {
  const { trackColor, onValueChange, value, style } = props;
  const [animationValue] = useState(new Animated.Value(value ? 1 : 0));

  const colorValue = value ? trackColor.true : trackColor.false;
  if (!style.width) {
    throw new Error('style 에서 width 값을 제공하세요! 단 integer');
  }

  const width: any = style.width;
  const height = style.height;

  const defaultStyle: StyleProp<ViewStyle> = {
    width,
    height,
    paddingHorizontal: 2,
    borderRadius: width / 2,
    justifyContent: 'center',
    backgroundColor: colorValue,
  };
  const moveSwitchToggle = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width / 2 - 4],
  });

  Animated.timing(animationValue, {
    toValue: value ? 1 : 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable onPress={onValueChange} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}>
        <View style={defaultStyle}>
          <Animated.View
            style={[
              {
                width: width / 2,
                height: width / 2,
                backgroundColor: '#fff',
                borderRadius: width / 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2.5,
                elevation: 1.5,
              },
              { transform: [{ translateX: moveSwitchToggle }] },
            ]}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default CustomSwitch;
