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
      case 'residentInit': {
        draft.searchQuery = INITIAL_STATE.searchQuery;
        draft.bowlingList = INITIAL_STATE.bowlingList;
        draft.bowlingListPage = INITIAL_STATE.bowlingListPage;
        break;
      }

      case 'locationInit': {
        draft.searchQuery = INITIAL_STATE.searchQuery;
        draft.searchedAreaList = INITIAL_STATE.searchedAreaList;
        break;
      }
      case 'searchQueryInit': {
        draft.searchQuery = INITIAL_STATE.searchQuery;
        draft.bowlingList = INITIAL_STATE.bowlingList;
        draft.bowlingListPage = INITIAL_STATE.bowlingListPage;
        break;
      }

      case 'bowlingList': {
        try {
          if (actions.params.page === 1) {
            draft.bowlingList = data;
          } else {
            draft.bowlingList.place =
              data.place?.length > 0 ? draft.bowlingList.place.concat(data.place) : draft.bowlingList.place;
          }
        } catch (e) {
          console.log('bowlingList Error: ', e);
        }

        break;
      }
      case 'bowlingListPage': {
        draft.bowlingListPage = data;
        break;
      }

      case 'searchQuery': {
        draft.searchQuery = data;
        break;
      }

      case 'areaList': {
        draft.areaList = data;
        break;
      }

      case 'searchedAreaList': {
        draft.searchedAreaList = data;
        break;
      }

      case 'recentSearch': {
        draft.recentSearch = data;
        break;
      }
      case 'recentSearchDelete': {
        draft.recentSearch = state.recentSearch.filter((v: any) => v.idx !== data);
        break;
      }

      case 'recentSearchAddQuery': {
        draft.recentSearch = state.recentSearch.filter((v: any) => v.idx !== data);
        break;
      }
      case 'popularList': {
        draft.popularList = data;
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
