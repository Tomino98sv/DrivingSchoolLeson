import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-native';
import { Dimensions, Modal, StyleSheet, View, Text, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Alert, ScrollView} from 'react-native';
import Header from '../components/header';
import { Colors } from '../global/globalStyles';
import { Switch } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { connect } from 'react-redux';
import {change_immediately_answer_rating, change_schedule_notifications} from '../stateManagement/actions/settings'


import DatePicker from 'react-native-date-ranges';
import * as Permissions from "expo-permissions";
import { Notifications as Notifications2 } from 'expo';
import usePermissions from 'expo-permissions-hooks';

//https://www.npmjs.com/package/react-native-date-ranges

function Settings(props) {

      // const [permission, askForPermission] = usePermissions(Permissions.NOTIFICATIONS, { ask: true });
      const [modalNotiffVisible, setModalNotiffVisible] = useState(false);
      const datePickerRef = useRef();
      const [datePicked, setDatePicked] = useState();
      const [addingNotif, setAddingNotif] = useState(false);

      sendNotificationImmediately = async () => {
            let notificationId = await Notifications2.presentLocalNotificationAsync({
              title: "schoolDrivingLesson",
              body: "Notifikacie nastavene od "+formatDate(daterangePick.startDate) + " do "+formatDate(daterangePick.endDate)
            });
            //console.log(notificationId); // can be saved in AsyncStorage or send to server
          };

      askPermissions = async () => {
            console.log("ASK PERMISIONS");
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
              const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
              finalStatus = status; 
            }
            if (finalStatus !== "granted") {
              return false;
            }
            return true;
          };

      function setNotifiDates() {
            askPermissions().then(res => {
                  if(res) {
                        sendNotificationImmediately()
                  }else {
                        getAlert()  
                  }
            })
      }  

      function getAlert() {
            Alert.alert("Notifications permission are denied", "For receiving notifications allow notifications permission for this app", [{ text: "Ok", onPress: () => {} }], { cancelable: true });
      }

      customButton = (onConfirm) => (
            <Button
                onPress={() => {setDatePicked(onConfirm())}}
                style={{ container:{ width:'80%', marginHorizontal:'3%' }, text:{ fontSize: 20 } }}
                primary
                title={'Ok'}
            />
        )

            return ( 

                  <View style={styles.container}>
                        <ImageBackground source={require('../assets/images/introBCKG.png')} style={styles.image}>

                             <Header title="Nastavenia" nav={props.navigation}/>
                        
                        <View style={{flexWrap: 'wrap', padding: 20, backgroundColor: Colors.primary, flexDirection: 'row'}}>

                              <Switch color={Colors.yellow} value={props.rate_answr_immid} onValueChange={ (changed) => {props.switchValueFor_RAI(changed);}} />
                              <Text style={{color: 'white'}}>Ohodnotit  odpovede hned je {props.rate_answr_immid ? "zapnute":"vypnute"}</Text>

                        </View>

                        <View style={{flexWrap: 'wrap', padding: 20, backgroundColor: Colors.primary, flexDirection: 'row'}}>

                              <Switch color={Colors.yellow} value={props.sched_notifi} onValueChange={ (changed) => {props.switchValueFor_SCHENOT(changed)}} />
                              <Text style={{color: 'white'}}>Notifikacie sú {props.sched_notifi ? "zapnuté" : "vypnuté"}</Text>
                              <Button style={{  }} disabled={!props.sched_notifi} title="Upraviť" onPress={() => setModalNotiffVisible(true)}/>

                        </View>


                        <Modal
                              animationType="fade"
                              transparent={true}
                              visible={modalNotiffVisible}
                              onRequestClose={() => {

                              }}>
                              <TouchableOpacity 
                                    style={{flex:1}} 
                                    activeOpacity={1} 
                                    onPressOut={() => {}}
                                    >
                                          <ScrollView 
                                                directionalLockEnabled={true} 
                                                contentContainerStyle={styles.centeredView}
                                          >
                                          <View style={styles.modalView}>
                                                <DatePicker
                                                      ref = {(ref)=> datePickerRef.current = ref}
                                                      style={ { width: 350, height: 45, borderRadius: 2 } } // style pre touchable datePickera
                                                      markText={"Výber dátumov pre notifikácie"}
                                                      customStyles = { {
                                                            placeholderText:{ fontSize:20 } // placeHolder style
                                                            //headerStyle : {  },			// title container style
                                                            //headerMarkTitle : { }, // title mark style 
                                                            //headerDateTitle: { }, // title Date style
                                                           // contentInput: {}, //content text container style
                                                           //contentText: {}, //after selected text Style
                                                      } } // optional 
                                                      centerAlign  // optional text will align center or not
                                                      allowFontScaling = {false} // optional
                                                      placeholder={datePicked}
                                                      customButton = {customButton}
                                                      mode={'range'}
                                                />
                                                {addingNotif &&
                                                <View style={{width: Dimensions.get('window').width, padding: 10}} >
                                                      <View >
                                                            <Text>Druh Testu</Text>
                                                            <DropDownPicker
                                                                  items={[
                                                                        {label: 'USA', value: 'usa', icon: () => <MaterialCommunityIcons name="arrow-down-drop-circle" size={18} color="#900" />, hidden: true},
                                                                        {label: 'UK', value: 'uk', icon: () => <MaterialCommunityIcons name="arrow-down-drop-circle" size={18} color="#900" />},
                                                                        {label: 'France', value: 'france', icon: () => <MaterialCommunityIcons name="arrow-down-drop-circle" size={18} color="#900" />},
                                                                  ]}
                                                                  defaultValue={'usa'}
                                                                  containerStyle={{height: 40}}
                                                                  style={{backgroundColor: '#fafafa'}}
                                                                  itemStyle={{
                                                                        justifyContent: 'flex-start'
                                                                  }}
                                                                  dropDownStyle={{backgroundColor: '#fafafa'}}
                                                                  onChangeItem={() => {}}
                                                            />
                                                      </View>
                                                      <View >
                                                            <Text>Categoria Testu</Text>
                                                            <DropDownPicker
                                                                  items={[
                                                                        {label: 'USA', value: 'usa', icon: () => <MaterialCommunityIcons name="arrow-down-drop-circle" size={18} color="#900" />, hidden: true},
                                                                        {label: 'UK', value: 'uk', icon: () => <MaterialCommunityIcons name="arrow-down-drop-circle" size={18} color="#900" />},
                                                                        {label: 'France', value: 'france', icon: () => <MaterialCommunityIcons name="arrow-down-drop-circle" size={18} color="#900" />},
                                                                  ]}
                                                                  defaultValue={'usa'}
                                                                  containerStyle={{height: 40}}
                                                                  style={{backgroundColor: '#fafafa'}}
                                                                  itemStyle={{
                                                                        justifyContent: 'flex-start'
                                                                  }}
                                                                  dropDownStyle={{backgroundColor: '#fafafa'}}
                                                                  onChangeItem={() => {}}
                                                            />
                                                      </View>
                                                      <View >
                                                            <Text>Testy</Text>
                                                            <DropDownPicker
                                                                  items={[
                                                                        {label: 'USA', value: 'usa', icon: () => <MaterialCommunityIcons name="arrow-down-drop-circle" size={18} color="#900" />, hidden: true},
                                                                        {label: 'UK', value: 'uk', icon: () => <MaterialCommunityIcons name="arrow-down-drop-circle" size={18} color="#900" />},
                                                                        {label: 'France', value: 'france', icon: () => <MaterialCommunityIcons name="arrow-down-drop-circle" size={18} color="#900" />},
                                                                  ]}
                                                                  defaultValue={'usa'}
                                                                  containerStyle={{height: 40}}
                                                                  style={{backgroundColor: '#fafafa'}}
                                                                  itemStyle={{
                                                                        justifyContent: 'flex-start'
                                                                  }}
                                                                  dropDownStyle={{backgroundColor: '#fafafa'}}
                                                                  onChangeItem={() => {}}
                                                            />
                                                      </View>
                                                      <View>
                                                            
                                                      </View>
                                                     
                                                      {/* <View style={{flexDirection:"row"}}>
                                                            <Button title="Cancel" onPress={() => {setAddingNotif(!addingNotif)}}/>    
                                                            <Button title="Ok" onPress={()=>{}}/>    
                                                      </View> */}
                                                </View>}
                                                {!addingNotif && <Button title="Pridat notifikaciu" onPress={() => {setAddingNotif(!addingNotif)}}/>}
                                          </View>
                                          
                                          </ScrollView>
                              </TouchableOpacity>
                        </Modal>

                        </ImageBackground>
                  </View>  
              )

}




//how to get store data into component
const mapStateToProps = (state) => {
      return {
            rate_answr_immid: state.setting.rate_answer_immidiately,
            sched_notifi: state.setting.schedule_notifications
      } 
}

//how to call an action on store
const mapDispatchToProps = (dispatch) => { //tu je action
      return {
            switchValueFor_RAI: (value) => dispatch(change_immediately_answer_rating(value)),
            switchValueFor_SCHENOT: (value) => dispatch(change_schedule_notifications(value))
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