import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase/compat';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../Header';
import AltarButton from '../../components/AltarButton';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {useState} from 'react';

const AddGroupPhotoScreen = (props: any) => {
  const navigation = useNavigation();
  const reference = firebase.database().ref();
  const stor = firebase.storage().ref()
  const route = useRoute();
  const groupDetails = route.params;
  const [val, setVal] = useState<string>()

  console.log('val', val)

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
    navigation.navigate('CreateGroupScreen');
  };

  const handleCancel = () => {
    navigation.navigate('GroupScreen');
    showTabBar();
  };

  const [img, setImg] = useState('');

  const isDisabled = val === '';

  const choosePicture = () => {
    console.log('pressed')
    const options: ImageLibraryOptions = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      };
      launchImageLibrary(options,
      async (response) => {
        console.log(response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else { 
          try {
             const img =  await requestBlob(response.assets[0].uri.replace("file:///","file:/")).catch(error =>console.log(error))
             console.log('img' + ' ' + img)
          await stor.child('groupImages').child(response.assets[0].fileName ?? "fileName").put(img)
        }
        catch (err) {
          console.log(err.message)
        }

        try {
          const url = await stor.child('groupImages').child(response.assets[0].fileName ?? "fileName").getDownloadURL();
          // const goodUrl = url.replaceAll('/', ('%2F'))
          //   const bestUrl = goodUrl.replace(' ', '%20')
          //   console.log(bestUrl)
          // reference.child('groups').child(groupDetails?.id).update({
          //   pic: url
          // })
          setVal(url)
        }
        catch (err) {
          console.log('caught:')
          console.log(err.message)
        }
        }
      },
      
)}

const requestBlob = (uri) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(new TypeError('Network request failed'));
      xhr.responseType = 'blob';
  
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }

  const handleContinue = () => {
    navigation.navigate('CreateFirstGroupPostScreen', {
      name: groupDetails?.name,
      desc: groupDetails?.desc,
      pic: val || '',
    });
  };

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
            rightElement={
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.close}>Close</Text>
              </TouchableOpacity>
            }
          />
          <Text style={styles.header}>Add Group Photo</Text>
          <Text style={styles.subheader}>
            Add an image that represents your group or community.
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={styles.name}>{groupDetails?.name}</Text>
          <Text>
            <Text style={styles.count}>1</Text> member
          </Text>
          <TouchableOpacity
            onPress={choosePicture}
            style={{alignItems: 'center'}}>
            <View
              style={[
                styles.placeholder,
                {backgroundColor: val !== '' ? 'none' : '#E5D9F2'},
              ]}>
              {val && val !== '' ? (
                <Image source={{uri: val}} style={styles.selectedImage} />
              ) : (
                <Image
                  source={require('../../assets/images/Icon_User.png')}
                  style={styles.placeholderImage}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={choosePicture}
              style={styles.createButton}>
              <Image
                source={require('../../assets/images/newPost-bg.png')}
                style={styles.createButtonImage}
              />
              <Image
                source={require('../../assets/images/plusIcon.png')}
                style={styles.createIcon}
              />
            </TouchableOpacity>
          </TouchableOpacity>
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
  subheader: {
    fontSize: 16,
    color: '#4F5B79',
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
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
  },
  placeholder: {
    marginTop: 16,
    // backgroundColor: '#D9D9D9',
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#596EE7',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImage: {
    borderRadius: 8,
    height: '100%',
    width: '100%',
  },
  placeholderImage: {
    height: 150,
    width: 150,
  },
  createButton: {
    // position: 'absolute',
    // bottom: -226,
    // left: '50%',
    // marginLeft: -26,
    marginTop: -26,
    width: 52,
    height: 52,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  createButtonImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
  },
  createIcon: {
    zIndex: 1,
    width: 20,
    height: 20,
  },
});

export default AddGroupPhotoScreen;
