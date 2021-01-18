import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator  } from "react-native";
import {Colors} from '../../global/globalStyles';
import { connect } from 'react-redux';


function FirstAidAnswer_Evaluating(props) {

      const {answerText, correctness, indexAnswer, sharedStates} = props;

      const [answer, setCurrentAnswer] =  sharedStates[indexAnswer];


      // answerChosen:false, correctnessOfanswer: false, answerI: index


         return (
            // <View style={[
            //       {backgroundColor: Colors.acient, flexDirection: 'row', width: Dimensions.get("window").width, marginBottom: 20, padding: 10}, 
            //       answer.answerChosen ?  
            //                               correctness ? {borderColor: Colors.green, borderTopWidth: 5 }:{borderColor: Colors.yellow, borderTopWidth: 5 } : {}
            // ]}>
                  
            //             <Image
            //                   source={answer.answerChosen ? correctness ? require('../../assets/images/checkedCorrectThumbnail.png') : require('../../assets/images/checkedThumbnail.png') : require('../../assets/images/answerIconThumbnail.png')}
            //                   style={{ width: 50, height: 50}}
            //             />

            //       <Text style={{color: 'white'}}>{answerText}</Text>
            // </View>
            <View><Text>{answerText}</Text></View>
           ) 
}

export default FirstAidAnswer_Evaluating;


      // "Otázky z jednou odpoveďou:",
      // "Otázky hodnotové s jednou odpoveďou",
      // "Otázky typu pravda/nepravda",
      // "Otázky s viacnásobnou odpoveďou",
      // "Otázky kde sú všetky odpovede správne",
      // "Modelové situácie"