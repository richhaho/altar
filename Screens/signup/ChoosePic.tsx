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

const ChoosePic = () => {

    const uid = firebase.auth().currentUser?.uid ?? "uid"
    const stor = firebase.storage().ref()
    const [val, setVal] = useState<string>()
    const reference = firebase.database().ref()
    const navigation = useNavigation()

    const continueOnboard = () => {
        if (val) {
            reference.child('users')
            .child(auth().currentUser!.uid).update({
              pic: val,
            })
            navigation.navigate('NotificationFlow')
        }
        else {
            navigation.navigate('NotificationFlow')
        }
    }

        const ChoosePicture = () => {
            console.log('pressed')
            const options: ImageLibraryOptions = {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              };
              launchImageLibrary(options,
              async (response) => {
                console.log(response);
    
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                  console.log('ImagePicker Error: ', response.errorMessage);
                } else { 
                  try {
                     const img =  await requestBlob(response.assets[0].uri.replace("file:///","file:/")).catch(error =>console.log(error))
                     console.log('img' + ' ' + img)
                  await stor.child('profileImages').child(response.assets[0].fileName ?? "fileName").put(img)
                }
                catch (err) {
                  console.log(err.message)
                }
    
                try {
                  const url = await stor.child('profileImages').child(response.assets[0].fileName ?? "fileName").getDownloadURL();
                  // const goodUrl = url.replaceAll('/', ('%2F'))
                  //   const bestUrl = goodUrl.replace(' ', '%20')
                  //   console.log(bestUrl)
                  reference.child('users').child(uid).update({
                    pic: url
                  })
                  setVal(url)
                }
                catch (err) {
                  console.log(err.message)
                }
                }
              },
              
        )}

        const requestBlob = (uri) => {
            return new Promise((resolve, reject) => {
              let xhr = new XMLHttpRequest();
              xhr.onload = () => resolve(xhr.response);
              xhr.onerror = () => reject(new TypeError('Network request failed'));
              xhr.responseType = 'blob';
          
              xhr.open('GET', uri, true);
              xhr.send(null);
            });
          }

          const signInNow = () => {
            console.log("login now")
            navigation.navigate('LoginScreen')
          }

    return (
        <View style={{flex: 1}}>
            <Image style={styles.backgroundImage} source={require('../../assets/images/altarFaded.jpeg')} />
            <View style={styles.container}>
            <HeaderBarView title="" backButton={true}/>
                <Text style={styles.email}>Choose a Profile Picture</Text>
                <Text style={styles.subtext}>Just have fun with it</Text>
                {(val !== null && val && val !== "") ? (
                     <View style={{flex: 1}}>
                <Image source={{uri : val}} style={styles.pic}/>
                </View>
                ) : (
                    <View style={{flex: 1}}>
                <Pressable onPress={() => ChoosePicture()}>
                <View style={styles.pic1} /> 
                <Image source={require("../../assets/images/plusBtn.jpeg")} style={styles.pic2}/>
                </Pressable>
                    </View>
                    )}
                <View style={{flex: 1}}>
                  <Pressable style={styles.continue} onPress={() => continueOnboard()}>
                  {(val !== null && val && val !== "") ? (
                    <Image source={require("../../assets/images/continueBtn.jpeg")}/>
                  ) : (
                    <Image source={require("../../assets/images/disabledBtn.jpeg")}/>
                  )}
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
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 250,
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
        marginTop: 300
      },
      pic1: {
        flex: 1,
        position: 'absolute',
        width: 200,
        height: 200,
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        backgroundColor: '#dcdcdc',
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
        marginTop: 290,
        position: 'absolute',
        color: 'grey',
        alignItems: 'center'
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
      },
      already: {
        flex: 1,
        marginTop: 700,
        position: 'absolute',
        color: 'grey',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        width: 300,
      }
})


export default ChoosePic