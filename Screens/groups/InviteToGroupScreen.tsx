import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Pressable
} from 'react-native';
import firebase from 'firebase/compat';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../Header';
import AltarButton from '../../components/AltarButton';
import {useState} from 'react';
import {getDatabase, onValue, ref} from 'firebase/database';
import InviteItem from '../../components/InviteItem';

const InviteToGroupScreen = (props: any) => {
  const navigation = useNavigation();
  const reference = firebase.database().ref();
  const route = useRoute();
  const groupDetails = route.params;
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    hideTabBar();
  });

  const handleBack = () => {
    navigation.navigate('CreateFirstGroupPostScreen');
  };

  const handleCancel = () => {
    navigation.navigate('GroupScreen');
    showTabBar();
  };

  const isDisabled = true;

  const handleContinue = () => {
    navigation.navigate('GroupDetailsScreen', {
      id: groupDetails?.id,
    });
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/images/main-screen-bg.png')}
      />
      <View style={styles.pageContainer}>
        <View>
          <Header
            leftElement={
              <TouchableOpacity onPress={handleBack}>
                <Image
                  source={require('../../assets/images/Icon_Back.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
            }
            centerElement={<Text style={styles.header}>Invite People</Text>}
            rightElement={
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.close}>Close</Text>
              </TouchableOpacity>
            }
          />
          <View style={{alignItems: 'flex-start'}}>
              <Pressable style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Share Group</Text>
              </Pressable>
          </View>
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
                placeholder="Search your people..."
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
        </View>
        <View style={{width: '100%', alignItems: 'center', flex: 1}}>
          {filteredUsers.length !== 0 ? (
            <View style={{width: '100%'}}>
              <FlatList
                extraData={filteredUsers}
                onRefresh={onRefresh}
                refreshing={loading}
                data={filteredUsers}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <InviteItem
                    userId={item.uid}
                    profPic={item.pic}
                    username={item.username}
                    displayName={item.display}
                    group={groupDetails}
                  />
                )}
              />
            </View>
          ) : (
            <NoResults />
          )}
        </View>
        <View>
          <AltarButton
            onPress={handleContinue}
            type={isDisabled ? 'disabled' : 'primary'}
            disabled={isDisabled}>
            Continue
          </AltarButton>
          <AltarButton type={'secondary'} onPress={handleContinue}>
            Skip For Now
          </AltarButton>
        </View>
      </View>
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
  pageContainer: {
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'space-between',
    flex: 1,
  },
  header: {
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
  close: {
    fontSize: 16,
    fontWeight: '600',
  },
  backIcon: {
    height: 18.39,
    width: 11.3,
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
    marginVertical: 16,
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
  primaryButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    backgroundColor: '#8577FC',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderColor: '#8577FC',
    borderWidth: 1,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default InviteToGroupScreen;
