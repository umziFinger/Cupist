import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import CodePush from 'react-native-code-push';
import OptimizationScreen from '@/Containers/Common/OptimizationScreen';
import CommonActions from '@/Stores/Common/Actions';
import { navigateAndSimpleReset } from '@/Services/NavigationService';
import HomeActions from '@/Stores/Home/Actions';
import { CommonState } from '@/Stores/Common/InitialState';

/** ****************
 * CodePushStatus 상태별 타입
 *
 * init : 최초 초기화
 * sync : 앱센터와 어플리케이션과 sync 작업
 * ing  : 코드푸쉬 내용 있으면 앱 다운로드 진행
 * end  : 코드푸쉬 작업 종료
 *
 ***************** */
const CodePushContainer = () => {
  const dispatch = useDispatch();
  const { permissionYN } = useSelector((state: CommonState) => state.common);
  useEffect(() => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      (syncStatus) => {
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'codePushSyncMessage',
            data: 'code push sync start',
          }),
        );
        if (syncStatus === 7) {
          console.log('CodePush start ', syncStatus);
          RNBootSplash.hide();
          dispatch(
            CommonActions.fetchCommonReducer({
              type: 'codePushPercent',
              data: 0,
            }),
          );
          dispatch(
            CommonActions.fetchCommonReducer({
              type: 'codePushStatus',
              data: 'ing',
            }),
          );
        }
        switch (syncStatus) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            dispatch(
              CommonActions.fetchCommonReducer({
                type: 'codePushSyncMessage',
                data: 'Checking for update.',
              }),
            );
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            dispatch(
              CommonActions.fetchCommonReducer({
                type: 'codePushSyncMessage',
                data: 'Downloading package.',
              }),
            );
            break;
          case CodePush.SyncStatus.AWAITING_USER_ACTION:
            dispatch(
              CommonActions.fetchCommonReducer({
                type: 'codePushSyncMessage',
                data: 'Awaiting user action.',
              }),
            );
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            dispatch(
              CommonActions.fetchCommonReducer({
                type: 'codePushSyncMessage',
                data: 'Installing update.',
              }),
            );
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            dispatch(
              CommonActions.fetchCommonReducer({
                type: 'codePushSyncMessage',
                data: 'App up to date.',
              }),
            );
            break;
          case CodePush.SyncStatus.UPDATE_IGNORED:
            dispatch(
              CommonActions.fetchCommonReducer({
                type: 'codePushSyncMessage',
                data: 'Update cancelled by user.',
              }),
            );
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            dispatch(
              CommonActions.fetchCommonReducer({
                type: 'codePushSyncMessage',
                data: 'Update installed and will be run when the app next resumes..',
              }),
            );
            break;
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            dispatch(
              CommonActions.fetchCommonReducer({
                type: 'codePushSyncMessage',
                data: 'An unknown error occurred.',
              }),
            );
            break;
          default:
            dispatch(
              CommonActions.fetchCommonReducer({
                type: 'codePushSyncMessage',
                data: 'default ?',
              }),
            );

            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        const percent = Math.round((receivedBytes / totalBytes) * 100);
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'codePushPercent',
            data: percent,
          }),
        );
      },
    )
      .then((result) => {
        console.log('code push then result-->', result);
        // dispatch(HomeActions.fetchHomeReducer({ type: 'isHomeLoaded', data: true }));
        if (result === 0) {
          dispatch(HomeActions.fetchHomeReducer({ type: 'isHomeLoaded', data: true }));
          RNBootSplash.hide();
          if (permissionYN === 'Y') navigateAndSimpleReset('Main');
          else navigateAndSimpleReset('Permission');
        } else {
          // 코드푸쉬 완료시 재부팅하기때문에 다시 스플래시 show
          RNBootSplash.show();
        }
      })
      .catch((e) => {
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'codePushSyncMessage',
            data: `catch error ${e}`,
          }),
        );
        // 업데이트 안되고 catch 발생했기때문에 초기화
        dispatch(CommonActions.fetchCommonReducer({ type: 'appCodePushVersion', data: '' }));
        dispatch(HomeActions.fetchHomeReducer({ type: 'isHomeLoaded', data: true }));
        RNBootSplash.hide();
        if (permissionYN === 'Y') navigateAndSimpleReset('Main');
        else navigateAndSimpleReset('Permission');
      });
  }, []);

  return <OptimizationScreen />;
};

export default CodePushContainer;
