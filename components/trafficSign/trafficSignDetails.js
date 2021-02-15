import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated, Modal,TouchableOpacity,ScrollView,TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {Colors} from '../../global/globalStyles';
import * as ExpoFileSystem from 'expo-file-system';


export default function TrafficSignDetails({trafficSignObject}) {

      const [showMoreInfo, setShowMoreInfo] = useState(false);
      const [moreInfoAnime, setMoreInfoAnime] = useState(new Animated.Value(0));
      const [modalVisible, setModalVisible] = useState(false);
      const [modalUri, setModalUri] = useState("");


      function createTextWithImages() {
            var arrayTxt = trafficSignObject.body.split(/({\d+})/);

            arrayTxt.forEach((item, index) => {
                  if(item.startsWith("{")){
                        arrayTxt[index] = <TouchableOpacity onPress={() => {setModalUri(ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+trafficSignObject.section+"/"+trafficSignObject.title+"__"+item.charAt(1));setModalVisible(true)}}>
                                                <Image 
                                                      key={trafficSignObject.title+"__"+item.charAt(1)}
                                                      source={{uri: ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+trafficSignObject.section+"/"+trafficSignObject.title+"__"+item.charAt(1)}}
                                                      style={{
                                                            width: 40,
                                                            height: 40,
                                                            resizeMode:"contain"}}
                                                            />          
                                          </TouchableOpacity>
                  }else {
                        arrayTxt[index] = item;
                  }

            });

            return arrayTxt
      }

      return (
            <View>      
                  <View style={styles.cardContainer}>
                        <View style={{flex: 1, margin: 8}}>
                        <Image
                              source={{uri: ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+trafficSignObject.section+"/"+trafficSignObject.title}}
                              style={{ flex: 1,
                                    width: null,
                                    height: null,
                                    resizeMode: 'contain'}}
                              />
                        </View>
                        
                        <View style={{flexDirection:'column',flex:5}}>
                              <Text style={[styles.title,{flex:1}]}>{trafficSignObject.title}</Text>
                              <MaterialCommunityIcons  name={showMoreInfo ? "chevron-up":"chevron-down"} size={34} color={Colors.white} style={{alignSelf: 'flex-end', marginRight: 20}} onPress={() => {setShowMoreInfo(!showMoreInfo);}} />
                        </View>

                  </View>

                        {showMoreInfo ? <View style={[{flex:1, marginBottom: 3, marginLeft: Dimensions.get('window').width/12, marginRight: Dimensions.get('window').width/12}]}>


                        <View style={{flex:1, backgroundColor: Colors.primary, alignItems: 'center', padding: 8}}>
                              <Image
                                    source={{uri: ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+trafficSignObject.section+"/"+trafficSignObject.title}}
                                    style={{ 
                                          alignItems: "center", 
                                          justifyContent: "center",
                                          width: Dimensions.get("window").width/2,
                                          height: Dimensions.get("window").height/4,
                                          resizeMode: 'contain'}}

                              />
                        </View>
                        <View style={{flex:1, backgroundColor: Colors.acient}}>
                              {trafficSignObject.assistantImages.length  != 0 ? <Text style={[styles.text]}>{createTextWithImages()}</Text> :  <Text style={[styles.text,{flex:5}]}>{trafficSignObject.body}</Text>}
                        </View>
                        </View> : null}

                        <Modal
                              animationType="fade"
                              transparent={true}
                              visible={modalVisible}
                              onRequestClose={() => {
                                    setModalUri("");
                              }}>
                              <TouchableOpacity 
                                    style={{flex:1}} 
                                    activeOpacity={1} 
                                    onPressOut={() => {setModalVisible(false)}}
                                    >
                                          <ScrollView 
                                                directionalLockEnabled={true} 
                                                contentContainerStyle={styles.centeredView}
                                          >
                                          <TouchableWithoutFeedback>
                                                <View style={styles.modalView}>
                                                <Image
                                                      source={{uri: modalUri}}
                                                      style={{ 
                                                            alignItems: "center", 
                                                            justifyContent: "center",
                                                            width: Dimensions.get("window").width/2,
                                                            height: Dimensions.get("window").height/4,
                                                            resizeMode: 'contain'}}/>
                                                </View>
                                          </TouchableWithoutFeedback>
                                          </ScrollView>
                              </TouchableOpacity>
                        </Modal>


            </View>
                  
      );

}


// interface assistantImgUrlModel {
//       id: number,
//       index: number,
//       url: string,
//   }
  
//   interface TrafficSignsModel {
//       id: number,
//       title: string,
//       body: string,
//       imgUrl: string,
//       section: string,
//       assistantImages: Array<assistantImgUrlModel>,
//   }

const styles = StyleSheet.create({
      cardContainer: {
            borderWidth: 1,
            flexDirection: 'row',
            flex: 1,
            backgroundColor: Colors.light_primary,
            // elevation: 5

            // shadowColor: "#000",
            // shadowOffset: {
	      //       width: 0,
	      //       height: 4,
            // },
            // shadowOpacity: 0.30,
            // shadowRadius: 4.65,

      },
      title: {
            textAlign: 'center',
            color: Colors.white,
            fontSize: 20,
            fontFamily: 'MerriweatherSans-Medium',
            // fontFamily: 'AndadaSC-Regular',
            textAlignVertical: 'center',
            padding: 15
      },
      text: {
            textAlign: 'center',
            color: Colors.white,
            fontSize: 15,
            fontFamily: 'MerriweatherSans-Medium',
            // fontFamily: 'AndadaSC-Regular',
            margin: 20,
      },
      infoContainer: {
            alignSelf: 'center',
            color: 'black',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: (Dimensions.get('window').width/10) * 6,
            backgroundColor: 'white',
            opacity: 0.7,
      },
      centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          },
      modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },

})