import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import AgreeItem from '@/Containers/Auth/AgreeScreen/AgreeItem';
import { AuthState } from '@/Stores/Auth/InitialState';
import { Color } from '@/Assets/Color';
import { DATA_PERMISSIONS } from './data';

const AgreeScreen = () => {
  const dispatch = useDispatch();

  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { agreeInfo } = useSelector((state: AuthState) => state.auth);
  const { checkedArr } = agreeInfo;

  useEffect(() => {
    // 선택 옵션 미선택시
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
    // 모두 체크 되었을때
    if (checkedArr?.length === 5) {
      const idx = checkedArr?.findIndex((item) => item === 'all');
      if (idx === -1) {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfo',
            data: {
              checkedArr: [0, 1, 2, 3, 4, 'all'],
            },
          }),
        );
      }
    }
  }, [checkedArr]);
  // console.log(checkedArr);
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
              checkedArr: [0, 1, 2, 3, 4, 'all'],
            },
          }),
        );
      }
    } else if (checkedArr?.includes(index)) {
      const idx = checkedArr?.findIndex((item) => item === 'all');
      if (idx > -1 && index !== 4) {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfoWithDeleteAll',
            data: index,
          }),
        );
      } else {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfo',
            data: {
              checkedArr: checkedArr?.filter((v) => v !== index),
            },
          }),
        );
      }
    } else {
      dispatch(
        AuthActions.fetchAuthReducer({
          type: 'agreeInfo',
          data: {
            checkedArr: checkedArr ? checkedArr?.concat(index) : [index],
          },
        }),
      );
      if (checkedArr?.length === 5) {
        dispatch(
          AuthActions.fetchAuthReducer({
            type: 'agreeInfo',
            data: {
              checkedArr: [0, 1, 2, 3, 4, 'all'],
            },
          }),
        );
      }
    }
  };
  const onAgreeDetail = (value: number) => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'selectedAgreeIdx', data: { selectedAgreeIdx: value } }));
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenAgreeDetailRBS', data: true }));
  };

  const onPressNext = () => {
    if (checkedArr?.includes('all')) {
      console.log('다음페이지');
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
                <CustomButton onPress={() => onCheck('all')} hitSlop={{ left: 15, right: 15 }}>
                  <View style={{ width: 24, height: 24 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={
                        checkedArr?.includes('all')
                          ? require('@/Assets/Images/Button/icCheck.png')
                          : require('@/Assets/Images/Button/icCheckOff.png')
                      }
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </CustomButton>

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
        />
        <View style={{ paddingBottom: heightInfo.fixBottomHeight + 16 }}>
          <CustomButton onPress={() => onPressNext()}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 15,
                borderRadius: 5,
                backgroundColor: checkedArr?.includes('all') ? Color.Primary1000 : Color.Grayyellow200,
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
