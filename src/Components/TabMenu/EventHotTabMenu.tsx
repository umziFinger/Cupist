import React from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import PlaceActions from '@/Stores/Place/Actions';
import CustomButton from '@/Components/CustomButton';
import { PlaceState } from '@/Stores/Place/InitialState';
import { CommonState } from '@/Stores/Common/InitialState';
import { HomeState } from '@/Stores/Home/InitialState';

const EventHotTabMenu = (props: any) => {
  const { data } = props;
  const dispatch = useDispatch();
  const { myLatitude, myLongitude } = useSelector((state: CommonState) => state.common);
  const { calendarDate } = useSelector((state: HomeState) => state.home);

  const { selectedEventHotTab = { name: '최신순', category: 'latest' } } = useSelector(
    (state: PlaceState) => state.place,
  );

  const onSelectCategory = (item: any): void => {
    const params = {
      lat: myLatitude,
      lng: myLongitude,
      page: 1,
      perPage: 10,
      date: calendarDate,
      sort: selectedEventHotTab?.category,
    };
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedEventHotTab', data: item }));
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'hotPlaceListPage', data: 1 }));

    dispatch(PlaceActions.fetchPlaceEventHotList(params));
  };

  return (
    <View>
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
                  borderColor: selectedEventHotTab?.category === item.category ? undefined : Color.Gray300,
                  backgroundColor: selectedEventHotTab?.category === item.category ? Color.Grayyellow1000 : Color.White,
                }}
              >
                <CustomText
                  style={{
                    color: selectedEventHotTab?.category === item.category ? Color.White : Color.Grayyellow1000,
                    fontSize: 13,
                    fontWeight: selectedEventHotTab?.category === item.category ? '500' : undefined,
                    letterSpacing: -0.2,
                  }}
                >
                  {item.name}
                </CustomText>
              </View>
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
      />
    </View>
  );
};
export default EventHotTabMenu;
