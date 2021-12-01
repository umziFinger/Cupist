import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { numberFormat } from '@/Components/Function';
import CustomCheckBox from '@/Components/Card/CustomCheckBox';
import PlaceActions from '@/Stores/Place/Actions';
import CustomButton from '@/Components/CustomButton';
import { PlaceState } from '@/Stores/Place/InitialState';
import usePlaceDibs from '@/Hooks/usePlaceDibs';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  type: string;
  item: any;
}
const PlaceListCard = (props: PropTypes) => {
  const { type, item = {} } = props;
  const dispatch = useDispatch();
  const { handlerPlaceDibs } = usePlaceDibs();
  const { selectedTicket } = useSelector((state: PlaceState) => state.place);
  const [isError, setIsError] = useState(false);

  const onValueChange = (data: any) => {
    console.log('select place idx : ', data.checkType);
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'isOpenTicketSlider', data: { type, idx: data.checkType } }));
  };

  const onPressTicket = (placeIdx: number, ticket: any) => {
    if (selectedTicket?.idx === ticket.idx) {
      dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: null }));
      return;
    }

    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedTicket', data: ticket }));
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'selectedPlaceIdx', data: placeIdx }));
  };

  const onPlaceDetail = (place: any) => {
    navigate('PlaceDetailScreen', { idx: place.idx });
  };

  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <CustomButton onPress={() => onPlaceDetail(item)}>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 16 }}>
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: '500', letterSpacing: -0.25 }}>
                {item?.name}
              </CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <View style={{ width: 14.2, height: 14.2 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Common/icStar.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ marginLeft: 1.8 }}>
                <CustomText style={{ fontSize: 12, fontWeight: '500', letterSpacing: 0, color: Color.Grayyellow1000 }}>
                  {item?.averageStar || '0'}
                </CustomText>
              </View>
              <View style={{ width: 1, height: 10, backgroundColor: Color.Gray400, marginHorizontal: 6 }} />
              <View>
                <CustomText style={{ fontSize: 12, letterSpacing: 0, color: Color.Gray700 }}>
                  {item?.area || '지역정보없음'} {'\u2022'} {item?.distance}
                </CustomText>
              </View>
            </View>
            {(type === 'special' || type === 'early') &&
              (item?.PlaceTicketInfo?.length !== 0 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 9 }}>
                  <View style={{ justifyContent: 'center', marginRight: 4 }}>
                    <CustomText style={{ color: Color.Point1000, fontSize: 16, fontWeight: 'bold' }}>
                      {item?.rate}%
                    </CustomText>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Black1000, fontSize: 16 }}>
                      <CustomText style={{ fontWeight: 'bold' }}>{numberFormat(item?.minPrice || 0)}</CustomText>
                      <CustomText>원~</CustomText>
                    </CustomText>
                  </View>
                </View>
              ) : (
                <View style={{ justifyContent: 'center', marginTop: 15 }}>
                  <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>예약 가능한 상품이 없습니다.</CustomText>
                </View>
              ))}
            {type === 'dibs' &&
              (item?.PlaceTicketInfo?.length !== 0 ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                  <View style={{ justifyContent: 'center', marginRight: 4 }}>
                    <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13 }}>{item?.ticketName}</CustomText>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Grayyellow1000, fontSize: 13, fontWeight: 'bold' }}>
                      <CustomText style={{ fontWeight: 'bold' }}>{numberFormat(item?.minPrice || 0)}</CustomText>
                      <CustomText>원~</CustomText>
                    </CustomText>
                  </View>
                </View>
              ) : (
                <View style={{ justifyContent: 'center', marginTop: 15 }}>
                  <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>예약 가능한 상품이 없습니다.</CustomText>
                </View>
              ))}
          </View>
          <View style={{ width: 70, height: 70 }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 4 }}
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
            <CustomButton
              onPress={() => handlerPlaceDibs(item)}
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                top: 0,
                right: 0,
                alignItems: 'flex-end',
                zIndex: 100,
              }}
              hitSlop={10}
            >
              <View style={{ width: 24, height: 24 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={
                    item.isPlaceDibs
                      ? require('@/Assets/Images/Button/icHeartOn.png')
                      : require('@/Assets/Images/Button/icHeartOffWt.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </CustomButton>
          </View>
        </View>
      </CustomButton>

      {item?.PlaceTicketInfo?.length !== 0 && (
        <View
          style={{ borderWidth: 1, borderColor: Color.Gray300, borderRadius: 5, marginTop: 14, marginHorizontal: 16 }}
        >
          <CustomButton onPress={() => onValueChange({ checkType: item?.idx })}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 12,
                paddingRight: 8,
                paddingVertical: 8,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', marginRight: 3 }}>
                  <CustomText style={{ color: Color.Black1000, fontSize: 13, letterSpacing: -0.2 }}>상품</CustomText>
                </View>
                <View style={{ justifyContent: 'center', marginRight: 3 }}>
                  <CustomText style={{ color: Color.Black1000, fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2 }}>
                    {item?.PlaceTicketInfo?.length || 0}개
                  </CustomText>
                </View>
              </View>
              <CustomCheckBox
                type={item?.idx}
                value={item?.isSelected}
                onValueChange={onValueChange}
                enableIcon={require('@/Assets/Images/Button/icArrowPdUp.png')}
                disableIcon={require('@/Assets/Images/Button/icArrowPdDw.png')}
              />
            </View>
          </CustomButton>
        </View>
      )}
      {item?.isSelected && (
        <View style={{ flex: 1, paddingLeft: 16, marginTop: 16 }}>
          <FlatList
            data={item?.PlaceTicketInfo || []}
            renderItem={({ item: ticket }) => (
              <CustomButton onPress={() => onPressTicket(item?.idx, ticket)}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: selectedTicket?.idx === ticket.idx ? Color.Primary1000 : Color.Gray300,
                    borderRadius: 5,
                    backgroundColor:
                      selectedTicket?.idx === ticket.idx ? 'rgba(255, 185, 10, 0.05)' : Color.Grayyellow50,
                    paddingLeft: 12,
                    paddingRight: 21,
                    paddingVertical: 20,
                    marginRight: 8,
                  }}
                >
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText style={{ color: Color.Grayyellow1000, fontSize: 14, fontWeight: '500' }}>
                      {ticket.startTime.substr(0, 5)} - {ticket.endTime.substr(0, 5)}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                    }}
                  >
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText style={{ color: Color.Grayyellow1000, fontSize: 15, fontWeight: '500' }}>
                        {numberFormat(ticket?.salePrice)}
                      </CustomText>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText style={{ color: Color.Grayyellow1000, fontSize: 15 }}>원</CustomText>
                    </View>
                  </View>
                </View>
              </CustomButton>
            )}
            keyExtractor={(keyItem, index) => index.toString()}
            initialNumToRender={3}
            maxToRenderPerBatch={6}
            windowSize={7}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>
      )}
    </View>
  );
};

export default PlaceListCard;
