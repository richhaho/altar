import {useNavigation} from '@react-navigation/native';
import HeaderBarView from '../../configuration/HeaderBarView';
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
import {Button} from 'react-native-share';
import {FlatList} from 'react-native';
import {UserItem} from 'database/UserItem';
import ExploreItem from '../../components/ExploreItem';

const FollowAccounts = () => {
  const uid = firebase.auth().currentUser?.uid ?? 'uid';
  const navigation = useNavigation();
  const reference = firebase.database().ref();
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([
    {
      uid: '',
      username: '',
      displayName: '',
      pic: '',
    },
  ]);
  const [uids, setUids] = useState(['']);
  const [loading, setLoading] = useState(false);

  const continueOnboard = () => {
    navigation.navigate('ShareAltar');
  };

  const onRefresh = () => {
    setUids(['']);
    setUsers([
      {
        uid: '',
        username: '',
        displayName: '',
        pic: '',
      },
    ]);

    getUids();
    if (uids.length > 0) {
      getUsers();
    }
  };

  const getUids = () => {
    reference
      .child('explore')
      .once('value')
      .then(snapshot => {
        const updatedUids: any = [];

        snapshot.forEach(child => {
          const ud = child.child('uid').val();

          if (typeof ud === 'string') {
            updatedUids.push(ud.replaceAll('"', ''));
          }
        });
        setUids(Array.from(new Set(updatedUids)));
        uids.shift();
      })
      .catch(error => {
        console.error('Error retrieving UIDs:', error);
      });
  };

  const getUsers = () => {
    console.log('get userss');
    console.log(uids);
    if (uids.length > 0 && uids[0] !== '') {
      uids.forEach(child => {
        reference
          .child('users')
          .child(child)
          .once('value')
          .then(snapshot => {
            const data = snapshot.val();
            const newUser = {
              uid: data.uid,
              username: data.username,
              displayName: data.display,
              pic: data.pic,
            };
            users.push(newUser);
            setUsers(Array.from(new Set(users)));
            console.log(users);
          });
      });
      users.shift();
    }
  };

  useEffect(() => {
    getUids();
  }, []);

  useEffect(() => {
    if (uids.length > 0) {
      getUsers();
    }
  }, [uids]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../../assets/images/altarFaded.jpeg')}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.header}>Explore Prayer Partners</Text>
          <View style={{flex: 1}}>
            <Text style={styles.subtext}>
              {' '}
              Follow friends or accounts you like and start praying for one
              another today.{' '}
            </Text>
          </View>
          <View style={{flex: 1, marginTop: -200}}>
            <FlatList
              extraData={users}
              onRefresh={onRefresh}
              refreshing={loading}
              style={{flex: 1, marginTop: -80}}
              data={users}
              renderItem={({item, index}) => (
                <ExploreItem
                  profPic={item.pic}
                  username={item.username}
                  displayName={item.displayName}
                />
              )}
            />
            <Pressable
              style={styles.continue}
              onPress={() => continueOnboard()}>
              <Image source={require('../../assets/images/continueBtn.jpeg')} />
              <Text style={styles.subtext2}>
                *Follow at least 3 profiles to continue.
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    fontSize: 30,
    color: 'white',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  continue: {
    flex: 1,
    position: 'absolute',
    marginTop: 280,
    alignItems: 'center',
    alignSelf: 'center',
    height: 80,
  },
  subtext2: {
    flex: 1,
    marginTop: 100,
    position: 'absolute',
    color: 'black',
    alignItems: 'center',
    fontSize: 12,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
  },
  subtext: {
    flex: 1,
    marginTop: 200,
    height: 60,
    // width: '75%',
    alignSelf: 'center',
    position: 'absolute',
    textAlign: 'center',
    color: 'grey',
    lineHeight: 21,
    fontSize: 16,
  },
  leftButton: {
    flex: 1,
    backgroundColor: 'rgba(133, 119, 252, 1)',
    height: 78,
    width: '48%',
    marginLeft: 10,
    position: 'absolute',
  },
  rightButton: {
    flex: 1,
    backgroundColor: 'rgba(133, 119, 252, 1)',
    height: 78,
    width: '46%',
    marginLeft: 165,
    position: 'absolute',
  },
  search: {
    height: 60,
    width: 320,
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 0.5,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    borderRadius: 10,
  },
  header: {
    flex: 1,
    fontSize: 24,
    width: 300,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 150,
    alignContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default FollowAccounts;
