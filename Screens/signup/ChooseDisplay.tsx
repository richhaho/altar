import React = require("react");
import { useEffect, useState } from "react";
import { Image, View, StatusBar, StyleSheet, Share, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator, Pressable, TextInput, Button } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import HeaderBarView from "../../configuration/HeaderBarView"

const ChooseDisplay = () => {

    const [val, setVal] = useState<String>()
    const reference = firebase.database().ref()
    const navigation = useNavigation()

    const continueOnboard = () => {
        if (val && (40 - val.length >= 0)) {
            reference.child('users')
            .child(auth().currentUser!.uid).update({
              display: val,
            })
            navigation.navigate('ChoosePic')
          } else {
            Alert.alert("Too long", "Please keep it under 40 characters")
          }
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
              <View>
                <Text style={styles.email}>Choose a Display Name</Text>
                <Text style={styles.subtext}>You can always edit this stuff later. Just have fun with it.</Text>
                </View>
                <TextInput 
                placeholder="Display Name"
                placeholderTextColor={"grey"}
                style={styles.textInp} 
                value={val} 
                onChangeText={(text) => setVal(text)}>
                </TextInput>
                {(val?.length) && (
                    <Text style={styles.subtext1}>{40- val.length} characters left</Text>
                )}
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
        marginTop: 210,
        color: 'black',
        width: 303,
        fontWeight: 'bold',
        left: -150
      },
      emailLabel: {
        flex: 1,
        position: 'absolute',
        fontSize: 12,
        marginTop: 320,
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
        height: 80,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center'
      },
      subtext: {
        flex: 1,
        marginTop: 245,
        width: 300,
        textAlign: 'center',
        position: 'absolute',
        color: 'grey',
        alignItems: 'center',
        left: -150
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
        marginTop: 410,
        position: 'absolute',
        color: 'grey',
        right: 45
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


export default ChooseDisplay