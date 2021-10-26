import Share from 'react-native-share';
import { Platform } from 'react-native';
import CreateDynamicLink from '@/Components/Share/CreateDynamicLink';

interface CommonShareProps {
  type: string;
  data: any;
}

export default async function (props: CommonShareProps) {
  const { type, data } = props;
  if (type === 'pick') {
    const pickIdx = data?.idx;
    const url = await CreateDynamicLink({ type: 'pick', idx: pickIdx });
    const title = '';
    const message = `${data?.title} 왓플에서 확인하세요!`;
    const params = {
      url,
      title,
      message,
    };
    await createOpenShare(params);
  } else if (type === 'collectionDetail') {
    const collectionIdx = data?.idx;
    const url = await CreateDynamicLink({ type: 'collectionDetail', idx: collectionIdx });
    const message = `${data?.title} 왓플에서 확인하세요!`;
    const params = {
      url,
      // title,
      message,
    };
    await createOpenShare(params);
  } else if (type === 'artistBoard') {
    const artistIdx = data?.idx;
    const boardDetailIdx = data?.detail?.idx;
    const url = await CreateDynamicLink({ type: 'artistBoard', idx: artistIdx, subIdx: boardDetailIdx });
    const message = `셀럽보드에서 ${data?.detail?.User?.nickname || '알수없음'}님의 게시물을 확인해보세요!`;
    const params = {
      url,
      message,
    };
    await createOpenShare(params);
  } else if (type === 'dramaBoard') {
    const dramaIdx = data?.idx;
    const boardDetailIdx = data?.detail?.idx;
    const url = await CreateDynamicLink({ type: 'dramaBoard', idx: dramaIdx, subIdx: boardDetailIdx });
    const message = `드라마보드에서 ${data?.detail?.User?.nickname || '알수없음'}님의 게시물을 확인해보세요!`;
    const params = {
      url,
      message,
    };
    await createOpenShare(params);
  } else if (type === 'artistBoardDetail') {
    const artistIdx = data?.idx;
    const boardDetailIdx = data?.subIdx;
    const url = await CreateDynamicLink({ type: 'artistBoardDetail', idx: artistIdx, subIdx: boardDetailIdx });
    const message = `셀럽보드에서 ${data?.detail?.User?.nickname || '알수없음'}님의 게시물을 확인해보세요!`;
    const params = {
      url,
      message,
    };
    await createOpenShare(params);
  } else if (type === 'dramaBoardDetail') {
    const dramaIdx = data?.idx;
    const boardDetailIdx = data?.subIdx;
    const url = await CreateDynamicLink({ type: 'dramaBoardDetail', idx: dramaIdx, subIdx: boardDetailIdx });
    const message = `드라마보드에서 ${data?.detail?.User?.nickname || '알수없음'}님의 게시물을 확인해보세요!`;
    const params = {
      url,
      message,
    };
    await createOpenShare(params);
  } else if (type === 'event') {
    const eventIdx = data?.idx;
    const url = await CreateDynamicLink({ type: 'event', idx: eventIdx });
    const message = `현재 왓플에서 진행중인 이벤트를 참여해보세요!!`;
    const params = {
      url,
      message,
    };
    await createOpenShare(params);
  } else if (type === 'placeDetail') {
    const placeIdx = data?.idx;
    const url = await CreateDynamicLink({ type: 'placeDetail', idx: placeIdx });
    const message = `가장 핫한 ${data?.title}을/를 지금 확인해보세요!`;
    const params = {
      url,
      message,
    };
    await createOpenShare(params);
  } else if (type === 'placeReviewDetail') {
    const placeIdx = data?.idx;
    const placeReviewIdx = data?.subIdx;

    const url = await CreateDynamicLink({ type, idx: placeIdx, subIdx: placeReviewIdx });
    const message = `${data?.detail?.title} 솔직담백 리뷰를 확인해보세요!`;
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
