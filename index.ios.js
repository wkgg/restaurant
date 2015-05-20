/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TabBarIOS
} = React;

var List = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.data)
    };
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text style={styles.rowData}>{rowData}</Text>} />
    );
  },
});

var restaurant = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },

  getInitialState: function() {
    return {
      selectedTab: 'blueTab',
    };
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Blue Tab"
          icon={{uri: 'featured'}}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          <List data={['row 1', 'row 2', 'row 3', 'row 4']}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={{uri: 'featured'}}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}>
          <List data={['row 5', 'row 6', 'row 7', 'row 8']}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  rowData: {
    marginTop: 30,
    fontSize: 25
  }
});

AppRegistry.registerComponent('restaurant', () => restaurant);
