import React = require('react');
import {useEffect, useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase/compat';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import Feed from '../components/Feed';
import StatusCarousel from '../components/StatusCarousel';
import FeedItemActionsDrawer from '../components/FeedItemActionsDrawer';
import HomeActionsDrawer from '../components/HomeActionsDrawer';
import {getDatabase, ref, onValue} from '@firebase/database';

const win = Dimensions.get('window');

const profiles = [
  {
    imgSrc: {
      uri: 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg',
    },
    username: '@youknow',
  },
  {
    imgSrc: {
      uri: 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg',
    },
    username: '@ellison',
  },
  {
    imgSrc: {
      uri: 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg',
    },
    username: '@jlee',
  },
  {
    imgSrc: {
      uri: 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg',
    },
    username: '@ellison',
  },
  {
    imgSrc: {
      uri: 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg',
    },
    username: '@pastorchris',
  },
  {
    imgSrc: {
      uri: 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg',
    },
    username: '@helga',
  },
  {
    imgSrc: {
      uri: 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg',
    },
    username: '@dom',
  },
  {
    imgSrc: {
      uri: 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg',
    },
    username: '@css',
  },
];

const HomeScreen = (props: any) => {
  const reference = firebase.database().ref();
  const navigation = useNavigation();

  const hideTabBar = () => {
    props.navigation?.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });
  };

  const showTabBar = () => {
    props.navigation?.getParent()?.setOptions({
      tabBarStyle: {display: 'flex'},
    });
  };

  const goToNewPost = () => {
    // Handle navigation to the new post screen
    console.log('Navigating to new post screen');
    navigation.navigate('PostScreen', userInfo);
  };

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    hideTabBar();
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    showTabBar();
  };

  const onActionPress = (action: string) => {
    // Handle the action (e.g., show an alert for now)
    Alert.alert(`Handle ${action} action`);
    closeDrawer();
  };

  const [isHomeDrawerOpen, setHomeDrawerOpen] = useState(false);

  const openHomeDrawer = () => {
    hideTabBar();
    setHomeDrawerOpen(true);
  };

  const closeHomeDrawer = () => {
    setHomeDrawerOpen(false);
    showTabBar();
  };

  const onHomeActionPress = (action: string) => {
    if (action === 'Profile') {
      navigation.navigate('ProfileScreen');
    } else if (action === 'Subscription') {
      navigation.navigate('SubscriptionScreen');
    } else {
      // Handle the action (e.g., show an alert for now)
      Alert.alert(`Handle ${action} action`);
      closeDrawer();
    }
  };

  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [profPic, setProfPric] = useState('');

  const userInfo = {
    userId,
    username,
    displayName,
    email,
    pic: profPic,
  };

  const getInfo = () => {
    if (auth().currentUser?.uid) {
      reference
        .child('users')
        .child(auth().currentUser!.uid)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            const dict = snapshot.val();
            setUserId(dict.uid);
            setUsername(dict.username);
            setDisplayName(dict.display);
            setEmail(dict.email);
            setProfPric(dict.pic);
            if (dict.uid && dict.birthdate && dict.display) {
            } else {
              navigation.navigate('PhoneNumber');
            }
          } else {
            navigation.navigate('PhoneNumber');
          }
        });
    } else {
      navigation.navigate('PhoneNumber');
    }
  };

  const [prayers, setPrayers] = useState(null);

  const getPrayers = () => {
    const db = getDatabase();
    const postsRef = ref(db, 'posts');

    onValue(postsRef, (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.values(data);
        const reversedPostsArray: any = postsArray.reverse();
        setPrayers(reversedPostsArray);
      } else {
        setPrayers(null);
      }
    });
  };

  useEffect(() => {
    getInfo();
    getPrayers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../assets/images/main-screen-bg.png')}
      />
      <View style={isDrawerOpen && styles.overlayContainer}>
        <Header
          centerElement={
            <Image
              style={styles.logoImage}
              source={require('../assets/images/logo.png')}
            />
          }
          rightElement={
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={openHomeDrawer}>
              <Image
                style={styles.avatar}
                source={{
                  uri: profPic,
                }}
              />
            </TouchableOpacity>
          }
        />
        <StatusCarousel profiles={profiles} />
        {/* <View style={styles.container}>
        <Image
          style={styles.vector}
          source={require('../assets/images/vector.png')}
        />
        <Text style={styles.headerText}>Praying Everyday</Text>
        <View style={styles.copyContainer}>
          <Text style={styles.descText}>
            Let the power of prayer transform your day, one prayer at a time.
          </Text>
          <Text style={styles.actionText}>Pray Now!</Text>
        </View>
      </View> */}
        {prayers ? (
          <Feed
            data={prayers}
            openDrawer={openDrawer}
            closeDrawer={closeDrawer}
            onActionPress={onActionPress}
          />
        ) : (
          <View style={styles.emptyFeed}>
            <Image
              style={styles.vector}
              source={require('../assets/images/vector.png')}
            />
            <Text style={styles.headerText}>Praying Everyday</Text>
            <View style={styles.copyContainer}>
              <Text style={styles.descText}>
                Let the power of prayer transform your day, one prayer at a
                time.
              </Text>
              <Text style={styles.actionText}>Pray Now!</Text>
            </View>
          </View>
        )}
        {/* TEMPORARY BUTTON TO NAVIGATE TO INVITE SCREEN TO STYLE */}
        {/* <TouchableOpacity style={{marginBottom: 32}} onPress={() => testFunc()}>
        <Text>Go to Invite</Text>
      </TouchableOpacity> */}
        <TouchableOpacity style={styles.newPostButton} onPress={goToNewPost}>
          <Image
            source={require('../assets/images/newPost-bg.png')}
            style={styles.newPostButtonImage}
          />
          <Image
            source={require('../assets/images/plusIcon.png')}
            style={styles.newPostPlusIcon}
          />
        </TouchableOpacity>
      </View>
      {/* Render the drawer conditionally */}
      <FeedItemActionsDrawer
        isVisible={isDrawerOpen}
        onClose={closeDrawer}
        onActionPress={onActionPress}
      />
      <HomeActionsDrawer
        isVisible={isHomeDrawerOpen}
        onClose={closeHomeDrawer}
        onActionPress={onHomeActionPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  emptyFeed: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 32,
  },
  overlayContainer: {
    flex: 1,
    opacity: 0.44,
    backgroundColor: 'lightgray',
  },
  logoImage: {
    width: 65.5,
    resizeMode: 'contain',
  },
  avatarContainer: {
    width: 33,
    height: 33,
    borderRadius: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  avatar: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  vector: {
    marginBottom: 16,
  },
  headerText: {
    color: '#313131',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  copyContainer: {
    maxWidth: 250,
    marginBottom: 64,
  },
  descText: {
    color: '#4F5B79',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 32,
  },
  actionText: {
    color: '#8956E9',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  newPostButton: {
    position: 'absolute',
    bottom: 125,
    right: 16,
    width: 52,
    height: 52,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add elevation for Android shadow
  },
  newPostButtonImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  newPostPlusIcon: {
    zIndex: 1, // Ensure the text is above the image
    width: 20,
    height: 20,
  },
});

export default HomeScreen;
