import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const slides = [
  {
    key: '1',
    title: 'Team news',
    text: 'All the weekly ins and outs',
    image: require('../../assets/images/team.png'),
    imageStyle: { resizeMode: 'contain', height: 300, width: 300 },
    titleStyle: { color: '#FFFFFF', fontSize: 30, fontWeight: '400' },
    textStyle: { color: '#FFFFFF', fontSize: 18 },
    backgroundColor: '#4AE0BD',
  },
  {
    key: '2',
    title: 'Injury updates',
    text: 'Injury updates and likely return estimates',
    image: require('../../assets/images/bandages.png'),
    imageStyle: { resizeMode: 'contain', height: 200, width: 200 },
    titleStyle: { color: '#FFFFFF', fontSize: 30, fontWeight: '400' },
    textStyle: { color: '#FFFFFF', fontSize: 18 },
    backgroundColor: '#4AE0BD',
  },
  {
    key: '3',
    title: 'Notifications',
    text: 'Instant push notifications',
    image: require('../../assets/images/message.png'),
    imageStyle: { resizeMode: 'contain', height: 250, width: 250 },
    titleStyle: { color: '#FFFFFF', fontSize: 30, fontWeight: '400' },
    textStyle: { color: '#FFFFFF', fontSize: 18 },
    backgroundColor: '#4AE0BD',
  },
];

export default class IntroScreen extends Component {
  componentDidMount() {
    // SplashScreen.hide();
  }

  skipIntro = () => {
    const { navigation } = this.props;
    navigation.navigate('Auth');
  };

  renderNextButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons
        name="md-arrow-round-forward"
        color="rgba(255, 255, 255, .9)"
        size={24}
        style={styles.icon}
      />
    </View>
  );

  renderDoneButton = () => (
    <View style={styles.buttonCircle}>
      <Ionicons name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} style={styles.icon} />
    </View>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        showSkipButton
        onSkip={this.skipIntro}
        onDone={this.skipIntro}
        renderDoneButton={this.renderDoneButton}
        renderNextButton={this.renderNextButton}
      />
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
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
  },
});

IntroScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
