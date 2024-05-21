import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import firebase from 'firebase/compat';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../Header';
import AltarButton from '../../components/AltarButton';
import {useState} from 'react';

const CreateGroupScreen = (props: any) => {
  const navigation = useNavigation();
  const reference = firebase.database().ref();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleDescChange = (text: string) => {
    setDesc(text);
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
  });

  const handleCancel = () => {
    navigation.navigate('GroupScreen');
    showTabBar();
  };

  const handleContinue = () => {
    navigation.navigate('AddGroupPhotoScreen', {name: name, desc: desc});
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    setIsDisabled(name === '' || desc === '');
  }, [name, desc]);

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
            centerElement={<Text style={styles.header}>Create a Group</Text>}
            rightElement={
              <TouchableOpacity onPress={handleCancel}>
                <Image
                  style={styles.cancelIcon}
                  source={require('../../assets/images/CloseBlack.png')}
                />
              </TouchableOpacity>
            }
          />

          <View style={{marginTop: 32}}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name your group"
                placeholderTextColor="#6B6B6B"
                onChangeText={handleNameChange}
                value={name}
              />
            </View>
            <Text style={styles.label}>Description</Text>
            <View style={styles.multilineContainer}>
              <TextInput
                multiline
                style={styles.multiline}
                placeholder="Describe your group"
                placeholderTextColor="#6B6B6B"
                onChangeText={handleDescChange}
                value={desc}
              />
            </View>
          </View>
        </View>
        
        <AltarButton
          type={isDisabled ? 'disabled' : 'primary'}
          disabled={isDisabled}
          onPress={handleContinue}>
          Continue
        </AltarButton>
        
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
  cancelIcon: {
    height: 20,
    width: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 55,
    borderRadius: 10,
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  input: {
    height: 55,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  multilineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 175,
    borderRadius: 10,
    marginBottom: 32,
  },
  multiline: {
    height: 155,
    paddingHorizontal: 16,
    fontSize: 14,
  },
});

export default CreateGroupScreen;
