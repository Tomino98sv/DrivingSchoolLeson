import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';

import Navigator from './routes/drawer';

const getFonts = () => Font.loadAsync({
  'AndadaSC-Bold':require('./assets/fonts/AndadaSC-Bold.otf'),
  'AndadaSC-Regular':require('./assets/fonts/AndadaSC-Regular.otf'),
  'Crimson-Semibold':require('./assets/fonts/Crimson-Semibold.otf'),
  'Crimson-SemiboldItalic':require('./assets/fonts/Crimson-SemiboldItalic.otf'),
});

export default class App extends React.Component {
  
  state = {
    fontLoaded: false
  }

  render() {
    if(this.state.fontLoaded){
      return (
        <Navigator/>
      )
    }else {
      return (
        <AppLoading
          startAsync={getFonts}
          onFinish={()=> this.setState({fontLoaded: true})}
          onError={console.warn}/>
      )
    }
  }
}

const styles = StyleSheet.create({
  
});
