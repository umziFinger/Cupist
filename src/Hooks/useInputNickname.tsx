import { useState } from 'react';

type ResultUseInputNickname = {
  nickName: string;
  setNickName?: (nickName: string) => void;
  onChangeNickname: (e: string) => void;
  nicknameValidText: string;
  isNicknameValid: boolean;
  onClearNickName: () => void;
};

function useInputNickname(): ResultUseInputNickname {
  // const { nickName } = useSelector((state: AuthState) => state.auth);
  const [nickName, setNickName] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameValidText, setNicknameValidText] = useState('');

  // change
  const onChangeNickname = (value: string) => {
    if (value) {
      if (value.length < 8) {
        setNickName(value);
        setNicknameValidText('');
        setIsNicknameValid(true);
      } else {
        setNickName(value);
        setNicknameValidText('닉네임은 최대 7글자 입니다.');
        setIsNicknameValid(false);
      }
    } else {
      setNickName(value);
      setNicknameValidText('');
      setIsNicknameValid(false);
    }
  };

  const onClearNickName = () => {
    setNickName('');
    setNicknameValidText('');
    setIsNicknameValid(false);
  };

  // const reset = useCallback(() => setEmail(initialForm), [initialForm]);
  return { nickName, onChangeNickname, nicknameValidText, isNicknameValid, onClearNickName };
}

export default useInputNickname;
