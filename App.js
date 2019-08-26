import React, { Component } from 'react';
import { 
  Dimensions, 
  Platform, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';

import { 
  createSwitchNavigator, 
  createAppContainer, 
  createDrawerNavigator, 
  createBottomTabNavigator, 
  createStackNavigator, 
  DrawerActions 
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import CustomSidebarMenu from './app/components/sidebar';

import Maps from './app/screens/maps';
import Search from './app/screens/search';
import About from './app/screens/about';
import Support from './app/screens/support';

class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;

const HomeTabNavigator = createBottomTabNavigator(
  { 
    Home: { 
      screen: Maps,
      navigationOptions: {
        title: 'Home',
      },
    },

    Search: { 
      screen: Search,
      navigationOptions: {
        title: 'Change city',
      },
    },

    Support: { 
      screen: Support,
      navigationOptions: {
        title: 'Support',
      },
    },

    About: { 
      screen: About,
      navigationOptions: {
        title: 'About',
      },
    },

  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      let titleName;
      titleName = routeName;

      if(routeName=='Home') titleName = 'HotelsByDay';
      if(routeName=='Search') titleName = 'Find hotel by city';
      if(routeName=='About') titleName = 'About HotelsByDay';
      
      return {
        headerTitle: titleName,
        headerStyle: { backgroundColor: '#2E5C65' },
        headerTintColor: '#fff',
      };
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = Platform.OS === "ios" ? 'ios-home' : 'md-home';
        } else if (routeName === 'Search') {
          iconName = Platform.OS === "ios" ? 'ios-search' : 'md-search';
        } else if (routeName === 'Support') {
          iconName = Platform.OS === "ios" ? 'ios-call' : 'md-call';
        } else if (routeName === 'About') {
          iconName = Platform.OS === "ios" ? 'ios-information-circle' : 'md-information-circle';
        }
        return <Icon name={iconName} name={iconName} size={25} color={tintColor} />;
      },
      tabBarOptions: { activeTintColor:'#2E5C65', }
    })
  }
);

const HomeStackNavigator = createStackNavigator(
  { 
    HomeTabNavigator:  { screen: HomeTabNavigator },
    
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableOpacity style={[style.touchable, { paddingLeft:10 }]} onPress={() => navigation.toggleDrawer()} >
            <Icon name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} color='#fff' size={30}  />
          </TouchableOpacity>
        ),
        headerRight: (
          <Image
            style={{ height: 35, width: 35, marginRight: 10, }}
            source={ require('./app/assets/png/HBD_logo_white_small.png') }
          />
        ),
        headerStyle: { backgroundColor: '#2E5C65' },
        headerTintColor: '#fff',
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    home: { screen: HomeStackNavigator }
  },
  { 
    contentComponent: props => (<CustomSidebarMenu navigation={props.navigation} drawerProps={{...props}} pressClose={() => props.navigation.dispatch(DrawerActions.closeDrawer())} />),
    drawerWidth: Dimensions.get('window').width - 130,
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  home: { screen: AppDrawerNavigator },
  
  
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const style = StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: 'row',
  }
});