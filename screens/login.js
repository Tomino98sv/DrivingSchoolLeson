import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '../components/header';

export default function Login({navigation}) {
          
      return ( 
            <View style={styles.container}>
                  <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>


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