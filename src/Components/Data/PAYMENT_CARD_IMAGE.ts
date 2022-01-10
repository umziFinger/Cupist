export const PAYMENT_CARD_IMAGE = (type: string) => {
  switch (type) {
    // case '367': {
    //   return require('@/Assets/Images/CreditCard/imgCardHyundai.png');
    // }
    // case '366': {
    //   return require('@/Assets/Images/CreditCard/imgCardShinhan.png');
    // }
    // case '374': {
    //   return require('@/Assets/Images/CreditCard/imgCardHana.png');
    // }
    // 국민카드
    case '381': {
      return require('@/Assets/Images/CreditCard/imgCardKb.png');
    }
    default:
      return require('@/Assets/Images/CreditCard/imgCardN.png');
  }
};
