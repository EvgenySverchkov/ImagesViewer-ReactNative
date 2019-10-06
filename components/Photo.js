import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default (props)=>{
  return (
    <View style={styles.wraper} >
      <TouchableOpacity onPress = {()=>props.pressHandler(props.srcUrl.regular)}>
        <Image style={styles.img} source={{uri: props.srcUrl.small}}/>
        <Text>Photo Name: {'\n'+props.imgName}</Text>
        <Text>Creator: {props.userName}</Text>
      </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
  img:{
    width: '100%',
    height: 100,
    marginTop: 0,
    marginBottom:0,
  },
  wraper: {
    width: '32%',
    borderColor:'black',
    borderWidth:1,
    marginTop: 25
  }
});
