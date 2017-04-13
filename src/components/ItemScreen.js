import React, { Component } from 'react';
import { View, Alert, Button } from 'react-native';
import navHeader from '../utils/navHeader';
import { connect } from 'react-redux';
import * as ItemsActions from '../reducers/items';
import { bindActionCreators } from 'redux';

class ItemScreen extends Component {
  static navigationOptions = {
    header: ({ state }) => navHeader(state.params.item),
  };

  render() {
    return (
      <View>
        <Button onPress={this._delete} title="Delete" />
      </View>
    );
  }

  _delete = () => {
    Alert.alert('Confirmation', `Are you sure you want to delete this item?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: this._onConfirmation,
      },
    ]);
  };

  _onConfirmation = () => {
    const { item } = this.props.navigation.state.params;
    this.props.actions.deleteItem(item);
    this.props.navigation.goBack();
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(ItemsActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(ItemScreen);
