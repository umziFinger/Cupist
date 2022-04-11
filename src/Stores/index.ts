import { combineReducers } from 'redux';
import rootSaga from '@/Sagas';
import { reducer as CommonReducer } from '@/Stores/Common/Reducers';
import { reducer as AuthReducer } from '@/Stores/Auth/Reducers';
import { reducer as HomeReducer } from '@/Stores/Home/Reducers';
import { reducer as SearchReducer } from '@/Stores/Search/Reducers';
import { reducer as NotificationReducer } from '@/Stores/Notification/Reducers';
import { reducer as MyReducer } from '@/Stores/My/Reducers';
import { reducer as PlaceReducer } from '@/Stores/Place/Reducers';
import { reducer as ReservationReducer } from '@/Stores/Reservation/Reducers';
import { reducer as AlbamonReducer } from '@/Stores/Albamon/Reducers';

import ConfigureStore from '@/Stores/CreateStore';

export default () => {
  const rootReducer = combineReducers({
    common: CommonReducer,
    auth: AuthReducer,
    home: HomeReducer,
    notification: NotificationReducer,
    my: MyReducer,
    place: PlaceReducer,
    search: SearchReducer,
    reservation: ReservationReducer,
    albamon: AlbamonReducer,
  });
  return ConfigureStore(rootReducer, rootSaga);
};
