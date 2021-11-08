import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import codePush from 'react-native-code-push';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BootSplash from 'react-native-bootsplash';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { URLParser } from '@/Components/Function';
import { navigate } from '@/Services/NavigationService';

const RootCodePush = () => {
  const { dynamicLinkFlag, dynamicLinkUrl } = useSelector((state: CommonState) => state.common);
  const [isFinishCodePush, setIsFinishCodePush] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('code push did mount : ', dynamicLinkFlag, isFinishCodePush);
    if (dynamicLinkFlag && isFinishCodePush) {
      console.log('Dynamic Moving In RootCodePush!');
      onDynamicLinkNavigate();
    }
  }, [dynamicLinkFlag, isFinishCodePush]);

  useEffect(() => {
    try {
      console.log('코드 푸시 시작');
      codePush
        .sync(
          {
            installMode: codePush.InstallMode.IMMEDIATE,
          },
          (syncStatus) => {
            splashShow().then(() => {
              dispatch(
                CommonActions.fetchCommonReducer({
                  type: 'codePushSyncMessage',
                  data: 'code push sync start',
                }),
              );
              dispatch(
                CommonActions.fetchCommonReducer({
                  type: 'codePushStatus',
                  data: 'sync',
                }),
              );
              if (syncStatus === 7) {
                console.log('codePush start ', syncStatus);
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
                case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                  dispatch(
                    CommonActions.fetchCommonReducer({
                      type: 'codePushSyncMessage',
                      data: 'Checking for update.',
                    }),
                  );
                  break;
                case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                  dispatch(
                    CommonActions.fetchCommonReducer({
                      type: 'codePushSyncMessage',
                      data: 'Downloading package.',
                    }),
                  );

                  break;
                case codePush.SyncStatus.AWAITING_USER_ACTION:
                  dispatch(
                    CommonActions.fetchCommonReducer({
                      type: 'codePushSyncMessage',
                      data: 'Awaiting user action.',
                    }),
                  );

                  break;
                case codePush.SyncStatus.INSTALLING_UPDATE:
                  dispatch(
                    CommonActions.fetchCommonReducer({
                      type: 'codePushSyncMessage',
                      data: 'Installing update.',
                    }),
                  );
                  break;
                case codePush.SyncStatus.UP_TO_DATE:
                  dispatch(
                    CommonActions.fetchCommonReducer({
                      type: 'codePushSyncMessage',
                      data: 'App up to date.',
                    }),
                  );

                  setIsFinishCodePush(true);
                  break;
                case codePush.SyncStatus.UPDATE_IGNORED:
                  dispatch(
                    CommonActions.fetchCommonReducer({
                      type: 'codePushSyncMessage',
                      data: 'Update cancelled by user.',
                    }),
                  );
                  break;
                case codePush.SyncStatus.UPDATE_INSTALLED:
                  dispatch(
                    CommonActions.fetchCommonReducer({
                      type: 'codePushSyncMessage',
                      data: 'Update installed and will be run when the app next resumes..',
                    }),
                  );
                  break;
                case codePush.SyncStatus.UNKNOWN_ERROR:
                  dispatch(
                    CommonActions.fetchCommonReducer({
                      type: 'codePushSyncMessage',
                      data: 'An unknown error occurred.',
                    }),
                  );

                  setIsFinishCodePush(true);
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
            });
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
          dispatch(
            CommonActions.fetchCommonReducer({
              type: 'codePushStatus',
              data: 'end',
            }),
          );
          AsyncStorage.setItem('codePushStatus', 'end');
          setIsFinishCodePush(true);
        });
    } catch (e) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'codePushSyncMessage',
          data: `catch error ${e}`,
        }),
      );
    }
  }, []);

  const onDynamicLinkNavigate = () => {
    if (dynamicLinkUrl) {
      const path = URLParser(dynamicLinkUrl).getPath();
      const idx = URLParser(dynamicLinkUrl).getParam('idx');
      // const subIdx = URLParser(dynamicLinkUrl).getParam('subIdx');
      console.log('dynamic path : ', path);
      console.log('dynamic idx : ', idx);
      // console.log('dynamic subIdx : ', subIdx);
      if (path === 'restorationDetail') {
        navigate('RepairHistoryDetailScreen', { rstr_no: idx });
      }
      dispatch(CommonActions.fetchCommonReducer({ type: 'dynamicLinkInfoInit' }));
    } else {
      dispatch(CommonActions.fetchCommonReducer({ type: 'dynamicLinkInfoInit' }));
      dispatch(CommonActions.fetchSkeletonNavigate({ routeName: 'HomeScreen', state: { expired: false } }));
    }
  };

  const splashShow = async () => {
    await BootSplash.show({ fade: true });
  };

  return null;
};

export default RootCodePush;
