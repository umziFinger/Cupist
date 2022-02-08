import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { CommonState } from '@/Stores/Common/InitialState';
import { PlaceState } from '@/Stores/Place/InitialState';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import PlaceActions from '@/Stores/Place/Actions';
import PlaceLargeCard from '@/Components/Card/Common/PlaceLargeCard';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import { navigate, navigateGoBack } from '@/Services/NavigationService';

const BasicInfoDetailScreen = () => {
  const dispatch = useDispatch();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { placeDetail } = useSelector((state: PlaceState) => state.place);
  const place = placeDetail?.place || {};
  console.log(place);
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'close'} />

      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 41 }}>
        <FlatList
          // data={[]}
          data={[0]}
          renderItem={({ item }) => (
            <>
              <View>
                <CustomText
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    letterSpacing: -0.2,
                    color: Color.Black1000,
                  }}
                >
                  {place?.name || ''} 기본정보
                </CustomText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 36 }}>
                <View style={{ flex: 1 }}>
                  <CustomText
                    style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                  >
                    레인수
                  </CustomText>
                </View>
                <View>
                  <CustomText
                    style={{
                      fontSize: 13,
                      letterSpacing: 0,
                      color: Color.Black1000,
                    }}
                  >
                    {place?.laneCnt || ''}
                  </CustomText>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <View style={{ flex: 1 }}>
                  <CustomText
                    style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                  >
                    레인타입
                  </CustomText>
                </View>
                <View>
                  <CustomText
                    style={{
                      fontSize: 13,
                      letterSpacing: 0,
                      color: Color.Black1000,
                    }}
                  >
                    {place?.laneType || ''}
                  </CustomText>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <View style={{ flex: 1 }}>
                  <CustomText
                    style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                  >
                    핀세터
                  </CustomText>
                </View>
                <View>
                  <CustomText
                    style={{
                      fontSize: 13,
                      letterSpacing: 0,
                      color: Color.Black1000,
                    }}
                  >
                    {place?.pinSetter || ''}
                  </CustomText>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <View style={{ flex: 1 }}>
                  <CustomText
                    style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Grayyellow500 }}
                  >
                    시설타입
                  </CustomText>
                </View>
                <View>
                  <CustomText
                    style={{
                      fontSize: 13,
                      letterSpacing: 0,
                      color: Color.Black1000,
                    }}
                  >
                    {place?.laneDivision || ''}
                  </CustomText>
                </View>
              </View>
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={4}
          maxToRenderPerBatch={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          // ListFooterComponent={<View style={{ }} />}
          scrollEnabled
        />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: heightInfo.statusHeight,
          // backgroundColor: 'red',
          paddingHorizontal: 20,
        }}
      >
        <CustomButton style={{ width: '100%' }} onPress={() => navigateGoBack()}>
          <View
            style={{
              borderRadius: 3,
              backgroundColor: Color.White,
              borderWidth: 1,
              borderColor: Color.Gray300,
              paddingVertical: 15,
              alignItems: 'center',
            }}
          >
            <CustomText style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25, color: Color.Gray400 }}>
              확인
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
};

export default BasicInfoDetailScreen;
