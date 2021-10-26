import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import CommonActions from '@/Stores/Common/Actions';

const MyScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  // const { userInfo } = useSelector((state: AuthState) => state.auth);
  // const { userName, mileage, couponCnt, memberType } = userInfo;
  const paddingTop = Platform.OS === 'android' ? 0 : heightInfo.statusHeight;

  // useEffect(() => {
  //   if (myTabRefreshYN === 'N') {
  //     onRefresh();
  //   }
  // }, [myTabRefreshYN]);

  const onRefresh = () => {
    console.log('onRefresh');
    // dispatch(AuthActions.fetchUserInfo());
    // dispatch(CommonActions.fetchCommonReducer({ type: 'myTabRefreshYN', data: 'Y' }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.Gray800, paddingTop }}>
      <FlatList
        data={[0]}
        renderItem={() => (
          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: '#333', fontSize: 20 }}>MyScreen</CustomText>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => onRefresh()}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </View>
  );
};

export default MyScreen;
