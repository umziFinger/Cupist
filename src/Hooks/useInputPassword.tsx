import { useState } from 'react';

type inputType = 'login' | 'join' | 'modify';
type ResultUseInputPassword = {
  password: string;
  onChangePassword: (e: string, type: inputType) => void;
  passwordValidText: string;
  isPasswordValid: boolean;
};

function useInputPassword(): ResultUseInputPassword {
  // const { password } = useSelector((state: AuthState) => state.auth);
  const [password, setPassword] = useState('');

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordValidText, setPasswordValidText] = useState('');

  const onChangePassword = (value: string, type: inputType) => {
    if (value) {
      setPassword(value);
      // dispatch(AuthActions.fetchAuthReducer({ type: 'password', data: { password: value } }));
      const regExp4 = /^[0-9]*$/gi;
      const regExp3 = /^[a-zA-Z]*$/gi;
      const regExp2 = /^[a-zA-Z0-9]*$/gi;
      const regExp1 = /^[a-zA-Z0-9?~!@#$]*$/;

      if (type === 'join' || type === 'modify') {
        if (value.match(regExp1)) {
          setIsPasswordValid(false);
          if (value.match(regExp2)) {
            setPasswordValidText('특수문자가 포함되어야 합니다.');
          }
          if (value.match(regExp3)) {
            setPasswordValidText('숫자가 포함되어야 합니다.');
          }
          if (value.match(regExp4)) {
            setPasswordValidText('영문이 포함되어야 합니다.');
          }
          if (!value.match(regExp2) && !value.match(regExp3) && !value.match(regExp4)) {
            if (value.length < 8) {
              setPasswordValidText('길이가 8~12자여야 합니다.');
            } else {
              setPasswordValidText('');
              setIsPasswordValid(true);
            }
          }
        } else {
          setPasswordValidText('특수문자는 ?, ~, !, @, #, $ 만 가능합니다.');
        }
      }
    } else {
      // dispatch(AuthActions.fetchAuthReducer({ type: 'password', data: { password: null } }));
      setPassword('');
      setPasswordValidText('');
      setIsPasswordValid(false);
    }
  };

  return { password, onChangePassword, passwordValidText, isPasswordValid };
}

export default useInputPassword;
