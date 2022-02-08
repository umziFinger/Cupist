import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { AuthState } from '@/Stores/Auth/InitialState';
import { navigationRef } from '@/Services/NavigationService';

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
  const { tempUserName, socialType } = useSelector((state: AuthState) => state.auth);
  const [userName, setUserName] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameValidText, setNameValidText] = useState('');

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;

      if (currentRouteName) {
        if (currentRouteName === 'SocialJoinScreen' && socialType === 'apple') {
          AsyncStorage.getItem('appleUserName').then((value: any) => {
            setUserName(value);
          });
        }
      }
    }
  }, []);

  // change
  const onChangeName = (value: string) => {
    if (value) {
      if (value.length < 8) {
        // dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
        setUserName(value);
        setNameValidText('');
        setIsNameValid(true);
      } else {
        // dispatch(AuthActions.fetchAuthReducer({ type: 'userName', data: value }));
        setUserName(value);
        setNameValidText('이름은 최대 7글자 입니다.');
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
