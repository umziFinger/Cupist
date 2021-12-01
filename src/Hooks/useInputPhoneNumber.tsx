import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import AuthActions from '@/Stores/Auth/Actions';

type ResultUseInputPhone = {
  phoneNumber: string;
  onChangePhoneNumber: (e: string) => void;
  isPhoneValid: boolean;
};

function useInputPhoneNumber(): ResultUseInputPhone {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  // const { phoneNumber } = useSelector((state: AuthState) => state.auth);

  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const debounceFunc = useRef(
    _.debounce((value: any) => {
      const phoneNumberRemoveDash = value.replace(/-/gi, '');

      if (phoneNumberRemoveDash && phoneNumberRemoveDash.length > 10) {
        const fullPhoneNumber = phoneNumberRemoveDash.substr(0, 11);
        const regExResult = renderMobileRegEx(fullPhoneNumber);
        setPhoneNumber(regExResult);
        // dispatch(AuthActions.fetchAuthReducer({ type: 'phoneNumber', data: { phoneNumber: regExResult } }));
        setIsPhoneValid(true);
      }
    }, 200),
  );

  const renderMobileRegEx = (value: string) => {
    return value
      .replace(/[^0-9]/g, '')
      .replace(
        /(^0[0-9]{2}|^1[0-9]{2}|^2[0-9]{2}|^3[0-9]{2}|^4[0-9]{2}|^5[0-9]{2}|^6[0-9]{2}|^7[0-9]{2}|^8[0-9]{2}|^9[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3',
      )
      .replace('--', '-');
  };

  const onChangePhoneNumber = (value: string | '') => {
    dispatch(AuthActions.fetchAuthReducer({ type: 'isReceived', data: false }));
    dispatch(AuthActions.fetchAuthReducer({ type: 'smsValidText', data: { smsValidText: null } }));
    if (value) {
      debounceFunc.current(value);
      setPhoneNumber(value);
      setIsPhoneValid(false);
    } else {
      setPhoneNumber('');
    }
  };

  return { phoneNumber, onChangePhoneNumber, isPhoneValid };
}

export default useInputPhoneNumber;
