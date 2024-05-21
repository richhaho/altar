import messaging from '@react-native-firebase/messaging';

const initializeFirebaseMessaging = () => {
  messaging().onMessage(async remoteMessage => {
    const {type, senderId} = remoteMessage.data;

    if (type === 'friend_request') {
      // Display a notification or update the UI to inform the user about the friend request
    } else if (type === 'message') {
      // Display a notification or update the UI to inform the user about the new message
    }
  });
};

export default initializeFirebaseMessaging;
