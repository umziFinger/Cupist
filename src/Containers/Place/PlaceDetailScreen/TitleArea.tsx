import React from 'react';
import { Linking, Platform, useWindowDimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { InfoItemButtonType } from '@/Containers/My/ReservationDetailScreen/data';
import CommonActions from '@/Stores/Common/Actions';
import Config from '@/Config';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  item: any;
}

const TitleArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { item } = props;

  const onPressTotalList = () => {
    // console.log('======');
    navigate('PlaceReviewScreen', { placeIdx: item.idx, placeName: item.name });
  };

  const onPressButton = (type: InfoItemButtonType) => {
    switch (type) {
      case 'addressCopy':
        Clipboard.setString(item?.newAddress || '');
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertToast',
            data: {
              alertToast: true,
              alertToastPosition: 'bottom',
              alertToastMessage: '주소가 복사 되었습니다.',
            },
          }),
        );
        break;

      case 'getDirections': {
        Linking.openURL(
          `nmap://route/car?dlat=${item?.lat}&dlng=${item?.lng}&dname=${item?.name}&appname=${Config.NAVER_APP_URL_SCHEME}`,
        )
          .then((res) => {
            // 앱 설치 o, 티맵 경로 바로 검색 성공
            console.log('success tmap link : ', res);
          })
          .catch((err1) => {
            // 앱 미설치, 마켓으로 이동
            console.log('error : ', err1);
            Linking.openURL(Platform.OS === 'android' ? Config.NMAP_MARKET_URL_ANDROID : Config.NMAP_MARKET_URL_IOS)
              .then((res2) => {
                console.log('result : ', res2);
              })
              .catch((err2) => {
                console.log('error : ', err2);
              });
          });
        break;
      }

      default:
        break;
    }
  };

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
        <View style={{ justifyContent: 'center', marginRight: 8, flex: 1 }}>
          <CustomText style={{ color: Color.Black1000, fontSize: 13, letterSpacing: -0.2 }}>
            {item?.newAddress || '주소 정보 없음'}
          </CustomText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomButton onPress={() => onPressButton('getDirections')}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Point1000, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
                길찾기
              </CustomText>
            </View>
          </CustomButton>

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
          <CustomButton onPress={() => onPressTotalList()} hitSlop={7}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Point1000, fontSize: 13, fontWeight: '500' }}>
                {`리뷰 ${item?.reviewCnt || 0}개 보기`}
              </CustomText>
            </View>
          </CustomButton>

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
          {item?.eventArr.map((text: string, index: number) => {
            return (
              <View key={index.toString()} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
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
