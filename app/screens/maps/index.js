import React, { Component } from 'react';
import { 
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from "react-navigation";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
      isMapReady: false,
      coordinates: [],
      mapRef: null,
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
          coordinates: [],
          mapRef: null,
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
          coordinates: [],
          mapRef: null,
        }, () => {
          this.getHotelsByCity( this.state.location, this.state.dateArrival );
        });
      }
    }     

  };


  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };


  getHotelsByCity = (cityName, date) => {
    this.hotelsbyday.getHotelsByCity(cityName, date).then( res => {

      this.setState({
        hotels: res._embedded.hotels,
        hotels_count: res.hotels_count,
      }, () => {

        this.state.hotels.map(item => (
          this.state.coordinates.push({ latitude: item.lat , longitude: item.lon })
        ));

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


  onRegionChange = (region) => {
    this.setState({ region });
  };


  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };


  renderBarButtons = ( location, dateArrival, container, centerAll, backgroundColor, mapsSearchbuttons) => {
    return(
      <View style={[ centerAll, backgroundColor, { width:'100%', height: 60, flexDirection: 'row' } ]}>
        <View style={[container ]}>
          <TouchableOpacity style={[ mapsSearchbuttons ]} onPress={ this.navigateToScreen('Search') } >
            <View style={[container, centerAll]}>
              <Text style={{ fontSize: 18, color: '#2E5C65' }}> City: { location } </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[container ]}>
          <TouchableOpacity style={[ mapsSearchbuttons ]} onPress={ this.navigateToScreen('Date') } >
            <View style={[container, centerAll]}>
              <Text style={{ fontSize: 18, color: '#2E5C65' }}> Arrival: { moment( dateArrival ).format('MMM D, Y')}  </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  renderMarkers = (item) => {
    return(
      <Marker
        key={ item.id }
        coordinate={{ latitude: item.lat , longitude: item.lon }}
        title={item.name}
        description={`Starts at ${item.discounted_price} ${item.currency}. From ${moment(item.offer_date_time_from).format('hA')} - ${moment(item.offer_date_time_to).format('hA')} `}                  
      />
    )
  };


  renderMap = ( style, hotels, provider ) => {
    
    if( this.state.hotels_count > 1 ){

      return( 
        <MapView
          customMapStyle={style}
          provider={provider}
          style={{ alignSelf: 'stretch', height: '100%' }}
          ref={(ref) => { this.state.mapRef = ref }}
          onLayout = {() => this.state.mapRef.fitToCoordinates(this.state.coordinates, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}
        >
          {hotels.map(item => (
            this.renderMarkers(item)
          ))}
        </MapView>
      )

    }else{

      return(
        <MapView
          customMapStyle={style}
          provider={provider}
          style={{ alignSelf: 'stretch', height: '100%' }}
          initialRegion={{
            latitude: this.state.hotels[0].lat,
            longitude: this.state.hotels[0].lon,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
        > 
          {hotels.map(item => (
            this.renderMarkers(item)
          ))}
        </MapView>

      )

    }

  };

  render() {

    var mapStyle=[ { 'width':100, 'height':100  },  {"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];

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
          
          { this.renderBarButtons( this.state.location, this.state.dateArrival, container, centerAll, backgroundColor, mapsSearchbuttons) }

          <View style={[container, centerAll]}>
            <Text style={{ margin:20, }}>No hotels found, please chose another location or change your arrival date...</Text>
          </View>
        </View>
      );
    }else{
      return (
        <View style={[container]}>

          { this.renderBarButtons( this.state.location, this.state.dateArrival, container, centerAll, backgroundColor, mapsSearchbuttons) }

          <View style={[container]}>
            
            { this.renderMap( mapStyle, this.state.hotels, PROVIDER_GOOGLE  ) }
                        
          </View>

        </View>
      );
    } 
  }
}
