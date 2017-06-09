import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import ItemScreen from './src/components/ItemScreen';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from './src/reducers';

const actualCompose = __DEV__ ? composeWithDevTools : compose;

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  {},
  actualCompose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

persistStore(store, { storage: AsyncStorage });

const App = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  ItemScreen: { screen: ItemScreen },
});

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithStore;
