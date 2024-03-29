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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import hotelsbydayApi from '../../api/hotelsbyday.js';
import moment from 'moment';

let calendarDate = moment();

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.hotelsbyday = new hotelsbydayApi();
    this.state = {
      loading: false,
      changeType: this.props.changeType,
      citiesList: [],
      calendarDate: calendarDate.format('YYYY-MM-DD'),
      horizontal: false,
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

  changeCity = (cityName) => {
    this.props.navigation.navigate('Home', {
      location: cityName,
    });
  };

  changeDate = (date) => {
    this.props.navigation.navigate('Home', {
      dateArrival: date,
    });
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

  onDayPress = (date) => {
    this.changeDate(date);
  };

  onCityPress = (city) => {
    this.changeCity(city);
  };

  getCityByLocation = () => {
    console.warn('Get city by location');
  };


  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.value ? item.value.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      citiesList: newData,
      text: text,
    });
  }


  ListViewItemSeparator = () => {
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

              <TouchableOpacity style={{flex: 1, flexDirection: 'row',}} onPress={_ => this.onCityPress( item.value )} >
                <Text style={searchTxtStyle}>{item.value}</Text>
              </TouchableOpacity>

            )}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={ centerAll } >
            <Text style={[ searchTxtStyle, { fontWeight: 'bold' } ]}> OR </Text>
          </View>

          <View style={[ backgroundColor, borderColor, searchBtnCurrentLocation ]}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row',}} onPress={_ => this.getCityByLocation()} >
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


    if(this.state.changeType == 'date'){
      return (
        <View style={{ flex: 1 }}>
          <Calendar
            current={this.state.calendarDate}
            headerData={{
              calendarDate: calendarDate.format('DD MMM, YYYY')
            }}
            style={{
              paddingLeft: 10, paddingRight: 10
            }}
            horizontal={this.state.horizontal}
            onDayPress={this.onDayPress}
          />
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

