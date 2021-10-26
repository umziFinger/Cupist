import dynamicLinks from '@react-native-firebase/dynamic-links';
import Config from '@/Config';

interface PropTypes {
  type: string;
  idx?: any;
  subIdx?: any;
}

export default async function (props: PropTypes) {
  const { type, idx, subIdx } = props;
  let url = `${Config.DYNAMIC_URL}/${type}`;

  if (idx) {
    url = `${Config.DYNAMIC_URL}/${type}?idx=${idx}`;
  }
  if (subIdx) {
    url = `${Config.DYNAMIC_URL}/${type}?idx=${idx}&subIdx=${subIdx}`;
  }

  console.log('CreateDynamicLink URL : ', url);

  const link = await dynamicLinks().buildShortLink(
    {
      link: url,
      domainUriPrefix: 'https://applink.watple.co',
      navigation: {
        forcedRedirectEnabled: true,
      },
      android: {
        packageName: 'co.watple.www',
      },
      ios: {
        bundleId: 'co.watple.www',
        appStoreId: '',
      },
    },
    'SHORT',
  );
  console.log('return link : ', link);
  return link;
}
