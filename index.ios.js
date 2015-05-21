/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var _ = require('underscore');

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

var  DetailView = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.comment}</Text>
        <Text style={styles.description}>{data.price}</Text>
      </View>
    );
  }
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
      titles: this._getTitles(json),
      randomData: _.sample(json)
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
      titles: ["1"],
      randomData: {}
    };
  },
  render: function() {
    console.log("random: ", this.state.randomData)
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
          <DetailView data= {this.state.randomData}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  rowData: {
    marginTop: 30,
    fontSize: 25
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('restaurant', () => restaurant);
