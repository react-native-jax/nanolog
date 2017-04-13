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
import { connect } from 'react-redux';
import * as ItemsActions from '../reducers/items';
import { bindActionCreators } from 'redux';

class HomeScreen extends Component {
  static navigationOptions = {
    header: navHeader('your nanologs'),
  };

  componentWillMount() {
    this._loadItems();
  }

  async _loadItems() {
    this.props.actions.loadItems();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <BorderedList
          items={this.props.items}
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
    this.props.actions.createItem(text);
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
    this.props.navigation.navigate('ItemScreen', { item });
  };
}

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

const mapStateToProps = state => {
  return {
    items: state.items.all.map(i => i.name),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ItemsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
