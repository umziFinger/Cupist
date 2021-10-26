import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import PropTypes from 'prop-types';

/** ****************
 *
 *    스크린입니다.
 *
 ***************** */

const CustomSwitch = (props) => {
  const { trackColor, onValueChange, value, style } = props;
  const [animationValue, setAnimationValue] = useState(new Animated.Value(value));

  const colorValue = value ? trackColor.true : trackColor.false;
  if (!style.width) {
    throw new Error('style에서 width 값을 제공하세요! 단 integer');
  }

  const width = style.width;
  const height = style.height;

  const defaultStyle = {
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
CustomSwitch.propTypes = {
  trackColor: PropTypes.objectOf(PropTypes.any),
};
CustomSwitch.defaultProps = {
  trackColor: {
    true: 'red',
    false: 'black',
  },
};

export default CustomSwitch;
