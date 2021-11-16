import { StyleProp, TextProps, TextStyle, View } from 'react-native';
import React from 'react';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

type RowPropsType = {
  title:
    | '볼링장명'
    | '이용날짜'
    | '이용시간'
    | '상품명'
    | '예약인원'
    | '취소 가능 기한'
    | '추가옵션'
    | '결제방법'
    | '결제 금액'
    | '취소수수료 차감'
    | '환불 예정 금액';
  content: string;
  contentStyle?: TextStyle;
};
const RowItem = ({ title, content, contentStyle }: RowPropsType) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <CustomText
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            letterSpacing: -0.2,
            color: Color.Grayyellow500,
          }}
        >
          {title}
        </CustomText>
      </View>
      <View>
        <CustomText
          style={{
            fontSize: 13,
            letterSpacing: 0,
            textAlign: 'right',
            color: Color.Black1000,
            ...contentStyle,
          }}
        >
          {content}
        </CustomText>
      </View>
    </>
  );
};

export default RowItem;
