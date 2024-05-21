import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import {RootStackParamList} from '../components/Types';
import React = require('react');
import PostScreen from '../Screens/Post';
import ProfileScreen from '../Screens/profile/Profile';
import SubscriptionScreen from '../Screens/subscription/SubscriptionScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import NotificationScreen from '../Screens/notifications/NotificationScreen';

const AuthStack = createStackNavigator<RootStackParamList>();

const HomeNavigator = ({navigation, route}: any) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      {/* <AuthStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{headerShown: false}}
      /> */}
      <AuthStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      {/* <AuthStack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{headerShown: false}}
      /> */}
      <AuthStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default HomeNavigator;
