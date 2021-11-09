import { useState } from 'react';
import { useDispatch } from 'react-redux';

type ResultUseInputName = {
  userName: string;
  setUserName?: (userName: string) => void;
  onChangeName: (e: string) => void;
  onClearName: () => void;
  nameValidText: string;
  isNameValid: boolean;
};

function useInputName(): ResultUseInputName {
  const dispatch = useDispatch();
  // const { userName } = useSelector((state: AuthState) => state.auth);
  const [userName, setUserName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameValidText, setNameValidText] = useState('');

  // change
  const onChangeName = (value: string) => {
    if (value) {
      if (value.length < 6) {
        // dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
        setUserName(value);
        setNameValidText('');
        setIsNameValid(true);
      } else {
        // dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
        setUserName(value);
        setNameValidText('이름은 최대 5글자 입니다.');
        setIsNameValid(false);
      }
    } else {
      // dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
      setUserName(value);
      setNameValidText('');
      setIsNameValid(false);
    }
  };

  const onClearName = () => {
    // console.log('이름 초기화');
    // dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: '' }));
    setUserName('');
    setNameValidText('');
    setIsNameValid(false);
  };

  // const reset = useCallback(() => setEmail(initialForm), [initialForm]);
  return { userName, setUserName, onChangeName, nameValidText, isNameValid, onClearName };
}

export default useInputName;
