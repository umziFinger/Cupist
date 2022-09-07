import React, { useRef } from 'react';
import { View, Text, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect, useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color, Opacity } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import MyActions from '@/Stores/My/Actions';
import CommonActions from '@/Stores/Common/Actions';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import CameraStatusRequest from '@/Components/Permission/Camera/CameraStatusRequest';
import CameraStatusCheck from '@/Components/Permission/Camera/CameraStatusCheck';
import { StorageCheck, StorageRequest } from '@/Components/Permission/Storage';
import { MyState } from '@/Stores/My/InitialState';
import { JsonForm } from '@/Components/Function';
import moment from 'moment';

const Receipt = () => {
  const dispatch = useDispatch();
  const viewShot = useRef<any>();
  const { receiptData } = useSelector((state: MyState) => state.my);
  console.log(JsonForm(receiptData));

  const isCancel = receiptData?.stateText === '취소완료';
  const onPressClose = () => {
    dispatch(MyActions.fetchMyReducer({ type: 'isOpenReceipt', data: false }));
  };

  const onCapture = (uri: string) => {
    console.log('uri', uri);
  };

  const onPermission = async () => {
    const cameraCheckResult = await CameraStatusCheck();
    const storageCheckResult = await StorageCheck();

    console.log('cameraCheckResult : ', cameraCheckResult);
    console.log('storageCheckResult : ', storageCheckResult);

    if (cameraCheckResult !== 'granted' || !storageCheckResult) {
      const cameraRequestResult = await CameraStatusRequest();
      console.log('권한 요청 : ', cameraRequestResult);
      if (cameraRequestResult === 'granted') {
        if (Platform.OS === 'android') {
          if (storageCheckResult) {
            return true;
          }
          return await StorageRequest();
        }
        // ios pass
        return true;
      }
      return false;
    }

    return true;
  };
  const onSave = async () => {
    const permissionCheck = await onPermission();
    console.log('Permission Check : ', Platform.OS, ' ', permissionCheck);
    if (permissionCheck) {
      const uri = await viewShot?.current?.capture();
      const result = CameraRoll.save(uri)
        .then(() => {
          dispatch(
            CommonActions.fetchCommonReducer({
              type: 'alertToast',
              data: {
                alertToast: true,
                alertToastPosition: 'top',
                alertToastMessage: `이미지가 저장되었습니다.`,
              },
            }),
          );
        })
        .catch((e) => {
          console.log('e : ', e);
          dispatch(
            CommonActions.fetchCommonReducer({
              type: 'alertToast',
              data: {
                alertToast: true,
                alertToastPosition: 'top',
                alertToastMessage: '이미지 저장에 실패하였습니다. 관리자에게 문의해주세요.',
              },
            }),
          );
        });
    } else {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertDialog',
          data: {
            alertDialog: true,
            alertDialogType: 'confirm',
            alertDialogDataType: 'cameraAndStorage',
            alertDialogTitle: '',
            alertDialogMessage: `권한을 확인해주세요.`,
          },
        }),
      );
    }
  };

  const getWeekDay = (date: string) => {
    let weekDay = '';
    switch (moment(date).isoWeekday()) {
      case 1: {
        weekDay = '월';
        break;
      }
      case 2: {
        weekDay = '화';
        break;
      }
      case 3: {
        weekDay = '수';
        break;
      }
      case 4: {
        weekDay = '목';
        break;
      }
      case 5: {
        weekDay = '금';
        break;
      }
      case 6: {
        weekDay = '토';
        break;
      }
      case 7: {
        weekDay = '일';
        break;
      }
      default: {
        break;
      }
    }
    return weekDay;
  };

  console.log(moment('2022-09-12').isoWeekday());
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: `${Color.Black1000}${Opacity._45}`,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          height: isCancel ? (receiptData?.shoesCnt > 0 ? 564 : 537) : receiptData?.shoesCnt > 0 ? 510 : 483,
          width: '100%',
          borderRadius: 5,
        }}
      >
        <ViewShot
          ref={viewShot}
          onCapture={onCapture}
          style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 5 }}
        >
          <View style={{ marginTop: 28 }}>
            <CustomText style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3 }}>
              {receiptData?.placeName}
            </CustomText>
            <CustomText style={{ fontSize: 14, letterSpacing: -0.25, marginTop: 6 }}>
              {moment(receiptData?.useDateTime).format(`YYYY.MM.DD(${getWeekDay(receiptData?.useDateTime)}) HH:mm`)}
            </CustomText>
          </View>
          <View style={{ height: 2, backgroundColor: 'black', marginTop: 12 }} />
          <View style={{ marginTop: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                예약번호
              </CustomText>
              <CustomText style={{ fontSize: 13 }}>{receiptData?.paymentIdx}</CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                상품명
              </CustomText>
              <CustomText style={{ fontSize: 13 }}>{receiptData?.ticketName}</CustomText>
            </View>
            {receiptData?.shoesCnt > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                  옵션
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>{`볼링화대여 ${receiptData?.shoesCnt}개`}</CustomText>
              </View>
            )}
          </View>
          <View style={{ marginTop: 28 }}>
            <CustomText style={{ fontSize: 12, fontWeight: 'bold' }}>결제정보</CustomText>
            <View style={{ height: 2, backgroundColor: 'black', marginTop: 8 }} />
            <View style={{ marginTop: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                  상품금액
                </CustomText>
                {/* 천원단위 콤마 정규식 */}
                <CustomText style={{ fontSize: 13 }}>
                  {receiptData?.productPrice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
                </CustomText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                  옵션금액
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>
                  {receiptData?.optionPrice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
                </CustomText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                  할인금액
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>
                  - {receiptData?.couponPrice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
                </CustomText>
              </View>
              {isCancel && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                    결제금액
                  </CustomText>
                  <CustomText style={{ fontSize: 13 }}>
                    {receiptData?.totalPrice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
                  </CustomText>
                </View>
              )}
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: Color.Gray300, marginTop: 16 }} />
          {isCancel ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Error }}>
                  취소 수수료
                </CustomText>
                <CustomText style={{ fontSize: 13, color: Color.Error }}>
                  {(receiptData?.totalPrice - receiptData?.cancelAmount)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  원
                </CustomText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <CustomText style={{ flex: 1, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                  총 환불금액
                </CustomText>
                <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.22 }}>
                  {receiptData?.cancelAmount?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
                </CustomText>
              </View>
            </>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
              <CustomText style={{ flex: 1, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                총 결제금액
              </CustomText>
              <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.22 }}>
                {receiptData?.totalPrice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
              </CustomText>
            </View>
          )}
          <View style={{ height: 1, backgroundColor: Color.Gray300, marginTop: 16 }} />
          <View style={{ marginTop: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                결제수단
              </CustomText>
              <CustomText style={{ fontSize: 13 }}>
                {receiptData?.paymentType === '신용/체크카드'
                  ? `${receiptData?.cardName} ${receiptData?.cardNumber?.substring(
                      receiptData?.cardNumber?.length - 4,
                      receiptData?.cardNumber?.length,
                    )}`
                  : receiptData?.paymentType}
              </CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <CustomText style={{ flex: 1, fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                결제일시
              </CustomText>
              <CustomText style={{ fontSize: 13 }}>{receiptData?.paymentDate?.substring(2, 16)}</CustomText>
            </View>
          </View>
        </ViewShot>
        <View style={{ flexDirection: 'row' }}>
          <CustomButton
            onPress={() => onSave()}
            style={{
              flex: 1,
              paddingVertical: 16,
              alignItems: 'center',
              backgroundColor: Color.Primary1000,
              borderBottomLeftRadius: 5,
            }}
          >
            <CustomText style={{ fontSize: 13, fontWeight: 'bold', color: 'white', letterSpacing: -0.2 }}>
              저장하기
            </CustomText>
          </CustomButton>
          <CustomButton
            onPress={() => onPressClose()}
            style={{
              flex: 1,
              paddingVertical: 16,
              alignItems: 'center',
              backgroundColor: Color.Gray400,
              borderBottomRightRadius: 5,
            }}
          >
            <CustomText style={{ fontSize: 13, fontWeight: 'bold', color: 'white', letterSpacing: -0.2 }}>
              닫기
            </CustomText>
          </CustomButton>
        </View>
      </View>
    </View>
  );
};
export default Receipt;
