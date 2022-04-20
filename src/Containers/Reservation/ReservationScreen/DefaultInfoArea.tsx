import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { PlaceState } from '@/Stores/Place/InitialState';
import { numberFormat } from '@/Components/Function';
import { HomeState, TICKET_TYPE } from '@/Stores/Home/InitialState';
import { AlbamonState } from '@/Stores/Albamon/InitialState';

interface PropTypes {
  item: any;
}

const DefaultInfoArea = (props: PropTypes) => {
  const { item } = props;
  const { calendarDate } = useSelector((state: HomeState) => state.home);
  const { selectedTicket } = useSelector((state: PlaceState) => state.place);
  const { albamonDate, placeDetailSelectedTab } = useSelector((state: AlbamonState) => state.albamon);
  const ticketType = item?.eventType;
  const priceType = item?.ticketName.split(' ')[0];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4 }}>
          예약
        </CustomText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 24 }}>
        <View style={{ width: 60, height: 60, marginRight: 12, borderRadius: 3 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 3, backgroundColor: Color.Gray400 }}
            source={item?.PlacePhoto ? { uri: item?.PlacePhoto } : require('@/Assets/Images/Common/icNoImage.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold', letterSpacing: -0.25 }}>
              {item?.placeName || ''}
            </CustomText>
          </View>
          <View style={{ justifyContent: 'center', marginTop: 4 }}>
            <CustomText style={{ color: Color.Primary1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
              {item?.ticketName || ''}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: Color.Gray100, marginTop: 16, borderRadius: 3, padding: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 16 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, letterSpacing: -0.2 }}>
                일시 및 시간
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center', marginTop: 6 }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, letterSpacing: -0.2 }}>
                {ticketType === TICKET_TYPE.NORMAL ? `${priceType} 금액` : '1인 금액'}
              </CustomText>
            </View>
          </View>
          <View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, fontWeight: '500' }}>
                {placeDetailSelectedTab.key === 'default'
                  ? moment(calendarDate).format('MM월 DD일(dd)')
                  : moment(albamonDate).format('MM월 DD일(dd)')}{' '}
                {selectedTicket?.startTime.substr(0, 5)} ~ {selectedTicket?.endTime.substr(0, 5)}
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center', marginTop: 6 }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, fontWeight: '500' }}>
                {numberFormat(item?.salePrice)}원
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DefaultInfoArea;
