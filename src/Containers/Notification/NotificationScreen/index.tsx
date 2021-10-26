import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import NotificationActions from '@/Stores/Notification/Actions';
import { NotificationState } from '@/Stores/Notification/InitialState';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { notificationListPage, notificationList } = useSelector((state: NotificationState) => state.notification);

  useEffect(() => {
    const params = {
      per_page: 10,
      page: 1,
    };
    dispatch(NotificationActions.fetchNotificationList(params));
    return () => {
      dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationListInit' }));
    };
  }, []);

  const onRefresh = () => {
    const params = {
      per_page: 10,
      page: 1,
    };
    dispatch(NotificationActions.fetchNotificationList(params));
  };

  const onMore = () => {
    const params = {
      per_page: 10,
      page: notificationListPage || 1,
    };
    if (notificationListPage > 1) dispatch(NotificationActions.fetchNotificationList(params));
  };

  const onNotificationClickHandler = (item: any) => {
    console.log('click noti type : ', item.noti_type);
    const params = { idx: item.noti_no };
    dispatch(NotificationActions.fetchNotificationRead(params));
    if (item.noti_type === 'restoration') {
      navigate('RepairHistoryDetailScreen', { rstr_no: item.rstr_no });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />

      <FlatList
        data={notificationList}
        renderItem={({ item, index }) => (
          <CustomButton onPress={() => onNotificationClickHandler(item)}>
            <View style={{ backgroundColor: Color.White, borderRadius: 24, marginBottom: 16 }}>
              {item.flag_read === 'N' && (
                <View
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: Color.grayBg,
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 24,
                  paddingLeft: 39,
                  // borderBottomColor: Color.gray50,
                  // borderBottomWidth: 1,
                }}
              >
                <View style={{ width: 32, height: 42, alignSelf: 'flex-start' }}>
                  <FastImage
                    style={{ width: '100%', height: '100%' }}
                    source={require('@/Assets/Images/Common/icParcel.png')}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{ marginLeft: 19, flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <CustomText
                        style={{ fontSize: 15, letterSpacing: -0.25, lineHeight: 21, color: Color.Black1000 }}
                      >
                        {item?.noti_content || ''}
                      </CustomText>
                    </View>
                    {item.noti_type === 'restorationDetail' && (
                      <View style={{ width: 24, height: 24 }}>
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={require('@/Assets/Images/Arrow/icArrowRightGray.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                    )}
                  </View>

                  <View style={{ marginTop: 12 }}>
                    <CustomText style={{ fontSize: 11, color: Color.grayDefault }}>
                      {item.register_time || ''}
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </CustomButton>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={6}
        maxToRenderPerBatch={9}
        windowSize={7}
        refreshing={false}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1}
        onEndReached={() => onMore()}
        ListFooterComponent={<View style={{ marginBottom: heightInfo.statusHeight }} />}
        contentContainerStyle={{ backgroundColor: Color.grayBg, padding: 24, flexGrow: 1 }}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              marginTop: 110,
            }}
          >
            <View style={{ width: 36, height: 36 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/icNotiOff.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ justifyContent: 'center', marginTop: 20 }}>
              <CustomText style={{ color: Color.gray, fontSize: 17, fontWeight: '500', letterSpacing: -0.42 }}>
                알림 내역이 없습니다
              </CustomText>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default NotificationScreen;
