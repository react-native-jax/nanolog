import React, { Component } from 'react';
import { View, Alert, Button } from 'react-native';
import navHeader from '../utils/navHeader';
import { graphql, compose, gql } from 'react-apollo';
import { ItemsQuery } from './HomeScreen';

class ItemScreen extends Component {
  static navigationOptions = {
    header: ({ state }) => navHeader(state.params.item.name),
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
    this.props.deleteItem(item.id);
    this.props.navigation.goBack();
  };
}

const DeleteItemMutation = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(DeleteItemMutation, {
    props: ({ mutate }) => ({
      deleteItem: id =>
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteItem: {
              __typename: 'Item',
              id,
            },
          },
          update: store => {
            const data = store.readQuery({ query: ItemsQuery });
            const index = data.items.findIndex(item => item.id === id);
            if (index > -1) {
              data.items.splice(index, 1);
            }
            store.writeQuery({ query: ItemsQuery, data });
          },
        }),
    }),
  })
)(ItemScreen);
