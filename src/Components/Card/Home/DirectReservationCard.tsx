import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import CommonActions from '@/Stores/Common/Actions';
import HomeActions from '@/Stores/Home/Actions';
import usePlaceDibs from '@/Hooks/usePlaceDibs';
import PlaceActions from '@/Stores/Place/Actions';
import { TICKET_TYPE } from '@/Stores/Home/InitialState';
import { JsonForm } from '@/Components/Function';

interface PropTypes {
  item: any;
}

const DirectReservationCard = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { item } = props;
  const { handlerPlaceDibs } = usePlaceDibs();
  const [isError, setIsError] = useState(false);

  const onPressReservation = () => {
    console.log('onPressReservation');
    dispatch(HomeActions.fetchHomeReducer({ type: 'selectedDirectName', data: item?.name || '' }));
    dispatch(HomeActions.fetchHomeReducer({ type: 'selectedDirectIdx', data: item?.idx || -1 }));
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedPlaceIdx', data: item?.idx || -1 }));
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenDirectReservationRBS', data: true }));
  };

  return (
    <CustomButton onPress={() => navigate('PlaceDetailScreen', { idx: item?.idx, ticketType: TICKET_TYPE.ALL })}>
      <View style={{ flex: 1, borderWidth: 1, borderRadius: 5, borderColor: Color.Grayyellow200 }}>
        <View style={{ flexDirection: 'row', marginLeft: 12, marginTop: 8, marginRight: 8, marginBottom: 12 }}>
          <View style={{ width: 72, height: 72, borderRadius: 5, marginTop: 4, marginRight: 12 }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
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
          <View style={{ flex: 1, justifyContent: 'center' }}>
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
                  {item?.averageStar}
                </CustomText>
              </View>
            </View>
            <View style={{ marginTop: 4 }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
                {item?.name}
              </CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <View>
                <CustomText style={{ color: Color.Gray700, fontSize: 12 }}>{item?.area || '지역정보없음'}</CustomText>
              </View>
              <View
                style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: Color.Gray400, marginHorizontal: 4 }}
              />
              <View>
                <CustomText style={{ color: Color.Gray700, fontSize: 12 }}>{item?.distance}</CustomText>
              </View>
            </View>
          </View>
          <CustomButton onPress={() => handlerPlaceDibs(item)} hitSlop={10}>
            <View style={{ width: 24, height: 24 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={
                  item?.isPlaceDibs
                    ? require('@/Assets/Images/Button/icHeartOn.png')
                    : require('@/Assets/Images/Button/icHeartOff.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </CustomButton>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Color.Gray100,
            paddingVertical: 12,
            paddingHorizontal: 11,
            borderRadius: 5,
          }}
        >
          <View
            style={{ backgroundColor: Color.Primary1000, borderRadius: 4, paddingVertical: 4, paddingHorizontal: 7 }}
          >
            <CustomText style={{ color: Color.White, fontSize: 12 }}>
              {item?.eventType === 'free' ? '자유볼링' : '시간제'}
            </CustomText>
          </View>
          <View>
            <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12, marginLeft: 6 }}>
              {item?.ticketName}
            </CustomText>
          </View>
          <View style={{ height: 9, width: 1, backgroundColor: Color.Gray400, marginHorizontal: 6 }} />
          <View style={{ flex: 1 }}>
            <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12 }}>{item?.minPrice}원 부터</CustomText>
          </View>
          <CustomButton onPress={() => onPressReservation()} hitSlop={10}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginRight: 6 }}>
                <CustomText style={{ color: Color.Primary1000, fontSize: 12, fontWeight: 'bold' }}>바로예약</CustomText>
              </View>
              <View style={{ width: 15, height: 15 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Arrow/icBookingArrow.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </CustomButton>
        </View>
      </View>
    </CustomButton>
  );
};

export default DirectReservationCard;
