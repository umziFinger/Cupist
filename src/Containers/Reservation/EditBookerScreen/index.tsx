import React from 'react';
import { View } from 'react-native';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';

const EditBookerScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header type={'back'} text={'예약자 정보'} />
    </View>
  );
};

export default EditBookerScreen;
