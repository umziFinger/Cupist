import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import PaymentActions from '@/Stores/Payment/Actions';
import { PaymentState } from '@/Stores/Payment/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import { RepairState } from '@/Stores/Repair/InitialState';

const { width } = Dimensions.get('window');

const ShippingInformationTabMenu = (props: any) => {
  const { data } = props;

  const dispatch = useDispatch();
  const { shippingSelectMenu: selectMenu } = useSelector((state: PaymentState) => state.payment);
  const { paymentInfo } = useSelector((state: RepairState) => state.repair);

  const paymentUser = paymentInfo?.user;

  const onSelectMenu = (item: any): void => {
    if (isValidCheck()) {
      dispatch(PaymentActions.fetchPaymentReducer({ type: 'selectMenu', data: item.selectKey }));
      if (item.selectKey === 'new') {
        dispatch(CommonActions.fetchCommonReducer({ type: 'addressRbsType', data: 'new' }));
      } else {
        dispatch(CommonActions.fetchCommonReducer({ type: 'addressRbsType', data: '' }));
      }
    }
  };

  const isValidCheck = () => {
    if (!paymentUser?.address || !paymentUser?.address_detail || !paymentUser?.address_post) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '기본 배송지가 등록이 안됐습니다. 신규 배송지를 입력해주세요',
          },
        }),
      );
      return false;
    }
    return true;
  };

  return (
    <View
      style={{
        backgroundColor: Color.White,
        // width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: Color.grayBg,
        borderBottomWidth: 1,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => {
          let textColor = Color.grayDefault;
          let bottomWidth = 0;
          if (selectMenu === item.selectKey) {
            textColor = Color.Primary1000;
            bottomWidth = 3;
          }
          return (
            <View
              style={{
                paddingTop: 17.5,
                paddingBottom: 11,
                // paddingHorizontal: 60.5,
                borderBottomWidth: bottomWidth,
                borderBottomColor: textColor,
                width: width / 2 - 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CustomButton onPress={() => onSelectMenu(item)} hitSlop={20}>
                <CustomText
                  style={{
                    textAlign: 'center',
                    color: textColor,
                    fontSize: 15,
                    letterSpacing: -0.25,
                    fontWeight: selectMenu === item.selectKey ? 'bold' : 'normal',
                  }}
                >
                  {item.title}
                </CustomText>
              </CustomButton>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={7}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ justifyContent: 'space-between', flex: 1 }}
      />
    </View>
  );
};

export default ShippingInformationTabMenu;
