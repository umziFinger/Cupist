import React, { useEffect } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { RouteProp } from '@react-navigation/native';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '@/Components/CustomText';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import PlaceActions from '@/Stores/Place/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'EventHotDetailScreen'>;
}

const EventHotDetailScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const { eventIdx } = route.params;
  const { width } = useWindowDimensions();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { eventHotDetail } = useSelector((state: PlaceState) => state.place);

  useEffect(() => {
    const params = {
      eventIdx,
    };
    dispatch(PlaceActions.fetchPlaceEventHotDetail(params));

    return () => {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'eventHotDetail', data: { event: null } }));
    };
  }, [eventIdx]);

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" text={eventHotDetail?.title} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[0]}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={{ width: '100%', height: width }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={
                  eventHotDetail?.placePhoto
                    ? { uri: eventHotDetail?.placePhoto || '' }
                    : require('@/Assets/Images/Common/icNoImage.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          }
          renderItem={() => (
            <View style={{ flex: 1, paddingHorizontal: 24, marginTop: 40 }}>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3 }}>
                  {eventHotDetail?.title || ''}
                </CustomText>
              </View>
              <View style={{ justifyContent: 'center', marginTop: 12 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.15 }}>{eventHotDetail?.content || ''}</CustomText>
              </View>
              {/* <View style={{ width: width - 48, height, backgroundColor: Color.Grayyellow100 }}> */}
              {/*  <FastImage */}
              {/*    style={{ width: '100%', height: '100%' }} */}
              {/*    source={{ uri: myEventDetail?.mainFile }} */}
              {/*    resizeMode={FastImage.resizeMode.stretch} */}
              {/*  /> */}
              {/* </View> */}
            </View>
          )}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: heightInfo.subBottomHeight }} />}
        />
      </View>
    </View>
  );
};

export default EventHotDetailScreen;
