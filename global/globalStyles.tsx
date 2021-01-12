import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
      headText: {
            fontFamily: 'AndadaSC-Bold',
            fontSize: 24,
            lineHeight: 32,
            color: '#000'
      }
})

export const Colors = {
      primary: "#241C30",
      acient: "#44345C",
      lightYellow: "#FCBA42",
      yellow: "#FFB800",  
      green: "#299C00",
      lightGreen: "#0E8B5B",
      red: "#C50000",
      white: "white",
      black: "black",
      header: "#BB968E",
      navigation: "#195F44",
      brown: '#562D3F'
}



//TOTO DAJ AKO PARAMETER DO VIEW <VIEW onLayout..../>

// onLayout={(event) => {
//       var {x, y, width, height} = event.nativeEvent.layout;
//       console.log("width: ",width)
//       console.log("height: ",height)
//     }}

// useEffect(() => {
//       // action here
//  }, [props.counter]); // checks for changes in the values in this array