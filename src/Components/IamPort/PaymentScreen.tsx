import React from 'react';
import IMP from 'iamport-react-native';

import { RouteProp } from '@react-navigation/native';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { navigateGoBack } from '@/Services/NavigationService';
import Loading from '@/Components/Loading';
import { CommonState } from '@/Stores/Common/InitialState';
import ReservationActions from '@/Stores/Reservation/Actions';
import { ReservationState } from '@/Stores/Reservation/InitialState';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'PaymentScreen'>;
}

function PaymentScreen({ route }: PropTypes) {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { paymentInfo } = useSelector((state: ReservationState) => state.reservation);
  /* 가맹점 식별코드, 결제 데이터 추출 */
  const { userCode, data } = route.params;

  /* 결제 후 실행될 콜백 함수 입력 */
  function callback(response: any) {
    console.log('callback res : ', response);
    const isSuccessed = getIsSuccessed(response);
    if (isSuccessed) {
      /* 결제 성공한 경우, 리디렉션 위해 홈으로 이동한다 */
      const params = {
        ...response,
        type: 'payment', // 결제와 본인인증 구분을 위한 필드
      };
      console.log('########## Success IAMPORT params : ', params);
      console.log('########## Success IAMPORT paymentInfo 정보 : ', paymentInfo);

      if (paymentInfo) {
        const { imp_uid } = params;
        dispatch(
          ReservationActions.fetchReservationPaymentVerify({
            impUid: imp_uid,
            merchantUid: paymentInfo?.merchantUid,
            paymentIdx: paymentInfo?.idx,
          }),
        );
      }
    } else {
      /* 결제 실패한 경우, 이전 화면으로 돌아간다 */
      console.log('결제 실패!!!!');
      navigateGoBack();
    }
  }

  function getIsSuccessed(response: any) {
    const { imp_success, success } = response;
    if (typeof imp_success === 'string') return imp_success === 'true';
    if (typeof imp_success === 'boolean') return imp_success === true;
    if (typeof success === 'string') return success === 'true';
    if (typeof success === 'boolean') return success === true;
    return false;
  }

  return (
    <View style={{ flex: 1, paddingTop: heightInfo.statusHeight }}>
      <IMP.Payment
        userCode={userCode}
        loading={<Loading />}
        data={{
          ...data,
        }}
        callback={callback}
      />
    </View>
  );
}

export default PaymentScreen;
