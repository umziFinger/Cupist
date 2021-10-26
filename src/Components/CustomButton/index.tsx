import React from 'react';
import { Insets, Pressable, StyleProp, ViewStyle } from 'react-native';

interface CustomButtonProps {
  children: React.ReactNode;
  effect?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  hitSlop?: null | Insets | any;
}

function CustomButton(props: CustomButtonProps) {
  const { children, effect = true, style = {}, onPress, hitSlop } = props;

  const pressedStyle = [style, { opacity: 0.8 }];
  const unPressedStyle = [style, { opacity: 1 }];

  const renderButton = () => {
    return (
      <Pressable
        style={({ pressed }) => (effect ? (pressed ? pressedStyle : unPressedStyle) : style)}
        onPress={onPress}
        hitSlop={hitSlop}
      >
        {children}
      </Pressable>
    );
  };

  return renderButton();
}

export default CustomButton;
