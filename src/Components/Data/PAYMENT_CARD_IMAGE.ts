export const PAYMENT_CARD_IMAGE = (type: string) => {
  switch (type) {
    // 국민카드
    case '0300': {
      return require('@/Assets/Images/CreditCard/imgCardKb.png');
    }
    default:
      return require('@/Assets/Images/CreditCard/imgCardN.png');
  }
};
