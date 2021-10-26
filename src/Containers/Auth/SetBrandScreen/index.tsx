import React, { useEffect, useState } from 'react';
import { FlatList, View, Dimensions, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { CommonState } from '@/Stores/Common/InitialState';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import AuthRightSideItem from '@/Components/Header/AuthRightSideItem';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';

const { height, width } = Dimensions.get('window');

function SetBrandScreen() {
  const dispatch = useDispatch();
  const { heightInfo, brandList } = useSelector((state: CommonState) => state.common);
  const { profileState } = useSelector((state: AuthState) => state.auth);
  const [selectedBrand, setSelectedBrand] = useState<Array<any>>([]);

  useEffect(() => {
    dispatch(CommonActions.fetchBrandList());
    return () => {
      // dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
    };
  }, []);

  const onPressNext = () => {
    console.log('onPressNext');
    // if (selectedBrand.length > 0) {
    //   navigate('AgreeScreen');
    // }
    // 선택 없이 SKIP 가능
    navigate('AgreeScreen');
  };

  const onPressBrand = (value: any) => {
    const selectedIdx = value.brand_no;
    const findedIdx = selectedBrand.findIndex((item) => item === selectedIdx);

    if (findedIdx === -1) {
      if (selectedBrand.length > 4) {
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertToast',
            data: {
              alertToast: true,
              alertToastPosition: 'top',
              alertToastMessage: '브랜드는 최대 5개까지 선택 가능합니다.',
            },
          }),
        );
        return;
      }
      const data = [...selectedBrand, value.brand_no];
      console.log('brand data : ', data);
      dispatch(AuthActions.fetchAuthReducer({ type: 'userBrand', data }));
      setSelectedBrand(data);
    } else {
      // const deleteIdx = selectedBrand.findIndex((item) => item === selectedIdx);
      // selectedBrand.splice(deleteIdx, 1);
      // const data = [...selectedBrand];

      const data = selectedBrand.filter((x) => x !== selectedIdx);

      console.log('brand data : ', data);
      dispatch(AuthActions.fetchAuthReducer({ type: 'userBrand', data }));
      setSelectedBrand(data);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />
      <FlatList
        data={[0]}
        renderItem={() => (
          <View
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <View style={{ flex: 1, paddingHorizontal: 24 }}>
              <View>
                <CustomText
                  style={{
                    color: Color.Black1000,
                    fontSize: 21,
                    fontWeight: 'bold',
                    letterSpacing: -0.52,
                  }}
                >
                  {`현재 소장하고 계신\n명품 브랜드를 선택해주세요`}
                </CustomText>
              </View>
              <View style={{ marginTop: 18.5 }}>
                <CustomText style={{ color: Color.Black1000, fontSize: 15, letterSpacing: -0.38 }}>
                  {`최대 5개 선택 가능\n(추후 브랜드별 이벤트 진행시 혜택을 드립니다)`}
                </CustomText>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  marginTop: 23.5,
                }}
              >
                <FlatList
                  data={brandList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    const selectedIdx = selectedBrand.findIndex((idx) => idx === item.brand_no);
                    return (
                      <CustomButton onPress={() => onPressBrand(item)}>
                        <View
                          style={{
                            width: (width - 48 - 26) / 3,
                            borderWidth: 1,
                            borderRadius: 15,
                            borderColor: selectedIdx > -1 ? Color.Primary1000 : Color.Gray300,
                            alignItems: 'flex-start',
                            paddingTop: 16,
                            paddingBottom: 13,
                            paddingLeft: 15,
                            marginHorizontal: 6.5,
                            marginVertical: 6,
                          }}
                        >
                          <View style={{ width: item.logo_width, height: item.logo_height }}>
                            <FastImage
                              style={{ width: '100%', height: '100%' }}
                              source={{ uri: item?.logo_url || '' }}
                              resizeMode={FastImage.resizeMode.contain}
                            />
                          </View>
                          <View style={{ paddingTop: 24.2 }}>
                            <CustomText
                              style={{
                                color: Color.Black1000,
                                fontSize: 15,
                                letterSpacing: -0.38,
                                fontWeight: 'bold',
                              }}
                            >
                              {item.brand_name}
                            </CustomText>
                          </View>
                        </View>
                      </CustomButton>
                    );
                  }}
                  ListFooterComponent={<View style={{ height: 50 }} />}
                  initialNumToRender={3}
                  maxToRenderPerBatch={6}
                  windowSize={7}
                  numColumns={3}
                  scrollEnabled
                />
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={7}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 40,
        }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        ListFooterComponent={<View style={{ marginBottom: heightInfo.fixBottomHeight }} />}
      />
      <CustomButton style={{ alignItems: 'center' }} onPress={() => onPressNext()}>
        <View
          style={{
            width: '100%',
            paddingTop: 22,
            paddingBottom: heightInfo.statusHeight,
            // backgroundColor: selectedBrand.length > 0 ? Color.Primary1000 : Color.greyBtn,
            backgroundColor: Color.Primary1000,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginRight: 10 }}>
              <CustomText
                style={{
                  color: Color.White,
                  fontSize: 17,
                  fontWeight: 'bold',
                  letterSpacing: -0.42,
                }}
              >
                {selectedBrand.length ? `다음` : `SKIP`}
              </CustomText>
            </View>
            <View style={{ width: 6.5, height: 11.2 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Arrow/icSmallRightArrowWhite.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </View>
      </CustomButton>
    </View>
  );
}

export default SetBrandScreen;
