import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AgreeScreen from '@/Containers/Auth/AgreeScreen';
import JoinStepOneScreen from '@/Containers/Auth/JoinStepOneScreen';
import JoinStepTwoScreen from '@/Containers/Auth/JoinStepTwoScreen';
import JoinStepThreeScreen from '@/Containers/Auth/JoinStepThreeScreen';

const JoinStack = createStackNavigator();

const JoinNavigator = () => {
  return (
    <JoinStack.Navigator screenOptions={{ headerShown: false }}>
      <JoinStack.Screen name={'AgreeScreen'} component={AgreeScreen} />
      <JoinStack.Screen name={'JoinStepOneScreen'} component={JoinStepOneScreen} />
      <JoinStack.Screen name={'JoinStepTwoScreen'} component={JoinStepTwoScreen} />
      <JoinStack.Screen name={'JoinStepThreeScreen'} component={JoinStepThreeScreen} />
    </JoinStack.Navigator>
  );
};

export default JoinNavigator;
