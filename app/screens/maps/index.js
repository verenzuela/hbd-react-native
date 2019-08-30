import React, { Component } from 'react';
import { 
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import hotelsbydayApi from '../../api/hotelsbyday.js';
import Styles from '../../commons/styles';

import moment from 'moment';

let date = moment();

export default class Maps extends Component {

  constructor(props) {
    super(props);

    this.hotelsbyday = new hotelsbydayApi();
    this.state = {
      location: this.props.location,
      dateArrival: this.props.dateArrival,
      hotels: [],
      hotels_count: 0,
      loading: true,
    };
  }; 


  componentWillMount(){
    this.getHotelsByCity( this.state.location, this.state.dateArrival );
  };
  

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.navigation.state.params.location){
      if( nextProps.navigation.state.params.location != this.state.location ){
        this.setState({ 
          location: nextProps.navigation.state.params.location,
          loading: true,
        }, () => {
          this.getHotelsByCity( this.state.location, this.state.dateArrival );
        });
      }
    }
      

    if(nextProps.navigation.state.params.dateArrival){

      if( nextProps.navigation.state.params.dateArrival.dateString != this.state.dateArrival ){
        this.setState({ 
          dateArrival: nextProps.navigation.state.params.dateArrival.dateString,
          loading: true,
        }, () => {
          this.getHotelsByCity( this.state.location, this.state.dateArrival );
        });
      }
    }     

  }


  getHotelsByCity = (cityName, date) => {
    this.hotelsbyday.getHotelsByCity(cityName, date).then( res => {
      this.setState({
        hotels: res._embedded.hotels,
        hotels_count: res.hotels_count,
      }, () => {
        this.setState({ 
          location: cityName,
          loading: false 
        });
      });
    });
  };


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
      mapsSearchbuttons
    } = Styles;

    if(this.state.loading){
      return (
        <View style={[container, centerAll]}>
          <Text>Searching hotels, wait...</Text>
          <ActivityIndicator />
        </View>
      );
    }

    if(this.state.hotels_count == 0){
      return (
        <View style={[container, centerAll]}>
          <View style={[ centerAll, backgroundColor, { width:'100%', height: 60, flexDirection: 'row' } ]}>

            <View style={[container ]}>
              <TouchableOpacity style={[ mapsSearchbuttons ]} >
                <View style={[container, centerAll]}>
                  <Text style={{ fontSize: 18, color: '#2E5C65' }}> City: {this.state.location} </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[container ]}>
              <TouchableOpacity style={[ mapsSearchbuttons ]} >
                <View style={[container, centerAll]}>
                  <Text style={{ fontSize: 18, color: '#2E5C65' }}> Arrival: { moment( this.state.dateArrival ).format('MMM D, Y')}  </Text>
                </View>
              </TouchableOpacity>
            </View>
          
          </View>
          <View style={[container, centerAll]}>
            <Text style={{ margin:20, }}>No hotels found, please chose another location or change your arrival date...</Text>
          </View>
        </View>
      );
    }else{
      return (
        <View style={[container, centerAll]}>

          <View style={[ centerAll, backgroundColor, { width:'100%', height: 60, flexDirection: 'row' } ]}>

            <View style={[container ]}>
              <TouchableOpacity style={[ mapsSearchbuttons ]} >
                <View style={[container, centerAll]}>
                  <Text style={{ fontSize: 18, color: '#2E5C65' }}> City: {this.state.location} </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[container ]}>
              <TouchableOpacity style={[ mapsSearchbuttons ]} >
                <View style={[container, centerAll]}>
                  <Text style={{ fontSize: 18, color: '#2E5C65' }}> Arrival: { moment( this.state.dateArrival ).format('MMM D, Y')}  </Text>
                </View>
              </TouchableOpacity>
            </View>
          
          </View>


          <View style={[container, centerAll]}>
            
            <FlatList
              data={this.state.hotels}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={({ item }) => (

                <Text style={{ margin:10, }}>{item.name}</Text>

              )}
              enableEmptySections={true}
              keyExtractor={(item, index) => index.toString()}
            />


          </View>

        </View>
      );
    }
      
  }
}
