import React from 'react';
import { View, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { DATA_PERMISSIONS } from '@/Containers/Auth/PermissionScreen/data';
import CommonActions from '@/Stores/Common/Actions';

import { LocationCheck, LocationRequest } from '@/Components/Permission/Location';

import CustomButton from '@/Components/CustomButton';
import { Color, Opacity } from '@/Assets/Color';
import LocationMyPosition from '@/Components/Permission/Location/LocationMyPosition';
import { NotificationRequest } from '@/Components/Permission/Notification/index';

const PermissionScreen = () => {
  const dispatch = useDispatch();

  const onConfirm = async () => {
    // dispatch(CommonActions.fetchCommonReducer({ type: 'permissionYN', data: 'Y' }));
    console.log('권한 체크 버튼 클릭');

    const NotificationRequestResult = await NotificationRequest();
    const LocationCheckResult = await LocationCheck();
    console.log('Notification Request Result : ', NotificationRequestResult);

    // 위치 권한 체크
    if (LocationCheckResult) {
      const myPosition = await LocationMyPosition();
      console.log('myPosition is ', myPosition);
      // 퍼미션 권한 체크 & 위치 정보 저장 이후 화면 이동
      dispatch(CommonActions.fetchCommonReducer({ type: 'myPosition', data: myPosition }));
      dispatch(CommonActions.fetchCommonReducer({ type: 'permissionYN', data: 'Y' }));
    }
    // 위치 권한 요청
    else {
      const LocationRequestResult = await LocationRequest();
      console.log('Location request Result : ', LocationRequestResult);
      // 위치 권한 요청 후 권한 있을때
      if (LocationRequestResult) {
        // 퍼미션 권한 체크 & 위치 정보 저장 이후 화면 이동
        const myPosition = await LocationMyPosition();
        console.log('myPosition is ', myPosition);
        dispatch(CommonActions.fetchCommonReducer({ type: 'myPosition', data: myPosition }));
        dispatch(CommonActions.fetchCommonReducer({ type: 'permissionYN', data: 'Y' }));
      }
      // 위치 권한 요청 후 권한 없을때
      else {
        // 퍼미션 권한 체크 후 화면 이동
        dispatch(CommonActions.fetchCommonReducer({ type: 'permissionYN', data: 'Y' }));
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 40,
        backgroundColor: `${Color.Primary1000}`,
        justifyContent: 'center',
      }}
    >
      <View style={{ backgroundColor: Color.White, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 28 }}>
        <View style={{ paddingLeft: 4 }}>
          <CustomText style={{ fontSize: 20, fontWeight: 'bold', letterSpacing: -0.36, color: Color.Black1000 }}>
            앱 접근권한 안내
          </CustomText>
        </View>
        <View style={{ paddingLeft: 4, marginTop: 8 }}>
          <CustomText style={{ fontSize: 12, letterSpacing: -0.21, color: Color.Gray700 }}>
            {`볼리미 앱 사용을 위해,\n필요할 수 있는 권한입니다. 아래 권한에\n동의하지 않으셔도 앱 사용이 가능합니다.`}
          </CustomText>
        </View>
        <FlatList
          data={DATA_PERMISSIONS}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: index === 0 ? 28 : 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 24, height: 24 }}>
                  <FastImage
                    source={item.image}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{ marginLeft: 4 }}>
                  <CustomText
                    style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.23, color: Color.Grayyellow1000 }}
                  >
                    {item.titleText}
                  </CustomText>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 24, height: 24 }} />
                <View style={{ flex: 1, marginLeft: 4 }}>
                  <CustomText style={{ fontSize: 12, letterSpacing: -0.21, color: Color.Gray600 }}>
                    {item.content}
                  </CustomText>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={4}
          maxToRenderPerBatch={7}
          scrollEnabled
          windowSize={7}
          contentContainerStyle={{ paddingBottom: 48 }}
        />

        <CustomButton onPress={() => onConfirm()}>
          <View
            style={{
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Color.Primary1000,
              paddingVertical: 15,
              marginHorizontal: 24,
            }}
          >
            <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25, color: Color.White }}>
              확인했습니다
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
};

export default PermissionScreen;
