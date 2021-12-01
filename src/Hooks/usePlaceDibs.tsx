import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import AuthActions from '@/Stores/Auth/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import { navigate } from '@/Services/NavigationService';
import { placeDibsDataType } from '@/Sagas/CommonSaga';
import CommonActions from '@/Stores/Common/Actions';

type ReturnType = {
  handlerPlaceDibs: (place: any) => void;
};

function usePlaceDibs(): ReturnType {
  const dispatch = useDispatch();
  const { userIdx } = useSelector((state: AuthState) => state.auth);

  const handlerPlaceDibs = (place: any) => {
    console.log(place);
    if (!userIdx) {
      navigate('SimpleLoginScreen');
    } else if (place.isPlaceDibs) {
      onPlaceUnDibs(place.idx);
    } else {
      onPlaceDibs(place.idx);
    }
  };

  const onPlaceDibs = (placeIdx: number) => {
    const params: placeDibsDataType = {
      placeIdx,
      type: 'dibs',
    };
    dispatch(CommonActions.fetchCommonPlaceDibsHandler(params));
  };

  const onPlaceUnDibs = (placeIdx: number) => {
    const params: placeDibsDataType = {
      placeIdx,
      type: 'unDibs',
    };
    dispatch(CommonActions.fetchCommonPlaceDibsHandler(params));
  };

  return { handlerPlaceDibs };
}

export default usePlaceDibs;
