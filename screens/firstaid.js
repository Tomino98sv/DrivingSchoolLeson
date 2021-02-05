import React, { useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, FlatList} from 'react-native';
import Header from '../components/header';
import FirstAidItem from '../components/firstAid/firstAidItem';
import secNames from '../assets/sources/firstAidSections';

export default function FirstAid({navigation}) {
          
            return ( 
                  <View style={styles.container}>
                        <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                             <Header title="prvá pomoc" nav={navigation}/>

                             <FlatList
                                    data={secNames}
                                    renderItem={({item, index}) => <FirstAidItem title={item} nav={navigation} />}
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