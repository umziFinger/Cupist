import React, { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';
import { placeDibsDataType } from '@/Sagas/CommonSaga';
import CommonActions from '@/Stores/Common/Actions';
import usePlaceDibs from '@/Hooks/usePlaceDibs';

interface PropTypes {
  item: any;
}
const QuickPriceCard = (props: PropTypes) => {
  const { width } = useWindowDimensions();
  const { item } = props;
  const { handlerPlaceDibs } = usePlaceDibs();

  const [isError, setIsError] = useState(false);

  return (
    <CustomButton onPress={() => navigate('PlaceDetailScreen', { idx: item.idx })}>
      <View style={{ borderRadius: 5, borderWidth: 1, borderColor: Color.Grayyellow200, backgroundColor: Color.White }}>
        <View style={{ width: width - 40, height: (width - 40) * (149 / 333) }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
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
              top: 6,
              right: 6,
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
        <View style={{ padding: 12 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <CustomText style={{ color: Color.Gray700, fontSize: 12 }}>{item?.area || '지역정보없음'}</CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          </View>
          <View style={{ marginTop: 6 }}>
            <CustomText
              style={{
                color: Color.Black1000,
                fontSize: 17,
                fontWeight: '500',
                letterSpacing: -0.3,
              }}
            >
              {item?.name}
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <View style={{ marginRight: 4 }}>
              <CustomText style={{ color: Color.Point1000, fontSize: 16, fontWeight: 'bold' }}>{item.rate}%</CustomText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold' }}>
                {item?.minPrice}
              </CustomText>
              <CustomText style={{ color: Color.Black1000, fontSize: 15 }}>원</CustomText>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 12,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            borderTopWidth: 1,
            borderTopColor: Color.Gray300,
            backgroundColor: Color.Gray100,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12 }}>{item?.ticketName || ''}</CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12, fontWeight: '500' }}>
                  {item?.ticketTime}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </CustomButton>
  );
};

export default QuickPriceCard;
