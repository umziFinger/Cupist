import React, { useEffect } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomDashed from '@/Components/CustomDashed';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import PlaceActions from '@/Stores/Place/Actions';
import CommonActions from '@/Stores/Common/Actions';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import { numberFormat } from '@/Components/Function';
import AlbamonActions from '@/Stores/Albamon/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import { CommonState } from '@/Stores/Common/InitialState';
import { fetchCompetitionsVerify } from '@/Sagas/AlbamonSaga';

const RegistCompleteScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { competitionsPaymentResult, paymentVerifyData, competitionVerifyData } = useSelector(
    (state: AlbamonState) => state.albamon,
  );
  const { userIdx } = useSelector((state: AuthState) => state.auth);

  useEffect(() => {
    console.log('paymentVerifyData : ', paymentVerifyData);
    // dispatch(AlbamonActions.fetchCompetitionsPaymentVerify(paymentVerifyData));
    dispatch(AlbamonActions.fetchCompetitionsVerify());
    dispatch(AuthActions.fetchUserInfo({ idx: userIdx }));
    console.log('competitionVerifyData : ', competitionVerifyData);
  }, []);

  const onGoMyAroundAlbamon = () => {
    dispatch(
      PlaceActions.fetchPlaceReducer({
        type: 'myAroundSort',
        data: {
          index: 3,
          key: 'albamon',
          value: '알코볼',
        },
      }),
    );
    navigate('MyAroundScreen');
  };

  const onPressCopy = (text: string) => {
    Clipboard.setString(text || '');
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'alertToast',
        data: {
          alertToast: true,
          alertToastPosition: 'bottom',
          alertToastMessage: '계좌번호가 복사 되었습니다.',
        },
      }),
    );
  };

  return (
    <View style={{ backgroundColor: Color.White, flex: 1 }}>
      <Header type={'back'} />
      <FlatList
        data={[0]}
        renderItem={() => (
          <View>
            <View style={{ marginTop: 16, alignItems: 'center' }}>
              <View style={{ width: 60, height: 60 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Common/icCom.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <CustomText style={{ fontSize: 20, letterSpacing: -0.35 }}>2022 알바몬 코리아 볼링왕</CustomText>
                <CustomText style={{ fontSize: 22, letterSpacing: -0.4, fontWeight: 'bold', marginTop: 4 }}>
                  참가신청완료
                </CustomText>
              </View>
              <View style={{ alignItems: 'center', marginTop: 16 }}>
                <CustomText style={{ fontSize: 12, color: Color.Gray600 }}>
                  알.코.볼 참가신청이 완료되었습니다.
                </CustomText>
                <CustomText style={{ fontSize: 12, color: Color.Gray600 }}>아래 내용을 확인해주세요.</CustomText>
              </View>
            </View>
            <View style={{ height: 0.5, marginHorizontal: 24, marginVertical: 36 }}>
              <CustomDashed dashLength={2.7} dashColor={Color.Gray350} style={{ height: '100%' }} />
            </View>
            <View style={{ paddingHorizontal: 24 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  대회명
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>2022 알바몬 코리아 볼링왕</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  클럽명
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>{competitionVerifyData?.Club?.name || ''}</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  참가볼링장명
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>{competitionVerifyData?.Place?.name || ''}</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  선수이름
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>{competitionVerifyData?.username || ''}</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  결제방법
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>무통장입금</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  입금은행
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>{competitionVerifyData?.vbankName || ''}</CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  계좌번호
                </CustomText>
                <CustomButton
                  onPress={() => onPressCopy(competitionVerifyData?.vbankNo)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <View style={{ width: 24, height: 24 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('@/Assets/Images/Albamon/icCopy.png')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <CustomText style={{ fontSize: 13 }}>{competitionVerifyData?.vbankNo || ''}</CustomText>
                </CustomButton>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  입금기한
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>
                  {competitionVerifyData?.paymentYn === 'Y' && competitionVerifyData?.confirmYn === 'N'
                    ? '승인대기중'
                    : competitionVerifyData?.confirmYn === 'Y'
                    ? '참가 신청완료'
                    : moment(competitionVerifyData?.vbankDate?.split(' ')[0]).format('YYYY년 MM월 DD일') || ''}
                </CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  결제금액
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>{numberFormat(competitionVerifyData?.price) || ''}원</CustomText>
              </View>
            </View>
            <View style={{ height: 0.5, marginHorizontal: 24, marginVertical: 36 }}>
              <CustomDashed dashLength={2.7} dashColor={Color.Gray350} style={{ height: '100%' }} />
            </View>
            <CustomButton
              onPress={() => onGoMyAroundAlbamon()}
              style={{
                borderWidth: 1,
                borderColor: Color.Grayyellow200,
                borderRadius: 3,
                alignItems: 'center',
                marginHorizontal: 24,
                paddingVertical: 12,
              }}
            >
              <CustomText>알.코.볼 볼링장 리스트 바로가기</CustomText>
            </CustomButton>
            <View style={{ alignItems: 'center', marginTop: 12 }}>
              <CustomText style={{ fontSize: 13, color: Color.Point1000, letterSpacing: -0.2 }}>
                변경 및 취소문의는 고객센터에 문의해주세요.
              </CustomText>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={4}
        windowSize={7}
        contentContainerStyle={{ paddingBottom: heightInfo.statusHeight }}
      />
    </View>
  );
};
export default RegistCompleteScreen;
