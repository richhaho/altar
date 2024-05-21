// FeedItemActionsDrawer.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AltarButton from './AltarButton';

const FeedItemActionsDrawer = ({isVisible, onClose, onActionPress}: any) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onActionPress('Share Prayer')}>
          <Image
            style={styles.actionIcon}
            source={require('../assets/images/Placeholder_Icon.png')}
          />
          <Text style={styles.actionText}>Share Prayer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onActionPress('Save')}>
          <Image
            style={styles.actionIcon}
            source={require('../assets/images/Save.png')}
          />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onActionPress('Unfollow')}>
          <Image
            style={styles.actionIcon}
            source={require('../assets/images/Unfollow.png')}
          />
          <Text style={styles.actionText}>Unfollow @user</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onActionPress('Block')}>
          <Image
            style={styles.actionIcon}
            source={require('../assets/images/Block.png')}
          />
          <Text style={styles.actionText}>Block @user</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onActionPress('Report')}>
          <Image
            style={styles.actionIcon}
            source={require('../assets/images/Report.png')}
          />
          <Text style={styles.actionText}>Report Prayer</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignSelf: 'center'}}>
        <AltarButton type={'primary'} onPress={onClose}>
          Close
        </AltarButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 48,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: 'rgba(133, 119, 252, 0.33)',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 500,
    flex: 1,
    justifyContent: 'space-between',
  },
  actionsContainer: {},
  actionButton: {
    marginBottom: 41,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    objectFit: 'contain',
  },
  actionText: {
    fontSize: 16,
  },
  // closeContainer: {
  //   alignSelf: 'flex-end',
  // },
});

export default FeedItemActionsDrawer;
