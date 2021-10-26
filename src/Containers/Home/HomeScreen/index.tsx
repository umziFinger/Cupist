import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import Header from '@/Components/Header';
import HomeActions from '@/Stores/Home/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { Color } from '@/Assets/Color';
import { HomeState } from '@/Stores/Home/InitialState';
import HomeSkeleton from '@/Containers/Home/HomeScreen/HomeSkeleton';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import Config from '@/Config';
import { AuthState } from '@/Stores/Auth/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CopyRightView from '@/Containers/Home/HomeScreen/CopyRightView';
import CustomText from '@/Components/CustomText';

interface HomeProps {
  route: RouteProp<MainStackParamList, 'HomeScreen'>;
}

const HomeScreen = ({ route }: HomeProps) => {
  const dispatch = useDispatch();
  // const { homeList } = useSelector((state: HomeState) => state.home);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { isOpenRepairNotificationRBS } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    dispatch(HomeActions.fetchHomeList());
  }, []);

  useEffect(() => {
    if (route?.params?.expired) {
      console.log('navigate token expired!!!', route);
      AsyncStorage.setItem('userIdx', '');
      dispatch(AuthActions.fetchAuthReducer({ type: 'logout' }));
      dispatch(HomeActions.fetchHomeList());
      console.log('userIdx expired', userIdx);
    }
  }, [route]);

  // const renderItem = ({ item, index }: { item: any; index: number }) => {
  //   switch (item) {
  //     case 0: {
  //       // 핑크 알림 도착 상태
  //       if (notiCount > 0 && notiMessage) {
  //         return (
  //           <View style={{ marginBottom: 24 }}>
  //             <NoticeCard type={'start'} cnt={notiCount} message={notiMessage} />
  //           </View>
  //         );
  //       }
  //       return null;
  //     }
  //     case 1: {
  //       return <EventBannerCard type={restorationYN === 'N' ? 'large' : 'small'} pop={homeList?.pop || []} />;
  //     }
  //     case 2: {
  //       if (restorationYN === 'Y') {
  //         return (
  //           <View style={{ marginBottom: 24 }}>
  //             <RepairShippingCard item={restorationInfo} />
  //             z`
  //           </View>
  //         );
  //       }
  //       return null;
  //     }
  //     case 3: {
  //       return <BannerList item={homeList} />;
  //     }
  //     case 4: {
  //       if (restorationYN === 'N' && !homeList?.pop) {
  //         return <RepairBridge type={'large'} />;
  //       }
  //       return <RepairBridge type={'small'} />;
  //     }
  //     case 5: {
  //       return (
  //         <>
  //           <View style={{ height: 8, backgroundColor: Color.grayBg, width: '100%', marginTop: 24 }} />
  //           <ReviewList item={homeList} />
  //         </>
  //       );
  //     }
  //
  //     default:
  //       return null;
  //   }
  // };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="home" text="로고" />
      <FlatList
        data={[0]}
        renderItem={() => (
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20 }}>HomeScreen</CustomText>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={4}
        maxToRenderPerBatch={7}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        // onRefresh={refreshHandler}
        // ListFooterComponent={<CopyRightView />}
      />
    </View>
  );
};

export default HomeScreen;
