import Exponent from 'exponent';
import { StackNavigator } from 'react-navigation';
import Home from './src/components/Home';
import {
  StatusBar,
} from 'react-native';

StatusBar.setBarStyle('dark-content');

const App = StackNavigator({
  Home: { screen: Home },
});

Exponent.registerRootComponent(App);
