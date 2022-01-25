import React from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { CommonState } from '@/Stores/Common/InitialState';

const InviteFriendScreen = () => {
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.Point1000,
      }}
    >
      <Header type="inviteFriend" />

      <View style={{ flex: 1, backgroundColor: Color.Point1000 }}>
        <FlatList
          data={[0]}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1 }}>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <View>
                  <CustomText style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2, color: Color.White }}>
                    친구에게 볼리미를 소개해주세요!
                  </CustomText>
                </View>
                <View style={{ marginTop: 7 }}>
                  <CustomText style={{ fontSize: 12, color: Color.White }}>친구에게 볼리미를 소개해주세요!</CustomText>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: Color.White,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  marginHorizontal: 24,
                  flex: 1,
                  paddingVertical: 30,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  marginTop: 24,
                }}
              >
                <View
                  style={{
                    borderRadius: 2,
                    backgroundColor: Color.Point1000,
                    paddingVertical: 2,
                    paddingHorizontal: 4,
                  }}
                >
                  <CustomText style={{ fontSize: 10, fontWeight: 'bold', letterSpacing: 0, color: Color.White }}>
                    EVENT
                  </CustomText>
                </View>

                <View style={{ alignItems: 'center', marginTop: 16 }}>
                  <CustomText
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      letterSpacing: -0.2,
                      color: Color.Black1000,
                      textAlign: 'center',
                    }}
                  >
                    {'친구 초대하고\n1천원 할인쿠폰 받자!'}
                  </CustomText>
                </View>

                <View style={{ alignItems: 'center', marginTop: 8 }}>
                  <CustomText
                    style={{
                      fontSize: 12,
                      letterSpacing: 0,
                      textAlign: 'center',
                      color: Color.Gray700,
                    }}
                  >
                    {'공유한 링크를 통해 친구가 가입 후 예약시\n바로 사용할 수 있는 1천원 할인쿠폰 증정!'}
                  </CustomText>
                </View>

                <View style={{ backgroundColor: Color.Gray200, height: 1, width: '100%', marginTop: 24 }} />

                <CustomButton
                  style={{
                    borderRadius: 5,
                    backgroundColor: '#f9e000',
                    paddingVertical: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 23,
                    width: '100%',
                  }}
                >
                  <View style={{ width: 24, height: 24, marginRight: 2 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={FastImage.resizeMode.cover}
                      source={require('@/Assets/Images/Button/icSignKakao.png')}
                    />
                  </View>
                  <View>
                    <CustomText
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        letterSpacing: 0,
                        color: '#3c1e1e',
                      }}
                    >
                      카카오톡으로 초대하기
                    </CustomText>
                  </View>
                </CustomButton>

                <CustomButton
                  style={{
                    borderRadius: 5,
                    backgroundColor: Color.White,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                    width: '100%',
                    borderColor: Color.Primary1000,
                    borderWidth: 1,
                  }}
                >
                  <View>
                    <CustomText
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        letterSpacing: -0.25,
                        color: Color.Primary1000,
                      }}
                    >
                      URL 링크로 초대하기
                    </CustomText>
                  </View>
                </CustomButton>

                <View style={{ backgroundColor: Color.Gray200, height: 1, width: '100%', marginTop: 24 }} />

                <View style={{ marginTop: 24 }}>
                  <CustomText
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      letterSpacing: -0.2,
                      color: Color.Black1000,
                    }}
                  >
                    나의 친구 초대 현황
                  </CustomText>
                </View>

                <View style={{ marginTop: 20, width: '100%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                      <CustomText
                        style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.2, color: Color.Black1000 }}
                      >
                        초대한 친구
                      </CustomText>
                    </View>
                    <View
                      style={{
                        borderStyle: 'dashed',
                        borderWidth: 0.5,
                        borderColor: Color.Gray200,
                        flex: 1,
                        marginLeft: 19,
                        marginRight: 12,
                      }}
                    />
                    <View>
                      <CustomText
                        style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.2, color: Color.Point1000 }}
                      >
                        2명
                      </CustomText>
                    </View>
                  </View>
                </View>

                <View style={{ marginTop: 12, width: '100%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                      <CustomText
                        style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.2, color: Color.Black1000 }}
                      >
                        총 적립 쿠폰
                      </CustomText>
                    </View>
                    <View
                      style={{
                        borderStyle: 'dashed',
                        borderWidth: 0.5,
                        borderColor: Color.Gray200,
                        flex: 1,
                        marginLeft: 19,
                        marginRight: 12,
                      }}
                    />
                    <View>
                      <CustomText
                        style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.2, color: Color.Point1000 }}
                      >
                        2명
                      </CustomText>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: Color.Gray100,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginHorizontal: 24,
                  flex: 1,
                  paddingVertical: 30,
                  paddingHorizontal: 20,
                }}
              >
                <View>
                  <CustomText style={{ fontSize: 12, fontWeight: 'bold', letterSpacing: 0, color: Color.Gray800 }}>
                    꼭! 읽어주세요
                  </CustomText>
                </View>

                <View style={{ marginTop: 12 }}>
                  <CustomText
                    style={{
                      fontSize: 11,
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: -0.2,
                      color: Color.Gray700,
                    }}
                  >
                    1. 친구초대 URL을 통하여 가입하여야 하며, 이미 가입된 회원을 초대하실 수 없습니다.
                  </CustomText>
                </View>
                <View style={{ marginTop: 8 }}>
                  <CustomText
                    style={{
                      fontSize: 11,
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: -0.2,
                      color: Color.Gray700,
                    }}
                  >
                    2. 초대하신 회원이 본인인증을 마친 경우에만 초대완료로 인정됩니다.
                  </CustomText>
                </View>

                <View style={{ marginTop: 8 }}>
                  <CustomText
                    style={{
                      fontSize: 11,
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: -0.2,
                      color: Color.Gray700,
                    }}
                  >
                    3. 총 적립 쿠폰은 ‘추천한 이용자가 예약을 진행했을 경우’ 적립된 쿠폰의 수치입니다.
                  </CustomText>
                </View>

                <View style={{ marginTop: 8 }}>
                  <CustomText
                    style={{
                      fontSize: 11,
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      letterSpacing: -0.2,
                      color: Color.Gray700,
                    }}
                  >
                    {'4.보유 쿠폰은 더보기 > 내쿠폰함에서 확인 가능합니다.'}
                  </CustomText>
                </View>
              </View>
            </View>
          )}
          maxToRenderPerBatch={10}
          initialNumToRender={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ paddingBottom: heightInfo.fixBottomHeight + 31 }} />}
        />
      </View>
    </View>
  );
};

export default InviteFriendScreen;
