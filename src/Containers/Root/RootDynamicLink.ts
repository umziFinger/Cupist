import { useEffect } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { useDispatch } from 'react-redux';
import CommonActions from '@/Stores/Common/Actions';

/** ****************
 *
 *    다이나믹 링크 관련 컴포넌트 입니다.
 *
 ***************** */
function RootDynamicLink() {
  const dispatch = useDispatch();

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
