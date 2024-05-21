import React = require("react");
import { useEffect, useState } from "react";
import { Image, View, StatusBar, StyleSheet, Share, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator, Pressable, TextInput } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import firebase from "firebase/compat";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import HeaderBarView from "../../configuration/HeaderBarView"

const PhoneNumber = () => {

  const reference = firebase.database().ref()
    const [val, setVal] = useState<String>()
    const [phone, setPhone] = useState('')
    const [placeholder, setPlaceholder] = useState('000-000-0000')
    const [phoneLabel, setPhoneLabel] = useState('Phone Number')
    const [verificationCode, setVerificationCode] = useState('')
    const [userId, setuserId] = useState('')
    const [confirmResult, setConfirmResult] = useState(null)
    const [enterPhone, setEnterPhone] = useState('Enter  your phone number')
    const navigation = useNavigation()
    const [confirm, setConfirm] = useState(null);
    const [permanentPhone, setPermanentPhone] = useState('')

 const validatePhoneNumber = () => {
    return (Number(phone) > 999999999)
    }

    const handleSendCode = async () => {
        var newNumber = `${'+1'} ${phone}`
        console.log(newNumber.replace(" ", ""))
        console.log("test")
        // Request to send OT
        try {
          // const auth = getAuth()
          // auth.languageCode = 'it'
          // const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
          //   'size': 'invisible',
          //   'callback': (response) => {
          //     // reCAPTCHA solved, allow signInWithPhoneNumber.
          //     onSignInSubmit();
          //   }
          // });
          
          const confirmation = await auth().signInWithPhoneNumber(newNumber.replace(" ", ""));
          setConfirmResult(confirmation)
          setEnterPhone("Verification Code")
          setPhoneLabel("6 digit Code")
          setPlaceholder('6 - Digit Code')
          setPermanentPhone(phone)
          setPhone("")
        } catch (error) {
          console.log(error)
        }
        } 

      const handleVerifyCode = () => {
        console.log(phone)
        // Request for OTP verification
        if (phone.length >= 6) {
          confirmResult
          .confirm(phone)
            .then(user => {
              setuserId(user.uid)
              Alert.alert("Success!", "Phone Verified!")
              getInfo()
            })
            .catch(error => {
              Alert.alert(error.message)
              console.log(error)
            })
        } else {
          Alert.alert('Please enter the 6 digit code.')
        }
      }

      const getInfo = () => {
        if (auth().currentUser?.uid) {
          reference.child('users')
    .child(auth().currentUser!.uid)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        let dict = snapshot.val()
        if (dict.username && dict.birthdate && dict.display) {
          navigation.navigate('Main')
        }
        else {
          navigation.navigate('ChooseEmail')
        }
      }
      else {
        checkBasics()
      }
    });
  }
  else {
    Alert.alert('Please enter the 6 digit code.')
  }
      }
  
      const checkBasics = () => {
        if (auth().currentUser?.uid) {
          reference.child('users').child(auth().currentUser!.uid).set({
            uid: auth().currentUser?.uid
          })
        }
      }

      const signInNow = () => {
        console.log("login now")
        navigation.navigate('LoginScreen')
      }

    const sendCodes = () => {
        if (phone !== null && phone !== "" && phone !== undefined) {
        //var num = phone.text.replace(/^[0-9]\s/g, '');
            if(validatePhoneNumber()){
                console.log("the number")
                console.log(phone)
                handleSendCode()
            }else{
                Alert.alert(`Invalid Number! Please check your phone number`);
                console.log(phone)
            }
        }
        else {
            Alert.alert(`Invalid Number! Please enter a phone number`);
            console.log(phone)
          }
    }

    return (
        <View style={{flex: 1}}>
          <Image style={styles.backgroundImage} source={require('../../assets/images/altarFaded.jpeg')} />
            <View style={styles.container}>
            <HeaderBarView title="" backButton={true}/>
            <Pressable onPress={() => signInNow()}>
                <Text style={styles.already}>Already have an account? Sign In</Text>
          </Pressable>
                <Text style={styles.email}>{enterPhone}</Text>
                {(enterPhone == "Verification Code") && (
                    <Text style={styles.subtext}>We sent a 6-digit code via SMS to
                    +1 {permanentPhone} Enter it below:</Text>
                )}
                <TextInput 
                inputMode= 'numeric'
                style={styles.textInp} 
                placeholder = {placeholder}
                placeholderTextColor={'black'}
                value={phone} 
                onChangeText={(text) => setPhone(`${text}`.trim())}>
                </TextInput>
                {(phone && phone !== null && phone !== "" && phone !== undefined) ? (
                <View style={{flex: 1}}>
            {(confirmResult)  ?  
            <Pressable style={styles.continue} onPress={() => handleVerifyCode()}>
            <Image source={require("../../assets/images/continueBtn.jpeg")}/>
          </Pressable>
          :
          <Pressable id= 'captcha' onPress={() => sendCodes()}>
            <Image source={require("../../assets/images/next.jpeg")}/>
          </Pressable>
            }        
                </View>
                )
                :
          (
            <View style={{flex: 1}}>
          <Pressable style={styles.continue} onPress={() => console.log("pressing")}>
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
        marginTop: 200,
        color: 'black',
        width: 303,
        fontWeight: 'bold'
      },
      emailLabel: {
        flex: 1,
        position: 'absolute',
        fontSize: 12,
        marginTop: 294,
        color: 'black',
        width: 303,
        zIndex: 3,
        paddingHorizontal: 10,
        fontWeight: '400'
      },
      textInp: {
        height: 60,
        width:300 ,
        marginTop: 220,
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
        position: 'absolute',
        marginTop: 10,
        alignItems: 'center',
        alignSelf: 'center',
        height: 80
      },
      sendCode: {
        flex: 1,
        position: 'absolute',
        marginTop: 50,
        justifyContent: 'center',
        color: 'rgba(133, 119, 252, 1)',
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'center',
        height: 60,
        width: 300,
        fontSize: 18,
        borderColor: 'rgba(133, 119, 252, 1)',
        borderWidth: 1
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
        marginTop: 230,
        textAlign: 'center',
        position: 'absolute',
        color: 'grey',
        alignItems: 'center',
        width: 300
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


export default PhoneNumber