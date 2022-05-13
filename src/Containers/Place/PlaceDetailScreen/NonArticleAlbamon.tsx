import React from 'react';
import { View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

const NonArticleAlbamon = () => {
  return (
    <View style={{ paddingTop: 140 }}>
      <CustomText
        style={{ textAlign: 'center', fontSize: 14, lineHeight: 20, letterSpacing: -0.25, color: Color.Gray400 }}
      >
        {/* {'해당 볼링장은 알.코.볼 예선전을\n진행하지 않는 볼링장 입니다.\n예선전을 진행하는 볼링장을 확인해 보세요!'} */}
        {'현재 대회 예선 기간이 아닙니다.'}
      </CustomText>
    </View>
  );
};
export default NonArticleAlbamon;
