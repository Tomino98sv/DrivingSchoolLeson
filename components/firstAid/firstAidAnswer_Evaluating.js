import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator  } from "react-native";
import {Colors} from '../../global/globalStyles';


function FirstAidAnswer_Evaluating(props) {

      useEffect(() => {

            return () => {
                  // console.log("Component FirstAidAnswer_Evaluating UnMount ")
            }
      });

      const {answerText, correctness, indexAnswer, sharedStates} = props;

      const [answer, setCurrentAnswer] =  sharedStates[indexAnswer];

         return (
            <View style={[
                  {backgroundColor: Colors.acient, flexDirection: 'row', width: Dimensions.get("window").width, marginBottom: 20, padding: 10}, 
                  answer.answerChosen ?  
                                          correctness ? {borderColor: Colors.green, borderTopWidth: 5 }:{borderColor: Colors.red, borderTopWidth: 5 } : correctness ? {borderColor: Colors.green, borderTopWidth: 5 }: {borderColor: Colors.red, borderTopWidth: 5 }
            ]}>
                  
                        <Image
                              source={answer.answerChosen ? correctness ? require('../../assets/images/checkedCorrectThumbnail.png') : require('../../assets/images/checkedWrongThumbnail.png') : require('../../assets/images/answerIconPurpleThumbnail.png')}
                              style={{ width: 25, height: 25}}
                        />

                  <Text style={{color: 'white', marginLeft: 10}}>{answerText}</Text>
            </View>
           ) 
}

export default FirstAidAnswer_Evaluating;
