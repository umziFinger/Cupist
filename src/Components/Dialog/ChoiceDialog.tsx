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
import MyActions from '@/Stores/My/Actions';
import { MyState } from '@/Stores/My/InitialState';

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
  const { versionInfo } = useSelector((state: CommonState) => state.common);
  const { reservationDetail } = useSelector((state: MyState) => state.my);
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

  const onConfirm = async () => {
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

      case 'cancelJoin': {
        dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
        // navigateReplace('SimpleLoginScreen');
        break;
      }
      case 'reservationCancel': {
        const params = {
          paymentIdx: reservationDetail?.idx,
        };
        dispatch(MyActions.fetchMyReservationCancelDetailInfo(params));
        // navigateReplace('SimpleLoginScreen');
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
          height: 131,
          backgroundColor: Color.White,
          borderTopEndRadius: 3,
          borderTopStartRadius: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {typeof text === 'function' ? (
            text()
          ) : (
            <CustomText
              style={{
                fontSize: 15,
                letterSpacing: -0.38,
                textAlign: 'center',
                color: Color.Black1000,
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
