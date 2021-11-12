import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import CommonActions from '@/Stores/Common/Actions';

type ResultUseInputAuth = {
  smsAuthNumber: string;
  setSmsAuthNumber: Dispatch<SetStateAction<string>>;
  onChangeAuthNumber: (e: string) => void;
  smsValueValid: boolean;
  smsValidText: string;
  timer: NodeJS.Timeout | null;
  smsAuthTime: number;
  setSmsAuthTime: Dispatch<SetStateAction<number>>;
};

function useInputAuthNumber(): ResultUseInputAuth {
  const dispatch = useDispatch();
  const { isReceived, smsValueValid, smsValidText } = useSelector((state: AuthState) => state.auth);
  const [smsAuthNumber, setSmsAuthNumber] = useState('');
  const [smsAuthTime, setSmsAuthTime] = useState(300);

  let timer: NodeJS.Timeout | null = null;
  useEffect(() => {
    if (isReceived) {
      timer = setTimeout(() => {
        if (smsAuthTime === 0) {
          setSmsAuthTime(0);
        } else {
          setSmsAuthTime(smsAuthTime - 1);
        }
      }, 1000);

      if (smsAuthTime === 0) {
        setSmsAuthNumber('');
        dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertToast',
            data: {
              alertToast: true,
              alertToastPosition: 'top',
              alertToastMessage: '유효시간이 초과되었습니다. 인증번호를 다시 요청해주세요.',
            },
          }),
        );
        dispatch(AuthActions.fetchAuthReducer({ type: 'log_cert', data: { log_cert: null } }));
      }
    }
  }, [smsAuthTime, isReceived]);

  const onChangeAuthNumber = (value: string) => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: false }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));
    if (value) {
      if (value.length === 6) {
        dispatch(AuthActions.fetchAuthReducer({ type: 'inputAuthNum', data: { inputAuthNum: value.toString() } }));
        dispatch(AuthActions.fetchAuthReducer({ type: 'smsValueValid', data: true }));
      } else {
        dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));
      }
      setSmsAuthNumber(value);
    } else if (smsAuthTime === 0) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '유효시간이 초과되었습니다. 인증번호를 다시 요청해주세요.',
          },
        }),
      );
    } else {
      setSmsAuthNumber('');
    }
  };

  return {
    smsAuthNumber,
    onChangeAuthNumber,
    smsValueValid,
    smsValidText,
    timer,
    setSmsAuthNumber,
    setSmsAuthTime,
    smsAuthTime,
  };
}

export default useInputAuthNumber;
