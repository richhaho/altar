import React, { useEffect, useState } from 'react';
import {PanResponder} from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getDatabase, ref, onValue} from '@firebase/database';

const PrayerPostOptionsDrawer = ({isVisible, onClose, onActionPress, user}: any) => {
  const windowHeight = Dimensions.get('window').height;

  // Calculate 35% of the viewport height
  const heightPercentage = windowHeight * 0.4;

  if (!isVisible) {
    return null;
  }

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
          // You can handle the gesture movement here if needed
        },
        onPanResponderRelease: (event, gestureState) => {
          // Check if the gesture was a swipe down
          if (gestureState.dy > 50) {
            onClose(); // Close the drawer
          }
        },
      }),
    [onClose],
  );

  const [groups, setGroups] = useState([
    {
      id: '',
      group: {
        name: '',
        desc: '',
        pic: '',
        members: []
      },
    },
  ]);

  const getGroups = () => {
    const db = getDatabase();
    const groupsRef = ref(db, 'groups');

    onValue(groupsRef, (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const groupsArray: any = Object.values(data);
        setGroups(groupsArray);
      }
    });
  };

  useEffect(() => {
    getGroups();
  }, []);

  const [userGroups, setUserGroups] = useState([
    {
      id: '',
      group: {
        name: '',
        desc: '',
        pic: '',
        members: []
      },
    },
  ]);

  useEffect(() => {
    if (groups) {
    const groupsWithUser = groups?.filter(group => {
      if (group?.group?.members) {
      const nameMatch = group?.group?.members.includes(user?.userId);
      return nameMatch;
      } else {
        return false;
      }
    })
    setUserGroups(groupsWithUser)
    }
  }, [groups])

  return (
    <View
      style={{height: heightPercentage, ...styles.container}}
      {...panResponder.panHandlers}>
      <View style={styles.handle} />
      <View style={styles.actionsContainer}>
        <Text style={styles.optionsHeader}>Post Prayer Options</Text>
        <ScrollView>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onActionPress('Profile')}>
              {user.pic ? <Image
              style={styles.optionImg}
              source={{uri: user.pic}}
            /> : 
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Placeholder_Icon.png')}
            />
              }
            <Text style={styles.actionText}>Profile</Text>
          </TouchableOpacity>
          {userGroups.length > 0 && 
          <View>
          <Text style={styles.groupsHeader}>My Groups</Text>
          {userGroups.map((group, index) => 
            <TouchableOpacity
              key={group.id}
              style={styles.actionButton}
              onPress={() => onActionPress(`Group ${index}`)}>
                {group.group.pic ?
                <Image
                style={styles.optionImg}
                source={{uri: group.group.pic}}
              />
                :
                <Image
                  style={styles.actionIcon}
                  source={require('../assets/images/Placeholder_Icon.png')}
                />
              }
              <Text style={styles.actionText}>{group.group.name}</Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onActionPress('Group 1')}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Placeholder_Icon.png')}
            />
            <Text style={styles.actionText}>Group 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onActionPress('Group 2')}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/Placeholder_Icon.png')}
            />
            <Text style={styles.actionText}>Group 2</Text>
          </TouchableOpacity> */}
          </View>
}   
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 48,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: 'rgba(133, 119, 252, 0.33)',
    borderWidth: 1,
    position: 'absolute',
    bottom: -64,
    left: 0,
    right: 0,
    zIndex: 2,
    flex: 1,
    justifyContent: 'space-between',
  },
  actionsContainer: {},
  actionButton: {
    marginBottom: 36,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    objectFit: 'contain',
  },
  optionImg: {
    width: 24,
    height: 24,
    marginRight: 16,
    borderRadius: 5
  },
  actionText: {
    fontSize: 16,
  },
  optionsHeader: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 32,
  },
  groupsHeader: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 26,
  },
  handle: {
    width: 50,
    height: 5,
    borderRadius: 30,
    backgroundColor: '#6C6C6C',
    alignSelf: 'center',
    marginHorizontal: 8,
    marginBottom: 16,
  },
});

export default PrayerPostOptionsDrawer;
