import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, FlatList, Button } from 'react-native';
import Header from '../components/header';
import TrafficSignItem from '../components/trafficSign/trafficSignItem.js';
import secNames from '../assets/sources/trafficSignSections';

export default function TrafficSignScreen({navigation}) {
          
      return ( 
            <View style={styles.container}>
                  <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                       <Header title="dopravné značky" nav={navigation}/>

                       <FlatList
                        data={secNames}
                        renderItem={({item, index}) => <TrafficSignItem section={item} nav={navigation}/>}
                        keyExtractor={(item, index) => index.toString()}

                        /> 

                  </ImageBackground>
            </View>  
        )


}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            flexDirection: 'column',
      },
      image: {
            flex: 1,
            resizeMode: 'cover',
            // justifyContent: 'center',
            // alignItems: 'center'
      }
})