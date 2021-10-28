import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Search/InitialState';
import { SearchTypes } from './Actions';

export const fetchSearchReducer = (state = INITIAL_STATE, actions: any) => {
  return produce(state, (draft) => {
    const { type, data } = actions.params;

    switch (type) {
      case 'init': {
        return INITIAL_STATE;
      }
      case 'areaList': {
        draft.areaList = data.area;
        break;
      }
      default:
        return data;
    }
    return draft;
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [SearchTypes.FETCH_SEARCH_REDUCER]: fetchSearchReducer,
});
