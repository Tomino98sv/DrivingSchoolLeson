import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator  } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Colors} from '../global/globalStyles';
import { deleteFirstAidQuestionsBySection, downloadFirstAidQuestions, getFirstAidQuestionsBySection } from './../global/services';

export default function FirstAidItem({title}) {

      const [downloaded, setDownloaded] = useState(false);
      const [loading, setLoading] = useState(false);

      useEffect(() => {
            getFirstAidQuestionsBySection(title, result => {
                  if(result.length !== 0) {
                        setDownloaded(true)
                  }
            })
          }); 

         return (
            <View style={styles.cardContainer}>

                  <View style={{flex: 3, marginTop: 25, marginBottom: 25}}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={{flexDirection: 'row', width: (Dimensions.get('window').width/3), justifyContent: 'space-between',}}>

                        </View>
                  </View>



                  <View style={{flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>

                  {downloaded ? 
                  <TouchableOpacity onPress={() => {deleteFirstAidQuestionsBySection(title, confirm => {
                        if(confirm) {
                              setDownloaded(false) 
                        }else {
                              alert("error while deleting question and answers from ",title) 
                        }
                  })}} style={{flex: 1,}}>
                                            <ImageBackground source = {require('../assets/images/deleteShapeWithShadows.png')} style={{ width: 90, height: 35, alignSelf: 'flex-end', alignItems: 'center', elevation: 5}}>
                                            <Image
                                                source={require('../assets/icons/trashIconAngle.png')}
                                                style={{width: 25, height: 25, margin: 5, marginLeft: 20}}
                                                />                                            

                                                </ImageBackground>

                  </TouchableOpacity> : null
                  }
      
                  <TouchableOpacity onPress={() => {  
                        setLoading(true);
                        downloadFirstAidQuestions(title, value => {
                              console.log(value)
                              setLoading(false);
                              if(value) {
                                    setDownloaded(value) 
                              }else {
                                    alert("error while downloading question and answers from ",title) 
                                    setDownloaded(value)
                              }
                        })}
                        } style={{alignItems: 'center', justifyContent: 'center', flex: 3}} disabled={downloaded}>
                              { loading ? <ActivityIndicator size="large" color={Colors.yellow}/> : <Image
                              source={downloaded ? require('../assets/icons/correct.png') : require('../assets/icons/icloud-download-475016_orange.png')}
                              style={styles.iconDownload}
                              />}
                        
                  </TouchableOpacity>

                  </View>

            </View>
           ) 
}

const styles = StyleSheet.create({
      cardContainer: {
            borderWidth: 1,
            display: "flex",
            flexDirection: 'row',
            flex: 1,
            backgroundColor: Colors.primary,
            flexWrap: 'wrap',           

            // elevation: 5

            // shadowColor: "#000",
            // shadowOffset: {
	      //       width: 0,
	      //       height: 4,
            // },
            // shadowOpacity: 0.30,
            // shadowRadius: 4.65,

      },
      iconDownload: {
            height: 50,
            width: 50,
      },
      title: {
            textAlign: 'center',
            color: Colors.white,
            fontSize: 24,
            fontFamily: 'MerriweatherSans-Medium',
            // fontFamily: 'AndadaSC-Regular',
            textAlignVertical: 'center',
            padding: 15
      }
})