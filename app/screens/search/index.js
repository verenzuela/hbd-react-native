import React, { Component } from 'react';
import { 
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert, 
  TouchableOpacity,
} from 'react-native';

import Styles from '../../commons/styles';

import hotelsbydayApi from '../../api/hotelsbyday.js';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.hotelsbyday = new hotelsbydayApi();
    this.state = {
      loading: false,
      changeType: this.props.changeType,
      citiesList: [],
    };
    this.arrayholder = [];
  }

  componentDidMount(){

    if(this.state.changeType == 'city'){
      this.setState({
        loading: true,
      }, () => {
        this.getCities();
      });
    }

  };

  getCities = () => {
    this.hotelsbyday.getCities().then( res => {
      this.setState({
        loading: false,
        citiesList: res,
      },
        function() {
          this.arrayholder = res;
        }
      );
    });
  };

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.value ? item.value.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      citiesList: newData,
      text: text,
    });
  }


  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  render() {
    
    const {
      container, 
      centerAll,
      iconColor,
      borderColor,
      backgroundColor,
      searchCont,
      searchTxtInput,
      searchTxtStyle,
      searchBtn,
      searchBtnCurrentLocation,
    } = Styles;


    if(this.state.loading){
      return (
        <View style={[container, centerAll]}>
          <Text>Loading city list, wait...</Text>
          <ActivityIndicator />
        </View>
      );
    }


    if(this.state.changeType == 'city'){
      return (
        <View style={searchCont}>
          <TextInput
            style={[searchTxtInput, borderColor]}
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Type the city here"
          />
          
          <FlatList
            data={this.state.citiesList}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            renderItem={({ item }) => (
              <Text style={searchTxtStyle}>{item.value}</Text>
            )}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={ centerAll } >
            <Text style={[ searchTxtStyle, { fontWeight: 'bold' } ]}> OR </Text>
          </View>

          <View style={[ backgroundColor, borderColor, searchBtnCurrentLocation ]}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row',}} >
              <View style={{ justifyContent: 'center', alignItems: 'center', }}> 
                <Text style={{ color: 'white', fontSize: 16, alignItems: 'center', textAlign: 'center' }} >
                  GET YOUR CITY BY CURRENT LOCATION
                </Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      );
    }
    
    return(
      <View style={[container, centerAll]}>
        <Text> Change { this.state.changeType } </Text>
      </View>
    )

  }
}

