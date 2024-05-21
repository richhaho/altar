import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const StatusCarousel = ({profiles}: any) => {
  const navigation = useNavigation();
  return (
    // State with no data
    <View style={styles.emptyCarousel}>
      <Text style={styles.emptyCarouselHeader}>INTRODUCING GROUPS</Text>
      <View style={styles.emptyCarouselActionContainer}>
        <Text style={styles.emptyCarouselActionCopy}>
          Find or create groups and start building your prayer community
        </Text>
        <TouchableOpacity
          style={styles.emptyCarouselActionBtn}
          onPress={() => navigation.navigate('GroupScreen')}>
          <Text style={{color: '#FFFFFF', fontSize: 12}}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
    // State with data
    // <ScrollView
    //   horizontal
    //   showsHorizontalScrollIndicator={false}
    //   style={styles.statusesContainer}>
    //   {profiles.map((profile: any, index: any) => (
    //     <TouchableOpacity
    //       style={styles.profilePictureContainer}
    //       key={index}
    //       onPress={() => Alert.alert('View a user status')}>
    //       <ProfilePicture imgSrc={profile.imgSrc} width={50} border />
    //       <Text numberOfLines={1} ellipsizeMode="tail" style={styles.username}>
    //         {profile.username}
    //       </Text>
    //     </TouchableOpacity>
    //   ))}
    // </ScrollView>
  );
};

export default StatusCarousel;

const styles = StyleSheet.create({
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
  emptyCarousel: {
    marginHorizontal: 16,
    paddingBottom: 24,
    marginBottom: 16,
    borderRadius: 12,
    height: 75,
    borderWidth: 1,
    borderColor: 'rgba(133, 119, 252, 0.33)',
    backgroundColor: '#00143B',
    shadowColor: 'rgba(54, 25, 92, 0.00)',
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 12,
    shadowOpacity: 1,
    padding: 16,
  },
  emptyCarouselHeader: {
    textTransform: 'uppercase',
    color: '#FFFFFFC4',
    fontSize: 10,
    marginBottom: 2,
  },
  emptyCarouselActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  emptyCarouselActionCopy: {
    color: '#FFFFFF',
    width: '75%',
    height: '100%',
    fontWeight: '600',
  },
  emptyCarouselActionBtn: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    display: 'flex',
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
