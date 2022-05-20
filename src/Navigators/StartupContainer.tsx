import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBootSplash from 'react-native-bootsplash';
import CodePush from 'react-native-code-push';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import database from '@react-native-firebase/database';
import CommonActions from '@/Stores/Common/Actions';
import HomeActions from '@/Stores/Home/Actions';
import { navigateAndSimpleReset } from '@/Services/NavigationService';
import { NotificationRequest } from '@/Components/Permission/Notification';
import GoogleLoginInitial from '@/Components/Login/SocialLogin/GoogleLoginInitial';
import Config from '@/Config';
import { CommonState } from '@/Stores/Common/InitialState';

const StartupContainer = () => {
  const dispatch = useDispatch();
  const { appCodePushVersion, permissionYN } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    const path = Config.APP_MODE === 'prod' ? '/real/common/maintenance' : '/dev/common/maintenance';
    let codePushVersion = '';
    const getStorage = async () => {
      database()
        .ref(path)
        .on('value', (snapshot) => {
          console.log('StartupContainer snapshot!!!!! : ', snapshot.val());
          if (snapshot.val()) {
            const { version } = snapshot.val();
            codePushVersion = Platform.OS === 'ios' ? version?.ios?.codepush : version?.android?.codepush || null;
            console.log('appCodePushVersion 111', appCodePushVersion, codePushVersion);
          }
        });
      setTimeout(() => {
        // 초기에 앱에서 체크용 storage
        AsyncStorage.setItem('splashStatus', 'end').then(() => console.log('splashStatus end'));

        // 코드푸시에서 체크용
        if (!appCodePushVersion) {
          if (parseInt(codePushVersion.substring(1)) > 0) {
            console.log(
              '최초 코드푸시 업데이트 있음 코드푸시 컨테이너 이동',
              appCodePushVersion,
              codePushVersion,
              '\n permissionYN : ',
              permissionYN,
            );
            dispatch(HomeActions.fetchHomeReducer({ type: 'isHomeLoaded', data: false }));
            dispatch(CommonActions.fetchCommonReducer({ type: 'appCodePushVersion', data: codePushVersion }));
            navigateAndSimpleReset('CodePush');
          } else {
            console.log(
              '최초 코드푸시 업데이트 없음 메인 이동',
              appCodePushVersion,
              codePushVersion,
              '\n permissionYN : ',
              permissionYN,
            );
            dispatch(HomeActions.fetchHomeReducer({ type: 'isHomeLoaded', data: true }));
            RNBootSplash.hide();
            if (permissionYN === 'Y') navigateAndSimpleReset('Main');
            else navigateAndSimpleReset('Permission');
          }
        } else if (parseInt(appCodePushVersion.substring(1)) < parseInt(codePushVersion.substring(1))) {
          console.log(
            '코드푸시 업데이트 있음 코드푸시 컨테이너 이동',
            appCodePushVersion,
            codePushVersion,
            '\n permissionYN : ',
            permissionYN,
          );
          dispatch(HomeActions.fetchHomeReducer({ type: 'isHomeLoaded', data: false }));
          dispatch(CommonActions.fetchCommonReducer({ type: 'appCodePushVersion', data: codePushVersion }));
          navigateAndSimpleReset('CodePush');
        } else {
          console.log(
            '코드푸시 업데이트 없음 메인 이동',
            appCodePushVersion,
            codePushVersion,
            '\n permissionYN : ',
            permissionYN,
          );
          dispatch(HomeActions.fetchHomeReducer({ type: 'isHomeLoaded', data: true }));
          RNBootSplash.hide();
          if (permissionYN === 'Y') navigateAndSimpleReset('Main');
          else navigateAndSimpleReset('Permission');
        }
      }, 2000);
    };
    // 기기별 height 초기화
    saveBottomHeight();

    // 알림 권한 없으면 요청 후 토큰 업데이트
    // NotificationRequest();

    // 구글 로그인 초기화
    GoogleLoginInitial();

    getStorage();
  }, []);

  const saveBottomHeight = () => {
    const statusHeight = getStatusBarHeight(true);
    const headerMenuHeight = 68;
    let bottomBarHeight, tabBarBottomHeight;

    if (Platform.OS === 'android') {
      bottomBarHeight = 0;
      tabBarBottomHeight = 70;
    } else if (isIphoneX()) {
      bottomBarHeight = getBottomSpace();
      tabBarBottomHeight = 90;
    } else {
      bottomBarHeight = 0;
      tabBarBottomHeight = 70;
    }

    const mainBottomHeight = statusHeight + bottomBarHeight + headerMenuHeight + tabBarBottomHeight;
    const subBottomHeight = statusHeight + bottomBarHeight + headerMenuHeight;

    const info = {
      mainBottomHeight,
      subBottomHeight,
      fixBottomHeight: bottomBarHeight,
      tabBarBottomHeight,
      statusHeight,
    };
    dispatch(
      CommonActions.fetchCommonReducer({
        type: 'heightInfo',
        data: { info },
      }),
    );
  };
  return null;
};

const CodePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };

export default CodePush(CodePushOptions)(StartupContainer);

// export default StartupContainer;
