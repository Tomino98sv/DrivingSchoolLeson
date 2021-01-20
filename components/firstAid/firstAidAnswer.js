import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback  } from "react-native";
import {Colors} from '../../global/globalStyles';
import { connect } from 'react-redux';


function FirstAidAnswer(props) {

      const {answerText, correctness, indexAnswer, sharedStates, category, completed, viewPager, currentPage, rate_answr_immid, indexQ} = props;

      const [answer, setCurrentAnswer] =  sharedStates[indexAnswer];
      const completedRef = completed;


      useEffect(() => {

            console.log("ComponentMount FirstAidAnswer answerIndex ",indexAnswer," question Index ",indexQ);

      return () => {
            console.log("ComponentUnMount FirstAidAnswer answerIndex",indexAnswer," question Index ",indexQ);
      }

      }, [completedRef.current])  

      function onPress() {
            sharedStates.forEach((value, indx, theArray) => {
                  const [answerIterating, setAnswer] = value;
                   if(category == "Otázky z jednou odpoveďou:" || "Otázky hodnotové s jednou odpoveďou" || "Otázky typu pravda/nepravda") {
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
                   }
             })
      }


         return (
               <TouchableWithoutFeedback onPress={() => onPress()}>

            <View style={[
                  {backgroundColor: Colors.acient, flexDirection: 'row', width: Dimensions.get("window").width, marginBottom: 20, padding: 10}, 
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

                  <Text style={{color: 'white', marginLeft: 10}}>{answerText}</Text>
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