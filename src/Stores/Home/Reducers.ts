import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Home/InitialState';
import { HomeTypes } from '@/Stores/Home/Actions';

export const fetchHomeReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft) => {
    switch (type) {
      case 'loginCheckYN': {
        draft.loginCheckYN = data.loginCheckYN;
        break;
      }

      case 'homeList': {
        draft.homeList = data;
        draft.isHomeLoaded = true;
        break;
      }

      case 'isHomeLoaded': {
        draft.isHomeLoaded = data;
        break;
      }

      default:
        return draft;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [HomeTypes.FETCH_HOME_REDUCER]: fetchHomeReducer,
});
