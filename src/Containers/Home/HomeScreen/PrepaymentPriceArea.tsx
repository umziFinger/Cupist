import React, { useEffect } from 'react';
import { FlatList, Platform, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import PlaceSmallCard from '@/Components/Card/Common/PlaceSmallCard';
import CustomButton from '@/Components/CustomButton';
import { HomeState } from '@/Stores/Home/InitialState';
import HomeActions from '@/Stores/Home/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigate } from '@/Services/NavigationService';

interface PropTypes {
  list: Array<any>;
}
const PrepaymentPriceArea = (props: PropTypes) => {
  const dispatch = useDispatch();
  const { list } = props;
  const { width, height } = useWindowDimensions();
  const { calendarDate, possiblePrepaymentDate } = useSelector((state: HomeState) => state.home);

  const onPressNextDay = () => {
    console.log('onPressNextDay');
    dispatch(HomeActions.fetchHomeReducer({ type: 'calendarDate', data: moment(possiblePrepaymentDate).toString() }));
  };

  const onPressViewAll = () => {
    console.log('onPressViewAll');
    navigate('PlaceListScreen', { type: 'early' });
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ marginRight: 4 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 20, fontWeight: 'bold', letterSpacing: -0.35 }}>
              선결제 특가
            </CustomText>
          </View>
          <View style={{ width: 5, height: 5, marginBottom: 5 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/icPeriod.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 6 }}>
          <View style={{ flex: 1 }}>
            <CustomText style={{ color: Color.Gray800, fontSize: 15, letterSpacing: -0.2 }}>
              선결제하고 할인받는 인기 볼링장
            </CustomText>
          </View>

          <CustomButton onPress={() => onPressViewAll()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', paddingTop: Platform.select({ ios: 0, android: 1 }) }}>
                <CustomText style={{ color: Color.Gray400, fontSize: 13, fontWeight: '500', letterSpacing: -0.2 }}>
                  모두보기
                </CustomText>
              </View>
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Arrow/icArrowRi.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </CustomButton>
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <FlatList
            data={list}
            renderItem={({ item, index }) => (
              <View style={{ marginRight: 11, marginBottom: index < 2 ? 13 : 0 }}>
                <PlaceSmallCard item={item} width={(width - 42 - 11) / 2} showRate showTicketName={false} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={4}
            maxToRenderPerBatch={7}
            windowSize={7}
            numColumns={2}
            ListEmptyComponent={
              <View style={{ paddingHorizontal: 20, marginTop: 80, marginBottom: 50, alignItems: 'center' }}>
                <View style={{ width: 60, height: 60 }}>
                  <FastImage
                    style={{ width: '100%', height: '100%' }}
                    source={require('@/Assets/Images/Home/emptyList.png')}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
                {possiblePrepaymentDate ? (
                  <View style={{ marginTop: 16, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <CustomText
                        style={{ color: Color.Black1000, fontSize: 16, fontWeight: 'bold', letterSpacing: -0.29 }}
                      >
                        다른 날짜
                      </CustomText>
                      <CustomText style={{ color: Color.Black1000, fontSize: 16, letterSpacing: -0.29 }}>에</CustomText>
                    </View>
                    <View>
                      <CustomText style={{ color: Color.Black1000, fontSize: 16, letterSpacing: -0.29 }}>
                        선결제 특가 볼링장이 있어요!
                      </CustomText>
                    </View>

                    <CustomButton onPress={() => onPressNextDay()}>
                      <View style={{ marginTop: 30 }}>
                        <View
                          style={{
                            borderRadius: 24,
                            borderWidth: 1.5,
                            borderColor: Color.Primary1000,
                            paddingVertical: 15,
                            paddingHorizontal: 24,
                          }}
                        >
                          <CustomText
                            style={{ color: Color.Primary1000, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}
                          >
                            {moment(calendarDate).add(1, 'day').format('MM월 D일').toString()}로 날짜변경하기
                          </CustomText>
                        </View>
                      </View>
                    </CustomButton>
                  </View>
                ) : (
                  <View style={{ marginTop: 16, alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText
                        style={{ color: Color.Gray400, fontSize: 14, fontWeight: '500', letterSpacing: -0.25 }}
                      >
                        해당날짜에 특가 상품이 없습니다.
                      </CustomText>
                    </View>
                  </View>
                )}
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default PrepaymentPriceArea;
