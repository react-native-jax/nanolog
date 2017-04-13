import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import ItemScreen from './src/components/ItemScreen';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from './src/reducers';

const actualCompose = __DEV__ ? composeWithDevTools : compose;

const store = createStore(reducers, actualCompose(applyMiddleware(thunk)));

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
