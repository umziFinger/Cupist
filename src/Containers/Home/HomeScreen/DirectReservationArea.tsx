import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import produce from 'immer';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import DirectReservationCard from '@/Components/Card/Home/DirectReservationCard';
import { SearchState } from '@/Stores/Search/InitialState';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  list: Array<any>;
}
const DirectReservationArea = (props: PropTypes) => {
  // const {areaList};
  const { list } = props;
  const { areaList } = useSelector((state: SearchState) => state.search);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const areaTag = [
    {
      index: 0,
      key: 'all',
      value: '전체',
      color: Color.Grayyellow1000,
      backgroundColor: Color.Gray200,
    },
    {
      index: 1,
      key: 'nearby',
      value: '가까운',
      color: Color.Grayyellow1000,
      backgroundColor: 'transparent',
    },
  ];

  const areaFilter = useMemo(
    () => () =>
      produce(areaTag, (draft) => {
        areaList.map((item, index) => {
          return draft.push({
            index: index + 2,
            key: item.code,
            value: item.area,
            color: Color.Grayyellow1000,
            backgroundColor: 'transparent',
          });
        });
      }),
    [areaList],
  );

  const onPressFilter = (value: number) => {
    console.log('onPressFilter : ', value);
    // produce(areaTag, (draft) => {
    //   draft[value].isSelected = true;
    // });
    console.log('areaList : ', areaFilter()[7]);
    setSelectedIdx(value);
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ paddingLeft: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ marginRight: 4 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.35 }}>
              바로 예약
            </CustomText>
          </View>
          <View style={{ width: 5, height: 5, marginBottom: 5 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/icPeriod.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <View style={{ marginTop: 6 }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 15, letterSpacing: -0.2 }}>
            지금 예약 가능한 볼링장
          </CustomText>
        </View>
      </View>
      <View style={{ paddingLeft: 20 }}>
        <FlatList
          data={areaFilter() || []}
          renderItem={({ item, index }) => (
            <CustomButton onPress={() => onPressFilter(item.index)}>
              <View style={{ flexDirection: 'row', marginRight: 8, alignItems: 'center' }}>
                {index === 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 16.5,
                      paddingLeft: 10,
                      paddingRight: 14,
                      paddingVertical: 7.5,
                      backgroundColor: selectedIdx === item.index ? Color.Grayyellow1000 : item.backgroundColor,
                    }}
                  >
                    <View style={{ width: 20, height: 20, marginRight: 2 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={
                          selectedIdx === item.index
                            ? require('@/Assets/Images/Common/icTimeWhite.png')
                            : require('@/Assets/Images/Common/icTime.png')
                        }
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <CustomText
                      style={{
                        color: selectedIdx === item.index ? Color.White : item.color,
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                      }}
                    >
                      {item.value}
                    </CustomText>
                  </View>
                ) : (
                  <View
                    style={{
                      borderRadius: 16.5,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderWidth: 1,
                      borderColor: selectedIdx === item.index ? Color.Grayyellow1000 : Color.Gray300,
                      backgroundColor: selectedIdx === item.index ? Color.Grayyellow1000 : item.backgroundColor,
                    }}
                  >
                    <CustomText
                      style={{
                        color: selectedIdx === item.index ? Color.White : item.color,
                        fontSize: 13,
                        fontWeight: '500',
                        letterSpacing: -0.2,
                      }}
                    >
                      {item.value}
                    </CustomText>
                  </View>
                )}
              </View>
            </CustomButton>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={5}
          maxToRenderPerBatch={8}
          windowSize={7}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 8 }}
          ListFooterComponent={<View style={{ paddingRight: 20 }} />}
        />
      </View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <DirectReservationCard item={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={3}
        maxToRenderPerBatch={6}
        windowSize={7}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={
          <CustomButton onPress={() => navigate('SimpleLoginScreen')}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                borderWidth: 1,
                borderRadius: 3,
                borderColor: Color.Grayyellow200,
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, letterSpacing: -0.2 }}>
                  바로예약 볼링장 모두보기
                </CustomText>
              </View>
            </View>
          </CustomButton>
        }
      />
    </View>
  );
};

export default DirectReservationArea;
