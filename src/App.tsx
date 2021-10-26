import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import RootScreen from '@/Containers/Root/RootScreen';
import createStore from '@/Stores';

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://b04adecbd86b437099886e3257826ec1@o770564.ingest.sentry.io/6033370',
  });
}

const { store, persistor } = createStore();

const App = () => {
  AsyncStorage.setItem('codePushStatus', 'sync').then(() => console.log('codePushStatus sync init '));
  AsyncStorage.setItem('splashStatus', 'start').then(() => console.log('splashStatus start init '));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <RootScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
