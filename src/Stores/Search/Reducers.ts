import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from '@/Stores/Search/InitialState';
import { SearchTypes } from './Actions';

export const fetchSearchReducer = (state = INITIAL_STATE, actions: any) => {
  let result = { ...state };
  const { type, data } = actions.params;

  switch (type) {
    case 'init': {
      result = INITIAL_STATE;
      break;
    }
    case 'searchQuery': {
      result = {
        ...state,
        searchQuery: data,
      };
      break;
    }
    case 'searchQueryInit': {
      result = {
        ...state,
        selectMenu: 'all',
        searchQuery: '',
        all: {
          place: [],
          artist: [],
          drama: [],
        },
        artistList: [],
        artistPage: 1,
        dramaList: [],
        dramaPage: 1,
        placeList: [],
        placePage: 1,
        artistCnt: null,
        dramaCnt: null,
        placeCnt: null,
      };
      break;
    }
    case 'selectMenu': {
      result = {
        ...state,
        selectMenu: data,
        artistPage: 1,
        dramaPage: 1,
        placePage: 1,
      };
      break;
    }
    case 'deleteAllRecentSearch': {
      result = {
        ...state,
        recentSearch: [],
      };
      break;
    }
    case 'recentSearch': {
      result = {
        ...state,
        recentSearch: data.search,
      };
      break;
    }

    case 'deleteRecentSearch': {
      result = {
        ...state,
        recentSearch: [...state.recentSearch.filter((v: any) => v.idx !== data)],
      };
      break;
    }

    case 'artist': {
      result = {
        ...state,
        artistList:
          actions.params.page === 1 ? data.artist : state.artistList.concat(data.artist !== '' ? data.artist : []),
        artistCnt: data.artistCnt,
      };
      break;
    }

    case 'artistPage': {
      result = {
        ...state,
        artistPage: data,
      };
      break;
    }

    case 'drama': {
      result = {
        ...state,
        dramaList: actions.params.page === 1 ? data.drama : state.dramaList.concat(data.drama),
        // dramaList: data.drama,
        dramaCnt: data.dramaCnt,
      };
      break;
    }

    case 'dramaPage': {
      result = {
        ...state,
        dramaPage: data,
      };
      break;
    }
    case 'place': {
      result = {
        ...state,
        placeList: actions.params.page === 1 ? data.place : state.placeList.concat(data.place),

        // placeList: data.place,
        placeCnt: data.placeCnt,
      };
      break;
    }
    case 'placePage': {
      result = {
        ...state,

        placePage: data,
      };
      break;
    }
    case 'all': {
      result = {
        ...state,
        all: data,
      };
      break;
    }

    case 'placeLike': {
      const copyPlace: any = state.placeList;
      const copyAllPlace: any = state.all.place;
      const FIND_PLACE_INDEX = copyPlace.findIndex((v: any) => v.idx === data.placeIdx);
      const FIND_ALL_PLACE_INDEX = copyAllPlace.findIndex((v: any) => v.idx === data.placeIdx);
      if (FIND_PLACE_INDEX !== -1) {
        copyPlace[FIND_PLACE_INDEX].likeCnt += 1;
        copyPlace[FIND_PLACE_INDEX].myLike = true;
      }
      if (FIND_ALL_PLACE_INDEX !== -1) {
        copyAllPlace[FIND_ALL_PLACE_INDEX].likeCnt += 1;
        copyAllPlace[FIND_ALL_PLACE_INDEX].myLike = true;
      }

      result = {
        ...state,
        placeList: copyPlace,
        all: {
          ...state.all,
          place: copyAllPlace,
        },
      };
      break;
    }
    case 'placeUnLike': {
      const copyPlace: any = state.placeList;
      const copyAllPlace: any = state.all.place;
      const FIND_PLACE_INDEX = copyPlace.findIndex((v: any) => v.idx === data.placeIdx);
      const FIND_ALL_PLACE_INDEX = copyAllPlace.findIndex((v: any) => v.idx === data.placeIdx);

      if (FIND_PLACE_INDEX !== -1) {
        copyPlace[FIND_PLACE_INDEX].likeCnt += 1;
        copyPlace[FIND_PLACE_INDEX].myLike = false;
      }

      if (FIND_ALL_PLACE_INDEX !== -1) {
        copyAllPlace[FIND_ALL_PLACE_INDEX].likeCnt -= 1;
        copyAllPlace[FIND_ALL_PLACE_INDEX].myLike = false;
      }

      result = {
        ...state,
        placeList: copyPlace,
        all: {
          ...state.all,
          place: copyAllPlace,
        },
      };
      break;
    }

    default:
      return result;
  }

  return result;
};
export const reducer = createReducer(INITIAL_STATE, {
  [SearchTypes.FETCH_SEARCH_REDUCER]: fetchSearchReducer,
});
