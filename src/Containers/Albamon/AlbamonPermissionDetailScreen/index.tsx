import React from 'react';
import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Header from '@/Components/Header';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigateGoBack } from '@/Services/NavigationService';
import AlbamonActions from '@/Stores/Albamon/Actions';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'PermissionDetailScreen'>;
}
const AlbamonPermissionDetailScreen = ({ route }: PropTypes) => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { agreeIdx, detailArr } = route.params;
  const headerTitle = detailArr[agreeIdx]?.title || '';
  const uri = detailArr[agreeIdx]?.uri || '';

  const onPressConfirm = () => {
    dispatch(AlbamonActions.fetchAlbamonReducer({ type: 'permissionCheck', data: true }));
    navigateGoBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White, paddingBottom: heightInfo.fixBottomHeight - 1 }}>
      <Header type={'back'} text={'개인정보 수집 및 이용동의서'} />
      <View style={{ flex: 1, borderTopWidth: 1, borderColor: Color.Gray200 }}>
        <WebView
          style={{ flex: 1 }}
          onError={(event) => {
            console.log('웹뷰 에러', event);
          }}
          source={{ uri }}
          useWebKit
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 12,
          marginBottom: heightInfo.fixBottomHeight,
        }}
      >
        <CustomButton
          onPress={() => onPressConfirm()}
          style={{
            flex: 1,
            alignItems: 'center',
            borderRadius: 3,
            borderWidth: 1,
            borderColor: Color.Primary1000,
            paddingVertical: 15,
            backgroundColor: Color.Primary1000,
          }}
        >
          <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.12 }}>
            확인
          </CustomText>
        </CustomButton>
      </View>
    </View>
  );
};

export default AlbamonPermissionDetailScreen;
