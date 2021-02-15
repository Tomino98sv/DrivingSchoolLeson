import React, { useState, useEffect, useRef } from 'react';

import * as ExpoFileSystem from 'expo-file-system';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator, Alert   } from "react-native";
import { Avatar  } from 'react-native-elements';
import {Colors} from '../../global/globalStyles';
import { downloadTrafficSigns, deleteTrafficSignsBySection, getTrafficSignBySection} from '../../global/services';

export default function TrafficSignItem({nav,section}) {
      
      const [downloaded, setDownloaded] = useState(false);
      const [loading, setLoading] = useState(false);

      const [operationInProcess, setOperationInProcess] = useState('');
      const errorOccure = useRef(false);

      let data = new Array();

      const exampleTraff = useRef([]);

      useEffect(() => {
           
            getTrafficSignBySection(section, result => {
                  if(result.length !== 0) {
                        
                        data = result;

                        exampleTraff.current.push(ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+data[0].title);
                        exampleTraff.current.push(ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+data[1].title);
                        exampleTraff.current.push(ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+data[2].title);

                        console.log(exampleTraff.current);
                        if(operationInProcess=='') { //to je kvoli tomu ze ked sa stahuju obrazky je useEffect zavolany a downloaded bude true skor ako by mal
                              setDownloaded(true)
                        }

                        console.log("downloaded: ",downloaded);
                        console.log("data[2]: ",data[2].title);
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
                try {
                    await ExpoFileSystem.makeDirectoryAsync(
                        imgDir,
                        { intermediates: true }
                    ).then(() => {
                        var arrayUri_UrlImages = [];

                        data.forEach((traff) => {
                              var uri = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+traff.title;
                              arrayUri_UrlImages.push({Url: traff.imgUrl, Uri: uri});

                              traff.assistantImages.forEach(assistImg => {
                                    var uri = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+traff.title+"__"+assistImg.index;
                                    arrayUri_UrlImages.push({Url: assistImg.url, Uri: uri});
                              })
                        });
                        storeImages(arrayUri_UrlImages);
                    });
                } catch (e) {
                    console.info("ERROR", e);
                }
            }else {
                        var arrayUri_UrlImages = [];

                        data.forEach((traff) => {
                              var uri = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+traff.title;
                              arrayUri_UrlImages.push({Url: traff.imgUrl, Uri: uri});

                              traff.assistantImages.forEach(assistImg => {
                                    var uri = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/"+traff.title+"__"+assistImg.index;
                                    arrayUri_UrlImages.push({Url: assistImg.url, Uri: uri});
                              })
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
                              exampleTraff.current=[]; 
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
            var imgDir = ExpoFileSystem.documentDirectory+"/images/trafficSigns/"+section+"/";
            return await ExpoFileSystem.deleteAsync(imgDir);
      }


      return (
            <TouchableOpacity style={styles.cardContainer} disabled={!downloaded} onPress={() => {nav.navigate('TrafficSignsFromSection', {title:section, traffSigns: data})}}>

                  <View style={{flex: 3, marginTop: 25, marginBottom: 25}}>
                        <Text style={styles.title}>{section}</Text>
                        <View style={{flexDirection: 'row', width: (Dimensions.get('window').width/3), justifyContent: 'space-between'}}>

                             { downloaded ? <Avatar imageProps={{resizeMode: 'contain'}} rounded source={{uri: exampleTraff.current[0]}} size={40}/> : null }
                             { downloaded ? <Avatar imageProps={{resizeMode: 'contain'}} rounded source={{uri: exampleTraff.current[1]}} size={40}/> : null }
                             { downloaded ? <Avatar imageProps={{resizeMode: 'contain'}} rounded source={{uri: exampleTraff.current[2]}} size={40}/> : null } 
                              
                        </View>
                  </View>

                  <View style={{flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>

                  {downloaded ? 
                  <TouchableOpacity onPress={() => {deleteTrafficSignsBySection(section, confirm => {
                        if(confirm) {
                              removeDirectoryWithImages().then(() => {
                                    exampleTraff.current=[]; 
                                    setDownloaded(false);
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
                              if(value) {
                                    getTrafficSignBySection(section, result => {
                                          if(result.length !== 0) {                    
                                                data = result;
                                                setOperationInProcess("Downloading images");
                                                findOutIfImagesIsAlreadyStored();
                                          }
                                    })

                              }else {
                                    alert("error while downloading traffic signs of ",section);
                                    exampleTraff.current=[]; 
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