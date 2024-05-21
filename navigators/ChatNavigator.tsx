import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../Screens/chat/ChatScreen";
import { RootStackParamList } from "../components/Types";
import React = require("react");

const AuthStack = createStackNavigator<RootStackParamList>();

const ChatNavigator = () => {
    return (
        <AuthStack.Navigator>
      <AuthStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}/>
        </AuthStack.Navigator>
    )
}

export default ChatNavigator