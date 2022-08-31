import React from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import AlbamonActions from '@/Stores/Albamon/Actions';
import { AlbamonState } from '@/Stores/Albamon/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';

const PreparingTabMenu = (props: any) => {
  const { data } = props;

  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { placeDetailSelectedTab = { title: '시간제/자유볼링', key: 'default' } } = useSelector(
    (state: AlbamonState) => state.albamon,
  );

  const onSelectMenu = (item: any): void => {
    console.log('item : ', item);
    if (item?.key === 'albamon') {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertDialog',
          data: {
            alertDialog: true,
            alertDialogType: 'confirm',
            alertDialogTitle: '대회 준비중입니다.\n조금만 기다려 주세요!',
          },
        }),
      );
    }
    dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'placeDetailSelectedTab', data: data[0] }));
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
                    paddingTop: 28,
                    paddingBottom: 16,
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
export default PreparingTabMenu;
