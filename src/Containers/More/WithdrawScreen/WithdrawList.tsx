import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';

const WithdrawList = ({ isAgree, setIsAgree }: any) => {
  return (
    <>
      <View
        style={{
          backgroundColor: Color.White,
          paddingTop: 16,
          paddingHorizontal: 24,
          marginBottom: 60,
        }}
      >
        <View style={{ marginBottom: 13 }}>
          <CustomText style={{ fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4, color: Color.Black1000 }}>
            회원탈퇴 안내
          </CustomText>
        </View>

        <CustomText style={{ fontSize: 14, letterSpacing: -0.25, color: Color.Black1000 }}>
          {`회원 탈퇴 시 해당 계정의 개인정보는 모두 삭제되며\n`}
          <CustomText style={{ color: Color.Error }}>이후 복구가 불가능합니다.</CustomText>
        </CustomText>
      </View>

      <View
        style={{
          backgroundColor: Color.White,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Black1000 }}>
            유의사항
          </CustomText>
        </View>

        <View style={{ paddingBottom: 24, borderBottomColor: Color.Gray200, borderBottomWidth: 1 }}>
          <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray700 }}>
            볼리미에 작성한 리뷰는 삭제되지 않으며, 회원정보 삭제로 인 해 작성자 본인을 확인할 수 없으므로 리뷰 편집 및
            삭제처리가 원천적으로 불가능합니다. 리뷰삭제를 원하시는 경우에는 먼저 해당 리뷰를 삭제하신 후, 탈퇴를
            신청하시기 바랍니다.
          </CustomText>
        </View>

        <View style={{ paddingTop: 24, paddingBottom: 24, borderBottomColor: Color.Gray200, borderBottomWidth: 1 }}>
          <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray700 }}>
            볼링장 이용을 완료하지 않은 예약건이 있을 경우 회원 탈퇴 가 불가하며 예약 취소 또는 예약이행 후 회원탈퇴가
            가능합니 다.
          </CustomText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
          <CustomButton
            onPress={() => setIsAgree(!isAgree)}
            hitSlop={{ left: 15, right: 15 }}
            style={{ marginRight: 4 }}
          >
            <View style={{ width: 24, height: 24 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={
                  isAgree
                    ? require('@/Assets/Images/Arrow/icCheck.png')
                    : require('@/Assets/Images/Button/icCheckOff.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </CustomButton>
          <CustomText style={{ fontSize: 14, letterSpacing: -0.25, color: Color.Gray800 }}>
            위 내용에 동의합니다.
          </CustomText>
        </View>
      </View>
    </>
  );
};

export default WithdrawList;
