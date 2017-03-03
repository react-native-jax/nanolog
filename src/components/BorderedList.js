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

  render() {
    return <View style={styles.bottomBorder}>
      <ListView style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this._renderItem}
        renderFooter={this.props.renderFooter}
      />
    </View>
  }

  _renderItem = (row, sectionId, rowId) => {
    return this.props.renderItem(row, rowId);
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
};

const styles = StyleSheet.create({
  bottomBorder: {
    backgroundColor: colors.borderColor,
    borderBottomWidth: 6 / PixelRatio.get(),
    borderRadius: 10,
    borderColor: colors.borderColor,
    overflow: 'hidden',
    margin: 10,
  },
  list: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2 / PixelRatio.get(),
    borderColor: colors.borderColor,
    minHeight: 40,
  }
});

export default BorderedList;
