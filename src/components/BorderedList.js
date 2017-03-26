import React, { Component } from 'react';
import { View, PixelRatio, ListView, StyleSheet, Platform } from 'react-native';
import colors from '../utils/colors';
import { KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view';

class BorderedList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.items),
      });
    }
  }

  render() {
    return (
      <KeyboardAwareListView
        contentContainerStyle={styles.list}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        alwaysBounceVertical={false}
        renderRow={this._renderItem}
        renderFooter={this._renderFooter}
        renderSeparator={this._renderSeparator}
      />
    );
  }

  _renderFooter = () => {
    return (
      <View
        style={[
          styles.footerContainer,
          this.props.items.length == 0 && styles.firstItem,
        ]}
      >
        {this.props.renderFooter()}
      </View>
    );
  };

  _renderItem = (row, sectionId, rowId) => {
    return (
      <View style={[styles.itemContainer, rowId == 0 && styles.firstItem]}>
        {this.props.renderItem(row, rowId)}
      </View>
    );
  };

  _renderSeparator = (sectionID, rowID) => {
    return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
  };
}

BorderedList.defaultProps = {
  items: [],
  renderItem: () => {},
};

BorderedList.propTypes = {
  items: React.PropTypes.array,
  renderItem: React.PropTypes.func,
  renderFooter: React.PropTypes.func,
};

const borderWidth = 2 / PixelRatio.get();
const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderBottomWidth: 3 * borderWidth,
    borderColor: colors.borderColor,
    ...Platform.select({
      ios: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
    }),
  },
  itemContainer: {
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderColor: colors.borderColor,
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
  },
  firstItem: {
    borderColor: colors.borderColor,
    borderTopWidth: borderWidth,
    ...Platform.select({
      ios: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    }),
  },
  list: {
    padding: 10,
  },
  separator: {
    backgroundColor: colors.borderColor,
    height: borderWidth,
  },
});

export default BorderedList;
