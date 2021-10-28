import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';

interface AgreeItem {
  item: any;
  index: string | number;
  checkArr: Array<string | number>;
  onCheck: Function;
  onAgreeDetail: Function;
}

function AgreeItem(props: AgreeItem) {
  const { item, index, checkArr, onCheck, onAgreeDetail } = props;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <CustomButton onPress={() => onCheck(index)}>
          <View style={{ width: 20, height: 20 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={
                checkArr?.includes(index)
                  ? require('@/Assets/Images/Button/icCheck.png')
                  : require('@/Assets/Images/Button/icCheckOff.png')
              }
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
        <View style={{ marginLeft: 12 }}>
          <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray800 }}>{item.content}</CustomText>
        </View>
      </View>
      <View style={{}}>
        <CustomButton onPress={() => onAgreeDetail(index)}>
          <View>
            <CustomText
              style={{
                fontSize: 11,
                letterSpacing: -0.2,
                color: Color.Gray400,
                textDecorationLine: 'underline',
                textDecorationColor: Color.Gray400,
              }}
            >
              보기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
}

export default AgreeItem;
