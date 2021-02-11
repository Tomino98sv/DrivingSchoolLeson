import React, { useState, useEffect } from 'react';

import * as ExpoFileSystem from 'expo-file-system';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator, Button  } from "react-native";
import { Avatar  } from 'react-native-elements';
import {Colors} from '../../global/globalStyles';
import { downloadTrafficSigns, deleteTrafficSignsBySection, getTrafficSignBySection} from '../../global/services';

export default function TrafficSignItem({nav,section}) {
      
      const [downloaded, setDownloaded] = useState(false);
      const [loading, setLoading] = useState(false);
      const [operationInProcess, setOperationInProcess] = useState('');

      let data = new Array();

      useEffect(() => {
           
            getTrafficSignBySection(section, result => {
                  // console.log(numberTest," data: ",result)
                  if(result.length !== 0) {
                        
                        data = result;

                        console.log("result ", result.length);
                        console.log("data ", data.length);

                        setDownloaded(true);
                  }
            })

            return () => {
                  // console.log("Component FirstAidItem UnMount ",title)
            }
          }); 

      async function findOutIfImagesIsAlreadyStored() {

            var imgDir = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/";

            const metaDataDir = await ExpoFileSystem.getInfoAsync(imgDir);
            const isDir = metaDataDir.isDirectory;
            if (!isDir) {
                  console.log(" not exists" );
                try {
                    await ExpoFileSystem.makeDirectoryAsync(
                        imgDir,
                        { intermediates: true }
                    ).then(() => {
                          console.log("directory created");
                        data.forEach((traff) => {
                              var uri = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+traff.title;
                              traff.assistantImages.forEach(assistImg => {
                                    var uri = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+traff.title+"__"+assistImg.index;
                                    storeImage(assistImg.url,uri);

                              })
                              storeImage(traff.imgUrl,uri);
                        })
                    });
                } catch (e) {
                    console.info("ERROR", e);
                }
            }else {
                  console.log(" exists" );
                  data.forEach((traff) => {
                        var uri = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+traff.title;
                        traff.assistantImages.forEach(assistImg => {
                              var uri = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+traff.title+"__"+assistImg.index;
                              storeImage(assistImg.url,uri);

                        })
                        storeImage(traff.imgUrl,uri);
                  })
            }
      }    

      async function storeImage(url,uri) {
            console.log("calling storeImage ");
            
            await ExpoFileSystem.getInfoAsync(uri)
            .then(result => {
                  console.log(result);
                  if(result.exists){
                        console.log("file exists");
                  }else {
                        console.log("file not exists");
                        ExpoFileSystem.downloadAsync(url,uri)
                        .then(({ uri }) => {
                              console.log("Finished downloading ");
                        })
                        .catch((error) => {
                              console.error(error);
                        });
                  }
            })

      }

      async function removeDirectoryWithImages() {
            var imgDir = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/";
            return await ExpoFileSystem.deleteAsync(imgDir);

      }


      return (
            <TouchableOpacity style={styles.cardContainer} disabled={!downloaded} onPress={() => {nav.navigate('TrafficSignsFromSection', {title:section, traffSigns: data})}}>

                  <View style={{flex: 3, marginTop: 25, marginBottom: 25}}>
                        <Text style={styles.title}>{section}</Text>
                        <View style={{flexDirection: 'row', width: (Dimensions.get('window').width/3), justifyContent: 'space-between'}}>
                              <Avatar rounded source={require('../../assets/icons/correct.png')} size={40}/>
                              <Avatar rounded source={require('../../assets/icons/correct.png')} size={40}/>
                              <Avatar rounded source={require('../../assets/icons/correct.png')} size={40}/>
                        </View>
                  </View>

                  <View style={{flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>

                  {downloaded ? 
                  <TouchableOpacity onPress={() => {deleteTrafficSignsBySection(section, confirm => {
                        if(confirm) {
                              removeDirectoryWithImages().then(() => {
                                    console.log("directory destroyed");
                                    setDownloaded(false) 
                                });;
                        }else {
                              alert("error while deleting traffic signs and assists images of ",section) 
                        }
                  })}} style={{flex: 1,}}>
                                            <ImageBackground source = {require('../../assets/images/deleteShapeWithShadows.png')} style={{ width: 90, height: 35, alignSelf: 'flex-end', alignItems: 'center', elevation: 5}}>
                                            <Image
                                                source={require('../../assets/icons/trashIconAngle.png')}
                                                style={{width: 25, height: 25, margin: 5, marginLeft: 20}}
                                                />                                            

                                                </ImageBackground>

                  </TouchableOpacity> : null
                  }
      
                  <TouchableOpacity onPress={() => {  
                        setOperationInProcess("Loading data...");
                        setLoading(true);
                        downloadTrafficSigns(section, value => {
                              setLoading(false);
                              setOperationInProcess("");
                              if(value) {
                                    setDownloaded(value);
                                    getTrafficSignBySection(section, result => {
                                          // console.log(numberTest," data: ",result)
                                          if(result.length !== 0) {                    
                                                data = result;
                                                findOutIfImagesIsAlreadyStored();
                                          }
                                    })

                              }else {
                                    alert("error while downloading traffic signs of ",section) 
                                    setDownloaded(value)
                              }
                        })}
                        } style={{alignItems: 'center', justifyContent: 'center', flex: 3}} disabled={downloaded}>
                              { loading ? <View><ActivityIndicator size="large" color={Colors.yellow}/><Text style={{color:Colors.white, fontSize: 5}}>{operationInProcess}</Text></View> : <Image
                              source={downloaded ? require('../../assets/icons/correct.png') : require('../../assets/icons/icloud-download-475016_orange.png')}
                              style={styles.iconDownload}
                              />}
                        
                  </TouchableOpacity>

                  </View>

            </TouchableOpacity>
           )

}

const styles = StyleSheet.create({
      cardContainer: {
            borderWidth: 1,
            display: "flex",
            flexDirection: 'row',
            flex: 1,
            backgroundColor: Colors.primary,
            flexWrap: 'wrap',           

            // elevation: 5

            // shadowColor: "#000",
            // shadowOffset: {
	      //       width: 0,
	      //       height: 4,
            // },
            // shadowOpacity: 0.30,
            // shadowRadius: 4.65,

      },
      iconDownload: {
            height: 50,
            width: 50,
      },
      title: {
            textAlign: 'center',
            color: Colors.white,
            fontSize: 24,
            fontFamily: 'MerriweatherSans-Medium',
            // fontFamily: 'AndadaSC-Regular',
            textAlignVertical: 'center',
            padding: 15
      }
})