import AltarButton from '../../components/AltarButton';
import {
  Image,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const SubscriptionScreen = () => {
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate('Main');
  };

  const [activeOption, setActiveOption] = useState('you');
  const handleOptionPress = (tabName: string) => {
    setActiveOption(tabName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/images/main-screen-bg.png')}
      />
      <Image
        style={{
          position: 'absolute',
          top: 0,
          height: 230,
          width: screenWidth,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        source={require('../../assets/images/subscriptionBanner.png')}
      />
      <TouchableOpacity
        onPress={goBack}
        style={{
          position: 'absolute',
          top: 62,
          right: 32,
        }}>
        <Image
          source={require('../../assets/images/CloseWhite.png')}
          style={{height: 15, width: 15}}
        />
      </TouchableOpacity>

      <View style={styles.bannerContainer}>
        {/* <Image
          style={styles.bannerCoverImg}
          source={require('../../assets/images/subscriptionBanner.png')}
        /> */}
        <Image
          style={styles.logo}
          source={require('../../assets/images/altarPlusLogo.png')}
        />
      </View>
      <View style={styles.ctaContainer}>
        <Text style={styles.uppercase}>MAKE A DIFFERENCE</Text>
        <Text style={styles.header}>Altar Needs Your Support!</Text>
        <Text style={styles.copy}>
          We believe that supporting others in prayer and faith-filled
          encouragement shouldn't have financial barriers.
        </Text>
        <Text style={styles.copy}>
          That's why you can pay for yourself, support others using Altar, or
          pay later.
        </Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              activeOption === 'you'
                ? styles.optionActive
                : styles.optionInactive,
            ]}
            onPress={() => handleOptionPress('you')}>
            {activeOption === 'you' && (
              <Image
                style={styles.checkmark}
                source={require('../../assets/images/Icon_Checkmark.png')}
              />
            )}
            <Text style={styles.optionHeader}>Yourself</Text>
            <Text style={styles.optionPrice}>$2.99</Text>
            <Text style={styles.optionTerm}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              activeOption === 'you2'
                ? styles.optionActive
                : styles.optionInactive,
            ]}
            onPress={() => handleOptionPress('you2')}>
            {activeOption === 'you2' && (
              <Image
                style={styles.checkmark}
                source={require('../../assets/images/Icon_Checkmark.png')}
              />
            )}
            <Text style={styles.optionHeader}>You + 2</Text>
            <Text style={styles.optionPrice}>$8.99</Text>
            <Text style={styles.optionTerm}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              activeOption === 'you5'
                ? styles.optionActive
                : styles.optionInactive,
            ]}
            onPress={() => handleOptionPress('you5')}>
            {activeOption === 'you5' && (
              <Image
                style={styles.checkmark}
                source={require('../../assets/images/Icon_Checkmark.png')}
              />
            )}
            <Text style={styles.optionHeader}>You + 5</Text>
            <Text style={styles.optionPrice}>$17.99</Text>
            <Text style={styles.optionTerm}>Monthly</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <AltarButton>START WITH ALTAR</AltarButton>
          <View style={styles.ghostButtonContainer}>
            <AltarButton type="secondary" onPress={goBack}>
              <Text style={styles.ghostButonText}>I'LL PAY LATER</Text>
            </AltarButton>
          </View>
        </View>
        <Text style={styles.terms}>
          Subscription terms: At vero eos et accusamus et iusto odio dignissimos
          ducimus qui blanditiis praesentium.
        </Text>
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
    color: '#00143B',
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bannerContainer: {
    height: 165,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 36,
    // marginTop: -64,
  },
  //   bannerCoverImg: {
  //     position: 'absolute',
  //     top: 0,
  //     height: 220,
  //     width: 375,
  //   },
  logo: {
    width: 83,
    height: 36,
    zIndex: 25,
  },
  ctaContainer: {
    alignItems: 'center',
    marginHorizontal: 32,
  },
  uppercase: {
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 12,
    color: '#00143B',
    fontSize: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00143B',
    marginBottom: 16,
  },
  copy: {
    color: '#00143B80',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '300',
    lineHeight: 27,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 24,
    width: '100%',
  },
  option: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    position: 'relative',
  },
  optionActive: {
    borderColor: '#8577FC',
    backgroundColor: '#FFFFFF',
  },
  optionInactive: {
    borderColor: '#00143B80',
    backgroundColor: '#f0f7fe',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  ghostButtonContainer: {
    marginTop: -12,
  },
  ghostButonText: {
    fontWeight: '800',
  },
  terms: {
    fontSize: 12,
    color: '#00143B8C',
    textAlign: 'center',
    fontWeight: '300',
  },
  optionHeader: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  optionPrice: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 2,
  },
  optionTerm: {
    fontSize: 8,
    fontWeight: '400',
    color: '#00143B80',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    width: 12,
    height: 12,
    top: 4,
    right: 4,
  },
});

export default SubscriptionScreen;
