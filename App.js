import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import Drawer from './routes/drawer';

import {Provider} from 'react-redux';
import configureStore from './stateManagement/store.js'

const getFonts = () => Font.loadAsync({
  'AndadaSC-Bold':require('./assets/fonts/AndadaSC-Bold.otf'),
  'AndadaSC-Regular':require('./assets/fonts/AndadaSC-Regular.otf'),
  'Crimson-Semibold':require('./assets/fonts/Crimson-Semibold.otf'),
  'Crimson-SemiboldItalic':require('./assets/fonts/Crimson-SemiboldItalic.otf'),
  'MerriweatherSans-Medium':require('./assets/fonts/MerriweatherSans-Medium.ttf'),
});


export default function App() {

const [fontLoaded,setFontLoaded] = useState(false);


    if(fontLoaded) {
        return <Provider store={configureStore()}>
                    <Drawer/>
                </Provider>
    }
        return <AppLoading
            startAsync={getFonts}
            onFinish={()=> setFontLoaded(true)}
            onError={console.warn}/>

}

const styles = StyleSheet.create({
  
});
