import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

interface PropTypes {
  item: any;
}

const TitleArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const { item } = props;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center' }}>
        <CustomText
          style={{ color: Color.Black1000, fontSize: 18, fontWeight: '500', letterSpacing: -0.2 }}
          numberOfLines={1}
        >
          {item?.name || ''}
        </CustomText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <View style={{ width: 16, height: 16, marginRight: 4 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Common/icAddress.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={{ justifyContent: 'center', marginRight: 8 }}>
          <CustomText style={{ color: Color.Black1000, fontSize: 13, letterSpacing: -0.2 }}>
            {item?.newAddress || '주소 정보 없음'}
          </CustomText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Point1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
              길찾기
            </CustomText>
          </View>
          <View style={{ width: 15, height: 15 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Arrow/icArrowRiPurple.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
        <View style={{ width: 16, height: 16, marginRight: 4 }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('@/Assets/Images/Common/icStar.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={{ justifyContent: 'center', marginRight: 8 }}>
          <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2 }}>
            {item?.averageStar || 0}
          </CustomText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ color: Color.Point1000, fontSize: 13, fontWeight: '500' }}>
              {`리뷰 ${item?.reviewCnt || 0}개 보기`}
            </CustomText>
          </View>
          <View style={{ width: 15, height: 15 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Arrow/icArrowRiPurple.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
      </View>

      {/* 이벤트 영역 */}
      {item?.eventArr?.length > 0 && (
        <View>
          <View style={{ marginTop: 20, height: 1, backgroundColor: Color.Gray200 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <View style={{ width: 16, height: 16, marginRight: 4 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/icEvent.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 14, fontWeight: '500', letterSpacing: -0.25 }}>
                볼링장 이벤트
              </CustomText>
            </View>
          </View>
          {item?.eventArr.map((text: string) => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <View
                  style={{
                    borderRadius: 50,
                    width: 4,
                    height: 4,
                    backgroundColor: Color.Grayyellow200,
                    marginRight: 8,
                  }}
                />
                <View style={{ justifyContent: 'center' }}>
                  <CustomText style={{ color: Color.Black1000, fontSize: 13, letterSpacing: -0.2 }}>{text}</CustomText>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default TitleArea;
