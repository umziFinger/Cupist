import React, { useEffect, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { WebView } from 'react-native-webview';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import { AuthState } from '@/Stores/Auth/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import { DATA_PERMISSION_DETAILS } from './data';

function AgreeDetailScreen() {
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { isOpenAgreeDetailRBS } = useSelector((state: CommonState) => state.common);
  const { agreeInfo } = useSelector((state: AuthState) => state.auth);
  const { selectedAgreeIdx } = agreeInfo;
  const RBSheetRef = useRef<any>();

  useEffect(() => {
    if (isOpenAgreeDetailRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenAgreeDetailRBS]);

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.9}
      openDuration={500}
      closeDuration={100}
      customStyles={{
        container: {
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        },
      }}
      onClose={() => {
        dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenAgreeDetailRBS', data: false }));
        dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenAgreeRBS', data: true }));
      }}
    >
      <View style={{ flex: 1 }}>
        <Header type="auth" text={DATA_PERMISSION_DETAILS[selectedAgreeIdx]?.title} action={RBSheetRef} showBackBtn />
        <View style={{ flex: 1 }}>
          <WebView
            style={{ flex: 1 }}
            onError={(event) => {
              console.log('웹뷰 에러', event);
            }}
            source={{ uri: DATA_PERMISSION_DETAILS[selectedAgreeIdx]?.uri }}
            useWebKit
          />
        </View>
      </View>
    </RBSheet>
  );
}

export default AgreeDetailScreen;
