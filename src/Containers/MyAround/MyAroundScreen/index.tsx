import React from 'react';
import { View } from 'react-native';
import CustomText from '@/Components/CustomText';

const MyAroundScreen = () => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <CustomText style={{ color: '#333', fontSize: 20 }}>MyAroundScreen</CustomText>
    </View>
  );
};

export default MyAroundScreen;
