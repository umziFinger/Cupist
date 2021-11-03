import React, { useEffect } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';

import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { KeyboardSpacer, KeyboardSpacerProvider } from '@/Components/Keyboard';
import PlaceActions from '@/Stores/Place/Actions';
import AuthAction from '@/Stores/Auth/Actions';

import { PlaceState } from '@/Stores/Place/InitialState';
import PlaceXSmallCard from '@/Components/Card/Common/PlaceXSmallCard';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';

const JoinStepThreeScreen = () => {
  const { heightInfo, myLongitude, myLatitude } = useSelector((state: CommonState) => state.common);
  const { aroundListPage = 1, aroundList } = useSelector((state: PlaceState) => state.place);
  const { userIdx, userInfo } = useSelector((state: AuthState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const params = {
      lat: myLatitude.toString(),
      lng: myLongitude.toString(),
      page: 1,
      perPage: 10,
    };
    dispatch(PlaceActions.fetchPlaceAroundList(params));
    dispatch(AuthAction.fetchUserInfo({ idx: userIdx }));
  }, []);

  console.log('사용자 정보: ', userInfo);
  const onCancel = () => {
    navigate('HomeScreen');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <View
        style={{
          paddingHorizontal: 24,
          borderBottomColor: Color.Gray300,
          borderBottomWidth: 1,
          paddingTop: Platform.OS === 'android' ? 44 : heightInfo.statusHeight + 44,
          paddingBottom: 24,
        }}
      >
        <View>
          <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
            상주 볼링장이 있으신가요?
          </CustomText>
        </View>
        <View style={{ marginTop: 16 }}>
          <CustomText style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.2, color: Color.Gray800 }}>
            상주 볼링장을 등록하면
          </CustomText>
        </View>
        <View style={{ marginTop: 4 }}>
          <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray800 }}>
            볼링장 예약정보 및 헤택을 제일 먼저 알려드려요!
          </CustomText>
        </View>

        <CustomButton>
          <View
            style={{
              marginTop: 24,
              backgroundColor: Color.Gray200,
              borderRadius: 3,
              paddingHorizontal: 12,
              paddingVertical: 14,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20, height: 20 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Search/icSearch.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ marginLeft: 4, flex: 1 }}>
                <CustomText
                  style={{
                    color: Color.Gray400,
                    fontSize: 14,
                    letterSpacing: -0.25,
                  }}
                  // numberOfLines={1}
                >
                  볼링장을 검색해보세요.
                </CustomText>
              </View>
            </View>
          </View>
        </CustomButton>
      </View>
      <View style={{ paddingHorizontal: 24, flex: 1 }}>
        <FlatList
          data={aroundList}
          ListHeaderComponent={() => (
            <View style={{ backgroundColor: Color.White, paddingVertical: 24 }}>
              <View>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow1000 }}
                >
                  나와 가까운 볼링장
                </CustomText>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: Color.White }}>
              <PlaceXSmallCard item={item} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={8}
          maxToRenderPerBatch={11}
          windowSize={7}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ paddingBottom: heightInfo.statusHeight }} />}
          stickyHeaderIndices={[0]}
        />
        <CustomButton onPress={() => onCancel()}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: heightInfo.fixBottomHeight + 8,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: Color.Primary1000,
                flexDirection: 'row',
                paddingRight: 46,
                paddingLeft: 45,
                paddingVertical: 13,
                alignItems: 'center',
                borderRadius: 24,
              }}
            >
              <View>
                <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25, color: Color.White }}>
                  다음에 할게요
                </CustomText>
              </View>
            </View>
          </View>
        </CustomButton>
      </View>
    </View>
  );
};
export default JoinStepThreeScreen;
