import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ImageBackground, FlatList, Text, Dimensions} from 'react-native';
import { TextInput } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';


import Header from '../header';
import TrafficSignDetails from '../trafficSign/trafficSignDetails';
import {Colors} from '../../global/globalStyles';
export default function TrafficSignsFromSection({navigation}) {
      
      const {title, traffSigns} = navigation.state.params;
      const [filterResult, setFilterResult] = useState(traffSigns)
      const [enableSearch, setEnableSearch] = useState(false);


      useEffect(() => {
            if(!enableSearch) {
                  setFilterResult(traffSigns);
            }
      },[enableSearch]);

      return (
            <View style={styles.container}>
                  <ImageBackground source={require('../../assets/images/introBCKG.png')} style={styles.image}>

                       <Header title={title} nav={navigation} searchBar={{enableSearch,setEnableSearch}}/>

                        {enableSearch ? <TextInput
                                          multiline={true}
                                          mode='outlined'
                                          placeholder="na vyhľadanie stačí aj časť z názvu"
                                          label="hľadať podľa názvu..."
                                          onChangeText={text => filterByName(text)}
                                          style={{opacity:0.7}}
                                          theme={{ colors: { primary: Colors.primary}}}
                                    /> : null}

                       <FlatList
                                    data={filterResult}
                                    renderItem={({item, index}) => <TrafficSignDetails trafficSignObject={item}/>}
                                    keyExtractor={(item, index) => index.toString()}

                              />      

                  </ImageBackground>
            </View>

      );

      function filterByName(text) {
            setFilterResult(traffSigns.filter(function (e) {
                  return e.title.toUpperCase().indexOf(text.toUpperCase()) > -1
            }))
      }
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