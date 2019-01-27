import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoadingScreen from './Loading/LoadingScreen';
import IntroScreen from './Intro/IntroScreen';
import HomeScreen from './Auth/HomeScreen';
import NewsScreen from './App/NewsScreen';

const MainNavigator = createSwitchNavigator(
  {
    Loading: {
      screen: LoadingScreen,
    },
    Intro: {
      screen: IntroScreen,
    },
    Auth: {
      screen: HomeScreen,
    },
    App: {
      screen: NewsScreen,
    },
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(MainNavigator);
