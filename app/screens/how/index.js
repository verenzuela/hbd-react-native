import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Styles from '../../commons/styles';

export default class How extends Component {
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
        <Text> How </Text>
      </View>
    );
  }
}