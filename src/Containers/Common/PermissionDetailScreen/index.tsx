import React from 'react';
import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import Header from '@/Components/Header';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { DATA_PERMISSION_DETAILS } from '@/Components/Data/DATA_PERMISSION_DETAILS';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'PermissionDetailScreen'>;
}
const PermissionDetailScreen = ({ route }: PropTypes) => {
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { agreeIdx } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: Color.White, paddingBottom: heightInfo.fixBottomHeight - 1 }}>
      <Header type={'back'} text={DATA_PERMISSION_DETAILS[agreeIdx].title} />
      <View style={{ flex: 1, borderTopWidth: 1, borderColor: Color.Gray200 }}>
        <WebView
          style={{ flex: 1 }}
          onError={(event) => {
            console.log('웹뷰 에러', event);
          }}
          source={{ uri: DATA_PERMISSION_DETAILS[agreeIdx]?.uri }}
          useWebKit
        />
      </View>
    </View>
  );
};

export default PermissionDetailScreen;
