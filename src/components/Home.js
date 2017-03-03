import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
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

  state = {
    items: ['Books I read', 'Cups of water']
  }

  render() {
    return <View style={styles.container}>
      <BorderedList
        items={this.state.items}
        renderFooter={this._renderFooter}
        renderItem={this._renderItem}
      />
    </View>
  }

  _renderFooter = () => {
    return <TextInput
      ref={textInput => this._textInput = textInput}
      style={styles.input}
      onEndEditing={this._onEndEditing}
      placeholder="add a nanolog ..." />
  }

  _onEndEditing = (event) => {
    const { text } = event.nativeEvent;
    this.setState({
      items: [...this.state.items, text]
    });
    this._textInput.clear();
  }

  _renderItem = (item) => {
    return <View style={styles.itemContainer}>
      <Text style={styles.item}>{item}</Text>
    </View>
  }
}

Home.propTypes = {
};

const rowHeight = 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBg,
  },
  input: {
    padding: 10,
    height: rowHeight,
  },
  itemContainer: {
    height: rowHeight,
    justifyContent: 'center',
  },
  item: {
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
  }
});

export default Home;
