import { Dimensions, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { useCode, Extrapolate } from 'react-native-reanimated';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Layout } from '@react-navigation/stack/lib/typescript/src/types';
import { useValue, loop } from 'react-native-redash/src/v1';
import { Color } from '@/Assets/Color';

const { set } = Animated;
const { width } = Dimensions.get('window');

const HomeSkeleton = () => {
  const animatedValue = useValue(0);
  const [skeletonHeight, setSkeletonHeight] = useState(0);
  const [dummy, setDummy] = useState(true);

  useCode(() => {
    return set(
      animatedValue,
      loop({
        duration: 700,
      }),
    );
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, width],
    extrapolate: Extrapolate.CLAMP,
  });

  const backgroundColor = Color.grayBlue900;
  const highlightColor = Color.Gray800;

  const onLayout = (e: Layout) => {
    setSkeletonHeight(e.height);
    setDummy(false);
  };

  const component = (
    <View
      onLayout={(event) => onLayout(event.nativeEvent.layout)}
      style={{
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <View
        style={{
          marginTop: 0,
        }}
      >
        <View
          style={{
            width,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ height: 235, backgroundColor }} />
            <View
              style={{ marginTop: 50, flexDirection: 'row', paddingHorizontal: 28, justifyContent: 'space-between' }}
            >
              <View style={{ width: 64, height: 64, backgroundColor, borderRadius: 32, marginRight: 20 }} />
              <View style={{ width: 64, height: 64, backgroundColor, borderRadius: 32, marginRight: 20 }} />
              <View style={{ width: 64, height: 64, backgroundColor, borderRadius: 32, marginRight: 20 }} />
              <View style={{ width: 64, height: 64, backgroundColor, borderRadius: 32 }} />
            </View>
            <View
              style={{ marginTop: 50, flexDirection: 'row', paddingHorizontal: 28, justifyContent: 'space-between' }}
            >
              <View style={{ width: 103, height: 103, backgroundColor, borderRadius: 5, marginRight: 9 }} />
              <View style={{ width: 103, height: 103, backgroundColor, borderRadius: 5, marginRight: 9 }} />
              <View style={{ width: 103, height: 103, backgroundColor, borderRadius: 5 }} />
            </View>
            <View
              style={{ marginTop: 9, flexDirection: 'row', paddingHorizontal: 28, justifyContent: 'space-between' }}
            >
              <View style={{ width: 103, height: 103, backgroundColor, borderRadius: 5, marginRight: 9 }} />
              <View style={{ width: 103, height: 103, backgroundColor, borderRadius: 5, marginRight: 9 }} />
              <View style={{ width: 103, height: 103, backgroundColor, borderRadius: 5 }} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
      {/* {dummy && component} */}
      <MaskedView style={{ flex: 1, height: '100%' }} maskElement={component}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              zIndex: 99,
              width: 200,
              height: '100%',
              backgroundColor: highlightColor,
            },
            {
              transform: [
                {
                  translateX,
                },
              ],
            },
          ]}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[backgroundColor, highlightColor]}
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>
        <View style={{ flex: 1, height: skeletonHeight, backgroundColor }} />
      </MaskedView>
    </>
  );
};

export default HomeSkeleton;
