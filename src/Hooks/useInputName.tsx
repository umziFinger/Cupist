import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';

type ResultUseInputName = {
  userName: string;
  onChangeName: (e: string) => void;
  nameValidText: string;
  isNameValid: boolean;
};

function useInputName(): ResultUseInputName {
  const dispatch = useDispatch();
  const { userName } = useSelector((state: AuthState) => state.auth);

  const [isNameValid, setIsNameValid] = useState(false);
  const [nameValidText, setNameValidText] = useState('');

  // change
  const onChangeName = (value: string) => {
    if (value) {
      if (value.length < 6) {
        dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
        setNameValidText('');
        setIsNameValid(true);
      } else {
        dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
        setNameValidText('이름은 최대 5글자 입니다.');
        setIsNameValid(false);
      }
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
      setNameValidText('');
      setIsNameValid(false);
    }
  };

  // const reset = useCallback(() => setEmail(initialForm), [initialForm]);
  return { userName, onChangeName, nameValidText, isNameValid };
}

export default useInputName;
