import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Dimensions, Animated, ScrollView, SafeAreaView } from 'react-native';
import { globalStyles } from '../styles/global'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Component } from 'react';

export default class IntroScreen extends Component {
 
      state = {
            oflineModeInfo: false,
            oflineModeAnime: new Animated.Value(0),
            onlineModeInfo: false,
            onlineModeAnime: new Animated.Value(0),
      }

      componentDidMount() {
            // Animated.timing(this.state.fadeAnim, {
            //       toValue: 0,
            //       duration: 5000,
            //       useNativeDriver: true
            //     }).start();
      }

      fadeIn(anim: Animated.Value): Animated.CompositeAnimation{
            // Will change fadeAnim value to 1 in 5 seconds
            return Animated.timing(anim, {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: true
                });
          };
        
        fadeOut(anim: Animated.Value): Animated.CompositeAnimation{
            // Will change fadeAnim value to 0 in 5 seconds
            return Animated.timing(anim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true
            });
          };
     

      render() {

            return ( 
                  <View style={styles.container}>
                        <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                              <View style = {styles.header}>
                                      <Text style = {[globalStyles.headText, styles.title]}>Chces sa ucit soferovat ty debil?</Text>
                                </View>

                        <View style = {styles.buttonsContainer}>
                              <ScrollView>

                                    <TouchableOpacity onPress={() => {}} style={styles.buttoncontainer}>
                                            <ImageBackground source = {require('../assets/images/blackbutton.png')} style={styles.blckbutton}>
                                                  <Text style = {styles.buttonText}>offline mode</Text>
                                            </ImageBackground>
                                      </TouchableOpacity>

                                      <View style={styles.infoContainer}>

                                      <Text style={{flex:5,fontFamily: 'Crimson-Semibold', textAlign:'center', textAlignVertical: 'center'}}>Viac podrobnosti</Text>
                                      {this.state.oflineModeInfo ? (
                                                      <MaterialCommunityIcons style={{flex: 1, justifyContent: 'flex-end'}} name="arrow-down-drop-circle" size={34} color="black" onPress={() => {this.fadeOut(this.state.oflineModeAnime).start(()=> {this.setState({oflineModeInfo: false})})}}/>

                                            ) : (
                                                      <MaterialCommunityIcons style={{flex: 1, justifyContent: 'flex-end'}} name="arrow-up-drop-circle" size={34} color="black" onPress={() => {this.setState({oflineModeInfo: true});this.fadeIn(this.state.oflineModeAnime).start()}}/>
                                          )} 
                                    </View>

                                            <Animated.View
                                                style={[
                                                      {
                                                            opacity: this.state.oflineModeAnime,
                                                            transform: [
                                                                  {
                                                                        scale: this.state.oflineModeAnime.interpolate({
                                                                              inputRange: [0, 1],
                                                                              outputRange: [0.85, 1]
                                                                        })
                                                                  }
                                                            ], 
                                                      },
                                                      styles.infoContainer
                                                ]} 
                                            >
                                             {this.state.oflineModeInfo ?
                                                <Animated.Text style={[styles.infoText, {opacity: this.state.oflineModeAnime}]}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,</Animated.Text>   
                                                :null}
                                            </Animated.View> 
                                             
                                      

                                       <TouchableOpacity onPress={() => {}} style={styles.buttoncontainer}>
                                            <ImageBackground source = {require('../assets/images/redbutton.png')} style={styles.redbutton}>
                                                  <Text style = {styles.buttonText}>online mode</Text>
                                            </ImageBackground>
                                      </TouchableOpacity>
                                     
                                      <View style={styles.infoContainer}>

                                      <Text style={{flex:5,fontFamily: 'Crimson-Semibold', textAlign:'center', textAlignVertical: 'center'}}>Viac podrobnosti</Text>
                                      {this.state.onlineModeInfo ? (
                                                      <MaterialCommunityIcons style={{flex: 1, justifyContent: 'flex-end'}} name="arrow-down-drop-circle" size={34} color="black" onPress={() => {this.fadeOut(this.state.onlineModeAnime).start(()=> {this.setState({onlineModeInfo: false})})}}/>

                                            ) : (
                                                      <MaterialCommunityIcons style={{flex: 1, justifyContent: 'flex-end'}} name="arrow-up-drop-circle" size={34} color="black" onPress={() => {this.setState({onlineModeInfo: true});this.fadeIn(this.state.onlineModeAnime).start()}}/>
                                          )} 
                                    </View>

                                            <Animated.View
                                                style={[
                                                      {
                                                            opacity: this.state.onlineModeAnime,
                                                            transform: [
                                                                  {
                                                                        scale: this.state.onlineModeAnime.interpolate({
                                                                              inputRange: [0, 1],
                                                                              outputRange: [0.85, 1]
                                                                        })
                                                                  }
                                                            ], 
                                                      },
                                                      styles.infoContainer
                                                ]} 
                                            >
                                             {this.state.onlineModeInfo ?
                                                <Animated.Text style={[styles.infoText, {opacity: this.state.onlineModeAnime}]}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,</Animated.Text>   
                                                :null}
                                            </Animated.View>  


                              </ScrollView> 
                        </View>

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