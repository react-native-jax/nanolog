import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import navHeader from '../utils/navHeader';

class NanologShow extends Component {
  static navigationOptions = {
    header: ({ state }) => navHeader(state.params.item),
  };

  render() {
    return <View />;
  }
}

NanologShow.propTypes = {};

const styles = StyleSheet.create({});

export default NanologShow;
