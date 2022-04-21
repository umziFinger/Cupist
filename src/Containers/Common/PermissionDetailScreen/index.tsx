import React from 'react';
import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import Header from '@/Components/Header';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'PermissionDetailScreen'>;
}
const PermissionDetailScreen = ({ route }: PropTypes) => {
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { agreeIdx, detailArr } = route.params;
  const headerTitle = detailArr[agreeIdx]?.title || '';
  const uri = detailArr[agreeIdx]?.uri || '';

  return (
    <View style={{ flex: 1, backgroundColor: Color.White, paddingBottom: heightInfo.fixBottomHeight - 1 }}>
      <Header type={'back'} text={headerTitle} />
      <View style={{ flex: 1, borderTopWidth: 1, borderColor: Color.Gray200 }}>
        <WebView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          onError={(event) => {
            console.log('웹뷰 에러', event);
          }}
          source={{ uri }}
          useWebKit
        />
      </View>
    </View>
  );
};

export default PermissionDetailScreen;
