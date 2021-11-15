import React from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { MyState } from '@/Stores/My/InitialState';
import MyActions from '@/Stores/My/Actions';
import { navigate } from '@/Services/NavigationService';

const MyTabMenu = (props: any) => {
  const { data } = props;

  const dispatch = useDispatch();
  const { mySelectedTab = { title: '예약', selectKey: 'reservation' } } = useSelector((state: MyState) => state.my);

  const onSelectMenu = (item: any): void => {
    dispatch(MyActions.fetchMyReducer({ type: 'mySelectedTab', data: item }));
  };

  return (
    <View
      style={{
        backgroundColor: Color.White,
        // backgroundColor: Color.Primary1000,
        borderBottomColor: Color.Gray200,
        borderBottomWidth: 1,
        paddingHorizontal: 16,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          let textColor = Color.Gray400;
          let bottomWidth = 0;
          if (mySelectedTab.selectKey === item.selectKey) {
            textColor = Color.Black1000;
            bottomWidth = 2;
          }
          return (
            <CustomButton onPress={() => onSelectMenu(item)}>
              <View
                style={{
                  marginRight: index === 0 ? 40 : 0,
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    paddingVertical: 15,
                    borderBottomColor: mySelectedTab.selectKey === item.selectKey ? Color.Primary1000 : undefined,
                    borderBottomWidth: bottomWidth,
                    paddingHorizontal: 34,
                  }}
                >
                  <CustomText
                    style={{
                      color: textColor,
                      fontSize: 17,
                      fontWeight: '500',
                      letterSpacing: -0.3,
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
    </View>
  );
};
export default MyTabMenu;
