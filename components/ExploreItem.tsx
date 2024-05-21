// FeedItem.js

import React from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  getDatabase,
  ref,
  query,
  equalTo,
  onValue,
  push,
  set,
} from 'firebase/database';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase/compat';
import {useState} from 'react';
import {useEffect} from 'react';

const windowWidth = Dimensions.get('window').width;

const ExploreItem = ({profPic, username, displayName, userId}: any) => {
  const reference = firebase.database().ref();
  const [currentUserId, setCurrentUserId] = useState('');

  const getInfo = () => {
    if (auth().currentUser?.uid) {
      reference
        .child('users')
        .child(auth().currentUser!.uid)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            const dict = snapshot.val();
            setCurrentUserId(dict.uid);
          }
        });
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const onFollowBtnPress = async () => {
    try {
      const db = getDatabase();
      const notificationsRef = ref(db, `users/${userId}/notifications`);

      const newNotification = {
        type: 'friend_request',
        senderId: currentUserId,
        timestamp: new Date().toISOString(),
        read: false,
      };

      if (userId !== currentUserId) {
      push(notificationsRef, newNotification)
        .then(() => {
          console.log('Notification added successfully');
          Alert.alert('Friend Request Sent');
        })
        .catch(error => {
          console.error('Error adding notification:', error);
          Alert.alert('Unable to Send Friend Request');
        });
      }
    } catch (err) {
      Alert.alert('Unable to Send Friend Request');
    }
  };

  const commentCount = 0;
  const prayerCount = 0;

  return (
    <View style={styles.container}>
      <Image
        source={{uri: profPic}}
        style={{width: 50, height: 50, borderRadius: 10, overflow: 'hidden'}}
      />
      <Text style={styles.displayName}>{displayName}</Text>
      <Text style={styles.username}>@{username}</Text>
      {userId !== currentUserId &&
      <TouchableOpacity
        style={styles.button}
        onPress={() => onFollowBtnPress()}>
        <Text style={styles.buttonText}>Follow</Text>
      </TouchableOpacity>
      }
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
    backgroundColor: 'rgba(133, 119, 252, 1)',
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
    marginRight: 8, // Adjust the spacing between buttons if needed
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

export default ExploreItem;
