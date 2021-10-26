import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomeScreen from '@/Containers/Home/HomeScreen';
import TabBar from '@/Navigators/CustomTabBar/TabBar';
import MyScreen from '@/Containers/My/MyScreen';
import SearchScreen from '@/Containers/Search/SearchScreen';
import TotalImageScreen from '@/Containers/Common/TotalImageScreen';
// import SetEmailScreen from '@/Containers/Auth/SetEmailScreen';
// import SetPasswordScreen from '@/Containers/Auth/SetPasswordScreen';
// import SetCharacterScreen from '@/Containers/Auth/SetCharacterScreen';
// import SetBrandScreen from '@/Containers/Auth/SetBrandScreen';
// import AgreeScreen from '@/Containers/Auth/AgreeScreen';
// import SetSmsScreen from '@/Containers/Auth/SetSmsScreen';
// import MyCouponScreen from '@/Containers/My/MyCouponScreen';
// import MyPointScreen from '@/Containers/My/MyPointScreen';
// import MyInfoModifyScreen from '@/Containers/My/MyInfoModifyScreen';
// import NotificationScreen from '@/Containers/Notification/NotificationScreen';
// import RepairPaymentScreen from '@/Containers/Payment/RepairPaymentScreen';
// import RepairPaymentResultScreen from '@/Containers/Payment/RepairPaymentResultScreen';
// import RentPaymentScreen from '@/Containers/Payment/RentPaymentScreen';
// import RentPaymentResultScreen from '@/Containers/Payment/RentPaymentResultScreen';
// import FindLoginInfoScreen from '@/Containers/Auth/FindLoginInfoScreen';
// import AgreeDetailScreen from '@/Containers/Auth/AgreeDetailScreen';
// import MyEditMobileScreen from '@/Containers/My/MyEditMobileScreen';
// import MyEditPasswordScreen from '@/Containers/My/MyEditPasswordScreen';
// import MyCheckMobileScreen from '@/Containers/My/MyCheckMobileScreen';

export type MainStackParamList = {
  Bottom: undefined;
  HomeScreen: { expired: boolean };
  MyScreen: undefined;
  SearchScreen: undefined;
  TotalImageScreen: { startIdx: number };
};

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator<MainStackParamList>();

const RepairBridge = () => {
  return null;
};
const BottomNavigator = () => (
  <View style={{ flex: 1, backgroundColor: 'transparent' }}>
    <Tab.Navigator backBehavior="none" tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} initialParams={{}} />
      <Tab.Screen name="MyScreen" component={MyScreen} initialParams={{}} />
      {/*<Tab.Screen name="MyPositionScreen" component={MyPositionScreen} initialParams={{}} />*/}
      {/*<Tab.Screen name="DibsScreen" component={DibsScreen} initialParams={{}} />*/}
      {/*<Tab.Screen name="MoreScreen" component={MoreScreen} initialParams={{}} />*/}
    </Tab.Navigator>
  </View>
);

const MainNavigator = () => {
  return (
    <MainStack.Navigator headerMode={'none'}>
      <MainStack.Screen name="Bottom" component={BottomNavigator} />
      <MainStack.Screen name="SearchScreen" component={SearchScreen} />
      <MainStack.Screen name="TotalImageScreen" component={TotalImageScreen} />

    </MainStack.Navigator>
  );
};

export default MainNavigator;
