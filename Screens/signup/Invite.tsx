import {useNavigation} from '@react-navigation/native';
import React = require('react');
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  Clipboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../Header';

const AltarButton = ({type, onPress, disabled, children}: any) => {
  let buttonStyle, textStyle;

  // Define styles based on button type
  switch (type) {
    case 'primary':
      buttonStyle = buttonStyles.primaryButton;
      textStyle = buttonStyles.primaryText;
      break;
    case 'secondary':
      buttonStyle = buttonStyles.secondaryButton;
      textStyle = buttonStyles.secondaryText;
      break;
    case 'disabled':
      buttonStyle = buttonStyles.disabledButton;
      textStyle = buttonStyles.disabledText;
      break;
    default:
      buttonStyle = buttonStyles.primaryButton;
      textStyle = buttonStyles.primaryText;
  }

  return (
    <TouchableOpacity
      style={[buttonStyles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[buttonStyles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    width: 317,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  primaryButton: {
    backgroundColor: '#8577FC',
    borderRadius: 10,
    shadowColor: '#8577FC',
    shadowOffset: {width: 0, height: 11},
    shadowOpacity: 0.47,
    shadowRadius: 21,
    elevation: 5,
  },
  primaryText: {
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
  },
  secondaryText: {
    color: '#00143B70',
  },
  disabledButton: {
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
  },
  disabledText: {
    color: 'white',
  },
});

const InviteScreen = () => {
  const navigation = useNavigation();

  const testFunc = () => {
    console.log('invite');
    navigation.navigate('Main');
  };

  const handleInviteFriendsPress = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome app! Join us now!',
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share sheet dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const handleCopyLinkPress = async () => {
    try {
      const inviteLink = 'https://www.google.com';
      const message = `Check out this awesome app! Join us now: ${inviteLink}`;

      // Copy the message to the clipboard
      await Clipboard.setString(message);

      // Notify the user that the message has been copied
      console.log('Message with invite link copied to clipboard:', message);
    } catch (error) {
      console.error('Error copying message to clipboard:', error.message);
    }
  };

  return (
    // <View style={styles.container}>
    //   <Text>Invite Screen</Text>
    //   <TouchableOpacity style={{marginBottom: 32}} onPress={() => testFunc()}>
    //     <Text>Test Button</Text>
    //   </TouchableOpacity>
    // </View>
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/images/main-bg.jpeg')}
      />
      <Header
        centerElement={
          <Image
            style={styles.logoImage}
            source={require('../../assets/images/logo.png')}
          />
        }
      />
      <View style={styles.container}>
        <Image
          style={styles.vector}
          source={require('../../assets/images/prayerIcon.png')}
        />
        <View style={styles.copyContainer}>
          <Text style={styles.headerText}>Praying is Caring</Text>
          <Text style={styles.descText}>
            Life is so much better with friends! Invite your friends and family
            to join you on Altar so you can pray for each other daily.
          </Text>
          <AltarButton type={'primary'} onPress={handleInviteFriendsPress}>
            Invite Friends and Family
          </AltarButton>
          <AltarButton type={'secondary'} onPress={handleCopyLinkPress}>
            Copy Invite Link
          </AltarButton>
        </View>
        <TouchableOpacity style={styles.testButton} onPress={() => testFunc()}>
          <Text>Go HOME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
  },
  logoImage: {},
  vector: {
    marginBottom: 16,
  },
  copyContainer: {
    margin: 24,
  },
  headerText: {
    color: '#313131',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  descText: {
    color: '#4F5B79',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 32,
  },
  testButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'white',
  },
});

export default InviteScreen;
