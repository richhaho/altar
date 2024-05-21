import {useNavigation, useRoute} from '@react-navigation/native';
import {getDatabase, onValue, ref, set, update} from 'firebase/database';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  Share,
  Alert,
  ScrollView
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from 'firebase/compat';
import Feed from '../../components/Feed';

const shareContent = () => {
  Share.share({
    message: 'Join my Group on Altar!',
  })
    .then(result => {
      console.log('Share successful:', result);
    })
    .catch(error => {
      console.log('Share failed:', error);
    });
};

const GroupDetailsScreen = (props: any) => {
  const reference = firebase.database().ref();
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [profPic, setProfPic] = useState('');

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

  const navigation = useNavigation();
  const route = useRoute();
  const groupId = route.params?.id;

  const [group, setGroup] = useState();
  const [numberOfGroups, setNumberOfGroups] = useState();

  const getGroup = () => {
    const db = getDatabase();
    const groupsRef = ref(db, 'groups');

    onValue(groupsRef, (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const groupsArray: any = Object.values(data);
        setNumberOfGroups(groupsArray.length);
        const groupbyId = groupsArray.find(
          groupItem => groupItem.id === groupId,
        );
        console.log(groupbyId)
        setGroup(groupbyId);
      }
    });
  };

  useEffect(() => {
    getGroup();
    getInfo();
  }, []);

  const isUserMember = group?.group?.members?.includes(userId);
  const isUserAdmin = group?.group?.admins?.includes(userId);

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

  const handleCancel = () => {
    navigation.navigate('GroupScreen');
    showTabBar();
  };

  const numOfFollowers = group?.group.members
    ? group?.group.members?.length
    : 0;
  const numOfPosts = Object.keys(group?.posts || {}).length;

  const handleNewGroupPost = () => {
    navigation.navigate('PostScreen', userInfo)
  }

  const handleLeaveGroup = async () => {
    try {
      let members = group?.group.members
      const index = members.indexOf(userId);
          if (index > -1) {
            members.splice(index, 1); 
          }

      const db = getDatabase();
      const groupRef = ref(db, `groups/${groupId}/group/members`);
      await set(groupRef, members);
      navigation.navigate('GroupScreen')
    } catch (error) {
      throw new Error(`Failed to update group ${groupId}: ${error.message}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/images/main-screen-bg.png')}
      />
      <View style={styles.pageContainer}>
        <View style={styles.topContainer}>
            {group?.group.pic ?
            <View style={styles.profileImgContainer}>
            <Image
              source={{uri: group?.group.pic}}
              style={styles.profileImg}
            />
            </View>
            : 
            <View style={styles.placeholderImgContainer}>
            <Image
            source={require('../../assets/images/Icon_User.png')}
            style={styles.placeholderImg}
          />
                      </View>

          }
          
          <View style={styles.buttonGroup}>
            {isUserAdmin && <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </Pressable>}
            {!isUserMember &&
              <Pressable style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Join Group</Text>
              </Pressable>
            }
            {isUserMember && !isUserAdmin &&
              <View style={{flexDirection: 'row', gap: 12}}>
                <Pressable style={styles.button} onPress={handleLeaveGroup}>
                  <Text style={styles.buttonText}>Leave</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => Alert.alert('handle navigation to messages when route is available')}>
                  <Text style={styles.buttonText}>Message</Text>
                </Pressable>
              </View>
            }
            <Pressable style={styles.iconButton} onPress={shareContent}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/Icon_Share.png')}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.display}>{group?.group.name}</Text>
            <Text style={styles.username}>@{group?.group.name}</Text>
          </View>
          <Text style={styles.desc}>{group?.group.desc}</Text>
        </View>
        <View style={styles.statGroup}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{numOfFollowers}</Text>
            <Text style={styles.statName}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{numOfPosts}</Text>
            <Text style={styles.statName}>Prayers</Text>
          </View>
          {/* <View style={styles.stat}>
            <Text style={styles.statValue}>333</Text>
            <Text style={styles.statName}>Praises</Text>
          </View> */}
        </View>
        <View style={styles.exploreContainer}>
          <View style={styles.groupPreview}>
            <View style={styles.groupPreviewImgContainer}>
              <Image
                style={styles.groupPreviewImg}
                source={require('../../assets/images/group_placeholder.png')}
              />
              <Image
                style={[styles.groupPreviewImg, {marginLeft: -8}]}
                source={require('../../assets/images/group_placeholder.png')}
              />

              <Image
                style={[styles.groupPreviewImg, {marginLeft: -8}]}
                source={require('../../assets/images/group_placeholder.png')}
              />
            </View>
            <Text style={styles.groupPreviewText}>
              {numberOfGroups} Groups at the altar
            </Text>
          </View>
          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate('GroupScreen')}>
            <Text style={styles.primaryButtonText}>Explore</Text>
          </Pressable>
        </View>
        <View style={styles.pageBody}>
          {/* PRIVATE GROUP */}
          {/* <View style={styles.private}>
            <View style={styles.lockIconContainer}>
              <Image
                style={styles.lockIcon}
                source={require('../../assets/images/Icon_Lock.png')}
              />
            </View>
            <View style={styles.privateContainer}>
              <Text style={styles.privateHeader}>This Group is private.</Text>
              <Text style={styles.privateDesc}>
                Join this group to see posts shared by members.
              </Text>
            </View>
          </View>
        </View> */}
        {group?.posts ? 
          <View style={{height: '100%', marginHorizontal: -16}}>
            <Feed data={group.posts}/> 
          </View>
        : 
          <View style={styles.noPosts}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/Icon_Altar.png')}
            />
            <Text style={styles.noPostCopy}>No Post Yet</Text>
          </View>
          }
        </View>
        <TouchableOpacity style={styles.newPostButton} onPress={handleNewGroupPost}>
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
    </SafeAreaView>
  );
};

export default GroupDetailsScreen;

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
    // justifyContent: 'space-between',
    flex: 1,
    color: '#00143B',
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  profileImgContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4C74E6',
    overflow: 'hidden',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  placeholderImgContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#5F6AE7',
    overflow: 'hidden',
    padding: 12
  },
  placeholderImg: {
    width: '100%',
    height: '100%',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#8577FC',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  buttonText: {
    color: '#8577FC',
    fontSize: 12,
    fontWeight: '600',
  },
  iconButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#8577FC',
    borderWidth: 1,
    borderRadius: 10,
    padding: 2,
  },
  icon: {
    height: 30,
    width: 30,
  },
  infoContainer: {
    gap: 8,
    marginTop: 16,
  },
  nameContainer: {
    gap: 4,
  },
  display: {
    fontSize: 18,
    fontWeight: '600',
  },
  username: {},
  desc: {},
  statGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingHorizontal: 32,
  },
  stat: {
    gap: 2,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statName: {
    color: '#64767d',
  },
  exploreContainer: {
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8577FC',
  },
  groupPreview: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  groupPreviewText: {
    maxWidth: 70,
    fontSize: 12,
    color: '#00143B',
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
  groupPreviewImgContainer: {
    flexDirection: 'row',
  },
  groupPreviewImg: {
    height: 40,
    width: 40,
    borderRadius: 2,
    borderColor: '#8577FC',
    borderWidth: 1,
  },
  lockIconContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1cffd',
    backgroundColor: 'white',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  lockIcon: {
    height: 22,
    width: 22,
  },
  pageBody: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  private: {
    alignItems: 'center',
  },
  noPosts: {
    alignItems: 'center',
    marginTop: 48,
  },
  privateContainer: {
    gap: 2,
    marginTop: 16,
    alignItems: 'center',
    maxWidth: 200,
  },
  privateHeader: {
    color: '#313131B2',
    fontWeight: '600',
    fontSize: 16,
  },
  privateDesc: {
    color: '#313131B2',
    textAlign: 'center',
  },
  logo: {
    height: 120,
    width: 120,
  },
  noPostCopy: {
    color: '#313131B2',
    fontSize: 20,
    marginTop: 16,
    fontWeight: '700',
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
