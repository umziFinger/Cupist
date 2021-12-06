import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { AuthState } from '@/Stores/Auth/InitialState';

interface AgreeItem {
  item: any;
  index: number;
  checkArr: Array<boolean>;
  onCheck: Function;
  onAgreeDetail: Function;
}

function AgreeItem(props: AgreeItem) {
  const { item, index, checkArr, onCheck, onAgreeDetail } = props;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
      <CustomButton onPress={() => onCheck(index + 1)}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 20, height: 20 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={
                checkArr[index + 1]
                  ? require('@/Assets/Images/Button/icCheck.png')
                  : require('@/Assets/Images/Button/icCheckOff.png')
              }
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>

          <View style={{ marginLeft: 12 }}>
            <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray800 }}>{item.content}</CustomText>
          </View>
        </View>
      </CustomButton>
      <CustomButton onPress={() => onAgreeDetail(index)} hitSlop={10}>
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
  );
}

export default AgreeItem;
