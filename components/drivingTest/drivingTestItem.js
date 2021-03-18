import React, { useState, useEffect, useRef } from 'react';

import * as ExpoFileSystem from 'expo-file-system';

import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Alert  } from "react-native";
import {Colors} from '../../global/globalStyles';
import { deleteDrivingTestQuestionsByNumber, downloadDrivingTestQuestions, getDrivingTestQuestionsByNumber} from '../../global/services';

export default function DrivingTestItem({nav,numberTest,alreadyDownloaded}) {
      
      const [downloaded, setDownloaded] = useState(alreadyDownloaded);
      const [loading, setLoading] = useState(false);

      const isDataFiiled = useRef(false)

      const [operationInProcess, setOperationInProcess] = useState('');
      const errorOccure = useRef(false);

      let data = new Array();

      useEffect(() => {
           
                  // if(operationInProcess==''){
                  //       setDownloaded(alreadyDownloaded)
                  // }
                  if(alreadyDownloaded && !isDataFiiled.current){
                              getDrivingTestQuestionsByNumber(numberTest, result => {
                                    if(result.length !== 0) {
                                          data = result;
                                          isDataFiiled.current = true;
                                    }
                              })
                  }

            return () => {
                  console.log("Component DrivingTestItem UnMount "+numberTest)
            }
          }); 

      async function downloadImages() {

            var sectionDir = ExpoFileSystem.documentDirectory+"/images/drivingTests/tstNumb_"+numberTest+"/";

            const metaDataDir = await ExpoFileSystem.getInfoAsync(sectionDir);
            const isDir = metaDataDir.isDirectory;
            if (!isDir) {
                try {
                    await ExpoFileSystem.makeDirectoryAsync(
                        sectionDir,
                        { intermediates: true }
                    ).then(() => {
                        var arrayUri_UrlImages = [];

                        data.forEach((driveTest) => {
                              if(driveTest.imageURL != null) {
                                    var uri = ExpoFileSystem.documentDirectory+"/images/drivingTests/tstNumb_"+numberTest+"/img_questID_"+driveTest.id;
                                    arrayUri_UrlImages.push({Url: driveTest.imageURL, Uri: uri});
                              }

                        });
                        storeImages(arrayUri_UrlImages);
                    });
                } catch (e) {
                    console.info("ERROR", e);
                }
            }else {
                  var arrayUri_UrlImages = [];

                  data.forEach((driveTest) => {
                        if(driveTest.imageURL != null) {
                              var uri = ExpoFileSystem.documentDirectory+"/images/drivingTests/tstNumb_"+numberTest+"/img_questID_"+driveTest.id;
                              arrayUri_UrlImages.push({Url: driveTest.imageURL, Uri: uri});
                        }
                  });
                  storeImages(arrayUri_UrlImages);
            }

      }  

      async function storeImages(arrayUri_UrlImages) {

            var count = 0;
            var allImages = arrayUri_UrlImages.length;

            arrayUri_UrlImages.forEach((obj) => { 
                  ExpoFileSystem.getInfoAsync(obj.Uri)
                  .then(result => {
                  if(result.exists){
                  }else {
                        errorOccure.current == false ?
                        ExpoFileSystem.downloadAsync(obj.Url,obj.Uri)
                        .then(({ uri }) => {
                              count++;
                              if(count == allImages){
                                    setLoading(false);
                                    setDownloaded(true);
                                    setOperationInProcess('');
                              }
                        })
                        .catch((error) => {
                              console.error(error);
                              setLoading(false);
                              setDownloaded(false);
                              setOperationInProcess('');
                              if(!errorOccure.current) {
                                    Alert.alert(
                                          'Problem with downloading images',
                                          'Check your network connection',
                                          [
                                            { text: 'OK', onPress: () => {} }
                                          ],
                                          { cancelable: true }
                                        );
                                        errorOccure.current = true;

                              }
                        }) : null;
                  }
            })

            });


      }
      
      async function removeDirectoryWithImages() {
            var sectionDir = ExpoFileSystem.documentDirectory+"/images/drivingTests/tstNumb_"+numberTest+"/";
            return await ExpoFileSystem.deleteAsync(sectionDir);
      }

      return (
            <TouchableOpacity style={styles.cardContainer} disabled={!downloaded} onPress={() => {}}>

                  <View style={{flex: 3, marginTop: 25, marginBottom: 25}}>
                        <Text style={styles.title}>{numberTest}</Text>
                        {/* <View style={{flexDirection: 'row', width: (Dimensions.get('window').width/3), justifyContent: 'space-between'}}>

                        </View> */}
                  </View>

                  <View style={{flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>

                  {downloaded ? 
                  <TouchableOpacity onPress={() => {deleteDrivingTestQuestionsByNumber(numberTest, confirm => {
                        if(confirm) {
                              removeDirectoryWithImages().then(() => {
                                    setDownloaded(false);
                                });
                        }else {
                              alert("error while deleting question and answers from ",numberTest) 
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
                        downloadDrivingTestQuestions(numberTest, value => {
                              if(value) {
                                    getDrivingTestQuestionsByNumber(numberTest, result => {
                                          if(result.length !== 0) {
                                                data = result;
                                                isDataFiiled.current = true;
                                                setOperationInProcess("Downloading images");
                                                downloadImages();

                                          }
                                    })
                              }else {
                                    alert("error while downloading question and answers from ",numberTest) 
                                    setDownloaded(false);
                                    setLoading(false);
                                    setOperationInProcess("");
                              }
                        })}
                        } style={{alignItems: 'center', justifyContent: 'center', flex: 3}} disabled={downloaded}>
                              { loading ? <View><ActivityIndicator size="large" color={Colors.yellow}/><Text style={{color:Colors.white, fontSize: 15}}>{operationInProcess}</Text></View> : <Image
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