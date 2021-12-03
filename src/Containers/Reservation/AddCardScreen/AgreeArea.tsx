import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import produce from 'immer';
import { useDispatch } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import { DATA_PERMISSIONS } from '@/Containers/Auth/AgreeScreen/data';
import ReservationActions from '@/Stores/Reservation/Actions';
import { DATA_PAYMENT_PERMISSIONS } from '@/Containers/Reservation/AddCardScreen/data';
import AgreeItem from './AgreeItem';
import { navigate } from '@/Services/NavigationService';
import { DATA_PERMISSION_PAYMENT_DETAILS } from '@/Components/Data/DATA_PERMISSION_PAYMENT_DETAILS';

const AgreeArea = () => {
  const dispatch = useDispatch();
  const [checkedArr, setCheckedArr] = useState<Array<boolean>>([false, false, false, false, false]);

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
      dispatch(ReservationActions.fetchReservationReducer({ type: 'agreeCheckedArr', data: [...draft] }));
      setCheckedArr([...draft]);
    });
  };

  const onAgreeDetail = (index: number) => {
    console.log('onAgreeDetail : ', index);
    navigate('PermissionDetailScreen', { agreeIdx: index, detailArr: DATA_PERMISSION_PAYMENT_DETAILS });
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
            <CustomButton onPress={() => onCheck(0)}>
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
            </CustomButton>

            <View style={{ paddingHorizontal: 12 }}>
              <FlatList
                data={DATA_PAYMENT_PERMISSIONS}
                renderItem={({ item, index }) => {
                  return (
                    <AgreeItem
                      item={item}
                      index={index}
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
