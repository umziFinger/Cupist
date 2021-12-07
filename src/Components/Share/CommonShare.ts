import Share from 'react-native-share';
import { Platform } from 'react-native';
import CreateDynamicLink from '@/Components/Share/CreateDynamicLink';

interface CommonShareProps {
  type: string;
  data: any;
}

export default async function (props: CommonShareProps) {
  const { type, data } = props;
  if (type === 'placeDetail') {
    const placeIdx = data?.idx;
    const url = await CreateDynamicLink({ type: 'placeDetail', idx: placeIdx });
    const message = `${data?.name} 지금 바로 예약해보세요!`;
    const params = {
      url,
      message,
    };
    await createOpenShare(params);
  }
  return true;
}

const createOpenShare = async (data: any) => {
  const shareOptions: any = Platform.select({
    ios: {
      activityItemSources: [
        {
          placeholderItem: {
            type: 'text',
            content: data.message,
          },
          item: {
            default: {
              type: 'text',
              content: `${data.message}\n\n${data.url}`,
            },
          },
          linkMetadata: {
            title: data.message,
          },
        },
      ],
    },
    default: {
      message: `${data.message}\n\n${data.url}`,
    },
  });
  try {
    const ShareResponse = await Share.open(shareOptions);
    console.log('ShareResponse =>', ShareResponse);
  } catch (e) {
    console.log('link share error --> ', e);
  }
};
