import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {PanResponder} from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import {Dimensions} from 'react-native';
import ProfilePicture from './ProfilePicture';
import firebase from 'firebase/compat';
import auth from '@react-native-firebase/auth';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const containerWidth = screenWidth * 0.75; // 3/4 of the screen width

const HomeActionsDrawer = ({isVisible, onClose, onActionPress}: any) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      gestureState.dx > 5, // Check if swipe is to the right
    onPanResponderMove: Animated.event([null, {dx: pan.x}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > containerWidth / 2) {
        // If swiped more than half, close the drawer
        Animated.timing(pan, {
          toValue: {x: containerWidth, y: 0},
          useNativeDriver: false,
          duration: 200,
        }).start(() => {
          // Call onClose when animation is complete
          pan.setValue({x: 0, y: 0}); // Reset the pan value
          onClose();
        });
      } else {
        // If swiped less than half, reset to original position
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      }
    },
  });

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

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          transform: [{translateX: pan.x}],
          width: containerWidth,
        },
      ]}>
      <ScrollView style={styles.container}>
        <View style={{marginBottom: 36}}>
          <View style={{marginBottom: 5}}>
            {profPic !== '' &&
              <ProfilePicture
                imgSrc={{
                  uri: profPic,
                }}
                width={50}
                border
              />
            }
          </View>
          <Text style={styles.displayName}>{display}</Text>
          <Text style={styles.userName}>@{username}</Text>
          <View style={styles.userInfoContainer}>
            <Text style={styles.boldNum}>
              33k <Text style={styles.numInfo}>Followers</Text>
            </Text>
            <Text style={styles.boldNum}>
              1.5k <Text style={styles.numInfo}>Prayers</Text>
            </Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onActionPress('Profile')}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Icon_Profile.png')}
            />
            <Text style={styles.actionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onActionPress('Invite Friends')}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Icon_Invite.png')}
            />
            <Text style={styles.actionText}>Invite Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('NotificationScreen')}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Icon_Notifications.png')}
            />
            <Text style={styles.actionText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onActionPress('Subscription')}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Icon_Payment.png')}
            />
            <Text style={styles.actionText}>Subscription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onActionPress('Contact Us')}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Icon_Contact.png')}
            />
            <Text style={styles.actionText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onActionPress('Blocks')}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Block.png')}
            />
            <Text style={styles.actionText}>Blocks</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.borderTop}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onActionPress('Manage Accounts')}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Icon_Repeat.png')}
            />
            <Text style={styles.actionText}>Manage Accounts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 48,
    // borderColor: 'rgba(133, 119, 252, 0.33)',
    // borderWidth: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
    width: containerWidth,
    height: screenHeight,
    flex: 1,
  },
  actionsContainer: {},
  actionButton: {
    marginBottom: 41,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    objectFit: 'contain',
  },
  actionText: {
    fontSize: 16,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(133, 119, 252, 0.33)',
    paddingTop: 41,
  },
  displayName: {
    color: '#313131',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    color: 'rgba(49, 49, 49, 0.50)',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 10,
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  boldNum: {
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
  },
  numInfo: {
    textTransform: 'capitalize',
    color: 'rgba(0, 0, 0, 0.50)',
    fontWeight: '400',
  },
});

export default HomeActionsDrawer;
