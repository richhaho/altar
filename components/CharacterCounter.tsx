import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const CharacterCounter = ({count}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.counter}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // bottom: 50,
    width: screenWidth,
  },
  rectangle: {
    width: screenWidth,
    height: 36,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  counter: {
    color: '#4F5B79',
    fontSize: 12,
    marginTop: 8,
  },
});

export default CharacterCounter;
