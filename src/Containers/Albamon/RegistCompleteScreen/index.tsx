import React from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomDashed from '@/Components/CustomDashed';
import CustomButton from '@/Components/CustomButton';

const RegistCompleteScreen = () => {
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
                <CustomText style={{ fontSize: 20, letterSpacing: -0.35 }}>알바몬 코리아 볼링왕</CustomText>
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
                <CustomText style={{ fontSize: 13 }}>알바몬 코리아 볼링장</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  클럽명
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>류볼리짱클럽</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  참가볼링장명
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>롤리볼리볼링장</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  선수이름
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>류볼리</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  결제방법
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>무통장입금</CustomText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <CustomText
                  style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                >
                  결제금액
                </CustomText>
                <CustomText style={{ fontSize: 13 }}>10,000원</CustomText>
              </View>
            </View>
            <View style={{ height: 0.5, marginHorizontal: 24, marginVertical: 36 }}>
              <CustomDashed dashLength={2.7} dashColor={Color.Gray350} style={{ height: '100%' }} />
            </View>
            <CustomButton
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
                2022년 09월 17일 07시 59분까지 취소가 가능합니다.
              </CustomText>
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default RegistCompleteScreen;
