import React from 'react';
import IMP from 'iamport-react-native';

import { RouteProp } from '@react-navigation/native';
import { Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { navigate, navigateGoBack } from '@/Services/NavigationService';
import Loading from '@/Components/Loading';
import { CommonState } from '@/Stores/Common/InitialState';
import ReservationActions from '@/Stores/Reservation/Actions';
import { ReservationState } from '@/Stores/Reservation/InitialState';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'CertificationScreen'>;
}

function CertificationScreen({ route }: PropTypes) {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  /* 가맹점 식별코드, 결제 데이터 추출 */
  const { userCode, data } = route.params;

  /* 본인인증 후 실행될 콜백 함수 입력 */
  function callback(response: any) {
    console.log('callback res : ', response);
    const isSuccessed = getIsSuccessed(response);
    if (isSuccessed) {
      const params = {
        ...response,
        type: 'certification', // 결제와 본인인증 구분을 위한 필드
      };
      console.log('########## Success IAMPORT params : ', params);
      // Todo 카드 등록 페이지 이동
    } else {
      console.log('본인인증 취소!!!!');
      navigate('AddCardScreen');
      // navigateGoBack();
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
    <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? heightInfo.statusHeight : 0 }}>
      <IMP.Certification userCode={userCode} data={data} loading={<Loading />} callback={callback} />
    </View>
  );
}

export default CertificationScreen;
