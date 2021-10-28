import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomeScreen from '@/Containers/Home/HomeScreen';
import TabBar from '@/Navigators/CustomTabBar/TabBar';
import MyScreen from '@/Containers/My/MyScreen';
import SearchScreen from '@/Containers/Search/SearchScreen';
import TotalImageScreen from '@/Containers/Common/TotalImageScreen';
import MyAroundScreen from '@/Containers/MyAround/MyAroundScreen';
import DibsScreen from '@/Containers/Dibs/DibsScreen';
import MoreScreen from '@/Containers/More/MoreScreen';
import SimpleLoginScreen from '@/Containers/Auth/SimpleLoginScreen';
import LoginScreen from '@/Containers/Auth/LoginScreen';
import FindPasswordScreen from '@/Containers/Auth/FindPasswordScreen';
import AgreeScreen from '@/Containers/Auth/AgreeScreen';

export type MainStackParamList = {
  Bottom: undefined;
  SearchScreen: undefined;
  HomeScreen: { expired: boolean };
  MyScreen: undefined;
  MyAroundScreen: undefined;
  DibsScreen: undefined;
  MoreScreen: undefined;
  TotalImageScreen: { startIdx: number };
  SimpleLoginScreen: undefined;
  LoginScreen: undefined;
  FindPasswordScreen: undefined;
  AgreeScreen: undefined;
};

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator<MainStackParamList>();

const BottomNavigator = () => (
  <View style={{ flex: 1, backgroundColor: 'transparent' }}>
    <Tab.Navigator backBehavior="none" tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} initialParams={{}} />
      <Tab.Screen name="MyScreen" component={MyScreen} initialParams={{}} />
      <Tab.Screen name="MyAroundScreen" component={MyAroundScreen} initialParams={{}} />
      <Tab.Screen name="DibsScreen" component={DibsScreen} initialParams={{}} />
      <Tab.Screen name="MoreScreen" component={MoreScreen} initialParams={{}} />
    </Tab.Navigator>
  </View>
);

const MainNavigator = () => {
  return (
    <MainStack.Navigator headerMode={'none'}>
      <MainStack.Screen name="Bottom" component={BottomNavigator} />
      <MainStack.Screen name="SearchScreen" component={SearchScreen} />
      <MainStack.Screen name="TotalImageScreen" component={TotalImageScreen} />
      {/* Auth */}
      <MainStack.Screen name="SimpleLoginScreen" component={SimpleLoginScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="FindPasswordScreen" component={FindPasswordScreen} />
      <MainStack.Screen name="AgreeScreen" component={AgreeScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
