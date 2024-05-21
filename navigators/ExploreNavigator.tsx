import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "../Screens/explore/ExploreScreen";
import { RootStackParamList } from "../components/Types";
import React = require("react");

const AuthStack = createStackNavigator<RootStackParamList>();

const ExploreNavigator = () => {
    return (
        <AuthStack.Navigator>
        <AuthStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{headerShown: false}}/>
        </AuthStack.Navigator>
    )
}

export default ExploreNavigator