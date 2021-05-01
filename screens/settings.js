import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-native";
import {
  Dimensions,
  Modal,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import Header from "../components/header";
import { Colors } from "../global/globalStyles";
import { Switch } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { connect } from "react-redux";
import {
  change_immediately_answer_rating,
  change_schedule_notifications,
} from "../stateManagement/actions/settings";

import Dates from "react-native-dates";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";


import * as Permissions from "expo-permissions";
import { Notifications as Notifications2 } from "expo";
import usePermissions from "expo-permissions-hooks";
import moment from "moment";
import firstAidSec from "../assets/sources/firstAidSections";
import trafSec from "../assets/sources/trafficSignSections";
import {getAllNotifications, insertNotidication, deleteNotidicationById, deleteTableNotidication} from "../global/services";

function Settings(props) {
  // const [permission, askForPermission] = usePermissions(Permissions.NOTIFICATIONS, { ask: true });
  const [modalNotiffVisible, setModalNotiffVisible] = useState(false);
  const [datePicked, setDatePicked] = useState({
    date: moment(),
    focus: "startDate",
    startDate: null,
    endDate: null,
  });

  const trafSignsCat = trafSec;
  const drivingtestCat = ["Skupina A+B", "Skupina C+D+T"];
  const firstAidCat = firstAidSec;
  const [currChosenTestKindArr, setcurrChosenTestKindArr] = useState([]);
  const [currChosenTestKind, setcurrChosenTestKind] = useState("");
  const [currChosenTestCatheg, setcurrChosenTestCatheg] = useState("");
  const [currChosenTestNumb, setcurrChosenTestNumb] = useState("");

  const [notificationsViews, setNotificationsViews] = useState([]);

  const dropDownCat = useRef();
  const dropDownKind = useRef();
  const dropDownTests = useRef();


  const [currChosenTests, setCurrChosenTests] = useState([]);

  const [addingNotif, setAddingNotif] = useState(false);


  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  sendNotificationImmediately = async () => {
    let notificationId = await Notifications2.presentLocalNotificationAsync({
      title: "schoolDrivingLesson",
      body:
        "Notifikacie nastavene od " +
        formatDate(daterangePick.startDate) +
        " do " +
        formatDate(daterangePick.endDate),
    });
    //console.log(notificationId); // can be saved in AsyncStorage or send to server
  };

  askPermissions = async () => {
    console.log("ASK PERMISIONS");
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
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
    askPermissions().then((res) => {
      if (res) {
        sendNotificationImmediately();
      } else {
        getAlert();
      }
    });
  }

  function getAlert() {
    Alert.alert(
      "Notifications permission are denied",
      "For receiving notifications allow notifications permission for this app",
      [{ text: "Ok", onPress: () => {} }],
      { cancelable: true }
    );
  }

  // DateTimePicker methods START
  const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  // DateTimePicker methods END


  // DateRangePicker methods START
  const onDatesChange = ({ startDate, endDate, focusedInput, date }) => {
    setDatePicked({
      ...datePicked,
      startDate,
      endDate,
      focus: focusedInput,
      date,
    });
  };


  const isDateBlocked = (date) => {
    date.isBefore(moment(), "day");
  };
  // DateRangePicker methods END

  function getCategory(catArr) {
    const result = catArr.map((item) => {
      return {
        label: item,
        value: item,
        icon: () => (
          <MaterialCommunityIcons
            name="arrow-down-drop-circle"
            size={18}
            color="#900"
          />
        ),
      };
    });

    setcurrChosenTestKindArr(result);
  }

  function getNotifications() {

      // id: number,
      // testKind: string, 
      // testCathegory: string, 
      // testNumb: number,
      // active: boolean,
      // startDate: Date,
      // endDate: Date,

      getAllNotifications(result => {
            console.log(result);
            if(result.length !== 0) {
                  const filterRender=result.map((element,index) => {
                        return (<View key={index} style={{backgroundColor: Colors.primary, padding: 5, marginBottom: 2, width: Dimensions.get("window").width, flexDirection: 'column'}}>
                              <Text style={{fontWeight: 'bold', color: Colors.white, textAlign: 'center'}}>{element.testKind}</Text>
                              <Text style={{fontWeight: 'bold', color: Colors.white, textAlign: 'center'}}>{element.testCathegory}</Text>
                              {element.testKind == "tests" && <Text style={{fontWeight: 'bold', color: Colors.white, textAlign: 'center'}}>{element.testNumb}</Text>}
                              <Switch
                                color={Colors.yellow}
                                value={element.active}
                                onValueChange={(changed) => {
                                  
                                }}
                              />
                              <Text style={{fontWeight: 'bold', color: Colors.white, textAlign: 'center'}}>Od: {format(new Date(element.startDate), "dd.MM.yyyy HH:mm")}</Text>
                              <Text style={{fontWeight: 'bold', color: Colors.white, textAlign: 'center'}}>Do: {format(new Date(element.endDate), "dd.MM.yyyy HH:mm")}</Text>

                        </View>);
                  });
                  console.log(filterRender);
                  setNotificationsViews(filterRender);
            }})
  }

    return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/introBCKG.png")}
        style={styles.image}
      >
        <Header title="Nastavenia" nav={props.navigation} />

        <View
          style={{
            flexWrap: "wrap",
            padding: 20,
            backgroundColor: Colors.primary,
            flexDirection: "row",
          }}
        >
          <Switch
            color={Colors.yellow}
            value={props.rate_answr_immid}
            onValueChange={(changed) => {
              props.switchValueFor_RAI(changed);
            }}
          />
          <Text style={{ color: "white" }}>
            Ohodnotit odpovede hned je{" "}
            {props.rate_answr_immid ? "zapnute" : "vypnute"}
          </Text>
        </View>

        <View
          style={{
            flexWrap: "wrap",
            padding: 20,
            backgroundColor: Colors.primary,
            flexDirection: "row",
          }}
        >
          <Switch
            style={{ flex: 1 }}
            color={Colors.yellow}
            value={props.sched_notifi}
            onValueChange={(changed) => {
              props.switchValueFor_SCHENOT(changed);
            }}
          />
          <Text style={{ color: "white", alignSelf: "center", flex: 5 }}>
            Notifikacie sú {props.sched_notifi ? "zapnuté" : "vypnuté"}
          </Text>
          <Button
            style={{ flex: 1 }}
            disabled={!props.sched_notifi}
            title="Upraviť"
            onPress={() => {setModalNotiffVisible(true);getNotifications();}}
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalNotiffVisible}
          onRequestClose={() => {}}
        >
          <TouchableOpacity
            style={{ alignSelf: "flex-end", marginRight: 10 }}
            onPress={() => {
              setModalNotiffVisible(false);
            }}
          >
            <Image
              source={require("../assets/icons/close.png")}
              style={{ width: 35, height: 35 }}
            />
          </TouchableOpacity>

          <ScrollView>
            <View style={styles.modalView}>
              {addingNotif && (
                <View
                  style={{ width: Dimensions.get("window").width, padding: 10 }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <Dates
                      onDatesChange={onDatesChange}
                      isDateBlocked={isDateBlocked}
                      startDate={datePicked.startDate}
                      endDate={datePicked.endDate}
                      focusedInput={datePicked.focus}
                      range
                    />
                    <Text style={{marginBottom: 5, marginTop:10}}>
                        <Text style={{fontWeight: 'bold'}}>Od: </Text>
                        {datePicked.startDate != null &&
                              datePicked.startDate.format("LL")}
                        </Text>
                    <Text style={{marginBottom: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Do: </Text>
                        {datePicked.endDate != null &&
                              datePicked.endDate.format("LL")}
                    </Text>

                    <View>
                      <View style={{marginBottom: 5}}>
                        <Button
                          onPress={() => setShow(true)}
                          title="Vybrať čas"
                        />
                      </View>
                      <View style={{marginBottom: 5}}>
                            <Text>              
                                  <Text style={{fontWeight: 'bold'}}>Čas: </Text>
                                  {format(date, "HH:mm")}
                                  </Text>
                      </View>
                      {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={"time"}
                          is24Hour={true}
                          display="default"
                          onChange={onChange}
                        />
                      )}
                    </View>

                    <View style={{ marginBottom: 100 }}>
                      <Text style={{marginBottom: 5, marginTop: 5}}>Druh/Okruh Testu</Text>
                      <DropDownPicker
                        dropDownMaxHeight={100}
                        ref={dropDownKind}
                        items={[
                          {
                            label: "Vyber druh/okruh testov",
                            value: "null",
                            hidden: true,
                            icon: () => (
                              <MaterialCommunityIcons
                                name="arrow-down-drop-circle"
                                size={18}
                                color="#900"
                              />
                            ),
                          },
                          {
                            label: "Testy",
                            value: "tests",
                            icon: () => (
                              <MaterialCommunityIcons
                                name="arrow-down-drop-circle"
                                size={18}
                                color="#900"
                              />
                            ),
                          },
                          {
                            label: "Dopravné značky",
                            value: "trafSigns",
                            icon: () => (
                              <MaterialCommunityIcons
                                name="arrow-down-drop-circle"
                                size={18}
                                color="#900"
                              />
                            ),
                          },
                          {
                            label: "Prvá pomoc",
                            value: "firstAid",
                            icon: () => (
                              <MaterialCommunityIcons
                                name="arrow-down-drop-circle"
                                size={18}
                                color="#900"
                              />
                            ),
                          },
                        ]}
                        defaultValue={"null"}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: "#fafafa" }}
                        itemStyle={{
                          justifyContent: "flex-start",
                        }}
                        dropDownStyle={{ backgroundColor: "#fafafa" }}
                        onChangeItem={(item) => {
                          switch (item.value) {
                            case "tests":
                              setcurrChosenTestKind(item.value);
                              getCategory(drivingtestCat);
                              break;
                            case "trafSigns":
                              setcurrChosenTestKind(item.value);
                              getCategory(trafSignsCat);
                              break;
                            case "firstAid":
                              setcurrChosenTestKind(item.value);
                              getCategory(firstAidCat);
                              break;
                            default:
                          }
                        }}
                      />
                    </View>
                    <View style={{ marginBottom: 100 }}>
                      <Text style={{marginBottom: 5, marginTop: 5}}>Categoria Testu</Text>
                      <DropDownPicker
                        dropDownMaxHeight={100}
                        ref={dropDownCat}
                        items={[
                          {
                            label: "Vyber kategóriu/sekciu",
                            value: "null",
                            hidden: true,
                            icon: () => (
                              <MaterialCommunityIcons
                                name="arrow-down-drop-circle"
                                size={18}
                                color="#900"
                              />
                            ),
                          },
                          ...currChosenTestKindArr,
                        ]}
                        defaultValue={"null"}
                        containerStyle={{ height: 40 }}
                        style={{ backgroundColor: "#fafafa" }}
                        itemStyle={{
                          justifyContent: "flex-start",
                        }}
                        dropDownStyle={{ backgroundColor: "#fafafa" }}
                        onChangeItem={(item) => {
                          if (currChosenTestKind == "tests") {
                            var arrTests = [];
                            if (item.value == "Skupina A+B") {
                              for (var i = 1; i <= 35; i++) {
                                arrTests.push(i);
                              }
                            } else {
                              for (var i = 35; i <= 60; i++) {
                                arrTests.push(i);
                              }
                            }
                            arrTests.forEach((item, index) => {
                              arrTests[index] = {
                                label: String(item),
                                value: String(item),
                                icon: () => (
                                  <MaterialCommunityIcons
                                    name="arrow-down-drop-circle"
                                    size={18}
                                    color="#900"
                                  />
                                ),
                              };
                            });
                            setCurrChosenTests(arrTests);
                          }
                          setcurrChosenTestCatheg(item.value);
                        }}
                      />
                    </View>
                    {(currChosenTests[0] != null && currChosenTestKind == "tests") &&
                      currChosenTests[0] != undefined &&
                      currChosenTests != [] && (
                        <View style={{ marginBottom: 100 }}>
                          <Text style={{marginBottom: 5, marginTop: 5}}>Testy</Text>
                          <DropDownPicker
                            dropDownMaxHeight={100}
                            ref={dropDownTests}
                            items={[
                              {
                                label: "Vyber testu",
                                value: "null",
                                hidden: true,
                                icon: () => (
                                  <MaterialCommunityIcons
                                    name="arrow-down-drop-circle"
                                    size={18}
                                    color="#900"
                                  />
                                ),
                              },
                              ...currChosenTests,
                            ]}
                            defaultValue={"null"}
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: "#fafafa" }}
                            itemStyle={{
                              justifyContent: "flex-start",
                            }}
                            dropDownStyle={{ backgroundColor: "#fafafa" }}
                            onChangeItem={(item) => {setcurrChosenTestNumb(item.value)}}
                          />
                        </View>
                      )}

                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                      <Button
                        title="Cancel"
                        onPress={() => {
                          setAddingNotif(false);
                          getNotifications();
                        }}
                      />
                      <Button title="Save" onPress={() => {
                              
                           let startDateWithTime = new Date(
                              datePicked.startDate.toDate().getFullYear(),	
                              datePicked.startDate.toDate().getMonth(),	
                              datePicked.startDate.toDate().getDate(),	
                              date.getHours(),	
                              date.getMinutes(),	
                              date.getSeconds()
                           );
                           let endDateWithTime = new Date(
                              datePicked.endDate.toDate().getFullYear(),	
                              datePicked.endDate.toDate().getMonth(),	
                              datePicked.endDate.toDate().getDate(),	
                              date.getHours(),	
                              date.getMinutes(),	
                              date.getSeconds()
                           );   
                           /*console.log(format(startDateWithTime, "dd.MM.yyyy HH:mm"));
                           console.log(format(endDateWithTime, "dd.MM.yyyy HH:mm"));*/

                              insertNotidication(currChosenTestKind,currChosenTestCatheg,currChosenTestNumb, startDateWithTime, endDateWithTime, (confirmed) => {
                                    console.log(currChosenTestKind," ",currChosenTestCatheg," ",currChosenTestNumb," ",startDateWithTime," ",endDateWithTime,);
                                    if(confirmed) {
                                          console.log("inserted");
                                          setAddingNotif(false);
                                          getNotifications();
                                    }else {
                                          console.log("error");
                                    }
                              });
                      }} />
                    </View>
                  </View>
                </View>
              )}
              {!addingNotif && (
                <View style={{flexDirection:"column"}}>
                      <Button
                  title="Pridat notifikaciu"
                  onPress={() => {
                    setAddingNotif(!addingNotif);
                  }}
                />
                 <Button
                  title="DELETE TABLE notifikaciu"
                  onPress={() => {
                        deleteTableNotidication((response) => {
                              console.log(response);
                        })
                  }}
                />
                  { notificationsViews != [] && notificationsViews}

                </View>
              )}
            </View>
          </ScrollView>
        </Modal>
      </ImageBackground>
    </View>);
}

//how to get store data into component
const mapStateToProps = (state) => {
  return {
    rate_answr_immid: state.setting.rate_answer_immidiately,
    sched_notifi: state.setting.schedule_notifications,
  };
};

//how to call an action on store
const mapDispatchToProps = (dispatch) => {
  //tu je action
  return {
    switchValueFor_RAI: (value) =>
      dispatch(change_immediately_answer_rating(value)),
    switchValueFor_SCHENOT: (value) =>
      dispatch(change_schedule_notifications(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  modalView: {
    width: Dimensions.get("window").width,
    minHeight: Dimensions.get("window").height / 4,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    marginTop: 50,
  },
  focused: {
    color: "blue",
  },
});
