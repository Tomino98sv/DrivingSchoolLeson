import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import IntroScreen from '../screens/intro';
import TrafficSignScreen from '../screens/trafficsigns';

const RootDrawerNavigator = createDrawerNavigator({
      Intro: {
            screen: IntroScreen,
            navigationOptions: {
                  title: 'intro'
            }
      },
      TrafficSign: {
            screen: TrafficSignScreen,
            navigationOptions: {
                  title: 'Dopravne znacky'
            }
      }
});

export default createAppContainer(RootDrawerNavigator);