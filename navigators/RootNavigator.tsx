import React = require("react");
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../components/Types";
import MainNavigator from "../navigators/MainNavigator";
import AuthNavigator from "../navigators/AuthNavigator";
import HomeNavigator from "../navigators/HomeNavigator";

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{gestureEnabled: false}}>
            <RootStack.Screen name="Auth" component={AuthNavigator} options={{headerShown: false}} />
            <RootStack.Screen name="Main" component={MainNavigator} options={{headerShown: false}} />
            <RootStack.Screen name="HomeNav" component={HomeNavigator} options={{headerShown: false}} />
         </RootStack.Navigator>
    )
}

export default RootNavigator