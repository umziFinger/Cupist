import React, { useEffect } from 'react';
import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import PlaceActions from '@/Stores/Place/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import Header from '@/Components/Header';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'PlaceDetailScreen'>;
}
const PlaceDetailScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const { idx } = route.params;
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { placeDetail } = useSelector((state: PlaceState) => state.place);
  const place = placeDetail?.place;
  const latestReview = placeDetail?.latestReview;
  const starReview = placeDetail?.starReview;
  const together = placeDetail?.together;
  useEffect(() => {
    console.log('PlaceDetailScreen Idx : ', idx);
    dispatch(PlaceActions.fetchPlaceDetail({ idx }));
    return () => {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'placeDetailInit' }));
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header type={'placeDetail'} />
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: '#333', fontSize: 14 }}>PlaceDetailScreen1</CustomText>
        <CustomText style={{ color: '#333', fontSize: 14 }}>{place?.name || ''}</CustomText>
      </View>
    </View>
  );
};

export default PlaceDetailScreen;
