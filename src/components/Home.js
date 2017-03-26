import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import colors from '../utils/colors';
import navHeader from '../utils/navHeader';
import BorderedList from './BorderedList';
import { createLog, getLogList } from '../utils/logHelper';

class Home extends Component {
  static navigationOptions = {
    header: navHeader('your nanologs'),
  };

  state = {
    items: [],
  };

  componentWillMount() {
    this._loadData();
  }

  async _loadData() {
    const items = await getLogList();
    this.setState({ items: items.map(i => i.name) });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <BorderedList
          items={this.state.items}
          renderFooter={this._renderFooter}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

  _renderFooter = () => {
    return (
      <TextInput
        ref={textInput => this._textInput = textInput}
        style={styles.input}
        onSubmitEditing={this._onSubmit}
        underlineColorAndroid="transparent"
        placeholder="add a nanolog ..."
      />
    );
  };

  _onSubmit = async event => {
    const { text } = event.nativeEvent;
    await createLog(text);
    this.setState({
      items: [...this.state.items, text],
    });
    this._textInput.clear();
  };

  _renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => this._onItemPress(item)}
        style={styles.itemContainer}
      >
        <Text numberOfLines={1} style={styles.item}>{item}</Text>
      </TouchableOpacity>
    );
  };

  _onItemPress = item => {
    this.props.navigation.navigate('NanologShow', { item });
  };
}

Home.propTypes = {
  navigation: React.PropTypes.object,
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
  },
});

export default Home;
