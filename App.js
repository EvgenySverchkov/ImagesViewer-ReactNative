import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './components/MainScreen';
import FullScreenPhoto from './components/FullScreenPhoto';
import Photo from './components/Photo';

import getObjArr from './services/requestForImg';

export default class App extends React.Component{
  render(){
    return (<Provider store ={store}>
              <AppContainer />
            </Provider>);
  }
}
const initState = {
  arrObjImg: [],
  imgUrl: ''
}

function reducer(state = initState, action){
  switch (action.type) {
    case "GET_PHOTO": return {
      arrObjImg: action.arrDataPhoto,
      imgUrl: ''
    }
    case "GET_ONE_URL": return {
      arrObjImg: state.arrObjImg,
      imgUrl: action.getOneImgUrl
    }
    default: return state;
  }
}

function* newSaga() {
  yield takeEvery("GET_IMGS_OBJ", getImgsObj);
}

function* getImgsObj() {
  const data = yield call(() => {
    console.log(".");
    return getObjArr();
  });
  yield put({type:"GET_PHOTO", arrDataPhoto: data});
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(newSaga);

const Stack = createStackNavigator({
  Home:{
    screen: MainScreen
  },
  Phot:{
    screen: FullScreenPhoto
  }
});

const AppContainer = createAppContainer(Stack);
