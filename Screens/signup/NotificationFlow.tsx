import React = require("react");
import { useEffect, useState } from "react";
import { Image, View, StatusBar, StyleSheet, Share, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator, Pressable, TextInput, Button } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import ImagePicker, { ImageLibraryOptions, MediaType } from 'react-native-image-picker';
import "firebase/compat/storage"
import HeaderBarView from "../../configuration/HeaderBarView"

const NotificationFlow = () => {

    const navigation = useNavigation()

    const continueOnboard = () => {
            navigation.navigate('FollowAccounts')
    }

    return (
        <View style={{flex: 1}}>
            <Image style={styles.backgroundImage} source={require('../../assets/images/altarFaded.jpeg')} />
            <View style={styles.container}>
            <HeaderBarView title="" backButton={true}/>
                <Text style={styles.email}>Turn on notifications</Text>
                <Text style={styles.subtext}>Find out immediately when people connect with you or pray for you on Altar.</Text>
                    <View style={{flex: 1}}>
                <View style={{flex: 1}} /> 
                <Image source={require("../../assets/images/bell.jpeg")} style={styles.pic}/>
                    </View>
                <View style={{flex: 1}}>
                  <Pressable style={styles.continue} onPress={() => continueOnboard()}>
                    <Image source={require("../../assets/images/turnOn.jpeg")}/>
                  <Text style={styles.subtext2}>SKIP FOR NOW</Text>
                  </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    email: {
        flex: 1,
        position: 'absolute',
        textAlign: 'center',
        fontSize: 24,
        marginTop: 500,
        color: 'black',
        width: 303
      },
      pic: {
        flex: 1,
        position: 'absolute',
        width: 200,
        height: 200,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200
      },
      pic1: {
        flex: 1,
        position: 'absolute',
        width: 200,
        height: 200,
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        marginTop: 300
      },
      pic2: {
        flex: 1,
        position: 'absolute',
        width: 50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 475,
        left: -20
      },
      textInp: {
        height: 60,
        width:300 ,
        borderWidth:1,
        marginTop: 290,
        borderColor:"blue",
        backgroundColor: 'white',
        paddingHorizontal: 10
      },
      container: {
        flex: 1,
        alignItems: 'center'
      },
      continue: {
        flex: 1,
        marginTop: 200,
        position: 'absolute',
        height: 80,
        alignSelf: 'center',
        alignItems: 'center'
      },
      subtext: {
        flex: 1,
        marginTop: 540,
        position: 'absolute',
        color: 'grey',
        alignItems: 'center',
        width: 300,
        textAlign: 'center'
      },
      backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
      },
      subtext1: {
        flex: 1,
        marginTop: 360,
        position: 'absolute',
        color: 'grey',
        right: 45
      },
      subtext2: {
        flex: 1,
        marginTop: 100,
        position: 'absolute',
        color: 'grey',
        alignItems: 'center',
        fontWeight: 'bold'
      }
})


export default NotificationFlow