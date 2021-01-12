import React, { useState, useEffect } from 'react';

// import { Swiper, SwiperSlide} from 'swiper/react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, FlatList, Button  } from "react-native";
import { BackHandler } from 'react-native';


import {Colors} from '../global/globalStyles';
import Header from '../components/header';
import FirstAidAnswer from '../components/firstAidAnswer';
import { useLinkedState } from "use-linked-state";

import ViewPager from '@react-native-community/viewpager';

    
export default function FirstAidTest(props) {
      

      const {navigation} = props
      let mysharedStatesArray = Array();
      let completedAnswering = Array();
      const [componentUnMount, setComponentUnMount] = useState(false);

      // const [answer, setanswered] =  useLinkedState(mysharedStatesArray);



      useEffect(() => {

            BackHandler.addEventListener('hardwareBackPress', () => {});
            // if(componentUnMount){
                  console.log("ComponentUnMount ",props);
                  // mysharedStatesArray = null;
                  // completedAnswering = null;
            //       setComponentUnMount(false)
            // }
      })    

      function generateQuestions() {
            let {data} = navigation.state.params;

            return data.map((question, indexQuest) => {
                  // mysharedStatesArray.push(useStatesharedStatesArray({answered:false,correctAnswered:false}));
                  let answerStates = Array()
                  question.answers.forEach((value, index)=> {
                        answerStates.push(useState({answerChosen:false, correctnessOfanswer: false, answerI: index}))
                  })
                  mysharedStatesArray.push(answerStates);
                  completedAnswering.push(useState(false))

                  return <View style={{flexDirection:'column'}} key={indexQuest}>
                        
                             <View style={{flex:1}}></View>

                              <View style={{flex: 10, flexDirection: 'row'}}>

                                    <View style={{flex:1}}></View>
                                    <View style={{flex:10, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                          <View style={{flex:3}}><Text style={{color: Colors.white, textAlign: 'center', textAlignVertical: 'center', flex: 1}}>{question.question}</Text></View>
                                           <View style={{flex:3}}>
                                           <FlatList
                                                data={question.answers}
                                                renderItem={({item, index}) => <FirstAidAnswer answerText={item.answer} correctness={item.correctness} sharedStates={mysharedStatesArray[indexQuest]} indexAnswer={index} category={question.sectionGroup} completed={completedAnswering[indexQuest]}/>}
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

      return ( 
            <View style={styles.container}>
                  <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                       <Header title={navigation.state.params.title} nav={navigation}/>

                      
                        <View style={{
                              flexWrap:'wrap', 
                              width: Dimensions.get('window').width, 
                              padding: 10, 
                              backgroundColor: Colors.brown}}>

                                          <TouchableOpacity style={{}}>
                                                <Image source={require('../assets/icons/close.png')} style={{width: 25, height: 25}}/>
                                          </TouchableOpacity>

                        </View>

                        <Button title="DAJ MI AKTUALNE DATA" onPress={()=> {
                              console.log("\n\n\n")
                              completedAnswering.forEach(stateObj => {
                                    const [answer, setanswered] =  stateObj;
                  
                                          console.log("answered ",answer);
                              })
                              mysharedStatesArray.forEach(arrayObj => {
                                    console.log("\n");
                                    arrayObj.forEach(stateObj => {
                                          const [answer, setanswered] =  stateObj;
                  
                                          console.log("answer ",answer);
                                    })
                                    
                              })
                        }}/>
                       <ViewPager style={{backgroundColor: 'transparent', flex: 1,}} initialPage={0}>
                                    {generateQuestions()}
                              
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