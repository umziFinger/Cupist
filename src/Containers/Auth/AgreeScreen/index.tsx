import React, { useEffect, useState } from 'react';
import { View, FlatList, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import AuthActions from '@/Stores/Auth/Actions';
import AgreeItem from '@/Containers/Auth/AgreeScreen/AgreeItem';
import { AuthState } from '@/Stores/Auth/InitialState';
import { Color } from '@/Assets/Color';
import { DATA_PERMISSIONS } from './data';
import { navigate, navigateAndJoinReset, navigateAndReset, navigateAndSimpleReset } from '@/Services/NavigationService';
import { DATA_PERMISSION_DETAILS } from '@/Components/Data/DATA_PERMISSION_DETAILS';
import useDebounce from '@/Hooks/useDebounce';

const AgreeScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { agreeInfo, tempUserIdx } = useSelector((state: AuthState) => state.auth);
  const { checkedArr } = agreeInfo;

  useEffect(() => {
    // 모두 체크 되었을때
    if (!checkedArr[0]) {
      if (checkedArr[1] && checkedArr[2] && checkedArr[3] && checkedArr[4]) {
        // console.log('========3: ', checkedArr);
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfoAllCheck',
            data: true,
          }),
        );
      }
    }

    if (checkedArr[0]) {
      if (!checkedArr[1] || !checkedArr[2] || !checkedArr[3] || !checkedArr[4]) {
        // console.log('=========4: ', checkedArr);
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfoAllCheck',
            data: false,
          }),
        );
      }
    }
  }, [agreeInfo]);

  useEffect(() => {
    return () => {
      dispatch(
        AuthActions.fetchAuthReducer({
          type: 'agreeInfoInit',
        }),
      );
    };
  }, []);

  const onCheck = (index: any) => {
    switch (index) {
      case 0: {
        if (checkedArr[0]) {
          // console.log('========1: ', index);
          dispatch(
            AuthActions.fetchAuthReducer({
              type: 'agreeInfo',
              data: {
                checkedArr: [false, false, false, false, false, false],
              },
            }),
          );
        } else {
          // console.log('========5: ', index);
          dispatch(
            AuthActions.fetchAuthReducer({
              type: 'agreeInfo',
              data: {
                checkedArr: [true, true, true, true, true, true],
              },
            }),
          );
        }
        break;
      }
      default: {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfoItemCheck',
            data: {
              index,
            },
          }),
        );
      }
    }
  };

  const onAgreeDetail = (value: number) => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'selectedAgreeIdx', data: { selectedAgreeIdx: value } }));
    // dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenAgreeDetailRBS', data: true }));
    navigate('PermissionDetailScreen', { agreeIdx: value, detailArr: DATA_PERMISSION_DETAILS });
  };

  const onPressNext = () => {
    if (checkedArr[0]) {
      if (tempUserIdx) {
        console.log('=======소셜!:');
        // 검수 실패 시 주석 풀것
        // if (debounceContent) {
        //   const params = { agreeInfo: JSON.stringify(agreeInfo.checkedArr), tempUserIdx };
        //   dispatch(AuthActions.fetchAuthSocialJoin(params));
        // }

        // 검수 실패 시 제거
        navigate('SocialJoinScreen');
        navigateAndJoinReset('SocialJoinScreen');
      } else {
        navigate('JoinStepOneScreen');
        navigateAndJoinReset('JoinStepOneScreen');
      }
    }
  };

  return (
    <>
      <Header type="back" />
      <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: Color.White }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ flex: 1, paddingTop: 44 }}>
              <View>
                <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
                  환영해요 🤗
                </CustomText>
              </View>
              <View style={{ marginTop: 16 }}>
                <CustomText style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.2, color: Color.Gray800 }}>
                  약관에 동의하시면
                </CustomText>
              </View>
              <View style={{ marginTop: 4 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray800 }}>
                  특별한 혜택으로 볼링장을 만나보실 수 있어요.
                </CustomText>
              </View>

              <CustomButton onPress={() => onCheck(0)} hitSlop={{ left: 15, right: 15 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 48,
                    paddingHorizontal: 12,
                    paddingVertical: 18,
                    borderWidth: 1,
                    borderColor: Color.Gray300,
                    borderRadius: 3,
                  }}
                >
                  <View style={{ width: 24, height: 24 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={
                        checkedArr[0]
                          ? require('@/Assets/Images/Button/icCheck.png')
                          : require('@/Assets/Images/Button/icCheckOff.png')
                      }
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', marginLeft: 12 }}>
                    <CustomText
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        letterSpacing: -0.2,
                        color: Color.Black1000,
                      }}
                    >
                      모두 확인, 동의합니다
                    </CustomText>
                  </View>
                </View>
              </CustomButton>

              <View style={{ paddingHorizontal: 12 }}>
                <FlatList
                  data={DATA_PERMISSIONS}
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
                  keyExtractor={(item, index) => index.toString()}
                  initialNumToRender={DATA_PERMISSIONS.length}
                  maxToRenderPerBatch={DATA_PERMISSIONS.length + 3}
                  showsVerticalScrollIndicator={false}
                  windowSize={7}
                  scrollEnabled={false}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={7}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={<View style={{ marginBottom: heightInfo.statusHeight }} />}
        />
        <View
          style={{
            paddingBottom: Platform.OS === 'android' ? heightInfo.fixBottomHeight + 8 : heightInfo.fixBottomHeight,
          }}
        >
          {/* <CustomButton onPress={() => onPressNext()}> */}
          <CustomButton onPress={() => onPressNext()}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 15,
                borderRadius: 5,
                backgroundColor: checkedArr[0] ? Color.Primary1000 : Color.Grayyellow200,
              }}
            >
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  letterSpacing: -0.25,
                  textAlign: 'center',
                  color: Color.White,
                }}
              >
                다음
              </CustomText>
            </View>
          </CustomButton>
        </View>
      </View>
    </>
  );
};
export default AgreeScreen;
