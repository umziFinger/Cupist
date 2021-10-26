import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonActions from '@/Stores/Common/Actions';
import AuthActions from '@/Stores/Auth/Actions';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import { onAppUpdate } from '@/Components/Function';

interface ChoiceDialogProps {
  item: {
    type?: string;
    dataType?: string;
    title?: string;
    text?: string;
  };
}

const ChoiceDialog = (props: ChoiceDialogProps) => {
  const { item } = props;
  const { dataType, text } = item;
  const dispatch = useDispatch();
  const { alertDialogParams, versionInfo } = useSelector((state: CommonState) => state.common);

  const onCancel = () => {
    switch (dataType) {
      case 'closeRBS': {
        dispatch(CommonActions.fetchCommonReducer({ type: 'openCurrentRBS' }));
        // dispatch(AuthActions.fetchAuthReducer({ type: 'smsInfoInit' }));
        break;
      }
      case 'nickNameRBS': {
        dispatch(CommonActions.fetchCommonReducer({ type: 'openCurrentRBS' }));
        break;
      }
      default:
        dispatch(CommonActions.fetchCommonReducer({ type: 'alertDialogInit' }));
        break;
    }
    dispatch(CommonActions.fetchCommonReducer({ type: 'alertDialogInit' }));
    return null;
  };

  const onConfirm = () => {
    switch (dataType) {
      case 'startTask': {
        break;
      }
      case 'closeRBS': {
        dispatch(CommonActions.fetchCommonReducer({ type: 'closeAllRBS' }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'currentRBS', data: null }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
        break;
      }
      case 'nickNameRBS': {
        dispatch(CommonActions.fetchCommonReducer({ type: 'closeAllRBS' }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'currentRBS', data: null }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
        dispatch(AuthActions.fetchAutoNickName());
        break;
      }

      case 'goToStore': {
        onAppUpdate(versionInfo.currentVersion);
        break;
      }

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
          width: '100%',
          height: '24%',
          backgroundColor: Color.White,
          borderRadius: 10,
          padding: 30,
          // paddingLeft: 30,
          // paddingRight: 16,
          // paddingBottom: 16,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ marginBottom: 24, marginTop: 16 }}>
          <CustomText
            style={{
              fontSize: 15,
              color: Color.Black1000,
              letterSpacing: -0.2,
            }}
          >
            {text}
          </CustomText>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <CustomButton onPress={onCancel} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}>
            <View
              style={{
                // paddingVertical: 14,
                // paddingHorizontal: 14,
                marginRight: 28,
              }}
            >
              <CustomText style={{ color: Color.gray900, fontSize: 15, fontWeight: 'bold' }}>취소</CustomText>
            </View>
          </CustomButton>
          <CustomButton onPress={onConfirm} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}>
            <View
              style={
                {
                  // paddingVertical: 14,
                  // paddingHorizontal: 14,
                }
              }
            >
              <CustomText style={{ color: Color.Primary1000, fontSize: 15, fontWeight: 'bold' }}>확인</CustomText>
            </View>
          </CustomButton>
        </View>
      </View>
    </View>
    // <View
    //   style={{
    //     position: 'absolute',
    //     width: '100%',
    //     height: '100%',
    //     paddingHorizontal: 30,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     zIndex: 99,
    //     backgroundColor: 'rgba(15, 15, 22, 0.69)',
    //   }}
    // >
    //   <View
    //     style={{
    //       width: '100%',
    //       backgroundColor: '#fff',
    //       paddingTop: 56,
    //       paddingBottom: 30,
    //       paddingHorizontal: 20,
    //       alignItems: 'center',
    //     }}
    //   >
    //     <View
    //       style={{
    //         marginTop: 14,
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}
    //     >
    //       <CustomText
    //         style={{
    //           fontSize: 16,
    //           color: '#0f0f16',
    //           letterSpacing: -0.4,
    //           textAlign: 'center',
    //         }}
    //
    //       >
    //         {text}
    //       </CustomText>
    //     </View>
    //     <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center' }}>
    //       <CustomButton
    //         onPress={() => onCancel()}
    //         style={{
    //           height: 53,
    //           paddingHorizontal: 45,
    //           backgroundColor: Color.iconOff,
    //           borderRadius: 5,
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //         }}
    //       >
    //         <CustomText style={{ fontSize: 16, color: Color.White, fontWeight: 'bold' }}>취소</CustomText>
    //       </CustomButton>
    //
    //       <CustomButton
    //         onPress={() => onConfirm()}
    //         style={{
    //           marginLeft: 15,
    //           height: 53,
    //           paddingHorizontal: 45,
    //           backgroundColor: Color.Primary1000,
    //           borderRadius: 5,
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //         }}
    //       >
    //         <CustomText style={{ fontSize: 16, color: Color.White, fontWeight: 'bold' }}>확인</CustomText>
    //       </CustomButton>
    //     </View>
    //   </View>
    // </View>
  );
};

export default ChoiceDialog;
