import React from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import MyActions from '@/Stores/My/Actions';
import CustomButton from '@/Components/CustomButton';

import { MyState, reservationTabType } from '@/Stores/My/InitialState';

const ReservationTabMenu = (props: any) => {
  const { data } = props;
  const dispatch = useDispatch();

  const { reservationSelectedTab = { title: '진행중', key: 'before' } } = useSelector((state: MyState) => state.my);

  const onSelectCategory = (item: reservationTabType): void => {
    dispatch(MyActions.fetchMyReducer({ type: 'reservationSelectedTab', data: item }));
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <CustomButton onPress={() => onSelectCategory(item)}>
          <View style={{ flexDirection: 'row', marginRight: 8, alignItems: 'center' }}>
            <View
              style={{
                borderRadius: 16.5,
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: reservationSelectedTab?.key === item.key ? undefined : Color.Gray300,
                backgroundColor: reservationSelectedTab?.key === item.key ? Color.Grayyellow1000 : Color.White,
              }}
            >
              <CustomText
                style={{
                  color: reservationSelectedTab?.key === item.key ? Color.White : Color.Grayyellow1000,
                  fontSize: 13,
                  fontWeight: reservationSelectedTab?.key === item.key ? '500' : undefined,
                  letterSpacing: -0.2,
                }}
              >
                {item.title}
              </CustomText>
            </View>
          </View>
        </CustomButton>
      )}
      keyExtractor={(item, index) => index.toString()}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      windowSize={7}
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
    />
  );
};
export default ReservationTabMenu;
