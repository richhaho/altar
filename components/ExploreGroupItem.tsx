import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getDatabase, ref, set, onValue} from '@firebase/database';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ExploreGroupItem = ({profPic, name, id, userId, showFollow, desc}: any) => {
  const navigation = useNavigation();
console.log("g:",name)
  const [groupById, setGroupById] = useState();

  const isUserMember = groupById?.group.members.includes(userId);

  const getGroupById = async (groupId) => {
    const db = getDatabase();
    const groupRef = ref(db, `groups/${groupId}`);
  
    return new Promise((resolve, reject) => {
      onValue(groupRef, (snapshot) => {
        const groupData = snapshot.val();
        if (groupData) {
          setGroupById(groupData)
          resolve(groupData);
        } else {
          reject(new Error(`Group with ID ${groupId} not found`));
        }
      }, (error) => {
        reject(error);
      });
    });
  };

  const updateGroup = async (groupId, newData) => {
    console.log('new: ', newData)
    try {
      const db = getDatabase();
      const groupRef = ref(db, `groups/${groupId}/group/members`);
  
      await set(groupRef, newData);
    } catch (error) {
      throw new Error(`Failed to update group ${groupId}: ${error.message}`);
    }
  };
  
  
  const onFollowBtnPress = async () => {
    try {      
      if (groupById) {
        let members = groupById.group.members
        members.push(userId)
        updateGroup(id, members)
        navigation.navigate('GroupDetailsScreen', {
          id: groupById?.group.id,
        })
      } else {
        return Alert.alert('Error', 'Group not found.');
      }
    } catch (error) {
      console.error(error);
      return Alert.alert('Error', 'Failed to follow the group.');
    }
  };  

  useEffect(() => {
    getGroupById(id)
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => navigation.navigate('GroupDetailsScreen', {id: id})}>
        {profPic ? 
        <Image
          source={{uri: profPic}}
          style={{width: 50, height: 50, borderRadius: 10, overflow: 'hidden'}}
        /> : 
        <View style={{width: 50, height: 50, borderRadius: 10, borderWidth: 2, borderColor: '#5F6AE7', padding: 4}}>
          <Image
            source={require('../assets/images/Icon_User.png')}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        }
        <Text style={styles.displayName} numberOfLines={1}>{name}</Text>
        <Text style={styles.username} numberOfLines={1}>{desc}</Text>
        {!isUserMember &&
          <TouchableOpacity
            style={styles.button}
            onPress={onFollowBtnPress}>
            <Text style={styles.buttonText}>Follow</Text>
          </TouchableOpacity>
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(133, 119, 252, 0.22)',
  },
  profilePicture: {
    marginLeft: 8,
    position: 'absolute',
  },
  displayName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    marginLeft: 65,
    width: '55%'
  },
  username: {
    color: 'black',
    fontSize: 14,
    position: 'absolute',
    marginLeft: 65,
    marginTop: 22,
    width: '55%'
  },
  button: {
    backgroundColor: 'rgba(133, 119, 252, 1)',
    width: 92,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'white',
    fontSize: 12,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8, // Adjust the spacing between buttons if needed
    marginTop: 15,
  },
  iconButton: {
    position: 'absolute',
    width: 120,
    height: 30,
    backgroundColor: 'rgba(133, 119, 252, 1)',
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginLeft: 250,
    fontWeight: 'bold',
    borderRadius: 10,
  },
});

export default ExploreGroupItem;
