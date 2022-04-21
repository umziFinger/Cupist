import * as React from 'react';
import { FlatList, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigateGoBack } from '@/Services/NavigationService';

interface Props {
  route: RouteProp<MainStackParamList, 'ReservationCancelPopupScreen'>;
}
const ReservationCancelPopupScreen = ({ route }: Props) => {
  const { cancelLimit, totalPrice } = route.params;
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'close'} />
      <View style={{ paddingHorizontal: 24, backgroundColor: Color.White, flex: 1 }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ marginTop: 41 }}>
              <CustomText style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Black1000 }}>
                취소 위약금 안내
              </CustomText>
              <View style={{ flexDirection: 'row', marginTop: 36 }}>
                <View style={{ alignItems: 'center' }}>
                  <CustomText style={{ color: Color.Primary1000 }}>{'\u2022'}</CustomText>
                  <View style={{ height: 57, width: 1, backgroundColor: '#f0f0f0' }} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View>
                    <CustomText
                      style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Primary1000 }}
                    >
                      취소 수수료 무료
                    </CustomText>
                  </View>
                  <View style={{ marginTop: 6 }}>
                    <CustomText
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                        color: Color.Grayyellow1000,
                      }}
                    >
                      {moment(cancelLimit).format('YYYY년 MM월 DD일 HH시 mm분')}까지 무료 취소
                    </CustomText>
                  </View>
                </View>
              </View>
              {/* 취소시 일부 환불 */}
              {/* <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                  <CustomText style={{ color: Color.Point1000 }}>{'\u2022'}</CustomText>
                  <View style={{ height: 78, width: 1, backgroundColor: '#f0f0f0' }} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View>
                    <CustomText
                      style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Point1000 }}
                    >
                      취소시 일부 환불
                    </CustomText>
                  </View>
                  <View style={{ marginTop: 6 }}>
                    <CustomText
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                        color: Color.Grayyellow1000,
                      }}
                    >
                       {moment(cancelLimit).subtract(1, 'minute').format('YYYY년 MM월 DD일 HH시 mm분')}까지
                      사용 예정 시간 1시간 이내 취소 시
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                        color: Color.Grayyellow1000,
                      }}
                    >
                      취소 위약금 : {totalPrice * 0.1}원 (10%)
                    </CustomText>
                  </View>
                </View>
              </View> */}

              {/* 취소시 일부 환불 (50%) */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                  <CustomText style={{ color: Color.Point1000 }}>{'\u2022'}</CustomText>
                  <View style={{ height: 78, width: 1, backgroundColor: '#f0f0f0' }} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View>
                    <CustomText
                      style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Point1000 }}
                    >
                      취소시 일부 환불
                    </CustomText>
                  </View>
                  <View style={{ marginTop: 6 }}>
                    <CustomText
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                        color: Color.Grayyellow1000,
                      }}
                    >
                      {/* {moment(cancelLimit).subtract(1, 'minute').format('YYYY년 MM월 DD일 HH시 mm분')}까지 */}
                      사용 예정 시간 2시간 ~ 1시간 이내 취소 시
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                        color: Color.Grayyellow1000,
                      }}
                    >
                      취소 위약금 : {totalPrice * 0.5}원 (50%)
                    </CustomText>
                  </View>
                </View>
              </View>

              {/* 취소시 환불 불가 */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                  <CustomText style={{ color: Color.Point1000 }}>{'\u2022'}</CustomText>
                  <View style={{}} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View>
                    <CustomText
                      style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Point1000 }}
                    >
                      취소시 환불 불가
                    </CustomText>
                  </View>
                  <View style={{ marginTop: 6 }}>
                    <CustomText
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                        color: Color.Grayyellow1000,
                      }}
                    >
                      {/* {moment(cancelLimit).add(50, 'minute').format('YYYY년 MM월 DD일 HH시 mm분')}까지 */}
                      사용 예정 시간 1시간 이내 취소 시
                    </CustomText>
                    <CustomText
                      style={{
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                        color: Color.Grayyellow1000,
                      }}
                    >
                      취소 위약금 : {totalPrice}원 (100%)
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <CustomButton
        style={{ paddingBottom: heightInfo.statusHeight, marginHorizontal: 24 }}
        onPress={() => navigateGoBack()}
      >
        <View
          style={{
            borderRadius: 3,
            backgroundColor: Color.White,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: Color.Gray300,
            paddingVertical: 15,
            alignItems: 'center',
          }}
        >
          <CustomText
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              letterSpacing: -0.25,
              textAlign: 'center',
              color: Color.Gray400,
            }}
          >
            확인
          </CustomText>
        </View>
      </CustomButton>
    </View>
  );
};

export default ReservationCancelPopupScreen;
