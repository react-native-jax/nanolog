import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import colors from '../utils/colors';
import navHeader from '../utils/navHeader';
import BorderedList from './BorderedList';
import { graphql, gql, compose } from 'react-apollo';

class HomeScreen extends Component {
  static navigationOptions = {
    header: navHeader('your nanologs'),
  };

  render() {
    const { loading, items } = this.props.data;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {loading
          ? <ActivityIndicator />
          : <BorderedList
              items={items}
              renderFooter={this._renderFooter}
              renderItem={this._renderItem}
            />}
      </View>
    );
  }

  _renderFooter = () => {
    return (
      <TextInput
        ref={textInput => (this._textInput = textInput)}
        style={styles.input}
        onSubmitEditing={this._onSubmit}
        underlineColorAndroid="transparent"
        placeholder="add a nanolog ..."
      />
    );
  };

  _onSubmit = async event => {
    const { text } = event.nativeEvent;
    this.props.createItem(text);
    this._textInput.clear();
  };

  _renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => this._onItemPress(item)}
        style={styles.itemContainer}
      >
        <Text numberOfLines={1} style={styles.item}>{item.name}</Text>
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

const ItemsQuery = gql`
  query {
    items: allItems {
      id
      name
    }
  }
`;

const CreateItemMutation = gql`
  mutation createItem($name: String!) {
    createItem(name: $name) {
      id
      name
    }
  }
`;

export default compose(
  graphql(ItemsQuery),
  graphql(CreateItemMutation, {
    props: ({ mutate }) => ({
      createItem: name =>
        mutate({
          variables: { name },
          optimisticResponse: {
            __typename: 'Mutation',
            createItem: {
              __typename: 'Item',
              id: Math.random(),
              name,
            },
          },
          update: (store, { data: { createItem } }) => {
            const data = store.readQuery({ query: ItemsQuery });
            data.items.push(createItem);
            store.writeQuery({ query: ItemsQuery, data });
          },
        }),
    }),
  })
)(HomeScreen);
