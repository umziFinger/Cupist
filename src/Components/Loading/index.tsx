import React from 'react';
import Animation from 'lottie-react-native';
import { Dimensions, View } from 'react-native';

function Loading() {
  const { width, height } = Dimensions.get('window');
  return (
    <View
      style={{
        position: 'absolute',
        height,
        width,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animation
        style={{
          width: 72,
          height: 69,
        }}
        autoPlay
        loop
        source={require('@/Assets/Lottie/Loading.json')}
        imageAssetsFolder={'images'}
      />
    </View>
  );
}

export default Loading;
