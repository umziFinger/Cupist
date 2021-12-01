import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import produce from 'immer';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import { DATA_PERMISSIONS } from '@/Containers/Auth/AgreeScreen/data';
import AuthActions from '@/Stores/Auth/Actions';
import { DATA_PAYMENT_PERMISSIONS } from '@/Containers/Reservation/AddCardScreen/data';
import AgreeItem from './AgreeItem';

const AgreeArea = () => {
  const [checkedArr, setCheckedArr] = useState<Array<any>>([false, false, false, false, false]);

  const onCheck = (value: any) => {
    produce(checkedArr, (draft) => {
      switch (value) {
        case 0: {
          if (draft[0]) {
            checkedArr.map((item, index) => {
              draft[index] = false;
              return null;
            });
          } else {
            checkedArr.map((item, index) => {
              draft[index] = true;
              return null;
            });
          }
          break;
        }
        default:
          draft[value] = !draft[value];
      }

      if (draft.includes(false)) {
        draft[0] = false;
      }

      if (draft[1] && draft[2] && draft[3] && draft[4]) {
        draft[0] = true;
      }
      console.log('d: ', draft);

      setCheckedArr([...draft]);
    });
  };

  const onAgreeDetail = () => {
    console.log('onAgreeDetail');
  };

  return (
    <View
      style={{
        paddingHorizontal: 24,
      }}
    >
      <FlatList
        data={[0]}
        renderItem={() => (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 12,
                paddingVertical: 18,
                borderWidth: 1,
                borderColor: Color.Gray300,
                borderRadius: 3,
              }}
            >
              <CustomButton onPress={() => onCheck(0)} hitSlop={{ left: 15, right: 15 }}>
                <View style={{ width: 24, height: 24 }}>
                  <FastImage
                    style={{ width: '100%', height: '100%' }}
                    source={
                      checkedArr[0]
                        ? require('@/Assets/Images/Button/icCheck.png')
                        : require('@/Assets/Images/Button/icCheckOff.png')
                    }
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
              </CustomButton>

              <View style={{ flex: 1, justifyContent: 'center', marginLeft: 12 }}>
                <CustomText
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    letterSpacing: -0.2,
                    color: Color.Black1000,
                  }}
                >
                  모두 확인, 동의합니다
                </CustomText>
              </View>
            </View>

            <View style={{ paddingHorizontal: 12 }}>
              <FlatList
                data={DATA_PAYMENT_PERMISSIONS}
                renderItem={({ item, index }) => {
                  return (
                    <AgreeItem
                      item={item}
                      index={index + 1}
                      checkArr={checkedArr}
                      onCheck={onCheck}
                      onAgreeDetail={onAgreeDetail}
                    />
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={DATA_PERMISSIONS.length}
                maxToRenderPerBatch={DATA_PERMISSIONS.length + 3}
                showsVerticalScrollIndicator={false}
                windowSize={7}
                scrollEnabled={false}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={7}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AgreeArea;
