import Exponent from 'exponent';
import { StackNavigator } from 'react-navigation';
import Home from './src/components/Home';
import {
} from 'react-native';


const App = StackNavigator({
  Home: { screen: Home },
});

Exponent.registerRootComponent(App);
