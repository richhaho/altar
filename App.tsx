/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RootNavigator from './navigators/RootNavigator';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import linking from './configuration/LinkingConfiguration';
import 'react-native-gesture-handler';
import {useEffect} from 'react';
import {initializeApp} from 'firebase/app';
import {useRef} from 'react';
import firebase from 'firebase/compat';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const config = {
      apiKey: 'AIzaSyBYqc4HpG8aIBUpH8SENJa-Pm6354glADs',
      authDomain: 'altar-social-app.firebaseapp.com',
      projectId: 'altar-social-app',
      storageBucket: 'altar-social-app.appspot.com',
      messagingSenderId: '892561242305',
      appId: '1:892561242305:web:800247b28257bc2581bc40',
      measurementId: 'G-TZPHCBV995',
    };
    firebase.initializeApp(config);
  }, []);

  return (
    <NavigationContainer linking={linking} theme={DarkTheme}>
      {/* <SafeAreaView style={backgroundStyle}> */}
      <RootNavigator />
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
