import React, { useState, useEffect, useRef } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback  } from "react-native";
import {Colors} from '../../global/globalStyles';
import { connect } from 'react-redux';


function DrivingTestAnswer(props) {

      const {answerText, correctness, indexAnswer, sharedStates, completed, viewPager, currentPage, rate_answr_immid} = props;
      const countCorrectAnswer = useRef(0);
      const [answer, setCurrentAnswer] =  sharedStates[indexAnswer];
      const completedRef = completed; 

      useEffect(() => {
            return () => {
                  // console.log("Component FirstAidAnswer UnMount ")
            }
      })

      function onPress() {
            sharedStates.forEach((value, indx, theArray) => {
                  
                  const [answerIterating, setAnswer] = value;
                        if(indexAnswer == answerIterating.answerI){
                              var chosen = !answerIterating.answerChosen;
                              if(chosen) {
                              viewPager.current.setPage(currentPage+1)
                              }
                              setAnswer({answerChosen:chosen, answerI: answerIterating.answerI, correctnessOfanswer: correctness, points: answerIterating.points});
                              completedRef.current = chosen;
                        }else {
                        setAnswer({answerChosen:false, answerI: answerIterating.answerI, correctnessOfanswer: answerIterating.correctnessOfanswer});
                        }
             })
      }


         return (
               <TouchableWithoutFeedback onPress={() => onPress()} disabled={rate_answr_immid && completedRef.current}>

            <View style={[
                  {backgroundColor: Colors.acient, flexDirection: 'row', marginBottom: 20, padding: 10}, 
                  answer.answerChosen ?  
                                    rate_answr_immid ? 
                                                      correctness ? {backgroundColor: Colors.green }:{backgroundColor: Colors.red } 
                                                      : {backgroundColor: Colors.yellow } 
                                    :{}
            ]}>

                  <Text style={{color: 'white', marginLeft: 10, flex: 1}}>{answerText}</Text>
            </View>


                </TouchableWithoutFeedback>
           ) 
}

const styles = StyleSheet.create({
      
})

//how to get store data into component
const mapStateToProps = (state) => {
      return {
            rate_answr_immid: state.setting.rate_answer_immidiately
      } 
}

export default connect(mapStateToProps)(DrivingTestAnswer)