import React from 'react';
import { FlatList, Linking, Platform, useWindowDimensions, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import NaverMapView, { Marker } from 'react-native-nmap';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CommonActions from '@/Stores/Common/Actions';
import CustomButton from '@/Components/CustomButton';
import { renderFacilityIcon } from '@/Components/Function';
import Config from '@/Config';
import { InfoItemButtonType } from '@/Containers/My/ReservationDetailScreen/data';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  item: any;
}
const MapArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const { item } = props;
  const position = { latitude: parseFloat(item?.lat) || 37.553881, longitude: parseFloat(item?.lng) || 126.970488 };
  // console.log('========', item?.shoeCost);
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

  const renderDefaultInfo = (type: string) => {
    let title, value;
    if (type === 'laneCnt') {
      title = '레인수';
      value = item?.laneCnt;
    }
    if (type === 'laneType') {
      title = '레인타입';
      value = item?.laneType;
    }
    if (type === 'pinSetter') {
      title = '핀세터';
      const array = item?.pinSetter?.split(',');
      if (array?.length > 1) {
        value = array[0];
      } else {
        value = item?.pinSetter;
      }
    }
    if (type === 'laneDivision') {
      title = '시설타입';
      value = item?.laneDivision;
    }
    return (
      <CustomButton onPress={() => navigate('BasicInfoDetailScreen')}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View
            style={{
              width: (width - 40 - 15) / 4,
              maxHeight: (width - 40 - 15) / 4 - 13,
              paddingVertical: 15,
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Color.Grayyellow100,
            }}
          >
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Grayyellow1000, fontSize: 12, letterSpacing: -0.07 }}>
                {title}
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center', marginTop: 4 }}>
              <CustomText
                style={{ color: Color.Grayyellow1000, fontSize: 14, fontWeight: '500', letterSpacing: -0.08 }}
              >
                {value}
              </CustomText>
            </View>
          </View>
        </View>
      </CustomButton>
    );
  };

  const renderFacility = () => {
    const str = item?.facility || null;
    if (str) {
      const arr = item?.facility.split(',');
      // const tempArr = [...arr, ...item?.facility.split(',')];
      // console.log('tempArr : ');
      return (
        <FlatList
          data={arr}
          renderItem={({ item: icon, index }) => (
            <View key={index.toString()} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
              <View style={{ width: 60, height: 48 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={renderFacilityIcon(icon)}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ marginTop: 5 }}>
                <CustomText style={{ color: '#333', fontSize: 14 }}>{icon}</CustomText>
              </View>
            </View>
          )}
          keyExtractor={(itemKey, index) => index.toString()}
          initialNumToRender={5}
          maxToRenderPerBatch={8}
          windowSize={7}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      );
      /* return tempArr.map((text: string, index: number) => {
        return (
          <View key={index.toString()} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
            <View style={{ width: 60, height: 48 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={renderFacilityIcon(text)}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ marginTop: 5 }}>
              <CustomText style={{ color: '#333', fontSize: 14 }}>{text}</CustomText>
            </View>
          </View>
        );
      }); */
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.4 }}>
          기본정보
        </CustomText>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {renderDefaultInfo('laneCnt')}
        {renderDefaultInfo('laneType')}
        {renderDefaultInfo('pinSetter')}
        {renderDefaultInfo('laneDivision')}
      </View>
      <View
        style={{ height: width * 0.41, width: '100%', backgroundColor: Color.White, marginTop: 16, borderRadius: 5 }}
      >
        <NaverMapView
          style={{ width: '100%', height: '100%' }}
          center={{ ...position, zoom: 14 }}
          scaleBar={false}
          zoomControl={false}
          scrollGesturesEnabled={false}
        >
          <Marker coordinate={position} image={require('@/Assets/Images/Common/icMapPin.png')} width={28} height={28} />
        </NaverMapView>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
        <View style={{ flex: 0.3, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
            주소
          </CustomText>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: -0.2 }}>
            {item?.newAddress}
          </CustomText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <View style={{ flex: 0.3, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
            전화번호
          </CustomText>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: -0.2 }}>{item?.tel}</CustomText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <View style={{ flex: 0.3, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
            영업시간
          </CustomText>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: -0.2 }}>{item?.openHour}</CustomText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <View style={{ flex: 0.3, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
            이용요금
          </CustomText>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: -0.2 }}>{item?.charge}</CustomText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <View style={{ flex: 0.3, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
            대화료
          </CustomText>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, letterSpacing: -0.2 }}>{item?.shoeCost}</CustomText>
        </View>
      </View>
      <View
        style={{
          width: width - 40 - 9,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 16,
        }}
      >
        <CustomButton onPress={() => onPressButton('addressCopy')} style={{ flex: 1 }}>
          <View
            style={{
              marginRight: 9,
              alignItems: 'center',
              paddingVertical: 13,
              borderWidth: 1,
              borderRadius: 3,
              borderColor: Color.Primary1000,
            }}
          >
            <CustomText style={{ color: Color.Primary1000, fontSize: 14, letterSpacing: -0.25 }}>주소복사</CustomText>
          </View>
        </CustomButton>
        <CustomButton onPress={() => onPressButton('getDirections')} style={{ flex: 1 }}>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 13,
              borderRadius: 3,
              backgroundColor: Color.Primary1000,
            }}
          >
            <CustomText style={{ color: Color.White, fontSize: 14, letterSpacing: -0.25 }}>길찾기</CustomText>
          </View>
        </CustomButton>
      </View>
      {item?.facility ? (
        <View>
          <View style={{ height: 1, backgroundColor: Color.Gray200, marginTop: 24 }} />
          <View style={{ marginTop: 24, paddingLeft: 4 }}>
            <View style={{ justifyContent: 'center' }}>
              <CustomText style={{ color: Color.Black1000, fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2 }}>
                편의시설
              </CustomText>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>{renderFacility()}</View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default MapArea;
