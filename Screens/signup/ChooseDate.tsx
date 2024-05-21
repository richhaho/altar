import React = require("react");
import { useEffect, useState } from "react";
import { Image, View, StatusBar, StyleSheet, Share, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator, Pressable, TextInput } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import DatePicker from 'react-native-date-picker'
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import HeaderBarView from "../../configuration/HeaderBarView"

const ChooseDate = () => {

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(true)
  const reference = firebase.database().ref()
  const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImage} source={require('../../assets/images/altarFaded.jpeg')} />
            <HeaderBarView title="" backButton={true}/>
        <Pressable style={styles.continue} onPress={() => setOpen(true)}>
            <Text style={styles.textView}>Select your birth date</Text>
            <Text style={styles.textView2}>At Altar your privacy matters, we use this information solely for enhancing your engagement.</Text>
        </Pressable>
        <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          reference.child('users')
            .child(auth().currentUser!.uid).update({
              birthdate: date
            })
            navigation.navigate('ChooseUsername')
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      continue: {
        flex: 1,
        position: 'absolute',
        marginTop: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        color: 'white'
      },
      textView: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 130
      },
      textView2: {
        flex: 1,
        fontSize: 18,
        marginTop: 0,
        color: 'grey',
        textAlign: 'center'
      },
      backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
      },
})


export default ChooseDate