import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

interface HeaderProps {
      title: string
}

export default class Header extends Component<HeaderProps> {

      constructor(props: HeaderProps) {
            super(props);
      }

      render() {
           return (
            <View style={styles.header}>
                  <Text style={styles.title}>{this.props.title}</Text>
            </View>
           ) 
      }
}

const styles = StyleSheet.create({
      header: {
            height: 80,
            paddingTop: 38,
            backgroundColor: '#BB968E'
      },
      title: {
            textAlign: 'center',
            color: 'white',
            fontSize: 24,
            fontFamily: 'AndadaSC-Regular'
      }
})