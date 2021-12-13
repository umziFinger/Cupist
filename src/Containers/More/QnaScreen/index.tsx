import React, { useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color, Opacity } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import MyActions from '@/Stores/My/Actions';
import { MyState } from '@/Stores/My/InitialState';
import CustomButton from '@/Components/CustomButton';
import TabMenu from '@/Components/TabMenu';
import { QNA_TAB_MENU } from '@/Containers/More/QnaScreen/data';
import { navigate } from '@/Services/NavigationService';

const QnaScreen = () => {
  const dispatch = useDispatch();

  const { isLoading, heightInfo } = useSelector((state: CommonState) => state.common);
  const { myQnaList, myQnaListPage } = useSelector((state: MyState) => state.my);

  useEffect(() => {
    const params = {
      per_page: 10,
      page: 1,
    };
    dispatch(MyActions.fetchMyQnaList(params));
    return () => {
      dispatch(MyActions.fetchMyReducer({ type: 'myQnaListInit' }));
    };
  }, []);

  const onRefresh = () => {
    const params = {
      per_page: 10,
      page: 1,
    };
    dispatch(MyActions.fetchMyQnaList(params));
  };

  const onMore = () => {
    const params = {
      per_page: 10,
      page: myQnaListPage || 1,
    };
    if (myQnaListPage > 1) dispatch(MyActions.fetchMyQnaList(params));
  };

  const onDetail = (qnaIdx: any) => {
    // console.log(noticeIdx);
    const params = {
      qnaIdx,
    };
    dispatch(MyActions.fetchMyQnaDetailInfo(params));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />
      <View style={{ marginTop: 16, paddingLeft: 24, paddingBottom: 20 }}>
        <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
          1:1문의
        </CustomText>
      </View>
      <TabMenu type={'qna'} data={QNA_TAB_MENU} />
      <View style={{ flex: 1, backgroundColor: Color.White }}>
        <FlatList
          // data={[]}
          data={myQnaList}
          contentContainerStyle={{ backgroundColor: Color.White, paddingHorizontal: 24, marginTop: 30 }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => onRefresh()} style={{ backgroundColor: Color.White }} />
          }
          onEndReached={() => onMore()}
          onEndReachedThreshold={0.8}
          ListFooterComponent={<View style={{ paddingBottom: heightInfo.subBottomHeight }} />}
          renderItem={({ item, index }) => (
            <CustomButton onPress={() => onDetail(item.idx)}>
              <View
                style={{
                  // marginTop: index === 0 ? 0 : 16,
                  paddingTop: index === 0 ? 0 : 16,
                  borderTopColor: index === 0 ? undefined : Color.Gray200,
                  borderTopWidth: index === 0 ? 0 : 1,
                  borderBottomColor: index === myQnaList?.length - 1 ? Color.Gray200 : undefined,
                  borderBottomWidth: index === myQnaList?.length - 1 ? 1 : 0,
                }}
              >
                <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      marginRight: 6,
                      borderRadius: 2,
                      backgroundColor: `${Color.Gray600}${Opacity._10}`,
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                    }}
                  >
                    <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray600 }}>
                      {item?.type || ''}
                    </CustomText>
                  </View>
                  <View>
                    <CustomText
                      style={{
                        fontSize: 11,
                        letterSpacing: -0.2,
                        color: Color.Gray600,
                      }}
                    >
                      {item?.regDate || ''}
                    </CustomText>
                  </View>
                </View>
                <View style={{ marginBottom: 16 }}>
                  <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}>
                    {item?.content || ''}
                  </CustomText>
                </View>
              </View>
            </CustomButton>
          )}
          ListEmptyComponent={() => (
            <View style={{ backgroundColor: isLoading ? Color.Gray200 : Color.White }}>
              {!isLoading && (
                <View style={{ alignItems: 'center', paddingTop: 120, backgroundColor: Color.White, flex: 1 }}>
                  <View style={{ width: 60, height: 60 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('@/Assets/Images/Common/emptyCustomer.png')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <View style={{ justifyContent: 'center', marginTop: 8 }}>
                    <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Gray400 }}>
                      볼리미에 궁금하신 점이 있으신가요?
                    </CustomText>
                  </View>

                  <CustomButton onPress={() => navigate('QnaWriteScreen')}>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginTop: 28,
                        borderRadius: 24,
                        backgroundColor: Color.Primary1000,
                        paddingVertical: 15,
                        alignItems: 'center',
                        paddingHorizontal: 74,
                      }}
                    >
                      <CustomText
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          letterSpacing: -0.25,
                          textAlign: 'center',
                          color: Color.White,
                        }}
                      >
                        문의하기
                      </CustomText>
                    </View>
                  </CustomButton>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default QnaScreen;
