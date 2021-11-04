import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const ConfigureStore = (rootReducer: any, rootSaga: any) => {
  const middleware = [];
  const enhancers = [];
  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  if (__DEV__ && !process.env.JEST_WORKER_ID) {
    const createDebugger = require('redux-middleware-flipper').default;
    middleware.push(createDebugger({ resolveCyclic: true }, [], [], 500));
  }
  enhancers.push(applyMiddleware(...middleware));

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, compose(...enhancers));

  const persistor = persistStore(store);

  // Kick off the root saga
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
export default ConfigureStore;
