import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomText from '../CustomText';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import HomeActions from '@/Stores/Home/Actions';
import { HomeState } from '@/Stores/Home/InitialState';

const DateFilter = () => {
  const dispatch = useDispatch();
  const { prepaymentDate, prepaymentDateList } = useSelector((state: HomeState) => state.home);

  const onPressFilter = (idx: number) => {
    dispatch(HomeActions.fetchHomeReducer({ type: 'prepaymentDate', data: prepaymentDateList[idx].toString() }));
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={prepaymentDateList || []}
        listKey={'filter'}
        renderItem={({ item: filterDate, index }) => {
          const date = moment(filterDate).format('YYYY-MM-D');

          return (
            <CustomButton onPress={() => onPressFilter(index)}>
              <View
                style={{
                  borderRadius: 16.5,
                  borderWidth: prepaymentDate === date ? 1 : 1,
                  borderColor: prepaymentDate === date ? 'transparent' : Color.Gray300,
                  marginRight: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  backgroundColor: prepaymentDate === date ? Color.Grayyellow1000 : Color.White,
                }}
              >
                <View style={{ justifyContent: 'center' }}>
                  <CustomText
                    style={{
                      color: prepaymentDate === date ? Color.White : Color.Grayyellow1000,
                      fontSize: 13,
                      letterSpacing: -0.2,
                    }}
                  >
                    {moment(filterDate).format('M/D')}
                  </CustomText>
                </View>
              </View>
            </CustomButton>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={7}
        maxToRenderPerBatch={10}
        windowSize={7}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default DateFilter;
