import React, { Component } from 'react';
import {
  View,
  PixelRatio,
  ListView,
  StyleSheet,
} from 'react-native';
import colors from '../utils/colors';

class BorderedList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
      });
    }
  }

  render() {
    return <View style={styles.bottomBorder}>
      <ListView style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderItem}
        renderFooter={this.props.renderFooter}
        renderSeparator={this._renderSeparator}
      />
    </View>
  }

  _renderItem = (row, sectionId, rowId) => {
    return this.props.renderItem(row, rowId);
  }

  _renderSeparator = (sectionID, rowID) => {
    return <View
      key={`${sectionID}-${rowID}`}
      style={styles.separator} />
  }
}

BorderedList.defaultProps = {
  items: [],
  renderItem: () => {},
}

BorderedList.propTypes = {
  items: React.PropTypes.array,
  renderItem: React.PropTypes.func,
  renderFooter: React.PropTypes.func,
  renderSeparator: React.PropTypes.func,
};

const borderWidth = 2 / PixelRatio.get();
const styles = StyleSheet.create({
  bottomBorder: {
    backgroundColor: colors.borderColor,
    borderBottomWidth: 3 * borderWidth,
    borderRadius: 10,
    borderColor: colors.borderColor,
    overflow: 'hidden',
    margin: 10,
  },
  list: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    minHeight: 40,
  },
  separator: {
    backgroundColor: colors.borderColor,
    height: borderWidth,
  }
});

export default BorderedList;
