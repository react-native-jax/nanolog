import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import colors from '../utils/colors';
import BorderedList from './BorderedList';

const navTitle = (title) => <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <Image style={{width: 30, height: 30, resizeMode: 'contain'}} source={require('../assets/logo.png')} />
  <Text style={{fontWeight: '600', color: 'white', fontSize: 16}}>{title}</Text>
</View>

class Home extends Component {
  static navigationOptions = {
    header: {
      title: navTitle('your nanologs'),
      style: {
        backgroundColor: colors.navBarBg
      },
    },
  };

  render() {
    return <View style={styles.container}>
      <BorderedList />
    </View>
  }
}

Home.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBg,
  }
});

export default Home;
