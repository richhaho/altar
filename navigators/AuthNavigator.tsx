import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/login/LoginScreen';
import {RootStackParamList} from '../components/Types';
import ChooseDate from '../Screens/signup/ChooseDate';
import ChooseEmail from '../Screens/signup/ChooseEmail';
import React = require('react');
import {NavigationContainer} from '@react-navigation/native';
import PhoneNumber from '../Screens/signup/PhoneNumber';
import ChooseUsername from '../Screens/signup/ChooseUsername';
import ChooseDisplay from '../Screens/signup/ChooseDisplay';
import ChoosePic from '../Screens/signup/ChoosePic';
import ShareAltar from '../Screens/signup/ShareAltar';
import InviteScreen from '../Screens/signup/Invite';
import NotificationFlow from '../Screens/signup/NotificationFlow';
import FollowAccounts from '../Screens/signup/FollowAccounts';
import SubscriptionScreen from '../Screens/subscription/SubscriptionScreen';
import PostScreen from '../Screens/Post';

const AuthStack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ChooseEmail"
        component={ChooseEmail}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ChooseDisplay"
        component={ChooseDisplay}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ChooseUsername"
        component={ChooseUsername}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ChooseDate"
        component={ChooseDate}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ChoosePic"
        component={ChoosePic}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ShareAltar"
        component={ShareAltar}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="NotificationFlow"
        component={NotificationFlow}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="PhoneNumber"
        component={PhoneNumber}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Invite"
        component={InviteScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="FollowAccounts"
        component={FollowAccounts}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
