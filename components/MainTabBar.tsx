import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type TabBarStyle = {
  display: 'none' | 'flex';
};

const tabBarIconSize = (routeName: string) => {
  return {
    width: 30,
    height: 30,
  };
};

const tabBarIconNames = (routeName: string, isFocused: boolean) => {
  console.log(routeName + ': ' + isFocused);
  if (routeName === 'HomeNav') {
    if (isFocused) {
      return require(`../assets/tabIcons/Icon_Home_Active.png`);
    } else {
      return require(`../assets/tabIcons/Icon_Home.png`);
    }
  } else if (routeName === 'GroupNav') {
    if (isFocused) {
      return require('../assets/tabIcons/Icon_Groups_Active.png');
    } else {
      return require('../assets/tabIcons/Icon_Groups.png');
    }
  } else if (routeName === 'ExploreNav') {
    if (isFocused) {
      return require('../assets/tabIcons/Icon_Search_Active.png');
    } else {
      return require('../assets/tabIcons/Icon_Search.png');
    }
  } else if (routeName === 'ChatNav') {
    if (isFocused) {
      return require('../assets/tabIcons/Icon_Chat_Active.png');
    } else {
      return require('../assets/tabIcons/Icon_Chat.png');
    }
  }
};

const MainTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const routes = Object.keys(descriptors).map(item => descriptors[item].route);

  const focusedOptions = descriptors[state.routes[state.index].key]
    .options as BottomTabNavigationOptions;

  const {display} = focusedOptions.tabBarStyle as TabBarStyle;

  const {bottom} = useSafeAreaInsets();

  const TabBarItem = ({
    routeKey,
    routeName,
    index,
    showBadge,
  }: {
    routeKey: string;
    routeName: string;
    index: number;
    showBadge: boolean;
  }) => {
    const {options} = descriptors[routeKey];
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate({
          name: routeName,
          merge: true,
        });
      }
    };

    const isHome = routeName === 'HomeNav';
    const isChat = routeName === 'ChatNav';

    return (
      <TouchableOpacity onPress={onPress} style={styles.tabItem} key={routeKey}>
        <Image
          source={tabBarIconNames(routeName, isFocused)}
          style={{
            // tintColor: isFocused ? '#8478FC' : '#01133D',
            height: 28,
            width: 28,
          }}
        />
        {isChat && (
          <View style={styles.badgeContainer}>
            <View style={styles.badgeCircle}>
              <Text style={styles.badgeText}>22</Text>
            </View>
          </View>
        )}
        {isHome && (
          <View style={styles.badgeContainerHome}>
            <View style={styles.badgeCircleHome}></View>
          </View>
        )}
        {/* {isFocused && <Text style={{color: 'white'}}>{options.title}</Text>} */}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        ...styles.tabBar,
        display: display,
      }}>
      {state.routes.map((route, index) => (
        <TabBarItem
          key={route.key}
          routeKey={route.key}
          routeName={route.name}
          index={index}
        />
      ))}
    </View>
  );
};

export default MainTabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 73,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemText: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 4,
    left: 50,
  },
  badgeCircle: {
    minWidth: 22,
    minHeight: 22,
    borderRadius: 11,
    backgroundColor: '#FE5D26',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    display: 'flex',
    padding: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  badgeContainerHome: {
    position: 'absolute',
    top: 7,
    left: 50,
  },
  badgeCircleHome: {
    width: 8,
    height: 8,
    borderRadius: 11,
    backgroundColor: '#FE5D26',
    padding: 2,
  },
});
