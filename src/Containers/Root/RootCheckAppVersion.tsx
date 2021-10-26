import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import database from '@react-native-firebase/database';
import { getVersion } from 'react-native-device-info';
import CommonActions from '@/Stores/Common/Actions';
import Config from '@/Config';

const RootCheckAppVersion = () => {
  const dispatch = useDispatch();
  const device = Platform.OS;

  const path = Config.APP_MODE === 'prod' ? '/real/common/maintenance' : '/dev/common/maintenance';
  const [appActive, setAppActive] = useState(true); // 앱 활성화 여부 (점검)
  const [marketVersion, setMarketVersion] = useState(''); // 앱 버전
  const [currentVersion, setCurrentVersion] = useState(''); // 현재 마켓 버전 (선택 업데이트)
  const [minimumVersion, setMinimumVersion] = useState(''); // 최소 마켓 버전 (강제 업데이트)
  const versionCheck = () => {
    if (marketVersion && currentVersion && minimumVersion) {
      let emergencyYN = 'N';
      let updateType;
      if (appActive) {
        if (marketVersion < minimumVersion) {
          updateType = 'confirm';
        } else if (marketVersion < currentVersion && marketVersion >= minimumVersion) {
          updateType = 'choice';
        }
      } else {
        emergencyYN = 'Y';
      }
      if (emergencyYN === 'Y') {
        // 팝업 나올꺼임
        // 긴급 점검 중 입니다 팝업
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertDialog',
            data: {
              alertDialog: true,
              alertDialogType: 'confirm',
              alertDialogDataType: 'emergency',
              alertDialogTitle: '긴급 점검중입니다.',
            },
          }),
        );
      } else if (updateType) {
        // 팝업 나올꺼임
        // 원할한 서비스를 이용을 위해 앱 업데이트가 꼭 필요합니다.
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertDialog',
            data: {
              alertDialog: true,
              alertDialogType: updateType,
              alertDialogDataType: 'goToStore',
              alertDialogTitle: '원할한 서비스 이용을 위해\n앱 업데이트가 꼭 필요합니다.',
            },
          }),
        );
      }
    }
  };
  useEffect(() => {
    versionCheck();
  }, [appActive, marketVersion, currentVersion, minimumVersion]);

  useEffect(() => {
    const appVersion = getVersion();
    console.log('현재 앱 버전: ', appVersion);
    setMarketVersion(appVersion);

    // 버전정보 표시를 위한 처리

    database()
      .ref(path)
      .on('value', (snapshot) => {
        console.log('snapshot!!!!! : ', snapshot.val());
        if (snapshot.val()) {
          const { active, version } = snapshot.val();
          setAppActive(active);
          setCurrentVersion(version[device].current);
          setMinimumVersion(version[device].minimum);

          // 버전정보 표시를 위한 처리
          console.log('### call reducer currentVersion in RootCheckAppVersion.js ###');
          // 버전 정보 리듀스로 넘겨!
          dispatch(
            CommonActions.fetchCommonReducer({
              type: 'versionInfo',
              data: {
                versionInfo: {
                  currentVersion: version[device].current,
                  minimumVersion: version[device].minimum,
                },
              },
            }),
          );
        }
      });
  }, []);

  return null;
};
export default RootCheckAppVersion;
