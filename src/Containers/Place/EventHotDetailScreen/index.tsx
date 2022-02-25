import React, { useEffect, useState } from 'react';
import { FlatList, useWindowDimensions, View, ViewToken } from 'react-native';
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
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';
import CustomButton from '@/Components/CustomButton';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'EventHotDetailScreen'>;
}

const EventHotDetailScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const [viewableIndex, setViewableIndex] = useState<number>(0);

  const { eventIdx } = route.params;
  const { width } = useWindowDimensions();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { eventHotDetail } = useSelector((state: PlaceState) => state.place);

  const onViewableItemsChanged = React.useRef(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      if (info.viewableItems) {
        const tempViewableIndex = info.viewableItems[0]?.key;
        let changeViewableIndex = 0;
        if (tempViewableIndex !== undefined) {
          changeViewableIndex = parseInt(tempViewableIndex);
        }
        setViewableIndex(changeViewableIndex);
      }
    },
  );

  useEffect(() => {
    const params = {
      eventIdx,
    };
    dispatch(PlaceActions.fetchPlaceEventHotDetail(params));

    return () => {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'eventHotDetail', data: { event: null } }));
    };
  }, [eventIdx]);

  const onTotalImage = (value: number) => {
    console.log('-===');
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'totalImage',
        data: {
          totalImageType: 'totalImage',
          totalImageList: eventHotDetail?.PlaceEventPhoto,
        },
      }),
    );
    navigate('TotalImageScreen', { startIdx: value });
  };

  console.log('======,', eventHotDetail?.PlaceEventPhoto?.length);
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />
      <FlatList
        data={[0]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <View style={{ flex: 1, marginTop: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24 }}>
              <View style={{ width: 50, height: 50, borderRadius: 3 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 3 }}
                  source={
                    eventHotDetail?.placePhoto
                      ? { uri: eventHotDetail?.placePhoto || '' }
                      : require('@/Assets/Images/Common/icNoImage.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>

              <View style={{ marginLeft: 12 }}>
                <View>
                  <CustomText
                    style={{ fontSize: 16, fontWeight: 'bold', letterSpacing: -0.25, color: Color.Black1000 }}
                  >
                    {eventHotDetail?.placeName || ''}
                  </CustomText>
                </View>
                <View style={{ marginTop: 4 }}>
                  <CustomText
                    style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}
                  >
                    일시: {eventHotDetail?.startDate || ''}~{eventHotDetail?.endDate || ''}
                  </CustomText>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
              <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}>
                {eventHotDetail?.content || ''}
              </CustomText>
            </View>

            {eventHotDetail?.PlaceEventPhoto?.length > 0 && (
              <View style={{ flex: 1, marginTop: 24 }}>
                <FlatList
                  data={eventHotDetail?.PlaceEventPhoto || []}
                  renderItem={({ item: image, index }) => (
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          width: '100%',
                          height: width,
                          backgroundColor: Color.Black1000,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={{
                            uri: image?.url || '',
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                    </View>
                  )}
                  initialNumToRender={3}
                  maxToRenderPerBatch={3}
                  windowSize={7}
                  pagingEnabled
                  // horizontal
                />
              </View>
            )}
          </View>
        )}
        initialNumToRender={2}
        maxToRenderPerBatch={5}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: heightInfo.subBottomHeight }} />}
      />
    </View>
  );
};

export default EventHotDetailScreen;
