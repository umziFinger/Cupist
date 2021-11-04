import React from 'react';
import { View } from 'react-native';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

const MyAroundScreen = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <CustomButton onPress={() => navigate('LocationSettingScreen')}>
        <CustomText style={{ color: '#333', fontSize: 20 }}>MyAroundScreen</CustomText>
      </CustomButton>
    </View>
  );
};

export default MyAroundScreen;
