import { StatusBar } from 'expo-status-bar';
import React, { Component }from 'react';
import { View, Text } from 'react-native'
import * as firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCfrwUc_KfZRDBDWh_hdxGwCdPW4dbEy4",
  authDomain: "instagram-dev-b1dc8.firebaseapp.com",
  projectId: "instagram-dev-b1dc8",
  storageBucket: "instagram-dev-b1dc8.appspot.com",
  messagingSenderId: "1046165751907",
  appId: "1:1046165751907:web:f45c1d4f8e601bcf505056",
  measurementId: "G-JEK1FLHNG1"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'

const Stack = createStackNavigator();


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return(
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <Text>User is logged in!</Text>
      </View>
    )
    
  }
}

export default App
