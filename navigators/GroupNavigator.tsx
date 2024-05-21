import {createStackNavigator} from '@react-navigation/stack';
import GroupScreen from '../Screens/groups/GroupScreen';
import {RootStackParamList} from '../components/Types';
import React = require('react');
import CreateGroupScreen from '../Screens/groups/CreateGroupScreen';
import AddGroupPhotoScreen from '../Screens/groups/AddGroupPhotoScreen';
import CreateFirstGroupPostScreen from '../Screens/groups/CreateFirstGroupPostScreen';
import InviteToGroupScreen from '../Screens/groups/InviteToGroupScreen';
import GroupDetailsScreen from '../Screens/groups/GroupDetails';

const AuthStack = createStackNavigator<RootStackParamList>();

const GroupNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="CreateGroupScreen"
        component={CreateGroupScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="AddGroupPhotoScreen"
        component={AddGroupPhotoScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="CreateFirstGroupPostScreen"
        component={CreateFirstGroupPostScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="InviteToGroupScreen"
        component={InviteToGroupScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="GroupDetailsScreen"
        component={GroupDetailsScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default GroupNavigator;
