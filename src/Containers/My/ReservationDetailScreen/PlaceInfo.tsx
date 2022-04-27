import React, { useCallback, useEffect } from 'react';
import { FlatList, Linking, Platform, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

import Clipboard from '@react-native-clipboard/clipboard';
import { first } from 'lodash';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { INFO_ITEM, InfoItemButtonType } from '@/Containers/My/ReservationDetailScreen/data';
import { MyState } from '@/Stores/My/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import Config from '@/Config';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigate } from '@/Services/NavigationService';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';
import MyActions from '@/Stores/My/Actions';

const PlaceInfo = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { reservationDetail, isCheckedReservationDetail } = useSelector((state: MyState) => state.my);
  const { myLongitude, myLatitude } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    if (isCheckedReservationDetail) {
      dispatch(MyActions.fetchMyReducer({ type: 'isCheckedReservationDetail', data: false }));
      if (reservationDetail) {
        onCancel(reservationDetail);
      }
    }
  }, [isCheckedReservationDetail]);

  const onCancel = (item: any) => {
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
                {item?.cancelPercent !== 0 ? (
                  renderCancelNotice(item?.cancelPercent)
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
          alertDialogParams: { reservationIdx: item?.idx },
        },
      }),
    );
  };

  const onPressCheckDetail = () => {
    if (reservationDetail) {
      const params = {
        reservationIdx: reservationDetail?.idx,
      };
      dispatch(MyActions.fetchMyReservationCheckDetail(params));
    }
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
          `nmap://place?lat=${reservationDetail?.Place?.lat}&lng=${reservationDetail?.Place?.lng}&name=${reservationDetail?.Place?.name}&appname=${Config.NAVER_APP_URL_SCHEME}`,
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

  const onPlaceDetail = () => {
    navigate('PlaceDetailScreen', { idx: reservationDetail?.Place?.idx, ticketType: TICKET_TYPE.ALL });
  };

  const renderCancelNotice = (percent: number) => {
    let firstText, secondText;
    switch (percent) {
      case 0: {
        firstText = '사용 예정 시간 환불 규정에 따라\n';
        secondText = '해당 예약건은 전체 환불이 진행됩니다.\n';
        break;
      }
      case 10: {
        firstText = '사용 예정 시간 1시간전 환불 규정에 따라\n';
        secondText = '예약금액의 10%이 차감되어 환불이 진행됩니다.\n';
        break;
      }
      case 50: {
        firstText = '사용 예정 시간 30분전 환불 규정에 따라\n';
        secondText = '예약금액의 50%이 차감되어 환불이 진행됩니다.\n';
        break;
      }
      case 100: {
        firstText = '사용 예정 시간 10분전 환불 규정에 따라\n';
        secondText = '예약금액의 100%이 차감되어 환불이 진행됩니다.\n';
        break;
      }
      default:
        break;
    }
    return (
      <CustomText
        style={{
          fontSize: 13,
          letterSpacing: -0.2,
          textAlign: 'center',
          color: Color.Gray800,
        }}
      >
        {firstText}
        <CustomText style={{ color: Color.Error }}>{secondText}</CustomText>
        예약을 취소하시겠습니까?
      </CustomText>
    );
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
        {(reservationDetail?.stateText === '이용전' || reservationDetail?.stateText === '입금대기') && ( // TODO: 이용완료 -> 이용전으로 변경
          <CustomButton onPress={() => onPressCheckDetail()}>
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
      <CustomButton onPress={() => onPlaceDetail()}>
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
      </CustomButton>

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
