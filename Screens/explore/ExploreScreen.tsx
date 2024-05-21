import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Image,
  View,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import firebase from 'firebase/compat';
import {FlatList} from 'react-native';
import ExploreItem from '../../components/ExploreItem';
import auth from '@react-native-firebase/auth';
import Header from '../Header';
import {getDatabase, ref, onValue} from '@firebase/database';
import HomeActionsDrawer from '../../components/HomeActionsDrawer';
import ExploreGroupItem from '../../components/ExploreGroupItem';

const ExploreScreen = (props: any) => {
  const navigation = useNavigation();
  const reference = firebase.database().ref();
  const [loading, setLoading] = useState(false);
  const [isHomeDrawerOpen, setHomeDrawerOpen] = useState(false);

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

  const onHomeActionPress = (action: string) => {
    if (action === 'Profile') {
      navigation.navigate('ProfileScreen');
    } else if (action === 'Subscription') {
      navigation.navigate('SubscriptionScreen');
    } else {
      // Handle the action (e.g., show an alert for now)
      Alert.alert(`Handle ${action} action`);
      // closeDrawer();
    }
  };

  const openHomeDrawer = () => {
    hideTabBar();
    setHomeDrawerOpen(true);
  };

  const closeHomeDrawer = () => {
    setHomeDrawerOpen(false);
    showTabBar();
  };

  const onRefresh = () => {
    setUsers([
      {
        uid: '',
        username: '',
        display: '',
        pic: '',
      },
    ]);

    getUsers();
  };

  const [users, setUsers] = useState([
    {
      uid: '',
      username: '',
      display: '',
      pic: '',
    },
  ]);

  const getUsers = () => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const usersArray: any = Object.values(data);
        setUsers(usersArray);
      }
    });
  };

  const [groups, setGroups] = useState([
    {
      id: '',
      group: {
        name: '',
        desc: '',
        pic: '',
      },
    },
  ]);

  const getGroups = () => {
    const db = getDatabase();
    const groupsRef = ref(db, 'groups');

    onValue(groupsRef, (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const groupsArray: any = Object.values(data);
        setGroups(groupsArray);
      }
    });
  };

  useEffect(() => {
    getUsers();
    getGroups();
  }, []);

  const [profPic, setProfPric] = useState('');

  const getInfo = () => {
    if (auth().currentUser?.uid) {
      reference
        .child('users')
        .child(auth().currentUser!.uid)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            const dict = snapshot.val();
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

  useEffect(() => {
    getInfo();
  }, []);

  const [activeTab, setActiveTab] = useState('People');
  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Here you can perform search operations based on the searchQuery
    // For example, filter data based on the search query and display results
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const [filteredUsers, setFilteredUsers] = useState([
    {
      uid: '',
      username: '',
      display: '',
      pic: '',
    },
  ]);

  useEffect(() => {
    if (users) {
      const filteredUsers = users?.filter(user => {
        // Check if username and displayName are defined before calling toLowerCase
        const usernameMatch = user.username
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase());
        const displayNameMatch = user.display
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase());
        return usernameMatch || displayNameMatch;
      });
      setFilteredUsers(filteredUsers);
    }
  }, [searchQuery, users]);

  const [filteredGroups, setFilteredGroups] = useState([
    {
      id: '',
      group: {
        name: '',
        desc: '',
        pic: '',
      },
    },
  ]);

  useEffect(() => {
    if (groups) {
      const filteredUsers = groups?.filter(group => {
        // Check if username and displayName are defined before calling toLowerCase
        const nameMatch = group?.group?.name
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase());
        return nameMatch;
      });
      setFilteredGroups(filteredUsers);
    }
  }, [searchQuery, groups]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/images/main-screen-bg.png')}
      />
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{paddingHorizontal: 16}}>
          <Header
            centerElement={<Text style={styles.searchHeader}>Search</Text>}
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

          <View style={{paddingHorizontal: 16}}>
            <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {searchQuery.length > 0 && (
                  <Image
                    source={require('../../assets/images/Search_Icon.png')}
                    style={[styles.searchIcon, {marginLeft: 16}]}
                  />
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Search people, groups, partners"
                  placeholderTextColor="#6B6B6B"
                  onChangeText={handleSearch}
                  value={searchQuery}
                />
              </View>
              {searchQuery.length === 0 && (
                <Image
                  source={require('../../assets/images/Search_Icon.png')}
                  style={[styles.searchIcon, {marginRight: 16}]}
                />
              )}
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <Image
                    source={require('../../assets/images/Icon_Clear.png')}
                    style={styles.clearIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.tabGroup}>
              <TouchableOpacity
                style={[
                  styles.tabBtn,
                  activeTab === 'People' && styles.activeTabBtn,
                ]}
                onPress={() => handleTabPress('People')}>
                <Text
                  style={[
                    styles.tabBtnText,
                    activeTab === 'People' && styles.activeTabBtnText,
                  ]}>
                  People
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabBtn,
                  activeTab === 'Groups' && styles.activeTabBtn,
                ]}
                onPress={() => handleTabPress('Groups')}>
                <Text
                  style={[
                    styles.tabBtnText,
                    activeTab === 'Groups' && styles.activeTabBtnText,
                  ]}>
                  Groups
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {activeTab === 'People' && (
            <>
              {filteredUsers.length !== 0 ? (
                <View style={{flex: 1, marginBottom: 64}}>
                  <FlatList
                    extraData={filteredUsers}
                    onRefresh={onRefresh}
                    refreshing={loading}
                    data={filteredUsers}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <ExploreItem
                        profPic={item.pic}
                        username={item.username}
                        displayName={item.display}
                        userId={item.uid}
                      />
                    )}
                  />
                </View>
              ) : (
                <NoResults />
              )}
            </>
          )}
          {activeTab === 'Groups' && (
            <>
              {filteredGroups.length !== 0 ? (
                <View style={{flex: 1, marginBottom: 64}}>
                  <FlatList
                    extraData={filteredGroups}
                    // onRefresh={onRefresh}
                    // refreshing={loading}
                    data={filteredGroups}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <ExploreGroupItem
                        profPic={item.group.pic}
                        name={item.group.name}
                        id={item.id}
                      />
                    )}
                  />
                </View>
              ) : (
                <NoResults />
              )}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
      <HomeActionsDrawer
        isVisible={isHomeDrawerOpen}
        onClose={closeHomeDrawer}
        onActionPress={onHomeActionPress}
      />
    </SafeAreaView>
  );
};

const NoResults = () => (
  <KeyboardAvoidingView style={styles.noResultsContainer}>
    <Text style={styles.noResultsHeader}>No Results</Text>
    <Text style={styles.noResultsCopy}>
      Double-check the spelling or try a new search
    </Text>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  searchHeader: {
    fontSize: 22,
    fontWeight: '700',
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
  tabGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 6,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.25,
    borderColor: '#8577FC',
    padding: 6,
    width: '100%',
  },
  tabBtn: {
    paddingVertical: 12,
    paddingHorizontal: 'auto',
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
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
  input: {
    height: 45,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 45,
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#6B6B6B',
  },
  clearIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: '#6B6B6B',
  },
  noResultsContainer: {
    alignSelf: 'center',
    maxWidth: 212,
    marginTop: 128,
  },
  noResultsHeader: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#313131B2',
    marginBottom: 2,
  },
  noResultsCopy: {
    textAlign: 'center',
    fontSize: 16,
    color: '#313131B2',
    lineHeight: 18,
  },
});

export default ExploreScreen;
