export const SHIPPING_PINK_TEXT = (code: string) => {
  switch (code) {
    // 요청 기한 만료
    case 'EXRQ': {
      return '수선사에 견적을 요청한 기한이\n만료되었습니다';
    }
    // 수선 취소
    case 'PRCC': {
      return '수선이 불가하여 수선의뢰가\n취소되었습니다';
    }
    // 견적 기한 만료
    case 'EXES': {
      return '제안해드린 견적 기한이\n만료되었습니다';
    }
    // 견적 제안
    case 'SRSE_SDCM': {
      return '요청하신 수선 견적이 도착했습니다!\n확인 후 수선을 맡겨보세요';
    }
    // 무통장 입금 대기중
    case 'CPBW_SDCC': {
      return '무통장 입금 대기중입니다!\n주문 기준 3일 내에 입금해주세요';
    }
    // 결제 입금 기한 만료
    case 'EKBK': {
      return '무통장 입금 기한이 만료되었습니다!\n다시 수선을 의뢰해주세요';
    }
    // 결제 완료
    case 'CPCM_SDCC': {
      return '원하시는 견적가로\n결제 완료되었습니다';
    }
    // 수선품 수거 대기중
    case 'SRWT_SDCM': {
      return '수선품 수거를 기다리고 있습니다';
    }
    // 패키지 배송중
    case 'SRSP_SDAC': {
      return '수선품 패키지가\n고객님께 배송중입니다';
    }
    // 수선품 수거중
    case 'SRSH_SDCM': {
      return `수선품을\n수거하고 있습니다`;
    }
    // 수선 진행중 / 배송완료 고객->앤올
    case 'SRCM_SDCM': {
      return '수선품을 수선하고 있습니다';
    }
    // 검수요청 / 수선완료
    case 'QARQ_SDMG': {
      return '수선 완료된 수선품을\n사진으로 확인해주세요';
    }
    // 배송준비중 앤올->고객 / 검수완료
    case 'SRWT_SDMC': {
      return '수선품을 곧 보내드리겠습니다';
    }
    // 배송중 앤올->고객
    case 'SRSH_SDMC': {
      return '수선품이 고객님께 배송중입니다';
    }
    // 배송완료
    case 'SRCM_SDMC': {
      return '수선품이 고객님께\n배송 완료되었습니다';
    }

    default: {
      return '';
    }
  }
};
