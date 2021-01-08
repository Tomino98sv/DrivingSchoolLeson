import React, { useState, useEffect } from 'react';

// import { Swiper, SwiperSlide} from 'swiper/react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator, FlatList  } from "react-native";
import {Colors} from '../global/globalStyles';
import Header from '../components/header';
import FirstAidAnswer from '../components/firstAidAnswer';

import ViewPager from '@react-native-community/viewpager';

    
export default function FirstAidTest({navigation}) {
      

      function generateQuestions() {
            let {data} = navigation.state.params;
            return data.map((question, index) => {
                  console.log(question,index);
                  return <View style={{flexDirection:'column'}} key={index}>
                        
                             <View style={{flex:1}}></View>

                              <View style={{flex: 10, flexDirection: 'row'}}>

                                    <View style={{flex:1}}></View>
                                    <View style={{flex:10, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                          <View style={{flex:3}}><Text style={{color: Colors.white, textAlign: 'center', textAlignVertical: 'center', flex: 1}}>{question.question}</Text></View>
                                           <View style={{flex:3}}>
                                           <FlatList
                                                data={question.answers}
                                                renderItem={({item, index}) => <FirstAidAnswer answer={item.answer} correctness={item.correctness}/>}
                                                keyExtractor={(item, index) => index.toString()}/>
                                          </View>
                                          <View style={{flex: 1}}></View> 
                                    </View>
                                    <View style={{flex:1}}></View>

                              </View>

                              <View style={{flex:1}}></View> 

                  </View>
            })
      }

      return ( 
            <View style={styles.container}>
                  <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                       <Header title={navigation.state.params.title} nav={navigation}/>

                       <ViewPager style={{backgroundColor: 'transparent', flex: 1,}} initialPage={0}>
                                    {generateQuestions()}
                              
                        </ViewPager>


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
})