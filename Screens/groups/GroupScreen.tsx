import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Header from '../Header';
import {getDatabase, ref, onValue} from '@firebase/database';
import HomeActionsDrawer from '../../components/HomeActionsDrawer';
import {useState} from 'react';
import firebase from 'firebase/compat';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import ExploreGroupItem from '../../components/ExploreGroupItem';

const GroupScreen = (props: any) => {
  const navigation = useNavigation();
  const reference = firebase.database().ref();
  const [isHomeDrawerOpen, setHomeDrawerOpen] = useState(false);

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

  const openHomeDrawer = () => {
    hideTabBar();
    setHomeDrawerOpen(true);
  };

  const closeHomeDrawer = () => {
    setHomeDrawerOpen(false);
    showTabBar();
  };

  const [activeTab, setActiveTab] = useState('My Groups');
  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const [userId, setUserId] = useState('');
  const [profPic, setProfPic] = useState('');

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
            setProfPic(dict.pic);
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

  const [groups, setGroups] = useState([]);

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
    getGroups();
  }, []);

  const handleCreate = () => {
    navigation.navigate('CreateGroupScreen');
  };

  const [filteredGroups, setFilteredGroups] = useState([
    {
      id: '',
      group: {
        name: '',
        desc: '',
        pic: '',
        members: []
      },
    },
  ]);

  const [userGroups, setUserGroups] = useState([
    {
      id: '',
      group: {
        name: '',
        desc: '',
        pic: '',
        members: []
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

  useEffect(() => {
    if (groups) {
    const groupsWithUser = groups?.filter(group => {
      if (group?.group?.members) {
      const nameMatch = group?.group?.members.includes(userId);
      return nameMatch;
      } else {
        return false;
      }
    })
    setUserGroups(groupsWithUser)
    }
  }, [groups, userId])

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
            centerElement={
              <Image
                style={styles.logoImage}
                source={require('../../assets/images/logo.png')}
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
                  placeholder="Search your groups..."
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
                  activeTab === 'My Groups' && styles.activeTabBtn,
                ]}
                onPress={() => handleTabPress('My Groups')}>
                <Text
                  style={[
                    styles.tabBtnText,
                    activeTab === 'My Groups' && styles.activeTabBtnText,
                  ]}>
                  My Groups
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabBtn,
                  activeTab === 'Find Groups' && styles.activeTabBtn,
                ]}
                onPress={() => handleTabPress('Find Groups')}>
                <Text
                  style={[
                    styles.tabBtnText,
                    activeTab === 'Find Groups' && styles.activeTabBtnText,
                  ]}>
                  Find Groups
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {console.log(userGroups)}
          {activeTab === 'My Groups' && <>
              {userGroups.length >= 1 ? (
                <View style={{flex: 1, marginBottom: 64}}>
                  <FlatList
                    extraData={userGroups}
                    // onRefresh={onRefresh}
                    // refreshing={loading}
                    data={userGroups}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <ExploreGroupItem
                        profPic={item.group.pic}
                        name={item.group.name}
                        id={item.id}
                        userId={userId}
                        showFollow={false}
                      />
                    )}
                  />
                </View>
              ) : (
                <NoResults handleCreate={handleCreate}/>
              )}
            </>}
          {activeTab === 'Find Groups' && (
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
                        userId={userId}
                        showFollow={true}
                        desc={item.group.desc}
                      />
                    )}
                  />
                </View>
              ) : (
                <NoResults handleCreate={handleCreate}/>
              )}
            </>
          )}
          <TouchableOpacity
            onPress={handleCreate}
            style={styles.newGroupButton}>
            <Image
              source={require('../../assets/images/newPost-bg.png')}
              style={styles.newGroupButtonImage}
            />
            <Image
              source={require('../../assets/images/plusIcon.png')}
              style={styles.newGroupPlusIcon}
            />
          </TouchableOpacity>
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

const NoResults = ({handleCreate}) => (
  <View style={styles.emptyFeed}>
    <Image
      style={styles.vector}
      source={require('../../assets/images/vector.png')}
    />
    <Text style={styles.headerText}>No groups yet</Text>
    <View style={styles.copyContainer}>
      <Text style={styles.descText}>
        Find or create groups and start building your prayer community.
      </Text>
      <TouchableOpacity onPress={handleCreate}>
        <Text style={styles.actionText}>CREATE GROUP!</Text>
      </TouchableOpacity>
    </View>
  </View>
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
  logoImage: {
    width: 65.5,
    resizeMode: 'contain',
  },
  emptyFeed: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 32,
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
  newGroupButton: {
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
  newGroupButtonImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  newGroupPlusIcon: {
    zIndex: 1, // Ensure the text is above the image
    width: 20,
    height: 20,
  },
});

export default GroupScreen;
