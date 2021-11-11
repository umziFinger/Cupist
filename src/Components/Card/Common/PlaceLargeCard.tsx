import React, { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { placeDibsDataType } from '@/Sagas/CommonSaga';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  item: any;
  type: 'myAround' | 'recentPlace';
}

const PlaceLargeCard = (props: PropTypes) => {
  const { item, type } = props;

  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  const handlerPlaceDibs = (place: any) => {
    if (place.isPlaceDibs) {
      onPlaceUnDibs(place.idx);
    } else {
      onPlaceDibs(place.idx);
    }
  };

  const onPlaceDibs = (placeIdx: number) => {
    const params: placeDibsDataType = {
      placeIdx,
      type,
      status: 'dibs',
    };
    dispatch(CommonActions.fetchCommonPlaceDibsHandler(params));
  };

  const onPlaceUnDibs = (placeIdx: number) => {
    const params: placeDibsDataType = {
      placeIdx,
      type,
      status: 'unDibs',
    };
    dispatch(CommonActions.fetchCommonPlaceDibsHandler(params));
  };

  const onPlaceDetail = (place: any) => {
    navigate('PlaceDetailScreen', { idx: place.idx });
  };

  return (
    <CustomButton onPress={() => onPlaceDetail(item)}>
      <View
        style={{
          borderRadius: 5,
          borderWidth: 1,
          borderColor: Color.Gray350,
          backgroundColor: Color.White,
          marginBottom: 17,
        }}
      >
        <View style={{ width, height: 145 }}>
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

        <View style={{ width: 24, height: 24, position: 'absolute', right: 4, top: 4 }}>
          <CustomButton onPress={() => handlerPlaceDibs(item)}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={
                item?.isPlaceDibs
                  ? require('@/Assets/Images/Button/icHeartOn.png')
                  : require('@/Assets/Images/Button/icHeartOffWt.png')
              }
              resizeMode={FastImage.resizeMode.cover}
              onError={() => {
                setIsError(true);
              }}
            />
          </CustomButton>
        </View>

        <View style={{ paddingTop: 12, paddingBottom: 12, paddingHorizontal: 16 }}>
          <CustomText style={{ fontSize: 16, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}>
            {item?.name || ''}
          </CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <View style={{ width: 14.2, height: 14.2 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/icStar.png')}
                resizeMode={FastImage.resizeMode.cover}
                onError={() => {
                  setIsError(true);
                }}
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
                {item?.area || ''} {'\u2022'} {item?.distance}
              </CustomText>
            </View>
          </View>

          <View style={{ marginTop: 8, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 4 }}>
              <CustomText style={{ fontSize: 13, letterSpacing: 0, color: Color.Grayyellow1000 }}>
                {item?.type || ''}
              </CustomText>
            </View>
            <CustomText style={{ fontSize: 16, fontWeight: 'bold', letterSpacing: 0, color: Color.Black1000 }}>
              {item?.minPrice}
            </CustomText>
            <CustomText style={{ fontSize: 15, letterSpacing: 0, color: Color.Black1000 }}>원~</CustomText>
          </View>
        </View>

        {item?.event !== '' && (
          <View
            style={{
              backgroundColor: Color.Gray100,
              paddingVertical: 10,
              borderRadius: 5,
              paddingLeft: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ marginRight: 8 }}>
              <CustomText style={{ fontSize: 12, fontWeight: 'bold', letterSpacing: 0, color: Color.Grayyellow500 }}>
                EVENT
              </CustomText>
            </View>
            <View>
              <CustomText style={{ fontSize: 12, letterSpacing: 0, color: Color.Grayyellow500 }}>
                {item?.event || ''}
              </CustomText>
            </View>
          </View>
        )}
      </View>
    </CustomButton>
  );
};

export default PlaceLargeCard;
