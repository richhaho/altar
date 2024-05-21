import {Image, View, StyleSheet} from 'react-native';

export const ProfilePicture = ({imgSrc, width, border}: any) => {
  return (
    <View
      style={[
        styles.avatarContainer,
        {
          width: width || 33,
          height: width || 33,
          borderWidth: border ? 1 : 0,
          borderColor: border ? 'rgba(133, 119, 252, 0.33)' : '',
        },
      ]}>
      <Image style={styles.avatar} source={imgSrc} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
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
});

export default ProfilePicture;
