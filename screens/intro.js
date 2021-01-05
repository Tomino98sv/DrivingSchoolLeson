import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions, Animated, ScrollView, SafeAreaView } from 'react-native';
import { globalStyles } from '../global/globalStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IntroScreen({navigation}) {
 
      const [oflineModeInfo, setOflineModeInfo] = useState(false);
      const [onlineModeInfo, setOnlineModeInfo] = useState(false);

      const [oflineModeAnime, setOflineModeAnime] = useState(new Animated.Value(0));
      const [onlineModeAnime, setOnlineModeAnime] = useState(new Animated.Value(0));


      function fadeIn(anim){
            // Will change fadeAnim value to 1 in 5 seconds
            return Animated.timing(anim, {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: true
                });
          };
        
      function fadeOut(anim){
            // Will change fadeAnim value to 0 in 5 seconds
            return Animated.timing(anim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true
            });
          };
     


      return ( 
                  <View style={styles.container}>
                        <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                              <View style = {styles.header}>
                                      <Text style = {[globalStyles.headText, styles.title]}>Chces sa ucit soferovat ty debil?</Text>
                                </View>

                        <View style = {styles.buttonsContainer}>
                              <ScrollView>

                                    <TouchableOpacity onPress={() => {navigation.navigate('FirstAid')}} style={styles.buttoncontainer}>
                                            <ImageBackground source = {require('../assets/images/blackbutton.png')} style={styles.blckbutton}>
                                                  <Text style = {styles.buttonText}>offline mode</Text>
                                            </ImageBackground>
                                      </TouchableOpacity>

                                      <View style={styles.infoContainer}>

                                      <Text style={{flex:5,fontFamily: 'Crimson-Semibold', textAlign:'center', textAlignVertical: 'center'}}>Viac podrobnosti</Text>
                                      {oflineModeInfo ? (
                                                      <MaterialCommunityIcons style={{flex: 1, justifyContent: 'flex-end'}} name="arrow-down-drop-circle" size={34} color="black" onPress={() => {fadeOut(oflineModeAnime).start(()=> {setOflineModeInfo(false)})}}/>

                                            ) : (
                                                      <MaterialCommunityIcons style={{flex: 1, justifyContent: 'flex-end'}} name="arrow-up-drop-circle" size={34} color="black" onPress={() => {setOflineModeInfo(true);fadeIn(oflineModeAnime).start()}}/>
                                          )} 
                                    </View>

                                            <Animated.View
                                                style={[
                                                      {
                                                            opacity: oflineModeAnime,
                                                            transform: [
                                                                  {
                                                                        scale: oflineModeAnime.interpolate({
                                                                              inputRange: [0, 1],
                                                                              outputRange: [0.85, 1]
                                                                        })
                                                                  }
                                                            ], 
                                                      },
                                                      styles.infoContainer
                                                ]} 
                                            >
                                             {oflineModeInfo ?
                                                <Animated.Text style={[styles.infoText, {opacity: oflineModeAnime}]}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,</Animated.Text>   
                                                :null}
                                            </Animated.View> 
                                             
                                      

                                       <TouchableOpacity onPress={() => {navigation.navigate('Login')}} style={styles.buttoncontainer}>
                                            <ImageBackground source = {require('../assets/images/redbutton.png')} style={styles.redbutton}>
                                                  <Text style = {styles.buttonText}>online mode</Text>
                                            </ImageBackground>
                                      </TouchableOpacity>
                                     
                                      <View style={styles.infoContainer}>

                                      <Text style={{flex:5,fontFamily: 'Crimson-Semibold', textAlign:'center', textAlignVertical: 'center'}}>Viac podrobnosti</Text>
                                      {onlineModeInfo ? (
                                                      <MaterialCommunityIcons style={{flex: 1, justifyContent: 'flex-end'}} name="arrow-down-drop-circle" size={34} color="black" onPress={() => {fadeOut(onlineModeAnime).start(()=> {setOnlineModeInfo(false)})}}/>

                                            ) : (
                                                      <MaterialCommunityIcons style={{flex: 1, justifyContent: 'flex-end'}} name="arrow-up-drop-circle" size={34} color="black" onPress={() => {setOnlineModeInfo(true);fadeIn(onlineModeAnime).start()}}/>
                                          )} 
                                    </View>

                                            <Animated.View
                                                style={[
                                                      {
                                                            opacity: onlineModeAnime,
                                                            transform: [
                                                                  {
                                                                        scale: onlineModeAnime.interpolate({
                                                                              inputRange: [0, 1],
                                                                              outputRange: [0.85, 1]
                                                                        })
                                                                  }
                                                            ], 
                                                      },
                                                      styles.infoContainer
                                                ]} 
                                            >
                                             {onlineModeInfo ?
                                                <Animated.Text style={[styles.infoText, {opacity: onlineModeAnime}]}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,</Animated.Text>   
                                                :null}
                                            </Animated.View>  


                              </ScrollView> 
                        </View>

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
      },
      header: {
            // backgroundColor: 'red',
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'center'
      },
      title: {
            // backgroundColor: 'yellow',
            position: 'absolute',
            margin: 30,
            padding: 15
      },
      buttonsContainer: {
            // backgroundColor: 'yellow',
            flex: 2,
            alignSelf: 'stretch',
            alignItems: 'center'
      },
      buttoncontainer: {
           paddingTop: 20,
           paddingLeft: 20,
           paddingRight: 20,
      },
      blckbutton: {
            width: (Dimensions.get('window').width/10) * 7,
            height: (Dimensions.get('window').height/10) * 1,
            justifyContent: 'center', //Centered vertically
            alignItems: 'center', // Centered horizontally
      },
      redbutton: {
            width: (Dimensions.get('window').width/10) * 7,
            height: (Dimensions.get('window').height/10) * 1,
            justifyContent: 'center', //Centered vertically
            alignItems: 'center', // Centered horizontally
      },
      buttonText: {
            color: 'white',
            fontSize: 24,
            fontFamily: 'AndadaSC-Regular',
      },
      infoContainer: {
            alignSelf: 'center',
            color: 'black',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: (Dimensions.get('window').width/10) * 6,
            backgroundColor: 'white',
            opacity: 0.7,
      },
      infoText: {
            color: 'black',
            fontSize: 18,
            fontFamily: 'Crimson-SemiboldItalic',
      }
})