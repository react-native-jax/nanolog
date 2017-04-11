import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import ItemScreen from './src/components/ItemScreen';

const App = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  ItemScreen: { screen: ItemScreen },
});

export default App;
