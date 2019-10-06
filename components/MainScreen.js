import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import Photo from './Photo';

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.pressPhotoHandler = this.pressPhotoHandler.bind(this);
  }
  componentDidMount(){
    this.props.asyncGetImgsObj();
  }
  pressPhotoHandler(imgUrl){
    this.props.navigation.navigate('Phot');
    this.props.getUrl(imgUrl);
  }
  createArrPhotoCards(){
    let arrObj = this.props.arrObjState;
    let buffArr = [];
    for(let i=0; i<arrObj.length; i++){
      buffArr[i] = <Photo key={i+1}
                          imgName={arrObj[i].description||arrObj[i].alt_description||"---Without name---"}
                          userName={arrObj[i].user.name||"---No author---"}
                          srcUrl = {arrObj[i].urls}
                          pressHandler = {this.pressPhotoHandler}/>;
                        }
    return buffArr;
  }
  render(){
    return (
      <SafeAreaView >
        <ScrollView>
          <View style={styles.wrapperStyle}>
            {this.createArrPhotoCards()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default connect(
  state=>({
    arrObjState: state.arrObjImg
  }),
  dispatch=>({
    addDataPhoto: (dataArr)=>{
      dispatch({type: "GET_PHOTO", arrDataPhoto: dataArr})
    },
    getUrl: (url)=>{
      dispatch({type: "GET_ONE_URL", getOneImgUrl: url})
    },
    asyncGetImgsObj: ()=>{
      dispatch({type: "GET_IMGS_OBJ"})
    }
  })
)(MainPage);

const styles = StyleSheet.create({
  wrapperStyle:{
    flex:1,
    justifyContent: 'space-around',
    flexDirection:'row',
    flexWrap: 'wrap'
  }
});
