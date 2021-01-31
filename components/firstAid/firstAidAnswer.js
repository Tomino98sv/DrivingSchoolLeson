import React, { useState, useEffect, useRef } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback  } from "react-native";
import {Colors} from '../../global/globalStyles';
import { connect } from 'react-redux';


function FirstAidAnswer(props) {

      const {answerText, correctness, indexAnswer, sharedStates, category, completed, viewPager, currentPage, rate_answr_immid} = props;
      const countCorrectAnswer = useRef(0);
      const [answer, setCurrentAnswer] =  sharedStates[indexAnswer];
      const completedRef = completed; 


      useEffect(() => {

           if(category == "Otázky s viacnásobnou odpoveďou") {
                 let count = 0;
                  sharedStates.forEach((value, indx, theArray) => {
                        const [answerIterating, setAnswer] = value;
                        if(answerIterating.correct) {
                              count++;
                        }
                  })
                  countCorrectAnswer.current = count;
           } 
            
            return () => {
            }

      }, [completedRef.current])  

      function onPress() {
            sharedStates.forEach((value, indx, theArray) => {
                  
                  const [answerIterating, setAnswer] = value;
                   if(category == "Otázky z jednou odpoveďou:" || category == "Otázky hodnotové s jednou odpoveďou" || category == "Otázky typu pravda/nepravda" || category == "Modelové situácie") {
                         if(indexAnswer == answerIterating.answerI){
                               var chosen = !answerIterating.answerChosen;
                               if(chosen) {
                                    viewPager.current.setPage(currentPage+1)
                               }
                               setAnswer({answerChosen:chosen, answerI: answerIterating.answerI, correctnessOfanswer: correctness});
                               completedRef.current = chosen;
                         }else {
                              setAnswer({answerChosen:false, answerI: answerIterating.answerI, correctnessOfanswer: answerIterating.correctnessOfanswer});
                         }
                   }else if ( category == "Otázky s viacnásobnou odpoveďou") {

                        if(indexAnswer == answerIterating.answerI && !answerIterating.answerChosen){
                              var chosen = !answerIterating.answerChosen;
                              setAnswer({answerChosen:chosen, answerI: answerIterating.answerI, correctnessOfanswer: correctness});


                              var allChosenCounter = chosen;
                              sharedStates.forEach((value, indx, theArray) => {
                                    const [controlAnswer, setControlAnswer] = value;
                                    if (!(indexAnswer == controlAnswer.answerI) && controlAnswer.answerChosen) { 
                                          allChosenCounter++;
                                    }
                              })
                              if(allChosenCounter == countCorrectAnswer.current) {
                                    viewPager.current.setPage(currentPage+1);
                                    completedRef.current = chosen;
                               } 
                        }


                   }else if ( category == "Otázky kde sú všetky odpovede správne") {
                        if(indexAnswer == answerIterating.answerI){
                              var chosen = !answerIterating.answerChosen;
                              setAnswer({answerChosen:chosen, answerI: answerIterating.answerI, correctnessOfanswer: correctness});

                              var allChosenCounter = chosen;
                              sharedStates.forEach((value, indx, theArray) => {
                                    const [controlAnswer, setControlAnswer] = value;
                                    if (!(indexAnswer == controlAnswer.answerI) && controlAnswer.answerChosen) { 
                                          allChosenCounter++;
                                    }
                              })
                              if(allChosenCounter == sharedStates.length) {
                                    viewPager.current.setPage(currentPage+1);
                                    completedRef.current = chosen;
                               } 
                        }

                   }
             })
      }


         return (
               <TouchableWithoutFeedback onPress={() => onPress()} disabled={rate_answr_immid && completedRef.current}>

            <View style={[
                  {backgroundColor: Colors.acient, flexDirection: 'row', marginBottom: 20, padding: 10}, 
                  answer.answerChosen ?  
                                    rate_answr_immid ? 
                                                      correctness ? {borderColor: Colors.green, borderTopWidth: 5 }:{borderColor: Colors.red, borderTopWidth: 5 } 
                                                      : {borderColor: Colors.yellow, borderTopWidth: 5 } 
                                    :{}
            ]}>
                  
                  <TouchableOpacity onPress={() => onPress()} disabled={rate_answr_immid && completedRef.current}>
                        <Image
                              source={!answer.answerChosen ? require('../../assets/images/answerIconPurpleThumbnail.png') : props.rate_answr_immid ? correctness ? require('../../assets/images/checkedCorrectThumbnail.png') : require('../../assets/images/checkedWrongThumbnail.png') : require('../../assets/images/checkedThumbnail.png')}
                              style={{ width: 25, height: 25}}
                        />
                  </TouchableOpacity>

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

export default connect(mapStateToProps)(FirstAidAnswer)


      // "Otázky z jednou odpoveďou:",
      // "Otázky hodnotové s jednou odpoveďou",
      // "Otázky typu pravda/nepravda",
      // "Otázky s viacnásobnou odpoveďou",
      // "Otázky kde sú všetky odpovede správne",
      // "Modelové situácie"