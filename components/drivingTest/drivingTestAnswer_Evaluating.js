import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator  } from "react-native";
import {Colors} from '../../global/globalStyles';


function DrivingTestAnswer_Evaluating(props) {

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
                                          correctness ? {backgroundColor: Colors.green }:{backgroundColor: Colors.red } : correctness ? {backgroundColor: Colors.green }: {borderColor: Colors.red }
            ]}>

                  <Text style={{color: 'white', marginLeft: 10}}>{answerText}</Text>
            </View>
           ) 
}

export default DrivingTestAnswer_Evaluating;
