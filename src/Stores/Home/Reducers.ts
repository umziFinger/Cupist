import { createReducer } from 'reduxsauce';
import produce from 'immer';
import { INITIAL_STATE } from '@/Stores/Home/InitialState';
import { HomeTypes } from '@/Stores/Home/Actions';

export const fetchHomeReducer = (state = INITIAL_STATE, actions: any) => {
  const { type, data } = actions.params;
  return produce(state, (draft) => {
    switch (type) {
      case 'introductionList': {
        draft.introductionList = data;
        break;
      }
      case 'introductionAdditionalPage': {
        draft.introductionAdditionalPage = data;
        break;
      }
      case 'introductionCustomList': {
        draft.introductionCustomList = data;
        break;
      }

      case 'introductionAdditionalList': {
        if (data?.page === 2) {
          draft.introductionAdditionalList = data.data;
          break;
        } else {
          draft.introductionAdditionalList =
            data?.data?.length > 0
              ? draft.introductionAdditionalList.concat(data.data)
              : draft.introductionAdditionalList;
        }
        break;
      }
      case 'deleteIntroductionList': {
        const temp = draft.introductionList;
        temp.splice(data, 1);
        draft.introductionList = temp;
        break;
      }
      case 'deleteIntroductionAdditionalList': {
        const temp = draft.introductionAdditionalList;
        temp.splice(data, 1);
        draft.introductionAdditionalList = temp;
        break;
      }
      case 'deleteIntroductionCustomList': {
        const temp = draft.introductionCustomList;
        temp.splice(data, 1);
        draft.introductionCustomList = temp;
        break;
      }

      case 'profile': {
        draft.profile = data;
        break;
      }
      case 'meta': {
        draft.meta = data;
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
