import React, { useCallback } from 'react';
import { FlatList, Linking, Platform, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

import Clipboard from '@react-native-clipboard/clipboard';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { INFO_ITEM, InfoItemButtonType } from '@/Containers/My/ReservationDetailScreen/data';
import { MyState } from '@/Stores/My/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import Config from '@/Config';
import { CommonState } from '@/Stores/Common/InitialState';

const PlaceInfo = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { reservationDetail } = useSelector((state: MyState) => state.my);
  const { myLongitude, myLatitude } = useSelector((state: CommonState) => state.common);

  const onCancel = () => {
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'alertDialog',
        data: {
          alertDialog: true,
          alertDialogType: 'choice',
          alertDialogDataType: 'reservationCancel',
          alertDialogMessage() {
            return (
              <>
                {reservationDetail?.cancelType === '당일취소' ? (
                  <CustomText
                    style={{
                      fontSize: 15,
                      letterSpacing: -0.38,
                      textAlign: 'center',
                      color: Color.Black1000,
                    }}
                  >
                    이용일 당일 취소로 환불규정에 따라
                    <CustomText
                      style={{
                        color: Color.Error,
                      }}
                    >
                      예약금액의 90%만 환불이 진행됩니다.
                    </CustomText>
                    예약을 취소하시겠습니까?
                  </CustomText>
                ) : (
                  <CustomText
                    style={{
                      fontSize: 15,
                      letterSpacing: -0.38,
                      textAlign: 'center',
                      color: Color.Black1000,
                    }}
                  >
                    예약을 취소하시겠습니까?
                  </CustomText>
                )}
              </>
            );
          },
          alertDialogParams: { reservationIdx: reservationDetail.idx },
        },
      }),
    );
  };

  const onPressButton = (type: InfoItemButtonType) => {
    switch (type) {
      case 'call': {
        if (reservationDetail?.Place?.tel) {
          let phoneNumber: string;
          if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${reservationDetail?.Place?.tel || 0}`;
          } else {
            phoneNumber = `tel:${reservationDetail?.Place?.tel || 0}`;
          }
          Linking.canOpenURL(phoneNumber)
            .then((supported) => {
              if (!supported) {
                dispatch(
                  CommonActions.fetchCommonReducer({
                    type: 'alertToast',
                    data: {
                      alertToast: true,
                      alertToastPosition: 'top',
                      alertToastMessage: '잘못된 전화번호입니다.',
                    },
                  }),
                );
                return true;
              }
              return Linking.openURL(phoneNumber).catch((e) => {
                console.error('call error', e);
              });
            })
            .catch((err) => console.log('call error', err));
        }

        return null;
      }
      case 'addressCopy': {
        Clipboard.setString(reservationDetail?.Place?.newAddress || '');
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertToast',
            data: {
              alertToast: true,
              alertToastPosition: 'bottom',
              alertToastMessage: '주소가 복사 되었습니다.',
            },
          }),
        );

        break;
      }
      case 'mapView': {
        Linking.openURL(
          `nmap://place?lat=${myLatitude}&lng=${myLongitude}&name=${reservationDetail?.Place?.name}&appname=${Config.NAVER_APP_URL_SCHEME}`,
        )
          .then((res) => {
            // 앱 설치 o, 티맵 경로 바로 검색 성공
            console.log('success tmap link : ', res);
          })
          .catch((err1) => {
            // 앱 미설치, 마켓으로 이동
            console.log('error : ', err1);
            Linking.openURL(Platform.OS === 'android' ? Config.NMAP_MARKET_URL_ANDROID : Config.NMAP_MARKET_URL_IOS)
              .then((res2) => {
                console.log('result : ', res2);
              })
              .catch((err2) => {
                console.log('error : ', err2);
              });
          });
        break;
      }
      case 'getDirections': {
        // Linking.openURL(`tmap://route?goalx=${reservationDetail?.Place?.lng}&goaly=${reservationDetail?.Place?.lat}`)
        //   .then((res) => {
        //     // 앱 설치 o, 티맵 경로 바로 검색 성공
        //     console.log('success tmap link : ', res);
        //   })
        //   .catch((err1) => {
        //     // 앱 미설치, 마켓으로 이동
        //     console.log('error : ', err1);
        //     Linking.openURL(Platform.OS === 'android' ? Config.TMAP_MARKET_URL_ANDROID : Config.TMAP_MARKET_URL_IOS)
        //       .then((res2) => {
        //         console.log('result : ', res2);
        //       })
        //       .catch((err2) => {
        //         console.log('error : ', err2);
        //       });
        //   });
        Linking.openURL(
          `nmap://route/car?dlat=${reservationDetail?.Place?.lat}&dlng=${reservationDetail?.Place?.lng}&dname=${reservationDetail?.Place?.name}&appname=${Config.NAVER_APP_URL_SCHEME}`,
        )
          .then((res) => {
            // 앱 설치 o, 티맵 경로 바로 검색 성공
            console.log('success tmap link : ', res);
          })
          .catch((err1) => {
            // 앱 미설치, 마켓으로 이동
            console.log('error : ', err1);
            Linking.openURL(Platform.OS === 'android' ? Config.NMAP_MARKET_URL_ANDROID : Config.NMAP_MARKET_URL_IOS)
              .then((res2) => {
                console.log('result : ', res2);
              })
              .catch((err2) => {
                console.log('error : ', err2);
              });
          });
        break;
      }

      default:
        return null;
    }
    return null;
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 20,
          borderBottomColor: Color.Gray300,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
            {reservationDetail?.stateText}
          </CustomText>
        </View>
        {(reservationDetail?.cancelType === '당일취소' || reservationDetail?.cancelType === '취소가능') && ( // TODO: 이용완료 -> 이용전으로 변경
          <CustomButton onPress={() => onCancel()}>
            <View style={{ paddingVertical: 5, paddingHorizontal: 8, borderRadius: 3, backgroundColor: Color.Gray300 }}>
              <CustomText
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  letterSpacing: -0.2,
                  color: Color.Gray600,
                }}
              >
                취소하기
              </CustomText>
            </View>
          </CustomButton>
        )}
      </View>
      <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <View>
            <CustomText
              style={{
                fontSize: 17,
                fontWeight: '500',
                letterSpacing: -0.3,
                color: Color.Black1000,
              }}
            >
              {reservationDetail?.Place?.name || ''}
            </CustomText>
          </View>
          <View style={{ marginTop: 6 }}>
            <CustomText
              style={{
                fontSize: 12,
                letterSpacing: -0.22,
                color: Color.Gray600,
              }}
            >
              {reservationDetail?.Place?.newAddress || ''}
            </CustomText>
          </View>
        </View>
        <View style={{ width: 24, height: 24 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Arrow/icArrowRightHeavy.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <FlatList
          data={INFO_ITEM}
          renderItem={({ item }) => (
            <CustomButton onPress={() => onPressButton(item?.type)}>
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: Color.White,
                  borderWidth: 1,
                  borderColor: Color.Grayyellow200,
                  alignItems: 'center',
                  width: (width - 48 - 27) / 4,
                  height: 75,
                  marginRight: 9,
                  justifyContent: 'center',
                }}
              >
                <View style={{ width: 20, height: 20 }}>
                  <FastImage
                    style={{ width: '100%', height: '100%' }}
                    source={item.icon}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
                <View style={{ marginTop: 8 }}>
                  <CustomText>{item.name}</CustomText>
                </View>
              </View>
            </CustomButton>
          )}
          initialNumToRender={4}
          numColumns={4}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      <View
        style={{
          marginTop: 20,
          marginBottom: 28,
          paddingVertical: 16,
          paddingLeft: 17,
          backgroundColor: Color.Gray100,
          borderRadius: 3,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View>
          <View>
            <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Grayyellow1000 }}>상품명</CustomText>
          </View>
          <View style={{ marginTop: 6 }}>
            <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Grayyellow1000 }}>
              일시 및 시간
            </CustomText>
          </View>
        </View>

        <View style={{ marginLeft: 16, flex: 1 }}>
          <View style={{}}>
            <CustomText style={{ fontSize: 13, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}>
              시간당 무제한 게임
            </CustomText>
          </View>
          <View style={{ marginTop: 6 }}>
            <CustomText style={{ fontSize: 13, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}>
              {reservationDetail?.useDateAndTime || ''}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlaceInfo;
