import React = require('react');
import {useEffect, useState} from 'react';
import {
  Image,
  View,
  StatusBar,
  StyleSheet,
  Share,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  Pressable,
  TextInput,
} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import firebase from 'firebase/compat';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Feed from '../../components/Feed';
import FeedItemActionsDrawer from '../../components/FeedItemActionsDrawer';

const ProfileScreen = () => {
  const [profPic, setProfPric] = useState('');
  const [username, setUsername] = useState('Username');
  const [display, setDisplay] = useState('Display');
  const uid = auth().currentUser?.uid ?? 'uid';
  const navigation = useNavigation();
  const reference = firebase.database().ref();

  useEffect(() => {
    reference
      .child('users')
      .child(uid)
      .once('value')
      .then(snapshot => {
        const dict = snapshot.val();
        setProfPric(dict.pic);
        setUsername(dict.username);
        setDisplay(dict.display);
      });
  }, []);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
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

  const [activeTab, setActiveTab] = useState('Prayer');
  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/images/main-screen-bg.png')}
      />
      <View style={{flex: 1}}>
        <Image source={{uri: profPic}} style={styles.profPic} />
        <Pressable style={styles.edit}>
          <Text style={styles.editText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={styles.message}>
          <Text style={styles.messageText}>Message</Text>
        </Pressable>
        <Pressable>
          <Image
            source={require('../../assets/images/more-button.png')}
            style={styles.moreBtn}
          />
        </Pressable>
        <Text style={styles.display}>{display}</Text>
        <Text style={styles.username}>
          {'@'}
          {username}
        </Text>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet, consec adipiscing elit, sed do eiusmod.
          Lorem ipsum dolor sit amet, consec.
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.followers}>Followers</Text>
        <Text style={styles.prayers}>Prayers</Text>
        <Text style={styles.praises}>Praises</Text>
        <Text style={styles.followersLbl}>35K</Text>
        <Text style={styles.prayersLbl}>1.5K</Text>
        <Text style={styles.praisesLbl}>333</Text>
      </View>
      <View style={styles.tabGroup}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'Prayer' && styles.activeTabBtn]}
          onPress={() => handleTabPress('Prayer')}>
          <Text
            style={[
              styles.tabBtnText,
              activeTab === 'Prayer' && styles.activeTabBtnText,
            ]}>
            Prayer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'Groups' && styles.activeTabBtn]}
          onPress={() => handleTabPress('Groups')}>
          <Text
            style={[
              styles.tabBtnText,
              activeTab === 'Groups' && styles.activeTabBtnText,
            ]}>
            Groups
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            activeTab === 'Private' && styles.activeTabBtn,
          ]}
          onPress={() => handleTabPress('Private')}>
          <Text
            style={[
              styles.tabBtnText,
              activeTab === 'Private' && styles.activeTabBtnText,
            ]}>
            Private
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'Saved' && styles.activeTabBtn]}
          onPress={() => handleTabPress('Saved')}>
          <Text
            style={[
              styles.tabBtnText,
              activeTab === 'Saved' && styles.activeTabBtnText,
            ]}>
            Saved
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.feedContainer}>
        <Feed
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          onActionPress={onActionPress}
        />
      </View>
      <FeedItemActionsDrawer
        isVisible={isDrawerOpen}
        onClose={closeDrawer}
        onActionPress={onActionPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    fontSize: 30,
    color: 'white',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
  },
  profPic: {
    position: 'absolute',
    width: 90,
    height: 90,
    marginTop: 50,
    marginLeft: 8,
    borderRadius: 10,
    borderColor: 'rgba(133, 119, 252, 1)',
    borderWidth: 2
  },
  display: {
    position: 'absolute',
    width: 500,
    marginTop: 156,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 20,
  },
  username: {
    position: 'absolute',
    width: 200,
    marginTop: 186,
    marginLeft: 8,
    fontSize: 16,
  },
  followers: {
    position: 'absolute',
    width: 200,
    marginTop: -100,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '300',
  },
  prayers: {
    position: 'absolute',
    width: 200,
    marginTop: -100,
    marginLeft: 170,
    fontSize: 16,
    fontWeight: '300',
  },
  praises: {
    position: 'absolute',
    width: 200,
    marginTop: -100,
    marginLeft: 300,
    fontSize: 16,
    fontWeight: '300',
  },
  followersLbl: {
    position: 'absolute',
    width: 200,
    marginTop: -130,
    marginLeft: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  prayersLbl: {
    position: 'absolute',
    width: 200,
    marginTop: -130,
    marginLeft: 180,
    fontSize: 16,
    fontWeight: 'bold',
  },
  praisesLbl: {
    position: 'absolute',
    width: 200,
    marginTop: -130,
    marginLeft: 310,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bio: {
    position: 'absolute',
    width: 340,
    height: 100,
    marginTop: 216,
    marginLeft: 8,
    fontSize: 16,
  },
  edit: {
    position: 'absolute',
    marginTop: 50,
    marginLeft: 130,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(133, 119, 252, 1)',
    alignItems: 'center',
    color: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  editText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  message: {
    position: 'absolute',
    width: 80,
    height: 35,
    marginTop: 50,
    marginLeft: 235,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(133, 119, 252, 1)',
  },
  messageText: {
    color: 'rgba(133, 119, 252, 1)',
    fontSize: 12,
  },
  moreBtn: {
    position: 'absolute',
    width: 40,
    height: 35,
    marginTop: 50,
    marginLeft: 330,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(133, 119, 252, 1)',
  },
  feedContainer: {
    position: 'absolute',
    top: 450,
    height: 400,
    paddingBottom: 130
  },
  tabGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 6,
    alignItems: 'center',
    position: 'absolute',
    top: 370,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.25,
    borderColor: '#8577FC',
    padding: 6,
  },
  tabBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  tabBtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00000080',
  },
  activeTabBtn: {
    backgroundColor: '#8577FC',
  },
  activeTabBtnText: {
    color: '#FFFFFF',
  },
});

export default ProfileScreen;
