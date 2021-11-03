import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  item: any;
  selectedDate: string;
}
const QuickPriceCard = (props: PropTypes) => {
  const { width, height } = useWindowDimensions();
  const { item, selectedDate } = props;
  const onPressDibs = () => {
    console.log('onPressDibs');
  };
  return (
    <CustomButton onPress={() => navigate('PlaceDetailScreen', { idx: item.idx })}>
      <View style={{ borderRadius: 5, borderWidth: 1, borderColor: Color.Grayyellow200, backgroundColor: Color.White }}>
        <View style={{ width: width - 40, height: 149 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
            source={{ uri: item.placePhotoArr[0] }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <CustomButton
            onPress={() => onPressDibs()}
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
              <CustomText style={{ color: Color.Gray700, fontSize: 12 }}>{item.area}</CustomText>
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
                  {item.averageStar}
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
              {item.name}
            </CustomText>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <View style={{ marginRight: 4 }}>
              <CustomText style={{ color: Color.Point1000, fontSize: 16, fontWeight: 'bold' }}>{item.rate}%</CustomText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold' }}>
                {item.minPrice}
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
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12 }}>{item.type}</CustomText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12, fontWeight: '500' }}>
                  {item.ticketTime}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={{ paddingVertical: 12, paddingHorizontal: 11 }}></View> */}
      </View>
    </CustomButton>
  );
};

export default QuickPriceCard;
