import { StackNavigator } from 'react-navigation';
import Home from './src/components/Home';
import NanologShow from './src/components/NanologShow';

const App = StackNavigator({
  Home: { screen: Home },
  NanologShow: { screen: NanologShow },
});

export default App;
