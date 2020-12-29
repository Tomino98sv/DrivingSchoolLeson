import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { Avatar, Divider  } from 'react-native-elements';

import {Colors} from '../styles/global'

import IntroScreen from '../screens/intro';
import TrafficSignScreen from '../screens/trafficsigns';
import FirstAid from '../screens/firstaid';
import Tests from '../screens/tests';
import Settings from '../screens/settings';


const DrawerContent = (props) => (
      <View>
        <View
          style={{
            // height: 140,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginLeft: 14
          }}
        >
              <View style={{flex: 1}}>
                  <Avatar rounded icon={{ name: 'person' }} size={60}/>
              </View>

          <Text style={{ color: Colors.white, fontSize: 20, margin: 25, flex: 3 }}>
            Bobek Rdacovsky
          </Text>

        </View>
        <Divider style={{ backgroundColor: Colors.black, height: 1,}} />

        <DrawerItems {...props} />
      </View>
    )

const RootDrawerNavigator = createDrawerNavigator({
      Intro: {
            screen: IntroScreen,
            navigationOptions: {
                  drawerLockMode: 'locked-closed',
                  drawerLabel: () => null,
                  title: null,
                  drawerIcon: () => null
            }
      },
      Settings: {
            screen: Settings,
            navigationOptions: {
                  drawerLabel: 'Nastavenia',
                  drawerIcon: ({focused}) => (
                        <Image
                              source={!focused ? require('../assets/icons/setting.png') : require('../assets/icons/settingActiveY.png')}
                              style={[focused ? styles.drawerActive : styles.drawerInActive]}
                              />
                      )
            }
      },
      TrafficSign: {
            screen: TrafficSignScreen,
            navigationOptions: {
                  drawerLabel: 'Dopravne znacky',
                  drawerIcon: ({focused}) => (
                        <Image
                              source={!focused ? require('../assets/icons/trafficsignicon.png') : require('../assets/icons/trafficsigniconActiveY.png')}
                              style={[focused ? styles.drawerActive : styles.drawerInActive]}
                              />
                      )
            }
      },
      FirstAid:{
            screen: FirstAid,
            navigationOptions: {
                  drawerLabel: 'Prva pomoc',
                  drawerIcon: ({focused}) => (
                        <Image
                              source={!focused ? require('../assets/icons/prvapomoc.png') : require('../assets/icons/prvapomocActiveY.png')}
                              style={[focused ? styles.drawerActive : styles.drawerInActive]}
                              />
                      )
            }
      },
      Test: {
            screen: Tests,
            navigationOptions: {
                  drawerLabel: 'Testy',
                  drawerIcon: ({focused}) => (
                        <Image
                              source={!focused ? require('../assets/icons/test.png') : require('../assets/icons/testActiveY.png')}
                              style={[focused ? styles.drawerActive : styles.drawerInActive]}
                              />
                  )
            }
      },
},{
      drawerBackgroundColor: Colors.navigation,
      contentComponent: DrawerContent,
      contentOptions: {
            activeTintColor: Colors.yellow,
            activeBackgroundColor: 'transparent',
            inactiveTintColor: Colors.black,
            inactiveBackgroundColor: 'transparent',
            labelStyle: {
              marginLeft: 14,
            },
          }
});

export default createAppContainer(RootDrawerNavigator);


const styles = StyleSheet.create({
      drawerActive: {
            height: 50,
            width: 50,
            marginLeft: 14
      },
      drawerInActive: {
            height: 35,
            width: 35,
            marginLeft: 14
      },
});