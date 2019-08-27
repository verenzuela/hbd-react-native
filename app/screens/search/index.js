import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Styles from '../../commons/styles';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changeType: this.props.changeType,
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
        <Text> Change { this.state.changeType } </Text>
      </View>
    );
  }
}
