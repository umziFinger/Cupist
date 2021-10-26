import React, { useEffect, useState } from 'react';
import { Animated, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';

interface ToastProps {
  position: string;
  message: string;
}

function Toast(props: ToastProps) {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { position, message } = props;
  const [animation] = useState(new Animated.Value(0.8));

  useEffect(() => {
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'wrapperStyleRBS',
        data: { backgroundColor: 'transparent' },
      }),
    );

    Animated.timing(animation, {
      toValue: 0,
      duration: 3500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToastInit',
        }),
      );
    }, 2000);
  }, []);

  const animationStyles = {
    opacity: animation,
  };

  const getPositionStyles = () => {
    let style;
    if (position === 'top') style = { top: Platform.select({ android: 10, ios: heightInfo.statusHeight + 10 }) };
    if (position === 'bottom') style = { bottom: heightInfo.tabBarBottomHeight };
    return style;
  };

  return (
    <View
      style={[
        {
          width: '100%',
          position: 'absolute',
          zIndex: 99,
        },
        getPositionStyles(),
      ]}
    >
      <Animated.View
        style={[
          {
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: Color.Black1000,
            marginHorizontal: 12,
            paddingVertical: 12,
          },
          animationStyles,
        ]}
      >
        <CustomText style={{ color: Color.White, fontSize: 13, fontWeight: '500', letterSpacing: -0.15 }}>
          {message}
        </CustomText>
      </Animated.View>
    </View>
  );
}

export default Toast;
