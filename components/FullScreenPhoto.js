import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';

class FullScreenPhoto extends React.Component{
  render(){
    return <Image style = {{width:'100%', height:'100%' }} source={{uri:this.props.someProp.imgUrl}}></Image>;
  }
}

export default connect(
  state=>({someProp: state})
)(FullScreenPhoto);
