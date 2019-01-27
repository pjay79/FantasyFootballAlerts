import React, { Component } from 'react';
import {
  View, ActivityIndicator, StyleSheet, AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIntro();
  }

  checkIntro = async () => {
    try {
      const { navigation } = this.props;
      const value = await AsyncStorage.getItem('@SKIP_INTRO');
      if (value === 'true') {
        navigation.navigate('Auth');
      } else {
        navigation.navigate('Intro');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#FFFFFF" />
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
});

LoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
