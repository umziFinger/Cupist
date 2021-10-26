export const SHIPPING_TEXT = (code: string, boxSize: string) => {
  switch (code) {
    // 견적 요청
    case 'SRQE_SDCM': {
      return '견적 요청';
    }
    // 요청 기한 만료
    case 'EXRQ': {
      return '견적 요청 기한 만료';
    }
    // 수선 취소
    case 'PRCC': {
      return '수선 취소';
    }
    // 견적 기한 만료
    case 'EXES': {
      return '견적 기한 만료';
    }
    // 견적 제안
    case 'SRSE_SDCM': {
      return '견적 제안';
    }
    // 입금대기중
    case 'CPBW_SDCC': {
      return '무통장 입금 대기중';
    }
    // 결제(입금)기한 만료
    case 'EXBK': {
      return '무통장 입금 기한 만료';
    }
    // 결제 완료
    case 'CPCM_SDCC': {
      return '결제 완료';
    }
    // 배송준비중 (고객->앤올)
    case 'SRWT_SDCM': {
      return '수선품 수거 대기중';
    }
    // 패키지 배송중
    case 'SRSP_SDAC': {
      return `패키지${boxSize} 배송중`;
    }
    // 배송중 (고객->앤올)
    case 'SRSH_SDCM': {
      return '수선품 수거중';
    }
    // 수선진행중/배송완료 (고객->앤올)
    case 'RSRS_SDMM': {
      return '수선 진행중';
    }
    // 검수요청/수선완료
    case 'QARQ_SDMG': {
      return '수선 완료 및 검수 요청';
    }
    // 배송준비중 (앤올->고객), 검수완료
    case 'SRWT_SDMC': {
      return '검수 완료 및 배송 준비';
    }
    // 배송중 (앤올->고객)
    case 'SRSH_SDMC': {
      return '수선품 배송중';
    }
    // 전체 완료
    case 'PRCM_SDTT': {
      return '전체 완료';
    }

    default: {
      return '';
    }
  }
};
