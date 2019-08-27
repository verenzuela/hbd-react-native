import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Styles from '../../commons/styles';

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {
      container, 
      centerAll,
      iconColor,
      borderColor,
    } = Styles;

    return (
      <View style={[container, centerAll]}>
        
        <View style={[ centerAll, { width:'100%', height: 50, backgroundColor: '#FAF8F8', } ]}>
          <Text style={{ fontSize: 18, }}> City: New York | August 27, 2019 </Text>
        </View>

        <View style={[container, centerAll]}>
          <Text> maps </Text>
        </View>

      </View>
    );
  }
}
