/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appname} from './app.json';
import { Navigation } from "react-native-navigation"
import { Component } from 'react';
import LoginScreen from './Screens/login/LoginScreen'

AppRegistry.registerComponent('Altar', ()  => App );
// 
Navigation.registerComponent('com.Altar.LoginScreen', () => LoginScreen);
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: 'com.Altar.LoginScreen'
                    }
                }
            ]}
        }
    })
})