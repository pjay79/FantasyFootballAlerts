import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SignupScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Signup Screen</Text>
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
});
