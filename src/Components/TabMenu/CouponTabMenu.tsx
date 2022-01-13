import React from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { MyState } from '@/Stores/My/InitialState';
import MyActions from '@/Stores/My/Actions';

const CouponTabMenu = (props: any) => {
  const { data } = props;

  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { couponSelectedTab = { title: '사용가능', key: 'Y' } } = useSelector((state: MyState) => state.my);

  const onSelectMenu = (item: any): void => {
    dispatch(MyActions.fetchMyReducer({ type: 'couponSelectedTab', data: item }));
  };

  return (
    <View
      style={{
        backgroundColor: Color.White,
        // backgroundColor: Color.Primary1000,
        borderBottomColor: Color.Gray200,
        borderBottomWidth: 1,
        // paddingHorizontal: 16,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          let textColor = Color.Gray400;
          let bottomWidth = 0;
          if (couponSelectedTab.key === item.key) {
            textColor = Color.Black900;
            bottomWidth = 2;
          }
          return (
            <CustomButton onPress={() => onSelectMenu(item)} style={{ width: width / 2 }}>
              <View
                style={
                  {
                    // marginRight: index === 0 ? 40 : 0,
                  }
                }
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 15,
                    borderBottomColor: couponSelectedTab.key === item.key ? Color.Black900 : undefined,
                    borderBottomWidth: bottomWidth,
                    // paddingHorizontal: 34,
                  }}
                >
                  <CustomText
                    style={{
                      color: textColor,
                      fontSize: 13,
                      fontWeight: 'bold',
                      letterSpacing: -0.2,
                    }}
                  >
                    {item.title} 0
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
export default CouponTabMenu;
