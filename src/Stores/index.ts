import { combineReducers } from 'redux';
import rootSaga from '@/Sagas';
import { reducer as CommonReducer } from '@/Stores/Common/Reducers';
import { reducer as HomeReducer } from '@/Stores/Home/Reducers';
import ConfigureStore from '@/Stores/CreateStore';

export default () => {
  const rootReducer = combineReducers({
    common: CommonReducer,
    home: HomeReducer,
  });
  return ConfigureStore(rootReducer, rootSaga);
};
