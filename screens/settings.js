import React, { useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Header from '../components/header';

export default function Settings({navigation}) {
          
            return ( 
                  <View style={styles.container}>
                        <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                             <Header title="Nastavenia" nav={navigation}/>

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