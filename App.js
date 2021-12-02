import React,{Component} from 'react';
import {Image, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import Logo from './signum_logo.jpg';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {

  state = {
    url : 'https://pro.formview.io/#/wzvrsezvnnmpxnx/anket?header=0&reset=1&theme=flatly',
    isloading:false,
    usercode:null
  }


  componentDidMount() {
    this.getUserCodeStorage();
  }

  getUserCodeStorage() {
    AsyncStorage.getItem('usercode').then(usercode => {

      if(!usercode) {
        usercode = uuid.v4();
        AsyncStorage.setItem('usercode', usercode);
      }
      this.setState({isloading : true, usercode: usercode});
    });

  }


  

  render() {

    if(this.state.isloading) {
      let url = this.state.url + '&usercode=' + this.state.usercode;
      return (
        <>
        <Image source={Logo} style={{width:170,height:50}}/>
        <WebView  source={{ uri: url }} />
      </>
      );
      
    } else {
      return (
        <ActivityIndicator />
      )
    }

    
  }
}