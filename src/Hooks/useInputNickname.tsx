import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';

type ResultUseInputNickname = {
  nickName: string;
  onChangeNickname: (e: string) => void;
  nicknameValidText: string;
  isNicknameValid: boolean;
};

function useInputNickname(): ResultUseInputNickname {
  const dispatch = useDispatch();
  const { nickName } = useSelector((state: AuthState) => state.auth);

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameValidText, setNicknameValidText] = useState('');

  // change
  const onChangeNickname = (value: string) => {
    if (value) {
      if (value.length < 8) {
        dispatch(AuthActions.fetchAuthReducer({ type: 'nickName', data: value }));
        setNicknameValidText('');
        setIsNicknameValid(true);
      } else {
        dispatch(AuthActions.fetchAuthReducer({ type: 'nickName', data: value }));
        setNicknameValidText('닉네임은 최대 7글자 입니다.');
        setIsNicknameValid(false);
      }
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'nickName', data: value }));
      setNicknameValidText('');
      setIsNicknameValid(false);
    }
  };

  // const reset = useCallback(() => setEmail(initialForm), [initialForm]);
  return { nickName, onChangeNickname, nicknameValidText, isNicknameValid };
}

export default useInputNickname;
