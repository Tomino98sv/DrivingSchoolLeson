import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Header from '../components/header';
import { Colors } from '../global/globalStyles';
import { Switch } from 'react-native-paper';

import { connect } from 'react-redux';
import {change_immediately_answer_rating} from '../stateManagement/actions/settings'

function Settings(props) {
          
            return ( 
                  <View style={styles.container}>
                        <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                             <Header title="Nastavenia" nav={props.navigation}/>
                        
                        <View style={{flexWrap: 'wrap', padding: 20, backgroundColor: Colors.primary, flexDirection: 'row'}}>

                              
                              <Switch color={Colors.yellow} value={props.rate_answr_immid} onValueChange={ (changed) => {props.switchValueFor_RAI(changed);}} />

                               
                              <Text style={{color: 'white'}}>Ohodnotit  odpovede hned je {props.rate_answr_immid ? "zapnute":"vypnute"}</Text>
                        </View>

                        </ImageBackground>
                  </View>  
              )
}


//how to get store data into component
const mapStateToProps = (state) => {
      return {
            rate_answr_immid: state.setting.rate_answer_immidiately
      } 
}

//how to call an action on store
const mapDispatchToProps = (dispatch) => { //tu je action
      return {
            switchValueFor_RAI: (value) => dispatch(change_immediately_answer_rating(value))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)


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