import { Color } from '@/Assets/Color';

export const SHIPPING_RBS_INFO = (code: string) => {
  let params;
  switch (code) {
    // 견적 제안
    case 'SRSE_SDCM': {
      params = {
        title: '요청하신 수선 견적이\n도착했어요!',
        subTitle: '원하시는 견적가를 선택하고\n수선을 의뢰하세요',
        btnText: '내 명품 수선 견적가 확인하기',
        icon: require('@/Assets/Images/Common/status12.png'),
        bgColor: Color.palePink,
        btnBgColor: Color.pinkDefault,
        titleColor: Color.pinkDefault,
        move: 'repair',
      };
      return params;
    }
    // 결제 완료시 배송대기중으로 넘어
    case 'SRWT_SDCM': {
      params = {
        title: '원하시는 견적가로\n결제 완료되었습니다',
        subTitle: '자세한 사항은\n상세페이지에서 확인해주세요',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status04.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    // 검수요청/수선완료
    case 'QARQ_SDMG': {
      params = {
        title: '수선 완료!\n수선품을 확인해주세요',
        subTitle: '수선이 잘 되었는지\n사진으로 확인해주세요',
        btnText: '수선된 내 명품 확인하기',
        icon: require('@/Assets/Images/Common/status08.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepairCheck',
      };
      return params;
    }
    // 수선 취소
    case 'PRCC': {
      params = {
        title: '의뢰하신 수선이\n취소되었습니다',
        subTitle: '자세한 사항은\n상세페이지에서 확인해주세요',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status00.png'),
        bgColor: Color.White,
        btnBgColor: Color.Black1000,
        titleColor: Color.Black1000,
        move: 'myRepair',
      };
      return params;
    }
    // 패키지 배송중
    case 'SRSP_SDAC': {
      params = {
        title: '수선품 패키지가\n배송중입니다',
        subTitle: '자세한 사항은\n상세페이지에서 확인해주세요',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status05.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    // 배송준비중 (앤올->고객), 검수완료
    case 'SRWT_SDMC': {
      params = {
        title: '수선품을\n곧 보내드리겠습니다',
        subTitle: '자세한 사항은\n상세페이지에서 확인해주세요',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status09.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    // 입금대기중
    case 'CPBW_SDCC': {
      params = {
        title: '무통장 입금을\n기다리고 있습니다',
        subTitle: '입금이 확인되는대로\n수선품 수거를 준비하겠습니다',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status09.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    // 배송중 (고객->앤올)
    case 'SRSH_SDCM': {
      params = {
        title: '수선품을\n수거하고 있습니다',
        subTitle: '자세한 사항은\n상세페이지에서 확인해주세요',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status06.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    // 배송중 (앤올->고객)
    case 'SRSH_SDMC': {
      params = {
        title: '고객님께 수선품이\n배송되고 있습니다',
        subTitle: '자세한 사항은\n상세페이지에서 확인해주세요',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status10.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    // 결제(입금)기한 만료
    case 'EXPK': {
      params = {
        title: '무통장 입금 기한이\n만료되었습니다',
        subTitle: '입금 기한이 만료되어 수선 취소되었습니다\n다시 견적 의뢰해주세요',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status00.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    //  배송완료시 수선중으로 자동으로 넘어갑니다
    case 'RSRS_SDMM': {
      params = {
        title: '수선품 수령 완료!\n수선을 시작합니다',
        subTitle: '자세한 사항은\n상세페이지에서 확인해주세요',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status07.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    // 배송완료시 수선중으로 자동으로 넘어갑니다
    case 'RSRS': {
      params = {
        title: '수선품 수령 완료!\n수선을 시작합니다',
        subTitle: '자세한 사항은\n상세페이지에서 확인해주세요',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status07.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    // 배송완료시 전체완료로 자동으로 넘어갑니다
    case 'PRCM': {
      params = {
        title: '수선품이 고객님께\n배송 완료되었습니다',
        subTitle: '럭셔리앤올을 이용하여 주셔서\n감사드립니다',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status11.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    // 배송완료시 전체완료로 자동으로 넘어갑니다
    case 'PRCM_SDTT': {
      params = {
        title: '수선품이 고객님께\n배송 완료되었습니다',
        subTitle: '럭셔리앤올을 이용하여 주셔서\n감사드립니다',
        btnText: '자세히 보기',
        icon: require('@/Assets/Images/Common/status11.png'),
        bgColor: Color.White,
        btnBgColor: Color.Primary1000,
        titleColor: Color.Primary1000,
        move: 'myRepair',
      };
      return params;
    }
    default: {
      return '';
    }
  }
};
