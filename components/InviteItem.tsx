// FeedItem.js

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  getDatabase,
  ref,
  push
} from 'firebase/database';

const InviteItem = ({profPic, username, displayName, group, userId}: any) => {
  const [invited, setInvited] = useState(false);

  const onInviteBtnPress = async () => {
    try {
      const db = getDatabase();
      const notificationsRef = ref(db, `users/${userId}/notifications`);

      const newNotification = {
        type: 'group_invite',
        senderId: group?.id,
        senderType: 'group',
        timestamp: new Date().toISOString(),
        read: false,
      };

      await push(notificationsRef, newNotification);

      setInvited(!invited);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: profPic}}
        style={{width: 50, height: 50, borderRadius: 10, overflow: 'hidden'}}
      />
      <Text style={styles.displayName}>{displayName}</Text>
      <Text style={styles.username}>@{username}</Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: invited ? '#C4C4C4' : 'rgba(133, 119, 252, 1)'}]}
        disabled={invited}
        onPress={onInviteBtnPress}>
        <Text style={styles.buttonText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(133, 119, 252, 0.22)',
  },
  profilePicture: {
    marginLeft: 8,
    position: 'absolute',
  },
  displayName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    marginLeft: 65,
  },
  username: {
    color: 'black',
    fontSize: 14,
    position: 'absolute',
    marginLeft: 65,
    marginTop: 22,
  },
  button: {
    width: 92,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'white',
    fontSize: 12,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 15,
  },
  iconButton: {
    position: 'absolute',
    width: 120,
    height: 30,
    backgroundColor: 'rgba(133, 119, 252, 1)',
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginLeft: 250,
    fontWeight: 'bold',
    borderRadius: 10,
  },
});

export default InviteItem;
