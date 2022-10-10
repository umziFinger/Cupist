import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomeScreen from '@/Containers/Home/HomeScreen';
import TabBar from '@/Navigators/CustomTabBar/TabBar';
import ProfileScreen from '@/Containers/Home/ProfileScreen';

type ReviewModifyType = 'my' | 'placeDetail' | 'placeReview';
export type MainStackParamList = {
  Bottom: undefined;
  ProfileScreen: undefined;

  HomeScreen: { expired: boolean };
};

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator<MainStackParamList>();

const BottomNavigator = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Tab.Navigator
        backBehavior="history"
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} initialParams={{}} />
        <Tab.Screen name="LiveScreen" component={HomeScreen} initialParams={{}} />
        <Tab.Screen name="StationScreen" component={HomeScreen} initialParams={{}} />
        <Tab.Screen name="ConnectionScreen" component={HomeScreen} initialParams={{}} />
        <Tab.Screen name="MoreScreen" component={HomeScreen} initialParams={{}} />
      </Tab.Navigator>
    </View>
  );
};

const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Bottom" component={BottomNavigator} />
      <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
