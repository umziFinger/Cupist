import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';

type ResultUseInputEmail = {
  email: string;
  onChangeEmail: (e: string) => void;
  emailValidText: string;
  isEmailValid: boolean;
};

function useInputEmail(): ResultUseInputEmail {
  const dispatch = useDispatch();
  const { email } = useSelector((state: AuthState) => state.auth);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailValidText, setEmailValidText] = useState('');

  // change
  const onChangeEmail = (value: string) => {
    if (value) {
      const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
      if (value.match(emailRegExp)) {
        dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: value } }));
        setEmailValidText('');
        setIsEmailValid(true);
      } else {
        dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: value } }));
        setEmailValidText('이메일 형식이 올바르지 않습니다.');
        setIsEmailValid(false);
      }
    } else {
      dispatch(AuthActions.fetchAuthReducer({ type: 'email', data: { email: null } }));
      setEmailValidText('');
      setIsEmailValid(false);
    }
  };

  // const reset = useCallback(() => setEmail(initialForm), [initialForm]);
  return { email, onChangeEmail, emailValidText, isEmailValid };
}

export default useInputEmail;
