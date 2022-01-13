import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { DATA_PERMISSION_DETAILS } from '@/Components/Data/DATA_PERMISSION_DETAILS';
import Config from '@/Config';

const CopyRightArea = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ width: 47, height: 15 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Home/footerTypo.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <CustomButton onPress={() => setIsShow(!isShow)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ justifyContent: 'center', height: 16 }}>
              <CustomText style={{ color: Color.Gray400, fontSize: 12 }}>사업자정보</CustomText>
            </View>
            <View style={{ width: 16, height: 16 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={
                  isShow
                    ? require('@/Assets/Images/Arrow/icArrowUpHeavyGray.png')
                    : require('@/Assets/Images/Arrow/icArrowDwHeavyGray.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </CustomButton>
      </View>

      <View style={{ flex: 1 }}>
        {isShow && (
          <View style={{ flex: 1, marginTop: 16 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Gray400, fontSize: 12 }}>
                {`${Config.CS_COMPANY_NAME}\n`}
                {`주소: ${Config.CS_ADDRESS}\n`}
                {`대표이사: ${Config.CS_PRIVACY} | 사업자등록번호: ${Config.CS_COMPANY}\n`}
                {`통신판매번호: ${Config.CS_SELL_REPORT}`}
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center', marginTop: 12 }}>
              <CustomText style={{ color: Color.Gray400, fontSize: 12 }}>
                {`전화번호 : ${Config.CS_NUMBER}\n`}
                {`전자우편주소 : ${Config.CS_EMAIL}`}
              </CustomText>
            </View>
          </View>
        )}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Gray400, fontSize: 12 }}>이용약관 | </CustomText>
          </View>
          <CustomButton
            onPress={() => navigate('PermissionDetailScreen', { agreeIdx: 2, detailArr: DATA_PERMISSION_DETAILS })}
          >
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Gray700, fontSize: 12, fontWeight: '500' }}>
                개인정보 처리방침
              </CustomText>
            </View>
          </CustomButton>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Gray400, fontSize: 9 }}>
              {`(주)볼링플러스는 통신판매중개자로서 통신판매의 당사자가 아니며,\n상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.`}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CopyRightArea;
