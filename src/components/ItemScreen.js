import React, { Component } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import navHeader from '../utils/navHeader';
import { deleteItem } from '../services/ItemsService';

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
        onPress: () => {
          const { item } = this.props.navigation.state.params;
          deleteItem(item);
          this.props.navigation.goBack();
        },
      },
    ]);
  };
}

ItemScreen.propTypes = {};

const styles = StyleSheet.create({});

export default ItemScreen;
