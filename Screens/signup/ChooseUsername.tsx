import React = require("react");
import { useEffect, useState } from "react";
import { Image, View, StatusBar, StyleSheet, Share, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator, Pressable, TextInput, Button } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import HeaderBarView from "../../configuration/HeaderBarView"

const ChooseUsername = () => {

    const [val, setVal] = useState<String>()
    const reference = firebase.database().ref()
    const navigation = useNavigation()

    const continueOnboard = () => {
            reference.child('users')
            .child(auth().currentUser!.uid).update({
              username: val.text,
            })
            navigation.navigate('ChooseDisplay')
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
            <Pressable onPress={() => signInNow()}>
                <Text style={styles.already}>Already have an account? Sign In</Text>
          </Pressable>
                <Text style={styles.email}>Select a Username</Text>
                <TextInput 
                placeholder="username"
                placeholderTextColor={"grey"}
                style={styles.textInp} 
                value={val} 
                onChangeText={(text) => setVal({text})}>
                </TextInput>
                <Text style={styles.subtext}> Letter, numbers, or underscore only </Text>
                {(val && val !== null && val !== "" && val !== undefined) ? (
                <View style={{flex: 1}}>
                  <Pressable style={styles.continue} onPress={() => continueOnboard()}>
                    <Image source={require("../../assets/images/continueBtn.jpeg")}/>
                  </Pressable>
                </View>
                ) :
                (<View style={{flex: 1}}>
                    <Pressable style={styles.continue} onPress={() => console.log("pressed")}>
                      <Image source={require("../../assets/images/disabledBtn.jpeg")}/>
                    </Pressable>
                  </View>)}
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
        marginTop: 280,
        color: 'black',
        width: 303,
        fontWeight: 'bold'
      },
      emailLabel: {
        flex: 1,
        position: 'absolute',
        fontSize: 12,
        marginTop: 295,
        color: 'black',
        width: 303,
        zIndex: 3,
        paddingHorizontal: 10,
        fontWeight: '400'
      },
      textInp: {
        height: 60,
        width:300 ,
        marginTop: 290,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 10
      },
      container: {
        flex: 1,
        alignItems: 'center'
      },
      continue: {
        flex: 1,
        marginTop: 50,
        position: "absolute",
        alignSelf: 'center',
        height: 80,
        alignItems: 'center'
      },
      backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
      },
      subtext: {
        flex: 1,
        marginTop: 410,
        position: 'absolute',
        color: 'grey',
        left: 45
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


export default ChooseUsername