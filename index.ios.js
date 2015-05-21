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
  componentWillReceiveProps: function(newProps){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(newProps.data) 
    });
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

  _getTitles: function(results){
    var titles =[];
    for (var i = results.length - 1; i >= 0; i--) {
      titles.push(results[i].title)
    };
    return titles
  },

  _handleResponse: function(json){
    this.setState({
      dataSource: json,
      titles: this._getTitles(json)
    });
  },
  componentWillMount: function(){
    var query = 'http://localhost:3000/restaurants';
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error => 
          console.log("somthing wrong....", error)
      );
  },
  getInitialState: function() {
    return {
      selectedTab: 'blueTab',
      dataSource: [],
      titles: ["1"]
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
          <List data={this.state.titles}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={{uri: 'featured'}}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}>
          <List data={["row 5", "row 6", "row 7", "row 8"]}/>
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
