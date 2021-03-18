import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, FlatList, TouchableOpacity, Button } from 'react-native';
import Header from '../components/header';
import DrivingTestItem from '../components/drivingTest/drivingTestItem';
import {A_B, C_D_T} from '../assets/sources/drivingTestNumbers'
import {Colors} from '../global/globalStyles';
import {getListOfInsertedQuestions} from '../global/services';


export default function Tests({navigation}) {
          
      const [showA_B,setShowA_B] = useState(true);
      const alreadyDownl = useRef([]);
      const [alreadyDownlFinished,setAlreadyDownlFinished] = useState(false);

      useEffect(() => {
           
                  getListOfInsertedQuestions(result => {
                        alreadyDownl.current = result;
                        setAlreadyDownlFinished(true);
                  })

            return () => {
                  console.log("Component Tests UnMount ")
            }
      }); 

      return ( 
            <View style={styles.container}>
                  <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                       <Header title="testy" nav={navigation}/>


                        <View style={{display:'flex', width: Dimensions.get('window').width, flexDirection: 'row'}}>
                              <TouchableOpacity activeOpacity={.8} style={{width: Dimensions.get('window').width/2}} onPress={() => {setShowA_B(true)}}>
                                    <Text style={[{backgroundColor: Colors.brown, padding: 5}, styles.buttonText]}>Skupina A+B</Text>
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={.8} style={{width: Dimensions.get('window').width/2}} onPress={() => {setShowA_B(false)}}>
                                    <Text style={[{backgroundColor: Colors.acient_acient, padding: 5}, styles.buttonText]}>Skupina C+D+T</Text>
                              </TouchableOpacity>
                        </View>
                        {(showA_B && alreadyDownlFinished) && <FlatList
                                    data={A_B}
                                    renderItem={({item, index}) => <DrivingTestItem numberTest={item} alreadyDownloaded={alreadyDownl.current[item]} nav={navigation} />}
                                    keyExtractor={(item, index) => index.toString()}

                              />} 
                        {(!showA_B  && alreadyDownlFinished) && <FlatList
                                    data={C_D_T}
                                    renderItem={({item, index }) => <DrivingTestItem numberTest={item} alreadyDownloaded={alreadyDownl.current[item]} nav={navigation} />}
                                    keyExtractor={(item, index) => index.toString()}

                              />} 

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
      buttonText: {
            textAlign: 'center',
            color: Colors.white,
            fontSize: 22,
            fontFamily: 'AndadaSC-Regular',
            textAlignVertical: 'center'
      }
})