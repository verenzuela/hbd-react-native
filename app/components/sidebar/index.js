import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  LayoutAnimation, 
  UIManager, 
  Platform, 
  Image 
} from 'react-native';
import { NavigationActions } from "react-navigation";

import Icon from 'react-native-vector-icons/Ionicons';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { 
      listDataSource: CONTENT,
      layoutHeight: 0,
    };
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  componentDidMount(){

  }

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false)
    );
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };
  
  render() {

    return (
      <View style={{flex:1}}>
        
        <View style={ styles.topHeigthHeaderLogo }>
          <View style={ styles.headerLogo } >
            <TouchableOpacity style={{ height: 60, width: '80%', }} >
              <Image
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                source={{ uri: 'https://www.hotelsbyday.com/images/HBD_logo_color.png' }}
                resizeMode="contain"
                resizeMethod="resize"
              />
            </TouchableOpacity>
          </View>
        </View>
                  
        <TouchableOpacity activeOpacity={0.5} style={ styles.xForClose } onPress={this.props.pressClose} >
          <Icon style={[ styles.iconColor ,{ paddingLeft: 10 }]} name="md-close" />
        </TouchableOpacity>
        
        <ScrollView>

          <TouchableOpacity activeOpacity={0.8} style={styles.navBarItemHeader} >
            <View style={[ styles.navBarItemContent ]}>
              <View style={[ styles.navBarImage ]}>
                <Text><Icon name={Platform.OS === "ios" ? "ios-home" : "md-home"} color='#000' size={30} /></Text>
              </View>
              <Text style={styles.navBarItemText}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.navBarItemHeader} >
            <View style={[ styles.navBarItemContent ]}>
              <View style={[ styles.navBarImage ]}>
                <Text><Icon name={Platform.OS === "ios" ? "ios-search" : "md-search"} color='#000' size={30} /></Text>
              </View>
              <Text style={styles.navBarItemText}>Change city</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.navBarItemHeader} >
            <View style={styles.navBarItemContent}>
              <View style={styles.navBarImage}>
                <Text><Icon name={Platform.OS === "ios" ? "ios-call" : "md-call"} color='#000' size={30} /></Text>
              </View>
              <Text style={styles.navBarItemText}>Support</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.navBarItemHeader} >
            <View style={styles.navBarItemContent}>
              <View style={styles.navBarImage}>
                <Text><Icon name={Platform.OS === "ios" ? "ios-information-circle" : "md-information-circle"} color='#000' size={30} /></Text>
              </View>
              <Text style={styles.navBarItemText}>About HBD</Text>
            </View>
          </TouchableOpacity>

        </ScrollView>

        <View style={{ alignItems: 'center', flexDirection: 'row', width:'100%', textAlign: 'center', }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width:'100%' }}>
            
            <Icon style={{ marginRight:10 }} name="logo-facebook" color='#000' size={35} />
            <Icon style={{ marginRight:10 }} name="logo-twitter" color='#000' size={35} />
            <Icon style={{ marginRight:10 }} name="logo-linkedin" color='#000' size={35} />

          </View>
        </View>
        
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text></Text>
        </View>
        
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
  },
  navBarItemHeader:{
    paddingLeft: 5,
    paddingTop: 8,
    paddingBottom: 8,
  },
  navBarItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarImage: {
    width: 35, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarItemText: {
    fontSize: 16,
  },
  separator: {
    height: 0.7,
    backgroundColor: '#808080',
    width: '80%',
    marginLeft: 16,
    marginRight: 16,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  iconColor: {
    color: '#617792',
    fontSize: 35,

  },
  xForClose: {
    position:'absolute',
    top: Platform.OS === 'ios' ? 25 : 10,
    right:10
  },
  headerLogo:{
    alignContent:'center', 
    alignItems:'center', 
    padding:5, 
    borderBottomWidth:1, 
    borderColor:'#00adf5',
    top: Platform.OS === 'ios' ? 25 : 10,
  },
  topHeigthHeaderLogo: {
    height:  Platform.OS === 'ios' ? 100 : 80,
  }

});

var CONTENT = [
  {
    isExpanded: false,
    category_name: 'Productos',
    subcategory: [],
  },
];