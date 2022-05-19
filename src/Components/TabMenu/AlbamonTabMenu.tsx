import React, { useEffect } from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { check } from 'react-native-permissions';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import AlbamonActions from '@/Stores/Albamon/Actions';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import { navigate } from '@/Services/NavigationService';

const AlbamonTabMenu = (props: any) => {
  const { data } = props;

  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { placeDetail } = useSelector((state: PlaceState) => state.place);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { placeDetailSelectedTab = { title: '시간제/자유볼링', key: 'default' } } = useSelector(
    (state: AlbamonState) => state.albamon,
  );

  const onSelectMenu = (item: any): void => {
    if (item?.key === 'albamon' && !userIdx) {
      navigate('SimpleLoginScreen');
      return;
    }
    dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'placeDetailSelectedTab', data: item }));
  };

  return (
    <View
      style={{
        backgroundColor: Color.White,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          let textColor = Color.Gray400;
          if (placeDetailSelectedTab.key === item.key) {
            textColor = Color.Black900;
          }
          return (
            <CustomButton onPress={() => onSelectMenu(item)} style={{ paddingLeft: 40, paddingRight: 40 }}>
              <View>
                <View
                  style={{
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    paddingTop: 28,
                    paddingBottom: 16,
                    // paddingVertical: 15,
                    // borderBottomColor: placeDetailSelectedTab.key === item.key ? Color.Black900 : undefined,
                    // borderBottomWidth: bottomWidth,
                    // paddingHorizontal: 34,
                    borderBottomWidth: placeDetailSelectedTab.key === item.key ? 2 : 0,
                    borderColor: Color.Primary1000,
                  }}
                >
                  <CustomText
                    style={{
                      color: textColor,
                      fontSize: 14,
                      fontWeight: '500',
                      letterSpacing: -0.25,
                    }}
                  >
                    {item.title}
                  </CustomText>
                </View>
              </View>
            </CustomButton>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={7}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
      <View style={{ width, backgroundColor: Color.Gray200, height: 1, position: 'absolute', bottom: 0, zIndex: -1 }} />
    </View>
  );
};
export default AlbamonTabMenu;
