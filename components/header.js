import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Colors} from '../styles/global'



export default function Header({title, nav}) {

           return (
            <View style={styles.header}>
                  <TouchableOpacity onPress={() => {nav.openDrawer()}} style={styles.menuContainer}>

                              <MaterialCommunityIcons  name="menu" size={34} color={Colors.black} />
                         
                  </TouchableOpacity>

                  <Text style={styles.title}>{title}</Text>
            </View>
           ) 
}

const styles = StyleSheet.create({
      header: {
            paddingTop: 38,
            backgroundColor: Colors.header,
            display: "flex",
            flexDirection: "row"
      },
      title: {
            textAlign: 'center',
            color: Colors.white,
            fontSize: 24,
            fontFamily: 'AndadaSC-Regular',
            flex: 10,
            textAlignVertical: 'center'
      },
      menuContainer: {
            justifyContent: 'flex-end',
            padding: 12,
            flex: 1
      },
})