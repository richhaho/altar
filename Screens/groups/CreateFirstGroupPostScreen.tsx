import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import firebase from 'firebase/compat';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../Header';
import AltarButton from '../../components/AltarButton';
import {useState} from 'react';
import {getDatabase, ref, push, set, child} from 'firebase/database';
import {
  getStorage,
  ref as storageRef,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';
import {Buffer} from 'buffer';
import auth from '@react-native-firebase/auth';

const CreateFirstGroupPostScreen = (props: any) => {
  const navigation = useNavigation();
  const reference = firebase.database().ref();
  const route = useRoute();
  const groupDetails = route.params;
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [profPic, setProfPic] = useState('');

  console.log(groupDetails)

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
    getInfo();
  });

  const handleBack = () => {
    navigation.navigate('AddGroupPhotoScreen');
  };

  const handleCancel = () => {
    navigation.navigate('GroupScreen');
    showTabBar();
  };

  const [post, setPost] = useState('');

  const handlePostChange = (text: string) => {
    setPost(text);
  };

  const isDisabled = post === '';

  const handleContinue = async () => {
    await createGroup();
  };

  const createGroup = async () => {
    try {
      const db = getDatabase();
      const groupsRef = ref(db, 'groups');
      const newGroupRef = push(groupsRef);
      const groupId = newGroupRef.key;

      // // Encode the image data to base64
      // const base64ImageData = Buffer.from(groupDetails?.pic, 'base64').toString(
      //   'base64',
      // );

      // // Upload the image to Firebase Storage
      // const storage = getStorage();
      // const imageRef = storageRef(storage, `group_images/${groupId}.jpg`); // groupId is the ID of the group

      // await uploadString(imageRef, base64ImageData, 'base64');

      // // Get the download URL for the uploaded image
      // const imageUrl = await getDownloadURL(imageRef);

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      // Set the group details in the database
      await set(newGroupRef, {
        id: groupId,
        group: {
          name: groupDetails?.name,
          desc: groupDetails?.desc,
          pic: groupDetails?.pic,
          created: formattedDate,
          members: [userId],
          admins: [userId] 
        },
      });

      const postUser = {
        id: userId,
        display: displayName,
        email: email,
        username: username,
      };

      if (profPic) {
        postUser.pic = profPic;
      }

      await push(child(newGroupRef, 'posts'), {
        body: post,
        timestamp: formattedDate,
        user: postUser,
      });

      navigation.navigate('InviteToGroupScreen', {
        id: groupId,
      });
    } catch (err) {
      console.log(err);
    }
  };

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
              rightElement={
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.close}>Close</Text>
                </TouchableOpacity>
              }
            />
            <Text style={styles.header}>Create First Group Post</Text>
            <View style={styles.multilineContainer}>
              <TextInput
                multiline
                style={styles.multiline}
                placeholder="Start your group by adding the first prayer, praise or encouragement."
                placeholderTextColor="#6B6B6B"
                onChangeText={handlePostChange}
                value={post}
              />
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}></View>
          <View>
            <AltarButton
              onPress={handleContinue}
              type={isDisabled ? 'disabled' : 'primary'}
              disabled={isDisabled}>
              Continue
            </AltarButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

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
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
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
  multilineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 175,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 32,
  },
  multiline: {
    height: 155,
    paddingHorizontal: 16,
    fontSize: 14,
  },
});

export default CreateFirstGroupPostScreen;
