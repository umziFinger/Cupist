import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useNetInfo } from '@react-native-community/netinfo';
import CommonActions from '@/Stores/Common/Actions';

const RootNetwork = () => {
  const dispatch = useDispatch();
  // const netInfo = useNetInfo();
  // useEffect(() => {
  //   console.log('netInfo:', netInfo.isConnected);
  //   dispatch(CommonActions.fetchCommonReducer({ type: 'isConnected', data: { isConnected: netInfo.isConnected } }));
  // }, [netInfo]);

  return true;
};
export default RootNetwork;
