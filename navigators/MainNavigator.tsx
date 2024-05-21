import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainTabBar from '../components/MainTabBar';
import AuthNavigator from './AuthNavigator';
import ChatNavigator from './ChatNavigator';
import GroupNavigator from './GroupNavigator';
import HomeNavigator from './HomeNavigator';
import ExploreNavigator from './ExploreNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

const BottomTab = createBottomTabNavigator();

function TabBarIcon(props: {color: string}) {
  return null;
}

export const MainNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeNav"
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}
      tabBar={props => <MainTabBar {...props} />}>
      <BottomTab.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          tabBarStyle: {display: 'flex'},
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color}) => <TabBarIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="GroupNav"
        component={GroupNavigator}
        options={{
          tabBarStyle: {display: 'flex'},
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({color}) => <TabBarIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ExploreNav"
        component={ExploreNavigator}
        options={{
          tabBarStyle: {display: 'flex'},
          headerShown: false,
          title: 'Explore',
          tabBarIcon: ({color}) => <TabBarIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ChatNav"
        component={ChatNavigator}
        options={{
          tabBarStyle: {display: 'flex'},
          headerShown: false,
          title: 'Chat',
          tabBarIcon: ({color}) => <TabBarIcon color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainNavigator;
