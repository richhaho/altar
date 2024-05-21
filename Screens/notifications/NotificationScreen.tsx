import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView
} from 'react-native';
import {useState} from 'react';
import Header from '../Header';
import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase/compat';
import {useNavigation} from '@react-navigation/native';
import HomeActionsDrawer from '../../components/HomeActionsDrawer';
import {getDatabase, ref, onValue} from '@firebase/database';

const NotificationScreen = (props: any) => {
  const reference = firebase.database().ref();
  const [profPic, setProfPric] = useState('');
  const [isHomeDrawerOpen, setHomeDrawerOpen] = useState(false);
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

  const closeDrawer = () => {
    setHomeDrawerOpen(false);
    showTabBar();
  };

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
  const [notifications, setNotifications] = useState();

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
            const notificationsArray = Object.entries(dict.notifications);
            setNotifications(notificationsArray);
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
    showTabBar();
    getInfo();
  }, []);

  const goToNewPost = () => {
    // Handle navigation to the new post screen
    console.log('Navigating to new post screen');
    navigation.navigate('PostScreen', userInfo);
  };

  // console.log(notifications)

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/images/main-screen-bg.png')}
      />
      <View style={styles.pageContainer}>
        <Header
          centerElement={<Text style={styles.header}>Notifications</Text>}
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
        <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          {/* No Notifications */}
          {/* <NoResults /> */}
          {notifications ?
          <>
          <View style={styles.notificationGroup}>
            <Text style={styles.subheader}>Friend Requests</Text>

            {notifications && notifications?.some(notification => notification[1].type === "friend_request") ? (
              notifications?.map(notification => {
                const [notificationId, notificationData] = notification;
                const { type } = notificationData;
                if (type === "friend_request") {
                  return (
                    <RequestItem key={notificationId} data={notificationData} />
                  )
                }
              })
            ) : (
              <NoRequests />
            )}
          </View>
          <View style={[styles.notificationGroup, {marginBottom: 64}]}>
            <Text style={styles.subheader}>Activity Feed</Text>
            {notifications && notifications?.some(notification => notification[1].type !== "friend_request") ? (
              notifications?.map(notification => {
                const [notificationId, notificationData] = notification;
                const { type } = notificationData;
                if (type !== "friend_request") {
                  return (
                    <ActivityItem key={notificationId} data={notificationData}/>
                  )
                }
              })
            ) : (
              <View
              style={{flexDirection: 'row', alignItems: 'flex-end', gap: 4}}>
              <Text style={styles.descText}>No activies found.</Text>
              <Text style={styles.actionText}>Create Post!</Text>
            </View>
            )}
          </View>
          </>
          : <NoResults /> }
        </ScrollView>
        <TouchableOpacity style={styles.newPostButton} onPress={goToNewPost}>
          <Image
            source={require('../../assets/images/newPost-bg.png')}
            style={styles.newPostButtonImage}
          />
          <Image
            source={require('../../assets/images/plusIcon.png')}
            style={styles.newPostPlusIcon}
          />
        </TouchableOpacity>
      </View>
      <HomeActionsDrawer
        isVisible={isHomeDrawerOpen}
        onClose={closeHomeDrawer}
        onActionPress={onHomeActionPress}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const NoResults = () => (
  <View style={styles.emptyFeed}>
    <Image
      style={styles.vector}
      source={require('../../assets/images/vector.png')}
    />
    <Text style={styles.headerText}>No notifications yet</Text>
    <View style={styles.copyContainer}>
      <Text style={styles.descText}>You have no notifications right now.</Text>
      <Text style={styles.descText}>Come back later</Text>
    </View>
  </View>
);

const RequestItem = ({data}: any) => {
  const timestamp = new Date(data.timestamp);
  const currentTime = new Date();
  const timeDifference = Math.floor(
    (currentTime.getTime() - timestamp.getTime()) / (1000 * 60),
  );

  let formattedTime;

  if (timeDifference < 60) {
    formattedTime = `${timeDifference}m ago`;
  } else if (timeDifference <= 24 * 60) {
    const hours = Math.floor(timeDifference / 60);
    formattedTime = `${hours} hr${hours > 1 ? 's ago' : ''}`;
  } else if (timeDifference <= 24 * 60 * 365) {
    const month = timestamp.getMonth() + 1; // Months are zero-based
    const date = timestamp.getDate();
    formattedTime = `${month}/${date}`;
  } else {
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1; // Months are zero-based
    const date = timestamp.getDate();
    formattedTime = `${month}/${date}/${year}`;
  }

  const senderId = data.senderId;

  // State to hold request user
  const [requestUser, setRequestUser] = useState(null);

  // Fetch request user data from Firebase
  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    onValue(usersRef, snapshot => {
      const usersData = snapshot.val();
      if (usersData) {
        const usersArray = Object.values(usersData);
        const user = usersArray.find(user => user.uid === senderId);
        setRequestUser(user);
      }
    });
  }, [senderId]);

  return (
    requestUser && (
      <View style={styles.requestItem}>
        <View style={{flexDirection: 'row', gap: 16}}>
          <View style={styles.requestImg}>
            {requestUser && requestUser.pic && (
              <Image style={styles.requestImg} source={{uri: requestUser.pic}} />
            )}
          </View>
          <View style={{gap: 8}}>
            <View style={{gap: 2}}>
              <Text style={styles.requestName}>{requestUser?.display}</Text>
              <Text style={styles.requestDetail}>New friend request</Text>
              <Text style={styles.requestTime}>{formattedTime}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Decline</Text>
              </Pressable>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Accept</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    )
  );
};

const ActivityItem = ({data}: any) => {
  const senderId = data.senderId;
  const senderType = data.senderType;
  const timestamp = new Date(data.timestamp);
  const currentTime = new Date();
  const timeDifference = Math.floor(
    (currentTime.getTime() - timestamp.getTime()) / (1000 * 60),
  );

  let formattedTime;

  if (timeDifference < 60) {
    formattedTime = `${timeDifference}m ago`;
  } else if (timeDifference <= 24 * 60) {
    const hours = Math.floor(timeDifference / 60);
    formattedTime = `${hours} hr${hours > 1 ? 's ago' : ''}`;
  } else if (timeDifference <= 24 * 60 * 365) {
    const month = timestamp.getMonth() + 1; // Months are zero-based
    const date = timestamp.getDate();
    formattedTime = `${month}/${date}`;
  } else {
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1; // Months are zero-based
    const date = timestamp.getDate();
    formattedTime = `${month}/${date}/${year}`;
  }
  // State to hold request user
  const [requestUser, setRequestUser] = useState(null);

  // Fetch request user data from Firebase
  useEffect(() => {
    const db = getDatabase();
    if (senderType !== 'group') {
      const usersRef = ref(db, 'users');
      onValue(usersRef, snapshot => {
        const usersData = snapshot.val();
        if (usersData) {
          const usersArray = Object.values(usersData);
          const user = usersArray.find(user => user.uid === senderId);
          setRequestUser(user);
        }
      });
    } else {
      const groupsRef = ref(db, 'groups');
      onValue(groupsRef, snapshot => {
        const groupsData = snapshot.val();
        if (groupsData) {
          const groupsArray = Object.values(groupsData);
          const group = groupsArray.find(group => group.id === senderId);
          setRequestUser(group.group);
        }
      });
    }
  }, [senderId]);

  const activityString = data.type === 'post_like' ? 'Liked your prayer: ' + data.post : data.type === 'post_comment' ? 'commented on your prayer' : data.type === 'group_post' ? 'Posted a prayer on Hardcoded Group: ' : data.type === 'group_invite' ? `You've been invited to join a group!` : ''

  return (
    <View style={styles.activityItem}>
      <View
        style={{
          backgroundColor: '#FE5D26',
          width: 10,
          height: 10,
          position: 'absolute',
          top: '50%',
          right: 0,
          borderRadius: 100,
        }}
      />
      <View style={{flexDirection: 'row', gap: 16}}>
        <View style={styles.requestImg}>
          <Image source={{uri: requestUser?.pic}} style={styles.requestImg}/>
        </View>
        {console.log(requestUser)}
        <View style={{gap: 8, paddingRight: 16}}>
          <View style={{gap: 2, overflow: 'hidden', maxWidth: '90%'}}>
          <Text style={styles.requestName}>
            {requestUser?.display || requestUser?.name}
          </Text>
            <Text style={[styles.requestDetail, {maxHeight: 48}]}>
              {`${activityString}`}
            </Text>
            <Text style={styles.requestTime}>{formattedTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const NoRequests = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.noRequests}>
      <Text style={styles.noRequestsHeader}>FRIEND REQUESTS</Text>
      <View style={styles.noRequestsActionContainer}>
        <Text style={styles.noRequestsActionCopy}>
          Requests from people who want to follow you will appear here.
        </Text>
        <TouchableOpacity
          style={styles.noRequestsActionBtn}
          onPress={() => navigation.navigate('ExploreScreen')}>
          <Text style={{color: '#FFFFFF', fontSize: 12}}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  emptyFeed: {
    flex: 1,
    justifyContent: 'center',
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
    maxWidth: 264,
    marginBottom: 64,
  },
  descText: {
    color: '#4F5B79',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 21,
    fontSize: 16,
  },
  actionText: {
    color: '#8956E9',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  subheader: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    color: '#00143B8C',
    marginTop: 32,
  },
  notificationGroup: {
    gap: 16,
  },
  requestItem: {
    backgroundColor: 'white',
    width: '100%',
    minHeight: 110,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1cffd',
    padding: 12,
  },
  activityItem: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#cee1fb',
    paddingBottom: 12,
    position: 'relative',
  },
  requestName: {
    fontWeight: '600',
    fontSize: 16,
  },
  requestDetail: {
    fontWeight: '400',
    fontSize: 14,
  },
  requestTime: {
    fontWeight: '400',
    fontSize: 12,
    color: '#31313180',
  },
  requestImg: {
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#8478FC',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 48,
  },
  buttonText: {
    color: '#8478FC',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  primaryButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    backgroundColor: '#8577FC',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 48,
    borderColor: '#8577FC',
    borderWidth: 1,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    gap: 8,
  },
  statusesContainer: {
    paddingBottom: 24,
    marginBottom: 16,
    marginLeft: 16,
    alignSelf: 'flex-start',
  },
  profilePictureContainer: {
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'rgba(133, 119, 252, 0.33)',
    marginRight: 16,
    alignItems: 'center',
    width: 50,
  },
  username: {
    color: '#A0A0A0',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
  },
  noRequests: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(133, 119, 252, 0.33)',
    backgroundColor: '#00143B',
    shadowColor: 'rgba(54, 25, 92, 0.00)',
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 12,
    shadowOpacity: 1,
    padding: 16,
  },
  noRequestsHeader: {
    textTransform: 'uppercase',
    color: '#FFFFFFC4',
    fontSize: 10,
    marginBottom: 2,
  },
  noRequestsActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  noRequestsActionCopy: {
    color: '#FFFFFF',
    width: '75%',
    height: '100%',
    fontWeight: '600',
  },
  noRequestsActionBtn: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    display: 'flex',
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
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
