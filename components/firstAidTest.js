import React, { useState, useEffect, useRef } from 'react';

// import { Swiper, SwiperSlide} from 'swiper/react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, FlatList, Button, Alert, BackHandler   } from "react-native";


import {Colors} from '../global/globalStyles';
import Header from '../components/header';
import FirstAidAnswer from '../components/firstAidAnswer';

import ViewPager from '@react-native-community/viewpager';


let pauseTiming = false

export default function FirstAidTest(props) {

      const {navigation} = props
      let mysharedStatesArray = Array();
      let completedAnswering = Array();
      let testTimer;

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

                  console.log("ComponentMount ");
                  pauseTiming = false;
                  initializeTimer();
                  BackHandler.addEventListener('hardwareBackPress', () => {
                        getAlert();
                        return true;
                  });

            return () => {
                  console.log("ComponentUnMount");
                  clearInterval(testTimer);
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
                  pauseTiming = true;
                  evaluation.current = true;
                  setPageOnViewPager.current.setPage(navigation.state.params.data.length)
            }
            setAnswersCompleted(count);

      }, [completedAnswering])   
      

      function getAlert() {
            pauseTiming = true;
            Alert.alert("Exit Test?", "Are you sure you want to exit test", [{ text: "Cancel", onPress: () => {pauseTiming=false}, style: "cancel" }, { text: "Leave", onPress: () => {setBackButton(true)} }], { cancelable: false });
      }

      function initializeTimer() { 
            var counter = 0;
            testTimer = setInterval(function () {
                        if(!pauseTiming) {
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

                                    <Text style={{backgroundColor: Colors.white, borderRadius: 8, padding: 5, marginLeft: 5, marginTop: -20,  alignSelf: 'flex-start'}}>Otázka: {indexQuest+1} </Text>

                                          <View style={{flex:3}}><Text style={{color: Colors.white, textAlign: 'center', textAlignVertical: 'center', flex: 1}}>{question.question}</Text></View>
                                           <View style={{flex:3}}>
                                           <FlatList
                                                data={question.answers}
                                                renderItem={({item, index}) => <FirstAidAnswer answerText={item.answer} correctness={item.correctness} sharedStates={mysharedStatesArray[indexQuest]} indexAnswer={index} viewPager={setPageOnViewPager} currentPage={currentPage} category={question.sectionGroup} completed={completedAnswering[indexQuest]}/>}
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


            return <View style={{flexDirection:'column'}}>


                  <View style={{flex:1}}></View>

                  <View style={{flex: 10, flexDirection: 'row'}}>

                        <View style={{flex:1}}></View>
                        <View style={{flex:10, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>


                                                <View style={{flexDirection: 'row', width: '100%', flex: 2, margin: 10, padding: 10 }}>
                                                            <TouchableOpacity style={{flex: 2, marginLeft: 5, marginRight: 5}} onPress={() => {}}>
                                                                        <Image source={require('../assets/icons/close.png')} style={{width: 35, height: 35}}/>
                                                            </TouchableOpacity>      
                                                            <View style={{flexDirection: 'column', flex: 8}}>
                                                                        <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>{navigation.state.params.title} absolvovaný</Text>
                                                                        <Text style={{color: 'red', fontSize: 15, textAlign: 'center'}}> Neuspesne</Text>
                                                            </View>
                                                </View>

                                                <View style={{flex:7, width: '100%', backgroundColor: Colors.acient, flexDirection: 'column'}}>
                                                            <View style={{flexDirection: 'row', padding: 15}}>
                                                                  <Text style={{flex: 4, textAlign: 'center', fontSize: 15}}>Čas</Text>
                                                                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                                                                        <Text style={{backgroundColor: Colors.white, borderRadius: 8, padding: 10, fontSize: 12}}>{time}</Text>
                                                                  </View>
                                                            </View>     

                                                            <View style={{flexDirection: 'row', padding: 15}}>
                                                                  <Text style={{flex: 4, textAlign: 'center', fontSize: 15}}>Čas</Text>
                                                                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                                                                        <Text style={{backgroundColor: Colors.white, borderRadius: 8, padding: 10, fontSize: 12}}>{time}</Text>
                                                                  </View>
                                                            </View>     

                                                </View>


                                                <View style={{width: '100%', flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                                                                  <TouchableOpacity style={{}} onPress={() => {}}>
                                                                        <ImageBackground source={require('../assets/images/repeatTestBtn.png')} style={{width: 220, height: 50, justifyContent: 'center'}}>
                                                                              <Text style={{color: 'white', fontSize: 15, alignSelf: 'center', marginTop: -15}}>Zopakovat test</Text>
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
                  <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                       <Header title={navigation.state.params.title} nav={navigation}/>

                      
                        {!evaluation.current && <View style={{
                              flexDirection: 'row',
                              width: Dimensions.get('window').width, 
                              padding: 15, 
                              backgroundColor: Colors.brown}}>

                                          <TouchableOpacity style={{flex: 1}} onPress={() => {getAlert()}}>
                                                <Image source={require('../assets/icons/close.png')} style={{width: 35, height: 35}}/>
                                          </TouchableOpacity>

                                          <View style={{flex: 1, margin: 2, alignItems: 'flex-end'}}>
                                                <Text style={{backgroundColor: Colors.white, borderRadius: 8, padding: 5}}>Čas: {time}</Text>
                                          </View>

                                          <View style={{flex: 1, margin: 2, alignItems: 'flex-start', flexGrow: 2}}>
                                                <Text style={{backgroundColor: Colors.white, borderRadius: 8, padding: 5}}>Zodpovedané otázky: {answersCompleted}  / {navigation.state.params.data.length} </Text>
                                          </View>

                        </View>}
                       <ViewPager style={{backgroundColor: 'transparent', flex: 1,}} initialPage={0} onPageScroll={onPageScroll}
                        ref={(viewPager) => {setPageOnViewPager.current = viewPager}}>

                                    {generateQuestions()}
                                    {evaluation.current && generateEvaluation()}
                              
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