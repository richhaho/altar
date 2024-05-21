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
  child,
  push,
  query,
  remove,
  equalTo,
  get,
  set,
  orderByChild,
} from 'firebase/database';
import ProfilePicture from './ProfilePicture';
import auth from '@react-native-firebase/auth';
import {useState, useEffect} from 'react';

const windowWidth = Dimensions.get('window').width;

const formatTimestamp = timestamp => {
  const timestampDate = new Date(timestamp);
  const currentTimeMillis = new Date().getTime();
  const timestampMillis = timestampDate.getTime();
  const differenceInMillis = currentTimeMillis - timestampMillis;
  const minutesSinceTimestamp = Math.floor(differenceInMillis / (1000 * 60));

  if (minutesSinceTimestamp < 60) {
    return `${minutesSinceTimestamp}m`;
  } else if (minutesSinceTimestamp < 24 * 60) {
    return `${Math.floor(minutesSinceTimestamp / 60)}hr`;
  } else if (minutesSinceTimestamp < 365 * 24 * 60) {
    // Format as month/date
    const month = timestampDate.getMonth() + 1; // Month is 0-indexed
    const date = timestampDate.getDate();
    return `${month}/${date}`;
  } else {
    // Format as month/date/year
    const year = timestampDate.getFullYear();
    const month = timestampDate.getMonth() + 1; // Month is 0-indexed
    const date = timestampDate.getDate();
    return `${month}/${date}/${year}`;
  }
};

const FeedItem = ({data, openDrawer, closeDrawer, onActionPress}: any) => {
  const {id, body, timestamp, user, likes} = data || {};

  const {display, email, pic, uid, username} = user || {};

  const initialPrayerCount = likes ? Object.keys(likes).length : 0;
  const [prayerCount, setPrayerCount] = useState(initialPrayerCount);

  const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);

  const onPostBtnPress = (str: string) => {
    return Alert.alert(`Handle ${str} action`);
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    if (likes) {
      const likeKeys = Object.keys(likes);
      setPrayerCount(likeKeys.length);
    }
  }, [likes]);

  const [userId, setUserId] = useState('');

  const getInfo = () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      setUserId(userId);
    }
  };

  const handleLike = async () => {
    try {
      const db = getDatabase();
      const postLikesRef = ref(db, `posts/${id}/likes`);

      const notificationsRef = ref(db, `users/${uid}/notifications`);

      const newNotification = {
        type: 'post_like',
        senderId: userId,
        timestamp: new Date().toISOString(),
        read: false,
        post: body
      };

      // Check if userId already exists in the likes array
      const likedByCurrentUserQuery = query(
        postLikesRef,
        orderByChild('userId'),
        equalTo(userId),
      );
      const likedByCurrentUserSnapshot = await get(likedByCurrentUserQuery);
      const isLikedByCurrentUser = likedByCurrentUserSnapshot.exists();

      if (likedByCurrentUserSnapshot.exists()) {
        // If userId exists in likes array, remove it
        const likeKey = Object.keys(likedByCurrentUserSnapshot.val())[0];
        const likeRefToRemove = ref(db, `posts/${id}/likes/${likeKey}`);
        await remove(likeRefToRemove);
        setPrayerCount(prevCount => prevCount - 1);
        console.log('Post unliked successfully');
      } else {
        // If userId doesn't exist in likes array, push it
        const newLikeRef = push(postLikesRef);
        await set(newLikeRef, {userId});
        await push(notificationsRef, newNotification);
        console.log('Post liked successfully');
      }

      setLikedByCurrentUser(!isLikedByCurrentUser);
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const onPressOpenDrawer = () => {
    openDrawer();
  };

  const commentCount = 0;

  // const timestampDate = new Date(timestamp);

  // const currentTimeMillis = new Date().getTime();
  // const timestampMillis = timestampDate.getTime();
  // const differenceInMillis = currentTimeMillis - timestampMillis;
  // const minutesSinceTimestamp = Math.floor(differenceInMillis / (1000 * 60));
  const postTime = formatTimestamp(timestamp);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <Image style={styles.profilePicture} source={{uri: profilePicture}} /> */}
        <View style={styles.profilePicture}>
          <ProfilePicture imgSrc={{uri: pic}} width={36} />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.displayName}>{display}</Text>
          <Text style={styles.username}>@{username}</Text>
        </View>
        <Text style={styles.minutesAgo}>{postTime}</Text>
      </View>
      <Text style={styles.bodyText}>{body}</Text>
      <View style={styles.footerContainer}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleLike}>
            {likedByCurrentUser ? (
              <Image
                style={styles.iconButton}
                source={require('../assets/images/Icon_Prayer-Prayed-Liked.png')}
              />
            ) : (
              <Image
                style={styles.iconButton}
                source={require('../assets/images/Icon_Prayer-Prayed.png')}
              />
            )}
            <Text style={styles.buttonCount}>{prayerCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => onPostBtnPress('Comment')}>
            <Image
              style={styles.iconButton}
              source={require('../assets/images/Icon_Comment.png')}
            />
            <Text style={styles.buttonCount}>{commentCount}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onPressOpenDrawer}>
          <Image source={require('../assets/images/Icon_Post_More.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.77)',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(133, 119, 252, 0.33)',
    elevation: 2,
    fontFamily: 'Poppins-Regular',
    width: windowWidth - 32,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  profilePicture: {
    marginRight: 8,
  },
  userInfoContainer: {
    flex: 1,
  },
  displayName: {
    color: '#313131',
    fontWeight: '500',
    fontSize: 14,
  },
  username: {
    color: 'rgba(49, 49, 49, 0.50)',
    fontSize: 12,
  },
  minutesAgo: {
    color: 'rgba(49, 49, 49, 0.50)',
    fontSize: 12,
  },
  bodyText: {
    color: '#4F5B79',
    fontSize: 14,
    marginBottom: 26,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 26, // Adjust the spacing between buttons if needed
  },
  buttonCount: {
    marginLeft: 8,
    color: '#000',
  },
  iconButton: {
    width: 16,
    height: 16,
  },
});

export default FeedItem;
