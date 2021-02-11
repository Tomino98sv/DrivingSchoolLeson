import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { Avatar, Divider  } from 'react-native-elements';

import {Colors} from '../global/globalStyles'

import IntroScreen from '../screens/intro';
import TrafficSignScreen from '../screens/trafficsigns';
import TrafficSignsFromSection from '../components/trafficSign/trafficSignsFromSection';
import FirstAid from '../screens/firstaid';
import FirstAidTest from '../components/firstAid/firstAidTest';
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
            paddingLeft: 14,
            backgroundColor: Colors.lightGreen,
          }}
        >
              <View style={{flex: 1}}>
                  <Avatar rounded icon={{ name: 'person' }} size={60}/>
              </View>

          <Text style={{ color: Colors.white, fontSize: 20, margin: 25, flex: 3 }}>
            Bobek Opravar
          </Text>

        </View>
        <Divider style={{ backgroundColor: Colors.black, height: 1,}} />

        <DrawerItems {...props}/>
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
      TrafficSign: {
            screen: TrafficSignScreen,
            navigationOptions: {
                  drawerLabel: 'Dopravné značky',
                  drawerIcon: ({focused}) => (
                        <Image
                              source={!focused ? require('../assets/icons/trafficsignicon.png') : require('../assets/icons/trafficsigniconActiveY.png')}
                              style={[focused ? styles.drawerActive : styles.drawerInActive]}
                              />
                      )
            }
      },
      TrafficSignsFromSection: {
            screen: TrafficSignsFromSection,
            navigationOptions: {
                  drawerLockMode: 'locked-closed',
                  drawerLabel: () => null,
                  title: null,
                  drawerIcon: () => null
            }
            
      },
      FirstAid:{
            screen: FirstAid,
            navigationOptions: {
                  drawerLabel: 'Prvá pomoc',
                  drawerIcon: ({focused}) => (
                        <Image
                              source={!focused ? require('../assets/icons/prvapomoc.png') : require('../assets/icons/prvapomocActiveY.png')}
                              style={[focused ? styles.drawerActive : styles.drawerInActive]}
                              />
                      )
            }
      },
      FirstAidTest: {
            screen: FirstAidTest,
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
      }
},{
      drawerBackgroundColor: Colors.navigation,
      contentComponent: DrawerContent,
      unmountInactiveRoutes: true,
      contentOptions: {
            activeTintColor: Colors.yellow,
            activeBackgroundColor: '#0E8B5B',
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
            height: 40,
            width: 40,
            marginLeft: 14
      },
      drawerInActive: {
            height: 25,
            width: 25,
            marginLeft: 14
      },
});