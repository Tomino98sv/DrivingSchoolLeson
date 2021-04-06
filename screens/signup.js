import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions, Animated, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Component } from 'react';
import Header from '../components/header';

export default class SignUp extends Component {
     

      render() {

            return ( 
                  <View style={styles.container}>
                        <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>


                        </ImageBackground>
                  </View>  
              )
      }


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