import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import { useDispatch } from 'react-redux';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import WithdrawList from '@/Containers/More/WithdrawScreen/WithdrawList';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import MyActions from '@/Stores/My/Actions';

const WithdrawScreen = () => {
  const dispatch = useDispatch();
  const [isAgree, setIsAgree] = useState(false);

  const onPressWithdrawal = () => {
    if (isValid()) {
      const withdrawType = '';
      const params = { withdrawType };
      dispatch(MyActions.fetchMyWithdraw(params));
    }
  };

  const isValid = () => {
    return isAgree;
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} />
      <FlatList
        data={[0]}
        renderItem={() => <WithdrawList isAgree={isAgree} setIsAgree={setIsAgree} />}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        windowSize={7}
      />
      <View
        style={{
          backgroundColor: Color.White,
          width: '100%',
          height: 'auto',
          paddingVertical: 30,
          paddingHorizontal: 24,
        }}
      >
        <CustomButton onPress={() => onPressWithdrawal()}>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: isValid() ? Color.Primary1000 : Color.Grayyellow200,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 15,
            }}
          >
            <CustomText
              style={{
                fontWeight: 'bold',
                letterSpacing: -0.25,
                textAlign: 'center',
                fontSize: 14,
                color: Color.White,
              }}
            >
              탈퇴하기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
};

export default WithdrawScreen;
