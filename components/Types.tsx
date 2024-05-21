import {ChatItem} from '../Screens/chat/ChatItem';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Splash: undefined;
  LoginScreen: undefined;
  ChooseDate: undefined;
  ChooseUsername: undefined;
  ChooseEmail: undefined;
  ChooseDisplay: undefined;
  PhoneNumber: undefined;
  ProfileNav: undefined;
  ProfileScreen: undefined;
  SubscriptionScreen: undefined;
  PostScreen: undefined;
  ExploreScreen: undefined;
  ExploreNav: undefined;
  ShareAltar: undefined;
  NotificationFlow: undefined;
  Settings: undefined;
  ChatNav: undefined;
  ChatScreen: {
    chatId: string;
    chat: ChatItem;
  };
  ChoosePic: undefined;
  ChatListScreen: undefined;
  TheirProfile: {ud: string};
  Auth: undefined;
  Main: undefined;
  GroupScreen: undefined;
  GroupNav: undefined;
  HomeScreen: undefined;
  HomeNav: undefined;
  Invite: undefined;
  FollowAccounts: undefined;
  AddGroupPhotoScreen: undefined;
  CreateGroupScreen: undefined;
  CreateFirstGroupPostScreen: undefined;
  InviteToGroupScreen: undefined;
  GroupDetailsScreen: undefined;
  NotificationScreen: undefined;
};
