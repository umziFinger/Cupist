import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, FlatList, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import produce from 'immer';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import AgreeItem from '@/Containers/Auth/AgreeScreen/AgreeItem';
import { AuthState } from '@/Stores/Auth/InitialState';
import { Color } from '@/Assets/Color';
import AuthRightSideItem from '@/Components/Header/AuthRightSideItem';
import { navigate } from '@/Services/NavigationService';

const AgreeScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { profileState } = useSelector((state: AuthState) => state.auth);
  const { terms, agreeInfo, phoneNumber, password, userName, userGender, userBirth, userBrand } = useSelector(
    (state: AuthState) => state.auth,
  );
  const { checkedArr } = agreeInfo;

  useEffect(() => {
    dispatch(AuthActions.fetchAuthTerms());
    return () => {
      dispatch(
        AuthActions.fetchAuthReducer({
          type: 'agreeInfo',
          data: {
            checkedArr: null,
          },
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (checkedArr?.length === 4) {
      const idx = checkedArr?.findIndex((item) => item === 4);
      if (idx === -1) {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfo',
            data: {
              checkedArr: [0, 1, 2, 3, 'all'],
            },
          }),
        );
      }
    }
  }, [checkedArr]);

  const onCheck = (index: string | number) => {
    if (index === 'all') {
      if (checkedArr?.includes(index)) {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfo',
            data: {
              checkedArr: null,
            },
          }),
        );
      } else {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfo',
            data: {
              checkedArr: [0, 1, 2, 3, 'all'],
            },
          }),
        );
      }
    } else if (checkedArr?.includes(index)) {
      const idx = checkedArr?.findIndex((item) => item === 'all');
      const tempArr = produce(checkedArr, (draft) => {
        draft.splice(idx, 1);
      });
      if (idx > -1) {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfo',
            data: {
              checkedArr: [...tempArr],
            },
          }),
        );
      }
      dispatch(
        AuthActions.fetchAuthReducer({
          type: 'agreeInfo',
          data: {
            checkedArr: tempArr?.filter((v) => v !== index),
          },
        }),
      );
    } else {
      dispatch(
        AuthActions.fetchAuthReducer({
          type: 'agreeInfo',
          data: {
            checkedArr: checkedArr ? checkedArr?.concat(index) : [index],
          },
        }),
      );
      if (checkedArr?.length === 4) {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfo',
            data: {
              checkedArr: [0, 1, 2, 3, 'all'],
            },
          }),
        );
      }
    }
  };

  const onAgreeDetail = (value: any) => {
    navigate('AgreeDetailScreen', { item: value });
  };

  const onPressNext = () => {
    if (
      checkedArr?.includes('all') ||
      (checkedArr?.includes(0) && checkedArr?.includes(1) && checkedArr?.includes(2))
    ) {
      dispatch(CommonActions.fetchCommonReducer({ type: 'agreeYN', data: 'Y' }));
      const tempArr = checkedArr
        .filter((item) => item !== 'all')
        .map((i) => {
          return Number(i) + 1;
        });

      const params = {
        mobile: phoneNumber.replace(/-/g, ''),
        password: profileState === 'N' ? '' : password,
        userName,
        userGender,
        userBirth,
        userBrand,
        userAgree: tempArr,
      };

      navigate('HomeScreen');

      if (profileState === 'N') {
        dispatch(AuthActions.fetchAuthSocialJoin(params));
      } else {
        dispatch(AuthActions.fetchUserJoin(params));
      }
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
                  {'서비스 이용을 위해\n약관에 동의해 주세요'}
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 42,
                }}
              >
                <CustomButton
                  onPress={() => onCheck('all')}
                  hitSlop={{ left: 15, right: 15 }}
                  style={{ marginRight: 12, paddingVertical: 1 }}
                >
                  <View style={{ width: 20, height: 20 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={
                        checkedArr?.includes('all')
                          ? require('@/Assets/Images/Button/icCheckCirclePressed20Pt.png')
                          : require('@/Assets/Images/Button/icCheckCircleNormal.png')
                      }
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </CustomButton>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <CustomText
                    style={{ fontSize: 15, letterSpacing: -0.38, color: Color.Black1000, fontWeight: 'bold' }}
                  >
                    모두 동의합니다.
                  </CustomText>
                </View>
              </View>
              <View style={{ borderWidth: 1, width: '100%', marginTop: 13 }} />
              <View
                style={{
                  flex: 1,
                }}
              >
                <FlatList
                  data={terms}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <AgreeItem
                        item={item}
                        index={index}
                        checkArr={checkedArr}
                        onCheck={onCheck}
                        onAgreeDetail={onAgreeDetail}
                      />
                    );
                  }}
                  initialNumToRender={terms?.length}
                  maxToRenderPerBatch={terms?.length + 3}
                  showsVerticalScrollIndicator={false}
                  windowSize={7}
                  scrollEnabled={false}
                />
                <View style={{ marginTop: 36, backgroundColor: Color.Primary1000, borderRadius: 15 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <View style={{ paddingVertical: 24, paddingLeft: 32 }}>
                        <CustomText
                          style={{
                            color: Color.Black1000,
                            fontSize: 15,
                            fontWeight: '500',
                            letterSpacing: -0.38,
                          }}
                        >
                          {'마케팅 수신에 동의하시면\n현금처럼 사용가능한\n10,000P를 드립니다.'}
                        </CustomText>
                      </View>
                    </View>
                    <View
                      style={{
                        width: 102.8,
                        height: 72,
                        marginRight: 22,
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Common/imgIllustCoupon.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <CustomButton style={{ alignItems: 'center' }} onPress={() => onPressNext()}>
              <View
                style={{
                  width: '100%',
                  paddingTop: 22,
                  paddingBottom: Platform.OS === 'android' ? 22 : 53,
                  backgroundColor:
                    checkedArr?.includes('all') ||
                    (checkedArr?.includes(0) && checkedArr?.includes(1) && checkedArr?.includes(2))
                      ? Color.Primary1000
                      : Color.greyBtn,
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
                      완료
                    </CustomText>
                  </View>
                </View>
              </View>
            </CustomButton>
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
      {/* {isModal && ( */}
      {/*  <AgreeDetailModal */}
      {/*    selectedTerm={selectedTerm} */}
      {/*    onClose={onCloseModal} */}
      {/*    onPressAgreeBtn={() => onPressAgreeBtn()} */}
      {/*  /> */}
      {/* )} */}
    </View>
  );
};
export default AgreeScreen;
