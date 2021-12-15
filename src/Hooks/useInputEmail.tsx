import { useState } from 'react';

type ResultUseInputEmail = {
  email: string;
  onChangeEmail: (e: string) => void;
  emailValidText: string;
  isEmailValid: boolean;
};

function useInputEmail(): ResultUseInputEmail {
  const [email, setEmail] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailValidText, setEmailValidText] = useState('');

  const handlerEmailType = (value: string) => {
    const temp = value?.split('@');
    if (/naver$/.test(temp[1]) || temp[1]?.split('.')[0] === 'naver') {
      return 'naver';
    }
    if (/gmail$/.test(temp[1]) || temp[1]?.split('.')[0] === 'gmail') {
      return 'gmail';
    }
    return null;
  };
  // change
  const onChangeEmail = (value: string) => {
    if (value) {
      const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,3}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
      const naverEmailRegExp = /^[\w-]+(\.[\w-]+)*@naver.com$/;
      const gmailEmailRegExp = /^[\w-]+(\.[\w-]+)*@gmail.com$/;

      switch (handlerEmailType(value)) {
        case 'naver': {
          if (value.match(naverEmailRegExp)) {
            setEmail(value);
            setEmailValidText('');
            setIsEmailValid(true);
          } else {
            setEmail(value);
            setEmailValidText('네이버 이메일 형식이 올바르지 않습니다.');
            setIsEmailValid(false);
          }
          break;
        }

        case 'gmail': {
          if (value.match(gmailEmailRegExp)) {
            setEmail(value);
            setEmailValidText('');
            setIsEmailValid(true);
          } else {
            setEmail(value);
            setEmailValidText('Gmail 형식이 올바르지 않습니다.');
            setIsEmailValid(false);
          }
          break;
        }

        default: {
          if (value.match(emailRegExp)) {
            setEmail(value);
            setEmailValidText('');
            setIsEmailValid(true);
          } else {
            setEmail(value);
            setEmailValidText('이메일 형식이 올바르지 않습니다.');
            setIsEmailValid(false);
          }
          break;
        }
      }
    } else {
      setEmail('');
      setEmailValidText('');
      setIsEmailValid(false);
    }
  };

  // const reset = useCallback(() => setEmail(initialForm), [initialForm]);
  return { email, onChangeEmail, emailValidText, isEmailValid };
}

export default useInputEmail;
