import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import IntroScreen from './screens/intro';
import Drawer from './routes/drawer';

const getFonts = () => Font.loadAsync({
  'AndadaSC-Bold':require('./assets/fonts/AndadaSC-Bold.otf'),
  'AndadaSC-Regular':require('./assets/fonts/AndadaSC-Regular.otf'),
  'Crimson-Semibold':require('./assets/fonts/Crimson-Semibold.otf'),
  'Crimson-SemiboldItalic':require('./assets/fonts/Crimson-SemiboldItalic.otf'),
});


export default function App() {

const [fontLoaded,setFontLoaded] = useState(false);


    if(fontLoaded) {
        return <Drawer/>
    }
        return <AppLoading
            startAsync={getFonts}
            onFinish={()=> setFontLoaded(true)}
            onError={console.warn}/>

}

const styles = StyleSheet.create({
  
});
