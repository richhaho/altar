import React, {ReactNode} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface HeaderProps {
  leftElement?: ReactNode;
  centerElement?: ReactNode;
  rightElement?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  leftElement,
  centerElement,
  rightElement,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>{leftElement}</View>
      <View style={styles.center}>{centerElement}</View>
      <View style={styles.right}>{rightElement}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    padding: 16,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    flex: 2,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default Header;
