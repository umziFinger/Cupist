import { Dimensions, FlatList, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { useCode, Extrapolate } from 'react-native-reanimated';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Layout } from '@react-navigation/stack/lib/typescript/src/types';
import { useValue, loop } from 'react-native-redash/src/v1';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';

const { set } = Animated;
const { width } = Dimensions.get('window');

const ReviewListSkeleton = () => {
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
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <FlatList
              data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
              renderItem={() => (
                <View
                  style={{
                    width: (width - 32 - 16) / 3,
                    marginRight: 8,
                    borderRadius: 5,
                  }}
                >
                  <View style={{ width: '100%', height: 109, borderRadius: 5, backgroundColor: Color.grayBlue900 }} />

                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText
                        style={{ color: Color.black900, fontSize: 13, letterSpacing: -0.15, fontWeight: 'bold' }}
                        numberOfLines={1}
                      >
                        {'***** **'}
                      </CustomText>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: 2,
                    }}
                  >
                    <CustomText
                      style={{ color: Color.gray900, fontSize: 11, letterSpacing: -0.1, fontWeight: '500' }}
                      numberOfLines={1}
                    >
                      {'**** ** **'}
                    </CustomText>
                  </View>
                </View>
              )}
              numColumns={3}
              keyExtractor={(keyItem, keyIndex) => keyIndex.toString()}
              initialNumToRender={9}
              maxToRenderPerBatch={12}
              windowSize={7}
            />
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

export default ReviewListSkeleton;
