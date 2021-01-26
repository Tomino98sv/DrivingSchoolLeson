import React, { useState, useEffect, useRef } from 'react';

// import { Swiper, SwiperSlide} from 'swiper/react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, FlatList, Button, Alert, BackHandler   } from "react-native";

import SwipeRender from "react-native-swipe-render";

import {Colors} from '../../global/globalStyles';
import Header from '../header';
import FirstAidAnswer from '../firstAid/firstAidAnswer';
import FirstAidAnswer_Evaluating from '../firstAid/firstAidAnswer_Evaluating';


import ViewPager from '@react-native-community/viewpager';

export default function FirstAidTest(props) {

      const {navigation} = props
      let mysharedStatesArray = Array();
      let completedAnswering = Array();

      const categoryQuestion = navigation.state.params.title;
      const pauseTiming = useRef(false);
      const intervalTimer = useRef();
      const setPageOnViewPager = useRef();
      const evaluation = useRef(false);
      const [currentPage, setCurrentPage] = useState(0);
      const [answersCompleted, setAnswersCompleted] = useState(0);
      const [backButton, setBackButton] = useState(false);
      const [time, setTime] = useState("00:00");

      const onPageScroll = (event) => {
            const {position} = event.nativeEvent;
              if(position !== currentPage) {
                  setCurrentPage(position);
             }
      } 

      useEffect(() => {

                  initializeTimer();
                  BackHandler.addEventListener('hardwareBackPress', () => {
                        getAlert();
                        return true;
                  });

            return () => {
                  console.log("ComponentUnMount");
                  clearInterval(intervalTimer.current);
                  navigation.navigate('FirstAid');
            }

      }, [backButton])   

      useEffect(() => {
            var count = 0;
            completedAnswering.forEach(stateObj => {
                  if(stateObj.current){
                        count++;
                  }
            });
            if(count == navigation.state.params.data.length) {
                  clearInterval(intervalTimer.current)
                  if(!evaluation.current){            //nejako to neprepina na poslednu stranu....viewpager indexuje od 0
                        setPageOnViewPager.current.setPage(9)
                  }
                  pauseTiming.current = true;
                  evaluation.current = true;
            }
            setAnswersCompleted(count);

      }, [completedAnswering])   
      

      function getAlert() {
            pauseTiming.current = true;
            Alert.alert("Exit Test?", "Are you sure you want to exit test", [{ text: "Cancel", onPress: () => {pauseTiming.current=false}, style: "cancel" }, { text: "Leave", onPress: () => {setBackButton(true)} }], { cancelable: false });
      }

      function initializeTimer() { 
            var counter = 0;
            intervalTimer.current = setInterval(() => {
                  // console.log("interval works")
                        if(!pauseTiming.current) {
                              counter++;
                              var minutes = parseInt(counter / 60, 10);
                              var seconds = parseInt(counter % 60, 10); 
            
                              minutes = minutes < 10 ? "0"+minutes : minutes;
                              seconds = seconds < 10 ? "0"+seconds : seconds;
                              
                              setTime(minutes+":"+seconds);
                        }

            }, 1000);
      }


      function generateQuestions() {
            // countgenerateQuestions++;
            // console.log("calling generateQuestions  ",countgenerateQuestions," time ",time);

            let {data} = navigation.state.params;

            return data.map((question, indexQuest) => {

                  var answerStates = Array();


                  question.answers.forEach((value, index)=> {
                        answerStates.push(useState({answerChosen:false, correctnessOfanswer: false, answerI: index}))
                  })
                  mysharedStatesArray.push(answerStates);
                  completedAnswering.push(useRef(false))

                  return <View style={{flexDirection:'column'}} key={indexQuest}>


                             <View style={{flex:1}}></View>

                              <View style={{flex: 10, flexDirection: 'row'}}>

                                    <View style={{flex:1}}></View>
                                    <View style={{flex:10, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>


                                    <View style={{marginTop: -20, flexDirection:'row',width: '100%'}}>
                                          <View style={{justifyContent: 'flex-start'}}>
                                                <Text style={{backgroundColor: Colors.white, borderRadius: 8, padding: 5, marginLeft: 5, fontFamily: 'MerriweatherSans-Medium', textAlign: 'center'}}>Otázka: {indexQuest+1} </Text>
                                          </View>
                                          <View style={{alignItems:'flex-end', flex: 1}}>
                                                {evaluation.current && <TouchableOpacity style={{marginRight: -15,alignContent: 'flex-end'}} onPress={() => {getAlert()}}>
                                                                        <Image source={require('../../assets/icons/close.png')} style={{width: 35, height: 35}}/>
                                                </TouchableOpacity> }
                                          </View>
                                    </View>

                                    

                                          <View style={{flex:3}}><Text style={{color: Colors.white, textAlign: 'center', textAlignVertical: 'center', flex: 1, paddingLeft: 15, paddingRight: 15}}>{question.question}</Text></View>
                                           <View style={{flex:3, marginTop: 5, alignSelf: 'stretch'}}>
                                                <FlatList
                                                      data={question.answers}
                                                      renderItem={({item, index}) => evaluation.current ? <FirstAidAnswer_Evaluating answerText={item.answer} correctness={item.correctness} sharedStates={mysharedStatesArray[indexQuest]} indexAnswer={index}/> : <FirstAidAnswer indexQ={indexQuest} answerText={item.answer} correctness={item.correctness} sharedStates={mysharedStatesArray[indexQuest]} indexAnswer={index} viewPager={setPageOnViewPager} currentPage={currentPage} category={categoryQuestion} completed={completedAnswering[indexQuest]}/>}
                                                      keyExtractor={(item, indexAnswerArray) => indexAnswerArray.toString()}/>
                                          </View>
                                          <View style={{flex: 1}}></View> 
                                    </View>
                                    <View style={{flex:1}}></View>

                              </View>

                              <View style={{flex:1}}></View> 

                  </View>
            })
      }

      function generateEvaluation() {
            let countCorrectAnswer = 0

            mysharedStatesArray.forEach(arrayStateAnswers => {
                  // console.log("\n\none question: \n");
                  arrayStateAnswers.forEach(answerState => {
                        let [answer] = answerState;

                        if(categoryQuestion == "Otázky z jednou odpoveďou:" || categoryQuestion == "Otázky hodnotové s jednou odpoveďou" || categoryQuestion == "Otázky typu pravda/nepravda" || categoryQuestion == "Modelové situácie") {
                              if(answer.answerChosen && answer.correctnessOfanswer){
                                    countCorrectAnswer++;
                              }
                        }
                        if ( categoryQuestion == "Otázky s viacnásobnou odpoveďou") {

                        }
                  })
                  if ( categoryQuestion == "Otázky kde sú všetky odpovede správne") {
                              countCorrectAnswer++;
                  }
            })

            return <View style={{flexDirection:'column'}}>


                  <View style={{flex:1}}></View>

                  <View style={{flex: 10, flexDirection: 'row'}}>

                        <View style={{flex:1}}></View>
                        <View style={{flex:10, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                                

                                                <TouchableOpacity style={{alignSelf: 'flex-end', marginTop: -20, marginRight: -15}} onPress={() => {getAlert()}}>
                                                                        <Image source={require('../../assets/icons/close.png')} style={{width: 35, height: 35}}/>
                                                </TouchableOpacity> 

                                                <View style={{flexDirection: 'column', width: '100%', paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 10 }}>     
                                                                        <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>{navigation.state.params.title} absolvovaný</Text>
                                                                        <Text style={{color: 'red', fontSize: 15, textAlign: 'center'}}> Neuspesne</Text>
                                                </View>

                                                <View style={{flex:7, width: '100%', backgroundColor: Colors.acient, flexDirection: 'column'}}>
                                                            <View style={{flexDirection: 'row', padding: 15}}>
                                                                  <Text style={{flex: 3, textAlign: 'left', fontSize: 15, fontFamily: 'MerriweatherSans-Medium', color: Colors.white}}>Čas</Text>
                                                                  <View style={{flex: 1, alignItems: 'center',backgroundColor: Colors.white, borderRadius: 8,}}>
                                                                        <Text style={{padding: 10, fontSize: 12, fontFamily: 'MerriweatherSans-Medium'}}>{time}</Text>
                                                                  </View>
                                                            </View>     

                                                            <View style={{flexDirection: 'row', padding: 15}}>
                                                                  <Text style={{flex: 3, textAlign: 'left', fontSize: 15, fontFamily: 'MerriweatherSans-Medium', color: Colors.white}}>Spravnost</Text>
                                                                  <View style={{flex: 1, alignItems: 'center',backgroundColor: Colors.white, borderRadius: 8,}}>
                                                                        <Text style={{backgroundColor: Colors.white, borderRadius: 8, padding: 10, fontSize: 12, fontFamily: 'MerriweatherSans-Medium'}}>{countCorrectAnswer} / {navigation.state.params.data.length}</Text>
                                                                  </View>
                                                            </View>     

                                                </View>


                                                <View style={{width: '100%', flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                                                                  <TouchableOpacity style={{}} onPress={() => {}}>
                                                                        <ImageBackground source={require('../../assets/images/repeatTestBtn.png')} style={{width: 220, height: 50, justifyContent: 'center'}}>
                                                                              <Text style={{color: 'white', fontSize: 15, alignSelf: 'center', marginTop: -15, fontFamily: 'MerriweatherSans-Medium'}}>Zopakovat test</Text>
                                                                        </ImageBackground>
                                                                  </TouchableOpacity>
                                                </View>

                        </View>
                        <View style={{flex:1}}></View>

                  </View>

                  <View style={{flex:1}}></View> 

            </View>
                  
      }

      return ( 
            <View style={styles.container}>
                  <ImageBackground source={require('../../assets/images/introBCKG.png')} style={styles.image}>

                       <Header title={categoryQuestion} nav={navigation}/>

                      
                        {!evaluation.current && <View style={{
                              flexDirection: 'row',
                              width: Dimensions.get('window').width, 
                              padding: 15, 
                              backgroundColor: Colors.brown,
                              borderBottomRightRadius: 15,
                              borderBottomLeftRadius: 15}}>


                                          <View style={{flex: 1, margin: 2, alignItems: 'center', backgroundColor: Colors.white, borderTopRightRadius: 0, borderBottomLeftRadius: 16, borderBottomRightRadius: 0, borderTopLeftRadius: 8, padding: 5}}>
                                                <Text style={{fontFamily: 'MerriweatherSans-Medium'}}>Čas: {time}</Text>
                                          </View>

                                          <View style={{flex: 1, flexGrow: 2, margin: 2, alignItems: 'center', backgroundColor: Colors.white, borderTopRightRadius: 8, borderBottomLeftRadius: 0, borderBottomRightRadius: 16, borderTopLeftRadius: 0, padding: 5}}>
                                                <Text style={{fontFamily: 'MerriweatherSans-Medium'}}>Zodpovedané otázky: {answersCompleted}  / {navigation.state.params.data.length} </Text>
                                          </View>
                                          <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',  padding: 5}} onPress={() => {getAlert()}}>
                                                <Image source={require('../../assets/icons/close.png')} style={{width: 35, height: 35}}/>
                                          </TouchableOpacity>

                        </View>}
                       <ViewPager style={{backgroundColor: 'transparent', flex: 1,}} initialPage={0} onPageScroll={onPageScroll}
                        ref={(viewPager) => {setPageOnViewPager.current = viewPager}}>

                                    {generateQuestions()}
                                    {evaluation.current && generateEvaluation()}
                              
                        </ViewPager>


                        <SwipeRender />
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