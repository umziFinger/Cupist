import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';

interface PropTypes {
  item: any;
}

const DirectReservationCard = (props: PropTypes) => {
  const { item } = props;

  const onPressReservation = () => {
    console.log('onPressReservation');
  };

  const onPressDibs = () => {
    console.log('onPressDibs');
  };

  return (
    <View style={{ flex: 1, borderWidth: 1, borderRadius: 5, borderColor: Color.Grayyellow200 }}>
      <View style={{ flexDirection: 'row', marginLeft: 12, marginTop: 8, marginRight: 8, marginBottom: 12 }}>
        <View
          style={{ width: 72, height: 72, backgroundColor: 'pink', borderRadius: 5, marginTop: 4, marginRight: 12 }}
        >
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{ uri: item.placePhotoArr[0] }}
            resizeMode={FastImage.resizeMode.cover}
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
                {item.averageStar}
              </CustomText>
            </View>
          </View>
          <View style={{ marginTop: 4 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
              {item.name}
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <View>
              <CustomText style={{ color: Color.Gray700, fontSize: 12 }}>{item.area || '지역정보없음'}</CustomText>
            </View>
            <View
              style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: Color.Gray400, marginHorizontal: 4 }}
            />
            <View>
              <CustomText style={{ color: Color.Gray700, fontSize: 12 }}>{item.distance}</CustomText>
            </View>
          </View>
        </View>
        <CustomButton onPress={() => onPressDibs()} hitSlop={10}>
          <View style={{ width: 24, height: 24 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={
                item.isPlaceDibs
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
        <View>
          <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12 }}>{item.type}</CustomText>
        </View>
        <View style={{ height: 9, width: 1, backgroundColor: Color.Gray400, marginHorizontal: 6 }} />
        <View style={{ flex: 1 }}>
          <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12 }}>{item.minPrice}원 부터</CustomText>
        </View>
        <CustomButton onPress={() => onPressReservation()} hitSlop={10}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 6 }}>
              <CustomText style={{ color: Color.Primary1000, fontSize: 14, fontWeight: 'bold' }}>바로예약</CustomText>
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
  );
};

export default DirectReservationCard;
