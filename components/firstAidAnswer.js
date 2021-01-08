import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator  } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Colors} from '../global/globalStyles';
import { deleteFirstAidQuestionsBySection, downloadFirstAidQuestions, getFirstAidQuestionsBySection } from './../global/services';

export default function FirstAidAnswer({answer, correctness}) {

      const [answerChosen, setAnswerChosen] = useState(false);


         return (
            <View style={{backgroundColor: Colors.acient, flexDirection: 'row', width: Dimensions.get("window").width, marginBottom: 20, padding: 10}}>
                  <TouchableOpacity onPress={() => {setAnswerChosen(!answerChosen)}}>
                        <Image
                              source={answerChosen ? require('../assets/images/answerIcon.png') : require('../assets/images/checked.png')}
                              style={{ width: 50, height: 50}}
                        />
                  </TouchableOpacity>

                  <Text style={{color: 'white'}}>{answer}</Text>
            </View>
           ) 
}

const styles = StyleSheet.create({
      
})