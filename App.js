import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import ItemScreen from './src/components/ItemScreen';
import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http//localhost:3000/graphql',
});
const client = new ApolloClient({
  networkInterface,
});

import reducers from './src/reducers';

const actualCompose = __DEV__ ? composeWithDevTools : compose;

const store = createStore(
  combineReducers({
    ...reducers,
    apollo: client.reducer(),
  }),
  {},
  actualCompose(
    applyMiddleware(client.middleware()),
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
    <ApolloProvider store={store} client={client}>
      <App />
    </ApolloProvider>
  );
};

export default AppWithStore;
