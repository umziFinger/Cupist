import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import usePlaceDibs from '@/Hooks/usePlaceDibs';

interface PropTypes {
  item: any;
  width: number;
}

const HotPlaceCard = ({ item, width }: PropTypes) => {
  const [isError, setIsError] = useState(false);

  const { handlerPlaceDibs } = usePlaceDibs();

  return (
    <CustomButton onPress={() => navigate('PlaceDetailScreen', { idx: item.idx })}>
      <View style={{ borderRadius: 5, borderWidth: 1, borderColor: Color.Gray200, backgroundColor: Color.White }}>
        <View style={{ width, height: 145 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
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
              top: 5,
              right: 5,
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
        <View style={{ paddingHorizontal: 9, paddingTop: 16, paddingBottom: 21 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText
              style={{ color: Color.Black1000, fontSize: 16, fontWeight: '500', letterSpacing: -0.15 }}
              numberOfLines={1}
            >
              {item.name}
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
                {item.averageStar}
              </CustomText>
            </View>

            <View
              style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: Color.Gray400, marginHorizontal: 4 }}
            />
            <View>
              <CustomText style={{ color: Color.Gray700, fontSize: 12 }} numberOfLines={1}>
                {item.area || '지역정보없음'}
              </CustomText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold' }}>
                {item.minPrice}
              </CustomText>
              <CustomText style={{ color: Color.Black1000, fontSize: 15 }}>원</CustomText>
            </View>
          </View>
        </View>
      </View>
    </CustomButton>
  );
};

export default HotPlaceCard;
