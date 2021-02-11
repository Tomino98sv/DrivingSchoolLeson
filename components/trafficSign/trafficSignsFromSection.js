import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, FlatList} from 'react-native';
import * as FileSystem from 'expo-file-system';


import Header from '../header';
import TrafficSignDetails from '../trafficSign/trafficSignDetails';

export default function TrafficSignsFromSection({navigation}) {
      
      const {title, traffSigns} = navigation.state.params;

      useEffect(() => {
            console.log(FileSystem.documentDirectory);
      });

      return (
            <View style={styles.container}>
                  <ImageBackground source={require('../../assets/images/introBCKG.png')} style={styles.image}>

                       <Header title={title} nav={navigation}/>

                       <FlatList
                                    data={traffSigns}
                                    renderItem={({item, index}) => <TrafficSignDetails trafficSignObject={item}/>}
                                    keyExtractor={(item, index) => index.toString()}

                              /> 

                  </ImageBackground>
            </View>

      );
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
      }
})


// const fileUri: string = `${FileSystem.documentDirectory}${filename}`;
// const downloadedFile: FileSystem.FileSystemDownloadResult = await FileSystem.downloadAsync(uri, fileUri);

// if (downloadedFile.status != 200) {
//   handleError();
// }