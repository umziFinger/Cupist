import React, { useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { Color, Opacity } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import NotificationActions from '@/Stores/Notification/Actions';
import { NotificationState } from '@/Stores/Notification/InitialState';

import TabMenu from '@/Components/TabMenu';
import { NOTIFICATION_CATEGORY } from '@/Containers/Notification/NotificationScreen/data';

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo, isLoading } = useSelector((state: CommonState) => state.common);
  const {
    notificationListPage,
    notificationList,
    notificationCategory = { name: '전체', category: 'all' },
  } = useSelector((state: NotificationState) => state.notification);

  useEffect(() => {
    const params = {
      per_page: 10,
      page: 1,
      category: 'all',
    };
    dispatch(NotificationActions.fetchNotificationList(params));
    return () => {
      dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationListInit' }));
    };
  }, []);

  const onRefresh = () => {
    console.log('새로고침 실행');
    const params = {
      per_page: 10,
      page: 1,
      category: notificationCategory.category,
    };
    dispatch(NotificationActions.fetchNotificationList(params));
  };

  const onMore = () => {
    console.log('더보기 실행');
    const params = {
      per_page: 10,
      page: notificationListPage || 1,
      category: notificationCategory.category,
    };
    if (notificationListPage > 1) dispatch(NotificationActions.fetchNotificationList(params));
  };

  // console.log('========', notificationList);

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />
      <View style={{ marginTop: 16, paddingLeft: 24 }}>
        <View style={{ marginBottom: 16 }}>
          <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
            내 알림
          </CustomText>
        </View>

        <TabMenu type={'notification'} data={NOTIFICATION_CATEGORY} />
      </View>

      <View style={{ flex: 1, backgroundColor: Color.Gray200 }}>
        {notificationList?.readCnt > 0 || notificationList?.unreadCnt > 0 ? (
          <FlatList
            data={[0]}
            listKey="wrapper"
            keyExtractor={(item, index) => `1_${index.toString()}`}
            initialNumToRender={1}
            maxToRenderPerBatch={4}
            showsVerticalScrollIndicator={false}
            windowSize={7}
            onEndReached={() => onMore()}
            onEndReachedThreshold={1}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => onRefresh()}
                style={{ backgroundColor: Color.White }}
                // title=""
                // tintColor="#fff"
                // titleColor="#fff"
              />
            }
            ListFooterComponent={<View style={{ paddingBottom: heightInfo.tabBarBottomHeight }} />}
            renderItem={() => (
              <View style={{ flex: 1 }}>
                {/* 읽지 않음 영역 */}
                {notificationList?.unreadCnt > 0 && (
                  <>
                    <View
                      style={{
                        paddingHorizontal: 24,
                        backgroundColor: Color.White,
                        paddingBottom: 30,
                        paddingTop: 30,
                        flex: 1,
                      }}
                    >
                      <FlatList
                        data={notificationList?.unread}
                        // data={[0, 1, 2, 3, 4]}
                        listKey="content_1"
                        keyExtractor={(item, index) => `2_${index.toString()}`}
                        contentContainerStyle={{ flex: 1 }}
                        ListHeaderComponent={() => (
                          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 22 }}>
                            <View style={{ marginRight: 4 }}>
                              <CustomText
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  letterSpacing: -0.2,
                                  color: Color.Black1000,
                                }}
                              >
                                읽지 않음
                              </CustomText>
                            </View>
                            <View>
                              <CustomText
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  letterSpacing: -0.2,
                                  color: Color.Primary1000,
                                }}
                              >
                                {notificationList.unreadCnt}
                              </CustomText>
                            </View>
                          </View>
                        )}
                        renderItem={({ item, index }) => (
                          <View
                            style={{
                              marginTop: index === 0 ? 0 : 16,
                              paddingTop: index === 0 ? 0 : 16,
                              borderTopColor: index === 0 ? undefined : Color.Gray200,
                              borderTopWidth: index === 0 ? 0 : 1,
                            }}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              {notificationCategory.category === 'all' && (
                                <View
                                  style={{
                                    paddingVertical: 2,
                                    paddingHorizontal: 4,
                                    backgroundColor: `${Color.Primary1000}${Opacity._10}`,
                                    borderRadius: 2,
                                    marginRight: 6,
                                  }}
                                >
                                  <CustomText
                                    style={{
                                      fontSize: 11,
                                      fontWeight: 'bold',
                                      letterSpacing: 0,
                                      color: Color.Primary1000,
                                    }}
                                  >
                                    {item?.categoryView || ''}
                                  </CustomText>
                                </View>
                              )}

                              <View>
                                <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray600 }}>
                                  {item?.regDateView || ''}
                                </CustomText>
                              </View>
                            </View>
                            <View
                              style={{
                                marginTop: 10,
                              }}
                            >
                              <CustomText
                                style={{
                                  fontSize: 14,
                                  fontWeight: '500',
                                  letterSpacing: -0.25,
                                  color: Color.Black1000,
                                }}
                              >
                                {item?.title || ''}
                              </CustomText>
                            </View>
                          </View>
                        )}
                        initialNumToRender={10}
                        maxToRenderPerBatch={13}
                        windowSize={7}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>

                    <View style={{ marginTop: 8 }} />
                  </>
                )}

                {notificationList?.readCnt > 0 && (
                  <>
                    {/* 이전 알림 영역 */}
                    <View style={{ paddingHorizontal: 24, backgroundColor: Color.White, paddingTop: 30, flex: 1 }}>
                      <FlatList
                        data={notificationList?.read}
                        // data={[0, 1]}
                        listKey="content_2"
                        keyExtractor={(item, index) => `3_${index.toString()}`}
                        contentContainerStyle={{
                          flex: 1,
                        }}
                        ListHeaderComponent={() => (
                          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 22 }}>
                            <View style={{ marginRight: 4 }}>
                              <CustomText
                                style={{
                                  fontSize: 15,
                                  fontWeight: 'bold',
                                  letterSpacing: -0.2,
                                  color: Color.Black1000,
                                }}
                              >
                                읽음
                              </CustomText>
                            </View>
                            <View>
                              <CustomText
                                style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Gray400 }}
                              >
                                {notificationList?.readCnt || 0}
                              </CustomText>
                            </View>
                          </View>
                        )}
                        renderItem={({ item, index }) => (
                          <View
                            style={{
                              marginTop: index === 0 ? 0 : 16,
                              paddingTop: index === 0 ? 0 : 16,
                              borderTopColor: index === 0 ? undefined : Color.Gray200,
                              borderTopWidth: index === 0 ? 0 : 1,
                            }}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              {notificationCategory.category === 'all' && (
                                <View
                                  style={{
                                    paddingVertical: 2,
                                    paddingHorizontal: 4,
                                    backgroundColor: `${Color.Gray600}${Opacity._10}`,
                                    borderRadius: 2,
                                    marginRight: 6,
                                  }}
                                >
                                  <CustomText
                                    style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0, color: Color.Gray600 }}
                                  >
                                    {item?.categoryView || ''}
                                  </CustomText>
                                </View>
                              )}

                              <View>
                                <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray600 }}>
                                  {item?.regDateView || ''}
                                </CustomText>
                              </View>
                            </View>
                            <View
                              style={{
                                marginTop: 10,
                              }}
                            >
                              <CustomText
                                style={{
                                  fontSize: 14,
                                  fontWeight: '500',
                                  letterSpacing: -0.25,
                                  color: Color.Black1000,
                                }}
                              >
                                {item?.title || ''}
                              </CustomText>
                            </View>
                          </View>
                        )}
                        initialNumToRender={10}
                        maxToRenderPerBatch={13}
                        windowSize={7}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={() => <View style={{ paddingTop: heightInfo.statusHeight }} />}
                      />
                    </View>
                  </>
                )}
              </View>
            )}
          />
        ) : (
          <View style={{ alignItems: 'center', paddingTop: 150, backgroundColor: Color.White, flex: 1 }}>
            {!isLoading && (
              <>
                <View style={{ width: 60, height: 60 }}>
                  <FastImage
                    style={{ width: '100%', height: '100%' }}
                    source={require('@/Assets/Images/Common/emptyNotify.png')}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
                <View style={{ justifyContent: 'center', marginTop: 8 }}>
                  <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Gray400 }}>
                    새로운 알림이 없습니다.
                  </CustomText>
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default NotificationScreen;
