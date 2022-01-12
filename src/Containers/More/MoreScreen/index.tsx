import React, { useEffect } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import { MyState } from '@/Stores/My/InitialState';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import AuthActions from '@/Stores/Auth/Actions';
import CommonActions from '@/Stores/Common/Actions';
import { MainStackParamList } from '@/Navigators/MainNavigator';

const MoreScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { moreScreenRenderItem } = useSelector((state: MyState) => state.my);
  const { userInfo, userIdx } = useSelector((state: AuthState) => state.auth);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log('더보기 탭 활성!');
      dispatch(AuthActions.fetchUserInfo({ idx: userIdx }));
    }
  }, [isFocused]);

  const onMove = (screen: keyof MainStackParamList) => {
    // if (screen === 'NotificationScreen') {
    //   dispatch(CommonActions.fetchCommonReducer({ type: 'isLoading', data: true }));
    // }
    navigate(screen);
  };

  const renderItem = (item: { title: string; icon?: any; screen: keyof MainStackParamList }, index: number) => {
    return (
      <CustomButton onPress={() => onMove(item?.screen)}>
        <View
          style={{
            backgroundColor: Color.White,
            marginBottom: index === 2 || index === 4 ? 8 : undefined,
          }}
        >
          <View
            style={{
              paddingVertical: 16,
              marginHorizontal: 24,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: index === 2 || index === 4 || moreScreenRenderItem?.length - 1 === index ? 0 : 1,
              borderBottomColor: Color.Gray300,
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomText style={{ fontSize: 15, letterSpacing: -0.2, color: Color.Black1000 }}>
                {item?.title}
              </CustomText>
            </View>
            {item?.screen === 'NotificationScreen' && (
              <View
                style={{
                  width: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CustomText
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    letterSpacing: -0.2,
                    color: userInfo?.notificationCnt === 0 ? Color.Grayyellow200 : Color.Grayyellow1000,
                  }}
                >
                  {(userInfo?.notificationCnt as number) > 100 ? 100 : userInfo?.notificationCnt || 0}
                </CustomText>
              </View>
            )}

            {item?.screen === 'RecentPlaceScreen' && (
              <View
                style={{
                  width: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CustomText
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    letterSpacing: -0.2,
                    color: userInfo?.placeViewCnt === 0 ? Color.Grayyellow200 : Color.Grayyellow1000,
                  }}
                >
                  {(userInfo?.placeViewCnt as number) > 100 ? 100 : userInfo?.placeViewCnt || 0}
                </CustomText>
              </View>
            )}

            {item?.icon && (
              <View style={{ width: 28, height: 28 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={item.icon}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            )}
          </View>
        </View>
      </CustomButton>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.White,
      }}
    >
      <View
        style={{
          backgroundColor: Color.White,
          paddingTop: Platform.OS === 'android' ? 60 : heightInfo.statusHeight + 60,

          paddingHorizontal: 24,
          paddingBottom: 44,
        }}
      >
        <CustomText
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            letterSpacing: -0.4,
            color: Color.Black1000,
          }}
        >
          더보기
        </CustomText>
      </View>

      <View style={{ flex: 1, backgroundColor: Color.White }}>
        <FlatList
          data={moreScreenRenderItem}
          renderItem={({ item, index }) => renderItem(item, index)}
          maxToRenderPerBatch={10}
          initialNumToRender={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: Color.Gray200, flex: 1 }}
        />
      </View>
    </View>
  );
};

export default MoreScreen;
