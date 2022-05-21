import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

import CustomText from '@/Components/CustomText';
import { Color, Opacity } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import MyActions from '@/Stores/My/Actions';
import TabMenu from '@/Components/TabMenu';
import { MY_COMPETITION_TAB_MENU } from '@/Containers/My/MyScreen/data';
import { competitionTabType, MyState } from '@/Stores/My/InitialState';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import PlaceActions from '@/Stores/Place/Actions';

const CompetitionList = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { competitionList, competitionSelectedTab = { title: '진행중', key: 'doing' } } = useSelector(
    (state: MyState) => state.my,
  );

  const emptyText = (key: competitionTabType['key']) => {
    switch (key) {
      case 'doing': {
        return `신청한 대회 내역이 없습니다.\n볼링장을 검색하고 대회를 신청해보세요!`;
      }
      case 'done': {
        return `참가한 대회 내역이 없습니다.\n볼링장을 검색하고 대회를 신청해보세요!`;
      }
      default:
        return false;
    }
  };

  useEffect(() => {
    console.log('예약 리스트 페이지 didmount!!!');
    const params = {
      perPage: 10,
      page: 1,
    };
    dispatch(MyActions.fetchMyCompetitionsList(params));
    dispatch(MyActions.fetchMyReducer({ type: 'reservationListPageInit' }));
  }, []);

  useEffect(() => {
    console.log('예약 리스트 목록 업데이트 didupdate!!!!');
  }, [competitionList]);

  const onRefresh = () => {
    console.log('새로고침');
    // console.log('onRefresh');
    const params = {
      perPage: 10,
      page: 1,
    };
    dispatch(MyActions.fetchMyCompetitionsList(params));
    // dispatch(
    //   MyActions.fetchMyReducer({
    //     type: 'reservationListPage',
    //     data: 1,
    //     state: reservationSelectedTab.key,
    //   }),
    // );
  };

  const onMore = () => {
    console.log('MORE');
    // const params = {
    //   perPage: 10,
    //   page: reservationListPage[reservationSelectedTab.key],
    //   state: reservationSelectedTab.key,
    // };
    //
    // if (reservationListPage[reservationSelectedTab.key] > 0) dispatch(MyActions.fetchMyReservationList(params));
  };

  const onCompetitionDetail = (item: any) => {
    console.log(item?.Competitions?.idx);
    const competitionIdx = item?.Competitions?.idx;
    if (competitionIdx === 2) {
      navigate('RegistCompleteScreen');
    }
  };

  const selectedCompetitionList =
    competitionSelectedTab?.key === 'doing' ? competitionList?.doingList || [] : competitionList?.doneList || [];

  return (
    <View style={{ flex: 1 }}>
      {/* =============== 진행중, 지난 탭 영역 =============== */}
      <View style={{ paddingVertical: 28 }}>
        <TabMenu type={'competition'} data={MY_COMPETITION_TAB_MENU} />
      </View>

      {/* =============== 대회신청완료 =============== */}
      <View style={{ flexDirection: 'row', marginTop: 12, marginBottom: 12, marginHorizontal: 24 }}>
        <CustomText style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Black1000 }}>
          {competitionSelectedTab?.key === 'doing' ? '진행중인 대회' : '종료된 대회'}
        </CustomText>
        <CustomText
          style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Primary1000, marginLeft: 2 }}
        >
          {selectedCompetitionList?.length > 0 ? selectedCompetitionList?.length : 0}
        </CustomText>
      </View>
      {/* =============== 리스트시작 =============== */}
      <FlatList
        data={selectedCompetitionList || []}
        renderItem={({ item, index }) => (
          <CustomButton onPress={() => onCompetitionDetail(item)}>
            <View
              style={{
                paddingVertical: 20,
                paddingHorizontal: 15,
                borderRadius: 5,
                backgroundColor: Color.White,
                shadowColor: 'rgba(232, 232, 232, 0.5)',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 10,
                shadowOpacity: 1,
                borderWidth: 1,
                borderColor: Color.Gray300,
                marginTop: index === 0 ? 0 : 16,
                elevation: 1,
              }}
            >
              {/* =============== 이미지, 대회명 영역 =============== */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 20,
                  // borderBottomWidth: 1,
                  // borderBottomColor: Color.Gray300,
                }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 3,
                    opacity: competitionSelectedTab?.key === 'doing' ? 1 : 0.5,
                  }}
                >
                  <FastImage
                    style={{ width: '100%', height: '100%', borderRadius: 5 }}
                    // source={{ uri: item?.placePhoto }}
                    source={
                      item?.Place?.placePhotoArr?.length > 0
                        ? { uri: item?.Place?.placePhotoArr[0] }
                        : require('@/Assets/Images/Common/icNoImage.png')
                    }
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <CustomText
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      letterSpacing: -0.25,
                      color: competitionSelectedTab?.key === 'doing' ? Color.Black1000 : Color.Gray400,
                    }}
                  >
                    {item?.Competitions?.title || ''}
                  </CustomText>
                </View>
              </View>

              <View style={{ borderStyle: 'dashed', borderWidth: 0.5, borderColor: Color.Gray300 }} />
              {/* =============== 구분선 아래부분 =============== */}
              <View style={{ marginTop: 22 }}>
                <View>
                  <CustomText
                    style={{
                      fontSize: 13,
                      fontWeight: 'bold',
                      letterSpacing: -0.2,
                      color: competitionSelectedTab?.key === 'doing' ? Color.Point1000 : Color.Gray400,
                    }}
                  >
                    {item?.competitionStatusText || ''}
                  </CustomText>
                </View>
                <View style={{ marginTop: 7, flexDirection: 'row', alignItems: 'center' }}>
                  <CustomText
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      fontStyle: 'normal',
                      color: competitionSelectedTab?.key === 'doing' ? Color.Grayyellow1000 : Color.Gray400,
                    }}
                  >
                    {item?.Place?.name || ''}
                  </CustomText>
                  <View
                    style={{
                      width: 1,
                      height: 11,
                      backgroundColor: competitionSelectedTab?.key === 'doing' ? Color.Grayyellow1000 : Color.Gray400,
                      marginHorizontal: 7,
                    }}
                  />
                  <CustomText
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      fontStyle: 'normal',
                      color: competitionSelectedTab?.key === 'doing' ? Color.Grayyellow1000 : Color.Gray400,
                    }}
                  >
                    {item?.Club?.name || ''}
                  </CustomText>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical: 4,
                      borderRadius: 2,
                      backgroundColor:
                        competitionSelectedTab?.key === 'doing'
                          ? `${Color.Point1000}${Opacity._5}`
                          : `${Color.Grayyellow500}${Opacity._5}`,
                    }}
                  >
                    <CustomText
                      style={{
                        fontSize: 15,
                        color: competitionSelectedTab?.key === 'doing' ? Color.Grayyellow1000 : Color.Gray400,
                      }}
                    >
                      {item?.Competitions?.orderText || ''}
                    </CustomText>
                  </View>
                  <CustomText
                    style={{
                      fontSize: 15,
                      color: competitionSelectedTab?.key === 'doing' ? Color.Grayyellow1000 : Color.Gray400,
                      marginLeft: 10,
                    }}
                  >
                    20{item?.Competitions?.qualifiersDateView?.replaceAll('-', '~') || ''}
                    {/* {item?.Competitions?.qualifiersStartDate?.replaceAll('-', '.') || ''} ~{' '} */}
                    {/* {item?.Competitions?.qualifiersEndDate?.replaceAll('-', '.').substring(5, 10) || ''} */}
                  </CustomText>
                </View>
              </View>
            </View>
          </CustomButton>
        )}
        contentContainerStyle={{ paddingHorizontal: 24, marginTop: 12 }}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={7}
        maxToRenderPerBatch={10}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => onRefresh()}
        scrollEnabled
        onEndReached={() => onMore()}
        onEndReachedThreshold={0.8}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              backgroundColor: Color.White,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <View style={{ width: 72, height: 70, marginTop: 120 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/emptyRingmiSad.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ marginTop: 28 }}>
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  letterSpacing: -0.25,
                  textAlign: 'center',
                  color: Color.Gray400,
                }}
              >
                {emptyText(competitionSelectedTab.key)}
              </CustomText>
            </View>
            <CustomButton
              onPress={() => {
                // 알코볼로 필터 변경
                dispatch(
                  PlaceActions.fetchPlaceReducer({
                    type: 'myAroundSort',
                    data: {
                      index: 3,
                      key: 'albamon',
                      value: '알코볼',
                    },
                  }),
                );
                navigate('MyAroundScreen');
              }}
            >
              <View style={{ marginTop: 24 }}>
                <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Point1000 }}>
                  내 주변 볼링장 보기
                </CustomText>
              </View>
            </CustomButton>
          </View>
        )}
        ListFooterComponent={<View style={{ paddingBottom: heightInfo.subBottomHeight }} />}
      />
    </View>
  );
};

export default CompetitionList;
