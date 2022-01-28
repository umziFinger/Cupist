import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';

interface PropTypes {
  item: any;
  showRate: boolean;
  showTicketName: boolean;
  width: number;
  ticketType: TICKET_TYPE;
}
const PlaceSmallCard = ({
  item,
  showRate = false,
  showTicketName = false,
  width,
  ticketType = TICKET_TYPE.ALL,
}: PropTypes) => {
  const [isError, setIsError] = useState(false);

  const onPlaceDetail = () => {
    navigate('PlaceDetailScreen', { idx: item?.idx, ticketType });
  };

  return (
    <CustomButton onPress={() => onPlaceDetail()}>
      <View style={{ borderRadius: 2, borderWidth: 1, borderColor: Color.Gray200, backgroundColor: Color.White }}>
        <View style={{ width, height: 93 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={
              !item?.placePhotoArr[0] || isError
                ? require('@/Assets/Images/Common/icNoImage.png')
                : { uri: item?.placePhotoArr[0] }
            }
            resizeMode={FastImage.resizeMode.cover}
            onError={() => {
              setIsError(true);
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 9, paddingTop: 16, paddingBottom: 21 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText
              style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}
              numberOfLines={1}
            >
              {item?.name}
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <View style={{ width: 13, height: 13, marginRight: 2 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/icStar.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12, fontWeight: '500' }}>
                {item?.averageStar?.toString().substr(0, 4)}
              </CustomText>
            </View>

            <View
              style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: Color.Gray400, marginHorizontal: 4 }}
            />
            <CustomText style={{ color: Color.Gray700, fontSize: 12 }} numberOfLines={1}>
              {item?.area || '지역정보없음'}
            </CustomText>
          </View>
          <View style={{ marginTop: 10 }}>
            {showTicketName && item?.ticketName && (
              <View style={{ justifyContent: 'center' }}>
                <CustomText
                  style={{
                    fontSize: 11,

                    letterSpacing: -0.2,
                    color: Color.Gray600,
                  }}
                >
                  {item.ticketName}
                </CustomText>
              </View>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* {showRate && (
                <View style={{ marginRight: 4 }}>
                  <CustomText style={{ color: Color.Point1000, fontSize: 16, fontWeight: 'bold' }}>
                    {item?.rate}%
                  </CustomText>
                </View>
              )} */}
              <View style={{ flexDirection: 'row' }}>
                <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold' }}>
                  {item?.minPrice}
                </CustomText>
                <CustomText style={{ color: Color.Black1000, fontSize: 15 }}>원</CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </CustomButton>
  );
};

export default PlaceSmallCard;
