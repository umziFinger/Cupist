import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigate } from '@/Services/NavigationService';
import CustomText from '@/Components/CustomText';
import { HeaderProps } from '@/Components/Header/index';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { PlaceState } from '@/Stores/Place/InitialState';
import PlaceActions from '@/Stores/Place/Actions';

const SORT_TAG = [
  {
    index: 0,
    key: 'distance',
    value: '거리순',
  },
  {
    index: 1,
    key: 'reservation',
    value: '예약순',
  },
  {
    index: 2,
    key: 'dibs',
    value: '추천순',
  },
];

const MyAroundHeader = (props: HeaderProps) => {
  const { text, isScroll } = props;
  const dispatch = useDispatch();

  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { myAroundSort = { index: 0, key: 'distance', value: '거리순' } } = useSelector(
    (state: PlaceState) => state.place,
  );

  const onLocationSettingScreen = () => {
    navigate('LocationSettingScreen');
  };

  const onSelectSort = (item: any) => {
    dispatch(PlaceActions.fetchPlaceReducer({ type: 'myAroundSort', data: item }));
  };

  return (
    <>
      {!isScroll ? (
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: Platform.OS === 'android' ? 24 : statusHeight + 24,
            backgroundColor: Color.White,
          }}
        >
          <CustomButton onPress={() => onLocationSettingScreen()} hitSlop={20}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',

                paddingBottom: 16,
              }}
            >
              <View style={{ width: 20, height: 20 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/MyAround/icMpLocaion.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>

              <View
                style={{
                  marginLeft: 4,
                  marginRight: 2,
                  alignItems: 'center',
                }}
              >
                <CustomText
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    letterSpacing: -0.4,
                    color: Color.Black1000,
                  }}
                >
                  {text}
                </CustomText>
              </View>
              <View style={{ width: 24, height: 24 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Arrow/icArrowDwHeavy.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </CustomButton>
          <View style={{ paddingBottom: 25 }}>
            <FlatList
              data={SORT_TAG}
              renderItem={({ item }) => (
                <CustomButton onPress={() => onSelectSort(item)}>
                  <View style={{ flexDirection: 'row', marginRight: 8, alignItems: 'center' }}>
                    <View
                      style={{
                        borderRadius: 16.5,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderWidth: 1,
                        borderColor: myAroundSort?.key === item.key ? undefined : Color.Gray300,
                        backgroundColor: myAroundSort?.key === item.key ? Color.Grayyellow1000 : Color.White,
                      }}
                    >
                      <CustomText
                        style={{
                          color: myAroundSort?.key === item.key ? Color.White : Color.Grayyellow1000,
                          fontSize: 13,
                          fontWeight: myAroundSort?.key === item.key ? '500' : undefined,
                          letterSpacing: -0.2,
                        }}
                      >
                        {item.value}
                      </CustomText>
                    </View>
                  </View>
                </CustomButton>
              )}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={3}
              maxToRenderPerBatch={6}
              windowSize={7}
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: Platform.OS === 'android' ? 8 : statusHeight + 8,
            paddingBottom: 8,
            backgroundColor: Color.White,
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1 }}>
            <CustomButton onPress={() => onLocationSettingScreen()} hitSlop={20}>
              <View
                style={{
                  marginRight: 8,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderRadius: 3,
                  backgroundColor: Color.White,
                  borderStyle: 'solid',
                  borderWidth: 1,
                  borderColor: Color.Gray300,
                  paddingVertical: 8,
                  paddingRight: 8,
                  paddingLeft: 16,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View style={{ width: 16, height: 16 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('@/Assets/Images/MyAround/icMpLocaionMini.png')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: 4,
                      alignItems: 'center',
                    }}
                  >
                    <CustomText
                      style={{
                        fontSize: 14,
                        letterSpacing: -0.25,
                        color: Color.Black1000,
                      }}
                    >
                      {text}
                    </CustomText>
                  </View>
                </View>

                <View style={{ width: 24, height: 24 }}>
                  <FastImage
                    style={{ width: '100%', height: '100%' }}
                    source={require('@/Assets/Images/Arrow/icArrowDwHeavy.png')}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
              </View>
            </CustomButton>
          </View>

          <SelectDropdown
            data={SORT_TAG}
            onSelect={(selectedItem) => {
              onSelectSort(selectedItem);
            }}
            buttonStyle={{
              flexDirection: 'row',
              borderRadius: 3,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: Color.Gray300,
              paddingHorizontal: 0,
              paddingVertical: 0,
              height: 'auto',
              width: 86,
            }}
            renderCustomizedButtonChild={() => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                    paddingLeft: 16,
                    backgroundColor: Color.White,
                    paddingRight: 8,
                  }}
                >
                  <View>
                    <CustomText style={{ fontSize: 14, letterSpacing: -0.25, color: Color.Black1000 }}>
                      {myAroundSort.value}
                    </CustomText>
                  </View>

                  <View style={{ width: 24, height: 24 }}>
                    <FastImage
                      style={{ width: '100%', height: '100%' }}
                      source={require('@/Assets/Images/Arrow/icArrowDwHeavy.png')}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </View>
              );
            }}
            dropdownStyle={{
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              marginTop: -1,
              backgroundColor: Color.White,
            }}
            rowStyle={{ backgroundColor: Color.White, borderBottomColor: Color.Gray300 }}
            renderCustomizedRowChild={(item) => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Color.White }}>
                  <CustomText style={{ fontSize: 14, letterSpacing: -0.25, color: Color.Black1000 }}>
                    {item.value}
                  </CustomText>
                </View>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

export default MyAroundHeader;
