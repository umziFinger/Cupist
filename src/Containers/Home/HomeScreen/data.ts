export const ShippingIcon = (code: string) => {
  switch (code) {
    // 입금대기중
    case 'CPBW_SDCC': {
      return require('@/Assets/Images/Common/status03.png');
    }

    // 배송준비중 (고객->앤올)
    case 'SRWT_SDCM': {
      return require('@/Assets/Images/Common/status04.png');
    }
    // 결제완료
    case 'CPCM_SDCC': {
      return require('@/Assets/Images/Common/status04.png');
    }
    // 패키지 배송중
    case 'SRSP_SDAC': {
      return require('@/Assets/Images/Common/status05.png');
    }
    // 배송중 (고객->앤올)
    case 'SRSH_SDCM': {
      return require('@/Assets/Images/Common/status06.png');
    }
    // 수선진행중
    case 'RSRS_SDMM': {
      return require('@/Assets/Images/Common/status07.png');
    }
    // 배송완료 (고객->앤올)
    case 'RSCM_SDCM': {
      return require('@/Assets/Images/Common/status07.png');
    }
    // 검수요청
    case 'QARQ_SDMG': {
      return require('@/Assets/Images/Common/status08.png');
    }
    // 수선완료
    case 'RSCM_SDMM': {
      return require('@/Assets/Images/Common/status08.png');
    }
    // 배송준비중(앤올->고객)
    case 'SRWT_SDMC': {
      return require('@/Assets/Images/Common/status09.png');
    }
    // 검수완료
    case 'QACM_SDCC': {
      return require('@/Assets/Images/Common/status09.png');
    }
    // 배송중(앤올->고객)
    case 'SRSH_SDMC': {
      return require('@/Assets/Images/Common/status10.png');
    }
    // 전체완료
    case 'PRCM_SDTT': {
      return require('@/Assets/Images/Common/status11.png');
    }
    // 배송완료(앤올->고객)
    case 'SRCM_SDMC': {
      return require('@/Assets/Images/Common/status11.png');
    }
    default: {
      return require('@/Assets/Images/Common/status05.png');
    }
  }
};
