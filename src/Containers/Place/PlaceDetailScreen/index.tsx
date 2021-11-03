import React from 'react';
import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import CustomText from '@/Components/CustomText';
import { MainStackParamList } from '@/Navigators/MainNavigator';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'PlaceDetailScreen'>;
}
const PlaceDetailScreen = ({ route }: PropTypes) => {
  const { idx } = route.params;
  console.log('PlaceDetailScreen Idx : ', idx);
  return (
    <View style={{ justifyContent: 'center' }}>
      <CustomText style={{ color: '#333', fontSize: 14 }}>PlaceDetailScreen</CustomText>
    </View>
  );
};

export default PlaceDetailScreen;
