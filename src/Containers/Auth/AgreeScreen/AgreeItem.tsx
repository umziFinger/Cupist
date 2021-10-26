import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';

interface AgreeItem {
  item: any;
  index: string | number;
  checkArr: Array<any>;
  onCheck: Function;
  onAgreeDetail: Function;
}

function AgreeItem(props: AgreeItem) {
  const { item, index, checkArr, onCheck, onAgreeDetail } = props;
  return (
    <View style={{ flexDirection: 'row', marginTop: item.idx === 0 ? 15 : 21, marginHorizontal: 32 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <CustomButton onPress={() => onCheck(index)} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}>
          <View style={{ width: 16, height: 16, marginRight: 16 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={
                checkArr?.includes(index)
                  ? require('@/Assets/Images/Button/icCheckCirclePressed20Pt.png')
                  : require('@/Assets/Images/Button/icCheckCircleNormal.png')
              }
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
        <CustomButton onPress={() => onAgreeDetail(item)} hitSlop={10} style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <View>
              <CustomText>{item?.terms_title || ''}</CustomText>
            </View>
            <View style={{ marginLeft: 8, flex: 1 }}>
              <View>
                <CustomText
                  style={{
                    color: '#aaa',
                    fontSize: 12,
                    letterSpacing: -0.2,
                  }}
                >
                  {item?.flag_required === 'Y' ? '(필수)' : '(선택)'}
                </CustomText>
              </View>
            </View>
            <View style={{ width: 11.2, height: 6.5 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Arrow/icArrowDownSmallGray.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </CustomButton>
      </View>
    </View>
  );
}

export default AgreeItem;
