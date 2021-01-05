import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity, Dimensions, Animated, ScrollView, SafeAreaView } from 'react-native';
import { globalStyles } from '../global/globalStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Component } from 'react';
import Header from '../components/header';
import TrafficSignItem from '../components/trafficSignItem';
import secNames from '../assets/sources/trafficSignSections';

export default function TrafficSignScreen({navigation}) {
          
      return ( 
            <View style={styles.container}>
                  <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                       <Header title="dopravné značky" nav={navigation}/>

                       <FlatList
                        data={secNames}
                        renderItem={({item, index}) => <TrafficSignItem title={item} />}
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