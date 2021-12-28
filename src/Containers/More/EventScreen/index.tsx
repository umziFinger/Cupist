import React, { useEffect } from 'react';
import { FlatList, RefreshControl, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import MyActions from '@/Stores/My/Actions';
import { MyState } from '@/Stores/My/InitialState';
import CustomButton from '@/Components/CustomButton';
import { fetchMyEventDetailInfo } from '@/Sagas/MySaga';

const EventScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { isLoading } = useSelector((state: CommonState) => state.common);
  const { myEventList, myEventListPage } = useSelector((state: MyState) => state.my);
  console.log(myEventList);
  useEffect(() => {
    const params = {
      per_page: 10,
      page: 1,
    };
    dispatch(MyActions.fetchMyEventList(params));
    return () => {
      dispatch(MyActions.fetchMyReducer({ type: 'eventListInit' }));
    };
  }, []);

  const onRefresh = () => {
    const params = {
      per_page: 10,
      page: 1,
    };
    dispatch(MyActions.fetchMyEventList(params));
  };

  const onMore = () => {
    const params = {
      per_page: 10,
      page: myEventListPage || 1,
    };
    if (myEventListPage > 1) dispatch(MyActions.fetchMyEventList(params));
  };

  const onDetail = (eventIdx: any) => {
    const params = {
      eventIdx,
    };
    dispatch(MyActions.fetchMyEventDetailInfo(params));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />
      <View style={{ marginTop: 16, paddingLeft: 24, paddingBottom: 30 }}>
        <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
          이벤트
        </CustomText>
      </View>
      <View style={{ flex: 1, backgroundColor: myEventList?.length > 0 ? Color.Gray200 : Color.White }}>
        <FlatList
          data={myEventList}
          contentContainerStyle={{ backgroundColor: Color.White, paddingHorizontal: 24 }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => onRefresh()} style={{ backgroundColor: Color.White }} />
          }
          onEndReached={() => onMore()}
          onEndReachedThreshold={0.8}
          renderItem={({ item, index }) => (
            <CustomButton onPress={() => onDetail(item.idx)}>
              <View
                style={{
                  // marginTop: index === 0 ? 0 : 16,
                  paddingTop: index === 0 ? 0 : 16,
                  borderTopColor: index === 0 ? undefined : Color.Gray200,
                  borderTopWidth: index === 0 ? 0 : 1,
                }}
              >
                <View style={{ marginBottom: 10 }}>
                  <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray600 }}>
                    {item?.regDateView || ''}
                  </CustomText>
                </View>
                <View style={{ marginBottom: 12 }}>
                  <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}>
                    {item?.title || ''}
                  </CustomText>
                </View>
                <View style={{ width: width - 48, height: 126, borderRadius: 5 }}>
                  <FastImage
                    style={{ width: '100%', height: '100%', borderRadius: 5 }}
                    source={
                      !item?.bannerFile ? require('@/Assets/Images/Common/icNoImage.png') : { uri: item?.bannerFile }
                    }
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                </View>
                <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                  <View>
                    <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Gray600 }}>
                      {'진행중'}
                    </CustomText>
                  </View>
                  <View style={{ width: 1, height: 10, backgroundColor: Color.Gray300, marginHorizontal: 6 }} />
                  <View>
                    <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Gray600 }}>
                      {item?.period || ''}
                    </CustomText>
                  </View>
                </View>
              </View>
            </CustomButton>
          )}
          ListEmptyComponent={() => (
            <View style={{ backgroundColor: isLoading ? Color.Gray200 : Color.White }}>
              {!isLoading && (
                <View style={{ alignItems: 'center', paddingTop: 200, backgroundColor: Color.White, flex: 1 }}>
                  <View style={{ width: 60, height: 60 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('@/Assets/Images/Common/emptyEvent.png')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', marginTop: 8 }}>
                    <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Gray400 }}>
                      진행중인 이벤트가 없습니다.
                    </CustomText>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default EventScreen;
