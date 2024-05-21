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
import Clipboard from '@react-native-clipboard/clipboard'
import HeaderBarView from "../../configuration/HeaderBarView"

const ShareAltar = () => {

    const uid = firebase.auth().currentUser?.uid ?? "uid"
    const stor = firebase.storage().ref()
    const [val, setVal] = useState<string>()
    const reference = firebase.database().ref()
    const navigation = useNavigation()
    const [username, setUsername] = useState('username')

    const continueOnboard = async () => {
        console.log("regular")
        try {
            const result = await Share.share({
                title: username,
              message:
              'Altar.social',
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                navigation.navigate('Main')
              } else {
                navigation.navigate('Main')
              }
            } else if (result.action === Share.dismissedAction) {
                navigation.navigate('Main')
            }
          } catch (error: any) {
            Alert.alert("Share Error", "There was an issue sharing");
          }
    }

    const continueOnboard1 = () => {
        //update link when app is published
        console.log("1")
        Clipboard.setString("")
        navigation.navigate('Main')
}

        const ChoosePicture = () => {
            
        }

        const getUsername = () => {
            reference.child('users')
        .child(uid)
        .once('value')
        .then(snapshot => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setUsername(data.username)
                }
            });
        }

        useEffect(() => {
            getUsername()
        }, [])

    return (
        <View style={{flex: 1}}>
            <Image style={styles.backgroundImage} source={require('../../assets/images/altarFaded.jpeg')} />
            <View style={styles.container}>
            <HeaderBarView title="" backButton={true}/>
                <Text style={styles.email}>Praying is Caring</Text>
                <Text style={styles.subtext}>Life is so much better with friends! Invite your friends and family to join you on Altar so you can pray for each other daily.</Text>
                <View style={{flex: 1}}>
                <Pressable onPress={() => ChoosePicture()}>
                <View style={{flex: 1}} /> 
                <Image source={require("../../assets/images/pray.jpeg")} style={styles.pic}/>
                </Pressable>
                </View>
                <View>
                  <Pressable style={styles.continue} onPress={() => continueOnboard()}>
                    <Image source={require("../../assets/images/inviteThem.jpeg")}/>
                </Pressable>
                </View>
                <View>
                <Pressable style={styles.continue1} onPress={() => continueOnboard1()}>
                  <Text style={styles.subtext2}>COPY INVITE LINK</Text>
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
        marginTop: 490,
        color: 'black',
        width: 303,
        fontWeight: 'bold'
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
        marginTop: 600,
        alignItems: 'center',
      },
      continue1: {
        flex: 1,
        marginTop: -250,
        alignItems: 'center',
      },
      subtext: {
        flex: 1,
        marginTop: 530,
        position: 'absolute',
        color: 'grey',
        alignItems: 'center',
        textAlign: 'center',
        width: 300,
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
        right: 45,
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


export default ShareAltar