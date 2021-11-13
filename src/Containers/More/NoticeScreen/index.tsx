import React, { useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import MyActions from '@/Stores/My/Actions';
import { navigate } from '@/Services/NavigationService';
import { MyState } from '@/Stores/My/InitialState';

const NoticeScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { myNoticeList, myNoticeListPage } = useSelector((state: MyState) => state.my);

  useEffect(() => {
    const params = {
      per_page: 10,
      page: 1,
    };
    dispatch(MyActions.fetchMyNoticeList(params));
    return () => {
      dispatch(MyActions.fetchMyNoticeList({ type: 'noticeListInit' }));
    };
  }, []);

  const onRefresh = () => {
    const params = {
      per_page: 10,
      page: 1,
    };
    dispatch(MyActions.fetchMyNoticeList(params));
  };

  const onMore = () => {
    const params = {
      per_page: 10,
      page: myNoticeListPage || 1,
    };
    if (myNoticeListPage > 1) dispatch(MyActions.fetchMyNoticeList(params));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />
      <View style={{ marginTop: 16, paddingLeft: 24, paddingBottom: 30 }}>
        <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
          공지사항
        </CustomText>
      </View>
      <View style={{ flex: 1, backgroundColor: myNoticeList?.length > 0 ? Color.Gray200 : Color.White }}>
        <FlatList
          // data={[]}
          data={myNoticeList}
          contentContainerStyle={{ backgroundColor: Color.White, paddingHorizontal: 24 }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => onRefresh()} style={{ backgroundColor: Color.White }} />
          }
          renderItem={({ item, index }) => (
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
              <View style={{ marginBottom: 16 }}>
                <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}>
                  {item?.title || ''}
                </CustomText>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', paddingTop: 200, backgroundColor: Color.White, flex: 1 }}>
              <View style={{ width: 60, height: 60 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/More/emptyNotice.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ justifyContent: 'center', marginTop: 8 }}>
                <CustomText style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Gray400 }}>
                  공지사항이 없습니다.
                </CustomText>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default NoticeScreen;
