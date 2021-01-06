import React, { useState } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Colors} from '../global/globalStyles'
import { Avatar  } from 'react-native-elements';


export default function TrafficSignItem({title}) {

      const [downloaded, setDownloaded] = useState(false);


           return (
            <View style={styles.cardContainer}>
                  <View style={{flex: 5}}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={{flexDirection: 'row', width: (Dimensions.get('window').width/3), justifyContent: 'space-between',}}>
                              <Avatar rounded source={require('../assets/icons/correct.png')} size={40}/>
                              <Avatar rounded source={require('../assets/icons/correct.png')} size={40}/>
                              <Avatar rounded source={require('../assets/icons/correct.png')} size={40}/>   
                        </View>
                  </View>
                  <Image
                              source={downloaded ? require('../assets/icons/correct.png') : require('../assets/icons/icloud-download-475016.png')}
                              style={styles.iconDownload}
                              />
            </View>
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
            padding: 25

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
            width: 40,
            flex: 1,

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