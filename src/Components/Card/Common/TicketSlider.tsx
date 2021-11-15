import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { DATA_TICKET_TIME } from '@/Components/Data/DATA_TICKET_TIME';
import { numberFormat } from '@/Components/Function';
import CustomButton from '@/Components/CustomButton';
import PlaceActions from '@/Stores/Place/Actions';
import { PlaceState } from '@/Stores/Place/InitialState';

interface PropTypes {
  allowedTimeArr: Array<any>;
  item: any;
}
const TicketSlider = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { selectedTicket } = useSelector((state: PlaceState) => state.place);
  const { allowedTimeArr, item } = props;
  const morning = item?.morning || [];
  const afternoon = item?.afternoon || [];
  const night = item?.night || [];
  // const [selectedTicketIdx, setSelectedTicketIdx] = useState<number>(-1);

  useEffect(() => {
    console.log('@@@ selectedTicket : ', selectedTicket);
  }, [selectedTicket]);

  const isShowFunc = (value: number) => {
    if (value === 0 && morning.length > 0) {
      return true;
    }
    if (value === 1 && afternoon.length > 0) {
      return true;
    }
    if (value === 2 && night.length > 0) {
      return true;
    }
    return false;
  };

  const onPressTicket = (value: any) => {
    if (selectedTicket?.idx === value.idx) {
      // setSelectedTicketIdx(-1);
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
      return;
    }

    // setSelectedTicketIdx(value.idx);
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: value }));
  };

  return (
    <FlatList
      data={allowedTimeArr}
      renderItem={({ item: allowedTime, index }) =>
        isShowFunc(allowedTime) && (
          <View style={{ flex: 1, marginTop: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 24, height: 24, marginRight: 2 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Common/icTime.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ justifyContent: 'center', marginRight: 6 }}>
                <CustomText style={{ color: Color.Primary1000, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
                  {DATA_TICKET_TIME[index].type}
                </CustomText>
              </View>
              <View style={{ backgroundColor: Color.Gray300, width: 1, height: 11, marginRight: 6 }} />
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Gray800, fontSize: 13 }}>{DATA_TICKET_TIME[index].time}</CustomText>
              </View>
            </View>
            <FlatList
              data={allowedTime === 0 ? morning : allowedTime === 1 ? afternoon : night}
              renderItem={({ item, index }) => (
                <CustomButton onPress={() => onPressTicket(item)}>
                  <View
                    style={{
                      marginTop: 13,
                      paddingVertical: 20,
                      paddingLeft: 12,
                      paddingRight: 21,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: selectedTicket?.idx === item.idx ? Color.Primary1000 : Color.Gray300,
                      backgroundColor:
                        selectedTicket?.idx === item.idx ? 'rgba(255, 185, 10, 0.05)' : Color.Grayyellow50,
                      marginRight: 8,
                    }}
                  >
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText style={{ color: Color.Grayyellow1000, fontSize: 14, fontWeight: '500' }}>
                        {item.startTime.substr(0, 5)} - {item.endTime.substr(0, 5)}
                      </CustomText>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 2,
                      }}
                    >
                      <View style={{ justifyContent: 'center' }}>
                        <CustomText style={{ color: Color.Grayyellow1000, fontSize: 15, fontWeight: '500' }}>
                          {numberFormat(item?.salePrice)}
                        </CustomText>
                      </View>
                      <View style={{ justifyContent: 'center' }}>
                        <CustomText style={{ color: Color.Grayyellow1000, fontSize: 15 }}>원</CustomText>
                      </View>
                    </View>
                  </View>
                </CustomButton>
              )}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={3}
              maxToRenderPerBatch={6}
              windowSize={7}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )
      }
      keyExtractor={(item, index) => index.toString()}
      initialNumToRender={3}
      maxToRenderPerBatch={6}
      windowSize={7}
    />
  );
};

export default TicketSlider;
