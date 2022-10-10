import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import CommonActions from '@/Stores/Common/Actions';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

interface ChoiceDialogProps {
  item: {
    type?: string;
    dataType?: string;
    title?: string;
    text?: string | any;
  };
}

const ChoiceDialog = (props: ChoiceDialogProps) => {
  const { item } = props;
  const { dataType, text } = item;

  const dispatch = useDispatch();

  const onCancel = () => {
    switch (dataType) {
      default:
        dispatch(CommonActions.fetchCommonReducer({ type: 'alertDialogInit' }));
        break;
    }
    dispatch(CommonActions.fetchCommonReducer({ type: 'alertDialogInit' }));
    return null;
  };

  const onConfirm = async () => {
    switch (dataType) {
      default:
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertDialogInit',
          }),
        );
    }
    dispatch(CommonActions.fetchCommonReducer({ type: 'alertDialogInit' }));
  };

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 40,
        zIndex: 99,
        backgroundColor: 'rgba(0,0,0, 0.5)',
      }}
    >
      <View
        style={{
          minHeight: 131,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: Color.White,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 40,
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {typeof text === 'function' ? (
            text()
          ) : (
            <CustomText
              style={{
                fontSize: 13,
                letterSpacing: -0.2,
                textAlign: 'center',
                color: Color.Gray800,
              }}
            >
              {text}
            </CustomText>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomButton onPress={onCancel} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }} style={{ flex: 1 }}>
          <View
            style={{
              paddingVertical: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.Primary1000,
              borderBottomStartRadius: 3,
            }}
          >
            <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25, color: Color.White }}>
              취소
            </CustomText>
          </View>
        </CustomButton>
        <CustomButton
          onPress={() => onConfirm()}
          hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              paddingVertical: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.Gray400,
              borderBottomEndRadius: 3,
            }}
          >
            <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25, color: Color.White }}>
              확인
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
};

export default ChoiceDialog;
