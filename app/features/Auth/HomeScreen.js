import React, { Component } from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Fantasy Football Alerts</Text>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4AE0BD',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  logo: {
    resizeMode: 'contain',
    height: 200,
  },
});
