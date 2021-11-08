import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import PlaceActions from '@/Stores/Place/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import Config from '@/Config';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import PlaceLargeCard from '@/Components/Card/Common/PlaceLargeCard';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

const MyAroundScreen = () => {
  const dispatch = useDispatch();
  const [isScroll, setIsScroll] = useState(false);
  const { myLatitude = '37', myLongitude = '126' } = useSelector((state: CommonState) => state.common);
  const {
    myAroundSort = { index: 0, key: 'distance', value: '거리순' },
    myAroundList,
    myAroundListPage = 1,
    location = { areaCode: '', lat: '', lng: '', areaName: '' },
  } = useSelector((state: PlaceState) => state.place);

  useEffect(() => {
    console.log('내주변 볼링장 위치 변경: ', location.lat, location.areaCode, location.lng);
    const params = {
      areaCode: Config.APP_MODE === 'dev' ? location.areaCode || '1019' : location.areaCode,
      lat: location.lat || myLatitude || '37',
      lng: location.lng || myLongitude || '126',
      sort: myAroundSort.key,
      perPage: 10,
      page: 1,
    };
    dispatch(PlaceActions.fetchPlaceSearchList(params));
  }, [location.lat, location.areaCode, location.lng, myAroundSort.key]);

  const onMore = () => {
    const params = {
      areaCode: Config.APP_MODE === 'dev' ? location.areaCode || '1019' : location.areaCode,
      lat: location.lat || myLatitude || '37',
      lng: location.lng || myLongitude || '126',
      sort: myAroundSort.key,
      perPage: 10,
      page: myAroundListPage,
    };
    if (myAroundListPage > 1) dispatch(PlaceActions.fetchPlaceSearchList(params));
  };
  const onRefresh = () => {
    const params = {
      areaCode: Config.APP_MODE === 'dev' ? location.areaCode || '1019' : location.areaCode,
      lat: location.lat || myLatitude || '37',
      lng: location.lng || myLongitude || '126',
      sort: myAroundSort.key,
      perPage: 10,
      page: 1,
    };
    dispatch(PlaceActions.fetchPlaceSearchList(params));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header
        type={'myAround'}
        // text={myAroundList?.length > 0 ? myAroundList[0]?.area : '내주변'}
        text={location?.areaName === '' ? '내주변' : location.areaName}
        isScroll={isScroll}
      />
      <View style={{ flex: 1, backgroundColor: Color.White, paddingHorizontal: 20 }}>
        <FlatList
          data={myAroundList}
          // data={[0, 1, 2, 3, 4, 5]}
          renderItem={({ item }) => (
            <>
              <PlaceLargeCard item={item} />
              {/* <PlaceLargeCard item={item} /> */}
              {/* <PlaceLargeCard item={item} /> */}
              {/* <PlaceLargeCard item={item} /> */}

              {/* <PlaceLargeCard item={item} /> */}
              {/* <PlaceLargeCard item={item} /> */}
              {/* <View style={{ height: 300, width: '100%', backgroundColor: Color.Gray300, marginBottom: 8 }} /> */}
              {/* <View style={{ height: 300, width: '100%', backgroundColor: Color.Gray300, marginBottom: 8 }} /> */}
              {/* <View style={{ height: 300, width: '100%', backgroundColor: Color.Gray300, marginBottom: 8 }} /> */}
            </>
          )}
          maxToRenderPerBatch={6}
          windowSize={7}
          initialNumToRender={3}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          onEndReached={() => onMore()}
          onEndReachedThreshold={0.8}
          refreshing={false}
          onRefresh={() => onRefresh()}
          onScroll={(e) => {
            // console.log(e.nativeEvent);
            if (e.nativeEvent.contentOffset.y > 60) {
              setIsScroll(true);
            } else {
              setIsScroll(false);
            }
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                backgroundColor: Color.White,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <View style={{ width: 60, height: 60, marginTop: 116 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/MyAround/emptyMap.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ marginTop: 8 }}>
                <CustomText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    letterSpacing: -0.25,
                    textAlign: 'center',
                    color: Color.Gray400,
                  }}
                >
                  {`근처에 볼링장이 없습니다.\n다른 지역의 볼링장을 탐색해보세요.`}
                </CustomText>
              </View>
              <CustomButton onPress={() => navigate('LocationSettingScreen')}>
                <View style={{ marginTop: 24 }}>
                  <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Point1000 }}>
                    지역 선택하기
                  </CustomText>
                </View>
              </CustomButton>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MyAroundScreen;
