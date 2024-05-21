import React = require('react');
import {useEffect, useState} from 'react';
import {
  Image,
  View,
  StatusBar,
  StyleSheet,
  Share,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  Pressable,
  TextInput,
} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../components/Types';

const LoginScreen = () => {

const navigation = useNavigation()

const signUp = () => {
    navigation.navigate('PhoneNumber')
}

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('../../assets/images/login-bg.jpeg')} />
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.login}
          onPress={() => signUp()}>
          <Image source={require('../../assets/images/login.jpeg')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signup}
          onPress={() => signUp()}>
          <Image source={require('../../assets/images/signUp.jpeg')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    fontSize: 30,
    color: 'white',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
  },
  login: {
    position: 'absolute',
    width: 315,
    height: 60,
    justifyContent: 'center',
    top: 502,
    left: 25
  },
  signup: {
    position: 'absolute',
    width: 315,
    height: 60,
    justifyContent: 'center',
    top: 581,
    left: 25
  },
});

export default LoginScreen;
