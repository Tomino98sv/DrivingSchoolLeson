import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";


export default function TrafficSignDetails({trafficSignObject}) {

      return (
            <View>
                  <Text>{trafficSignObject.title}</Text>
            </View>
      );

}


// interface assistantImgUrlModel {
//       id: number,
//       index: number,
//       url: string,
//   }
  
//   interface TrafficSignsModel {
//       id: number,
//       title: string,
//       body: string,
//       imgUrl: string,
//       section: string,
//       assistantImages: Array<assistantImgUrlModel>,
//   }