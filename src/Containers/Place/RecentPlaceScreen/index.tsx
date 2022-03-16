import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import PlaceActions from '@/Stores/Place/Actions';
import PlaceLargeCard from '@/Components/Card/Common/PlaceLargeCard';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

const RecentPlaceScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { recentListPage, recentList } = useSelector((state: PlaceState) => state.place);

  useEffect(() => {
    const params = {
      perPage: 10,
      page: 1,
    };

    dispatch(PlaceActions.fetchPlaceRecentList(params));
  }, []);

  const onMore = () => {
    const params = {
      perPage: 10,
      page: recentListPage,
    };
    if (recentListPage > 1) dispatch(PlaceActions.fetchPlaceRecentList(params));
  };

  const onRefresh = () => {
    const params = {
      perPage: 10,
      page: 1,
    };
    dispatch(PlaceActions.fetchPlaceRecentList(params));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} text={'최근 본 볼링장'} />

      <View style={{ flex: 1, paddingLeft: 17, paddingRight: 16 }}>
        <FlatList
          // data={[]}
          data={recentList}
          renderItem={({ item }) => <PlaceLargeCard item={item} type={'recentPlace'} />}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={4}
          maxToRenderPerBatch={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          ListFooterComponent={<View style={{ paddingBottom: heightInfo.subBottomHeight }} />}
          scrollEnabled
          onEndReached={() => onMore()}
          onEndReachedThreshold={0.8}
          onRefresh={() => onRefresh()}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                marginTop: 197,
                // backgroundColor: 'red',
                backgroundColor: Color.White,
                // justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ width: 60, height: 60 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Common/emptyRecent.png')}
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
                  {`최근에 본 볼링장이 없습니다.\n볼리미에서 나만의 볼링장을 찾아보세요!`}
                </CustomText>
              </View>
              <CustomButton onPress={() => navigate('MyAroundScreen')}>
                <View style={{ marginTop: 24 }}>
                  <CustomText
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      letterSpacing: -0.2,
                      color: Color.Point1000,
                    }}
                  >
                    {`볼링장 보러가기`}
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

export default RecentPlaceScreen;
