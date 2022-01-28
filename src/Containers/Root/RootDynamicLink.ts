import { useEffect } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonActions from '@/Stores/Common/Actions';
import { HomeState, TICKET_TYPE } from '@/Stores/Home/InitialState';
import { CommonState } from '@/Stores/Common/InitialState';
import { URLParser } from '@/Components/Function';
import { navigate } from '@/Services/NavigationService';
import PlaceActions from '@/Stores/Place/Actions';

/** ****************
 *
 *    다이나믹 링크 관련 컴포넌트 입니다.
 *
 ***************** */
function RootDynamicLink() {
  const dispatch = useDispatch();
  const { isHomeLoaded } = useSelector((state: HomeState) => state.home);

  const { dynamicLinkFlag, dynamicLinkUrl } = useSelector((state: CommonState) => state.common);

  useEffect(() => {
    // 앱 실행상태
    dynamicLinks().onLink((link) => handleDynamicLink(link));
    // 앱 종료상태
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        console.log('앱 종료 상태 : ', link);
        handleDynamicLink(link);
      });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('splashStatus').then((value) => {
      console.log('Root code push isHomeLoaded : ', isHomeLoaded, value, dynamicLinkFlag);
      if (isHomeLoaded && value === 'end' && dynamicLinkFlag) {
        onDynamicLinkNavigate();
      }
    });
  }, [isHomeLoaded, dynamicLinkFlag]);

  const onDynamicLinkNavigate = () => {
    if (dynamicLinkUrl) {
      const path = URLParser(dynamicLinkUrl).getPath();
      const idx = URLParser(dynamicLinkUrl).getParam('idx');
      const subIdx = URLParser(dynamicLinkUrl).getParam('subIdx');
      console.log('dynamic path : ', path);
      console.log('dynamic idx : ', idx);
      console.log('dynamic subIdx : ', subIdx);

      if (path === 'placeDetail') {
        if (idx) {
          dispatch(PlaceActions.fetchPlaceReducer({ type: 'placeDetailIdx', data: idx }));
          navigate('PlaceDetailScreen', { idx: Number(idx), ticketType: TICKET_TYPE.ALL });
        }
      }
      dispatch(CommonActions.fetchCommonReducer({ type: 'dynamicLinkInfoInit' }));
    } else {
      dispatch(CommonActions.fetchCommonReducer({ type: 'dynamicLinkInfoInit' }));
      dispatch(CommonActions.fetchSkeletonNavigate({ routeName: 'HomeScreen', state: { expired: false } }));
    }
  };

  const handleDynamicLink = (link: any) => {
    console.log('in deep link-->', link);
    if (link?.url) {
      const url = link.url;
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'dynamicLinkInfo',
          data: { dynamicLinkUrl: url, dynamicLinkFlag: true },
        }),
      );
    } else {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'dynamicLinkInfoInit',
        }),
      );
    }
  };

  return null;
}

export default RootDynamicLink;
