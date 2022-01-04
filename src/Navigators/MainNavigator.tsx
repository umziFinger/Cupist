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
import JoinStepOneScreen from '@/Containers/Auth/JoinStepOneScreen';
import JoinStepTwoScreen from '@/Containers/Auth/JoinStepTwoScreen';
import JoinStepThreeScreen from '@/Containers/Auth/JoinStepThreeScreen';
import ResidentSearchScreen from '@/Containers/Search/ResidentSearchScreen';
import PlaceDetailScreen from '@/Containers/Place/PlaceDetailScreen';
import LocationSettingScreen from '@/Containers/Setting/LocationSettingScreen';
import PermissionScreen from '@/Containers/Auth/PermissionScreen';
import ProfileSettingScreen from '@/Containers/More/ProfileSettingScreen';
import NameEditScreen from '@/Containers/More/NameEditScreen';
import NickNameEditScreen from '@/Containers/More/NickNameEditScreen';
import PhoneNumberEditScreen from '@/Containers/More/PhoneNumberEditScreen';
import { SCREEN_TYPE } from '@/Components/Card/Common/PlaceXSmallCard';
import RecentPlaceScreen from '@/Containers/Place/RecentPlaceScreen';
import NotificationScreen from '@/Containers/Notification/NotificationScreen';
import NoticeScreen from '@/Containers/More/NoticeScreen';
import NoticeDetailScreen from '@/Containers/More/NoticeDetailScreen';
import EventScreen from '@/Containers/More/EventScreen';
import EventDetailScreen from '@/Containers/More/EventDetailScreen';
import QnaScreen from '@/Containers/More/QnaScreen';
import QnaWriteScreen from '@/Containers/More/QnaWriteScreen';
import QnaDetailScreen from '@/Containers/More/QnaDetailScreen';
import ServiceSettingScreen from '@/Containers/More/ServiceSettingScreen';
import WithdrawScreen from '@/Containers/More/WithdrawScreen';
import ReservationDetailScreen from '@/Containers/My/ReservationDetailScreen';
import ReservationScreen from '@/Containers/Reservation/ReservationScreen';
import ReservationCancelDetailScreen from '@/Containers/My/ReservationCancelDetailScreen';
import EditBookerScreen from '@/Containers/Reservation/EditBookerScreen';
import PaymentResultScreen from '@/Containers/Reservation/PaymentResultScreen';
import WriteReviewScreen from '@/Containers/My/WriteReviewScreen';
import WriteReviewDetailScreen from '@/Containers/My/WriteReviewDetailScreen';
import WalkThroughScreen from '@/Containers/WalkThrough';
import ReviewModifyScreen from '@/Containers/Review/ReviewModifyScreen';
import ReportScreen from '@/Containers/Report';
import PlaceReviewScreen from '@/Containers/Place/PlaceReviewScreen';
import PlaceListScreen from '@/Containers/Place/PlaceListScreen';
import PermissionDetailScreen from '@/Containers/Common/PermissionDetailScreen';
import HotPlaceListScreen from '@/Containers/Place/HotPlaceListScreen';
import PasswordEditScreen from '@/Containers/More/PasswordEditScreen';
import AddCardScreen from '@/Containers/Reservation/AddCardScreen';
import RegisterPasswordScreen from '@/Containers/Reservation/RegisterPasswordScreen';
import CheckPasswordScreen from '@/Containers/Reservation/CheckPasswordScreen';
import ReservationCancelPopupScreen from '@/Containers/Reservation/ReservationCancelPopupScreen';
import RegisterPasswordModifyScreen from '@/Containers/Reservation/RegisterPasswordModifyScreen';
import BasicInfoDetailScreen from '@/Containers/Place/BasicInfoDetailScreen';
import PaymentScreen from '@/Components/IamPort/PaymentScreen';
import CertificationScreen from '@/Components/IamPort/CertificationScreen';

type ReviewModifyType = 'my' | 'placeDetail' | 'placeReview';
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
  JoinStepOneScreen: undefined;
  JoinStepTwoScreen: undefined;
  JoinStepThreeScreen: undefined;
  ResidentSearchScreen: { type: SCREEN_TYPE };
  PlaceDetailScreen: { idx: number };
  LocationSettingScreen: undefined;
  PermissionScreen: undefined;
  ProfileSettingScreen: undefined;
  NickNameEditScreen: undefined;
  NameEditScreen: undefined;
  PhoneNumberEditScreen: undefined;
  RecentPlaceScreen: undefined;
  NotificationScreen: undefined;
  NoticeScreen: undefined;
  NoticeDetailScreen: undefined;
  EventScreen: undefined;
  EventDetailScreen: undefined;
  QnaScreen: undefined;
  QnaWriteScreen: undefined;
  QnaDetailScreen: undefined;
  ServiceSettingScreen: undefined;
  WithdrawScreen: undefined;
  ReservationDetailScreen: undefined;
  ReservationScreen: { placeIdx: number; ticketInfoIdx: number };
  ReservationCancelDetailScreen: undefined;
  EditBookerScreen: undefined;
  PaymentResultScreen: undefined;
  WriteReviewScreen: undefined;
  WriteReviewDetailScreen: { type: ReviewModifyType };
  ReviewModifyScreen: { reviewData: any; type: ReviewModifyType };
  WalkThroughScreen: undefined;
  ReportScreen: { mainIdx: number; subIdx: number; reportType: string };
  PlaceReviewScreen: { placeIdx: number; placeName: string };
  PlaceListScreen: { type: string };
  PermissionDetailScreen: { agreeIdx: number; detailArr: Array<any> };
  HotPlaceListScreen: undefined;
  PasswordEditScreen: undefined;
  AddCardScreen: undefined;
  RegisterPasswordScreen: undefined;
  CheckPasswordScreen: { paymentIdx: number; billingIdx: number };
  ReservationCancelPopupScreen: { cancelLimit: string; totalPrice: number };
  RegisterPasswordModifyScreen: undefined;
  BasicInfoDetailScreen: undefined;
  PaymentScreen: { userCode: any; data: any };
  CertificationScreen: { userCode: any; data: any };
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
      {/* Common */}
      <MainStack.Screen name="TotalImageScreen" component={TotalImageScreen} />
      <MainStack.Screen name="WalkThroughScreen" component={WalkThroughScreen} />
      <MainStack.Screen name="PermissionDetailScreen" component={PermissionDetailScreen} />
      {/* Auth */}
      <MainStack.Screen name="SimpleLoginScreen" component={SimpleLoginScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="FindPasswordScreen" component={FindPasswordScreen} />
      <MainStack.Screen name="AgreeScreen" component={AgreeScreen} />
      <MainStack.Screen name="JoinStepOneScreen" component={JoinStepOneScreen} />
      <MainStack.Screen name="JoinStepTwoScreen" component={JoinStepTwoScreen} />
      <MainStack.Screen name="JoinStepThreeScreen" component={JoinStepThreeScreen} />
      <MainStack.Screen name="PermissionScreen" component={PermissionScreen} />
      {/* Search */}
      <MainStack.Screen name="ResidentSearchScreen" component={ResidentSearchScreen} />
      <MainStack.Screen name="SearchScreen" component={SearchScreen} />

      {/* place */}
      <MainStack.Screen name="PlaceDetailScreen" component={PlaceDetailScreen} />
      <MainStack.Screen name="RecentPlaceScreen" component={RecentPlaceScreen} />
      <MainStack.Screen name="PlaceReviewScreen" component={PlaceReviewScreen} />
      <MainStack.Screen name="PlaceListScreen" component={PlaceListScreen} />
      <MainStack.Screen name="HotPlaceListScreen" component={HotPlaceListScreen} />
      <MainStack.Screen name="BasicInfoDetailScreen" component={BasicInfoDetailScreen} />

      {/*  Setting */}
      <MainStack.Screen name="LocationSettingScreen" component={LocationSettingScreen} />

      {/*  More */}
      <MainStack.Screen name="ProfileSettingScreen" component={ProfileSettingScreen} />
      <MainStack.Screen name="NameEditScreen" component={NameEditScreen} />
      <MainStack.Screen name="NickNameEditScreen" component={NickNameEditScreen} />
      <MainStack.Screen name="PhoneNumberEditScreen" component={PhoneNumberEditScreen} />
      <MainStack.Screen name="NotificationScreen" component={NotificationScreen} />
      <MainStack.Screen name="NoticeScreen" component={NoticeScreen} />
      <MainStack.Screen name="NoticeDetailScreen" component={NoticeDetailScreen} />
      <MainStack.Screen name="EventScreen" component={EventScreen} />
      <MainStack.Screen name="EventDetailScreen" component={EventDetailScreen} />
      <MainStack.Screen name="QnaScreen" component={QnaScreen} />
      <MainStack.Screen name="QnaWriteScreen" component={QnaWriteScreen} />
      <MainStack.Screen name="QnaDetailScreen" component={QnaDetailScreen} />
      <MainStack.Screen name="ServiceSettingScreen" component={ServiceSettingScreen} />
      <MainStack.Screen name="WithdrawScreen" component={WithdrawScreen} />
      <MainStack.Screen name="PasswordEditScreen" component={PasswordEditScreen} />

      {/*  My */}
      <MainStack.Screen name="ReservationDetailScreen" component={ReservationDetailScreen} />
      <MainStack.Screen name="ReservationCancelDetailScreen" component={ReservationCancelDetailScreen} />
      <MainStack.Screen name="WriteReviewScreen" component={WriteReviewScreen} />
      <MainStack.Screen name="WriteReviewDetailScreen" component={WriteReviewDetailScreen} />

      {/* Reservation */}
      <MainStack.Screen name="ReservationScreen" component={ReservationScreen} />
      <MainStack.Screen name="EditBookerScreen" component={EditBookerScreen} />
      <MainStack.Screen name="PaymentResultScreen" component={PaymentResultScreen} />
      <MainStack.Screen name="AddCardScreen" component={AddCardScreen} />
      <MainStack.Screen name="RegisterPasswordScreen" component={RegisterPasswordScreen} />
      <MainStack.Screen name="CheckPasswordScreen" component={CheckPasswordScreen} />
      <MainStack.Screen name="ReservationCancelPopupScreen" component={ReservationCancelPopupScreen} />
      <MainStack.Screen name="RegisterPasswordModifyScreen" component={RegisterPasswordModifyScreen} />

      {/* Review */}
      <MainStack.Screen name="ReviewModifyScreen" component={ReviewModifyScreen} />

      {/* Report */}
      <MainStack.Screen name="ReportScreen" component={ReportScreen} />

      {/* iamport */}
      <MainStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <MainStack.Screen name="CertificationScreen" component={CertificationScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
