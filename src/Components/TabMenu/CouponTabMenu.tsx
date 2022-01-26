import React from 'react';
import { View, FlatList, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { INITIAL_STATE, MyState } from '@/Stores/My/InitialState';
import MyActions from '@/Stores/My/Actions';

const CouponTabMenu = (props: any) => {
  const { data } = props;

  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { couponSelectedTab = { title: '사용가능', key: 'usable' }, myCouponList = INITIAL_STATE.myCouponList } =
    useSelector((state: MyState) => state.my);

  const onSelectMenu = (item: any): void => {
    dispatch(MyActions.fetchMyReducer({ type: 'couponSelectedTab', data: item }));
    if (couponSelectedTab.key === 'usable') {
      dispatch(MyActions.fetchMyReducer({ type: 'usableCouponPage', data: 1 }));
    } else {
      dispatch(MyActions.fetchMyReducer({ type: 'expiredCouponPage', data: 1 }));
    }
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
        renderItem={({ item }) => {
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
                    {item.title}
                    {item?.key === 'usable' && myCouponList !== undefined
                      ? myCouponList?.metadata[0]?.usableCnt
                      : myCouponList?.metadata[0]?.expiredCnt}
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
