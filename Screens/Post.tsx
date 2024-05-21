import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from './Header';
import ProfilePicture from '../components/ProfilePicture';
import PrayerPostOptionsDrawer from '../components/PrayerPostOptionsDrawer';
import CharacterCounter from '../components/CharacterCounter';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase/compat';
import {getDatabase, ref, set, push} from '@firebase/database';

type User = {
  displayName: string;
  email: string;
  userId: string;
  username: string;
  pic: string;
};

const PostButton = ({onPress, disabled}: any) => {
  let buttonStyle, textStyle;
  buttonStyle = buttonStyles.primaryButton;
  textStyle = buttonStyles.primaryText;

  return (
    <TouchableOpacity
      style={[buttonStyle]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[textStyle]}>Post</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  primaryButton: {
    height: 30,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8577FC',
    borderRadius: 10,
    shadowColor: '#8577FC',
    shadowOffset: {width: 0, height: 11},
    shadowOpacity: 0.47,
    shadowRadius: 21,
    elevation: 5,
  },
  primaryText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.55,
  },
});

const PostScreen = () => {
  const navigation = useNavigation();
  const textInputRef = useRef<TextInput>(null);
  const [postText, setPostText] = useState<string>(''); // State to store TextInput value
  const [isKeyboardActive, setIsKeyboardActive] = useState(false); // State to track keyboard activity
  const [fadeAnimation] = useState(new Animated.Value(0)); // Initialize animated value for opacity
  const route = useRoute(); // Get the route object
  const user: User | any = route.params;

  const createPost = (timestamp: string) => {
    const db = getDatabase();
    const postsRef = ref(db, 'posts');

    const newPostRef = push(postsRef);
    const postId = newPostRef.key;

    set(newPostRef, {
      id: postId,
      user: {
        uid: user?.userId,
        username: user?.username,
        display: user?.displayName,
        email: user?.email,
        pic: user?.pic !== undefined ? user?.pic : '',
      },
      body: postText,
      timestamp: timestamp,
      likes: [],
    });
  };

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // Focus the text input when the screen is loaded
    textInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardActive(true); // Set keyboard active when it shows
        fadeIn();
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardActive(false); // Set keyboard inactive when it hides
        fadeOut();
      },
    );

    return () => {
      keyboardDidShowListener.remove(); // Clean up listeners on component unmount
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCancel = () => {
    navigation.navigate('Main');
  };

  const handlePost = async () => {
    const timestamp = new Date();
    await createPost(timestamp.toString());
    navigation.navigate('Main');
  };

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    Keyboard.dismiss();
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const onActionPress = (action: string) => {
    // Handle the action (e.g., show an alert for now)
    Alert.alert(`Handle ${action} action`);
    closeDrawer();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../assets/images/main-screen-bg.png')}
        />
        <Header
          leftElement={
            <TouchableOpacity onPress={handleCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          }
          rightElement={
            <PostButton
              type={'primary'}
              onPress={handlePost}
              disabled={postText.length === 0}
            />
          }
        />
        <KeyboardAvoidingView
          style={styles.postContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}>
          <View style={styles.copyContainer}>
            <TouchableOpacity
              style={styles.postOptionsButton}
              onPress={openDrawer}>
              <Text>Post to Profile</Text>
            </TouchableOpacity>
            <View style={styles.profileContainer}>
              <ProfilePicture
                imgSrc={{
                  uri: user?.pic,
                }}
                width={42}
              />
              <TextInput
                ref={textInputRef}
                style={styles.textInput}
                placeholder="Add a prayer request, praise or encouragement..."
                placeholderTextColor="#3C3C4399"
                multiline
                autoFocus
                value={postText}
                onChangeText={text => setPostText(text)}
                onFocus={() => setDrawerOpen(false)}
              />
            </View>
            <PrayerPostOptionsDrawer
              isVisible={isDrawerOpen}
              onClose={closeDrawer}
              onActionPress={onActionPress}
              user={user}
            />
          </View>
          {isKeyboardActive && !isDrawerOpen && (
            <Animated.View
              style={[styles.characterCounter, {opacity: fadeAnimation}]}>
              <CharacterCounter count={1000 - postText.length} />
            </Animated.View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 0,
    marginBottom: 0,
  },
  backgroundImage: {
    position: 'absolute',
    // width: '100%',
    // height: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  cancelButton: {
    color: 'rgba(0, 20, 59, 0.77)',
    fontWeight: '400',
  },
  postOptionsButton: {
    backgroundColor: '#EDEDED',
    color: '#313131',
    fontWeight: '500',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  postContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    // marginBottom: 16, // Add marginBottom to create space for the character counter
  },
  copyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 16,

    marginBottom: 16, // Add marginBottom to create space for the character counter
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    marginLeft: 16,
    color: '#4F5B79',
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  characterCounter: {},
});

export default PostScreen;
