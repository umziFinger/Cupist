import React, { useEffect, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Color, Opacity } from '@/Assets/Color';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import 'moment/locale/ko';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import HomeActions from '@/Stores/Home/Actions';
import { HomeState } from '@/Stores/Home/InitialState';
import { navigate } from '@/Services/NavigationService';

interface HomeProps {
  route: RouteProp<MainStackParamList, 'HomeScreen'>;
}

const HomeScreen = ({ route }: HomeProps) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { introductionList, introductionAdditionalList, introductionAdditionalPage, introductionCustomList } =
    useSelector((state: HomeState) => state.home);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    dispatch(HomeActions.fetchIntroductionList());
    dispatch(HomeActions.fetchIntroductionAdditionalList());
  }, []);

  const onMore = () => {
    dispatch(HomeActions.fetchIntroductionAdditionalMoreList({ page: introductionAdditionalPage }));
  };

  const onRefresh = () => {
    dispatch(HomeActions.fetchIntroductionList());
    dispatch(HomeActions.fetchIntroductionAdditionalList());
  };

  const onPressDeleteIntroduction = (item: any) => {
    const index = introductionList?.findIndex((v: any) => v.id === item?.id);
    dispatch(HomeActions.fetchHomeReducer({ type: 'deleteIntroductionList', data: index }));
  };
  const onPressDeleteIntroductionCustom = (item: any) => {
    const index = introductionCustomList?.findIndex((v: any) => v.id === item?.id);
    dispatch(HomeActions.fetchHomeReducer({ type: 'deleteIntroductionCustomList', data: index }));
  };

  const onPressDeleteIntroductionAdditional = (item: any) => {
    const index = introductionAdditionalList?.findIndex((v: any) => v.id === item?.id);
    dispatch(HomeActions.fetchHomeReducer({ type: 'deleteIntroductionAdditionalList', data: index }));
  };

  const onPressCustom = () => {
    dispatch(HomeActions.fetchIntroductionCustomList());
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 8,
          paddingLeft: 8,
          paddingRight: 12,
          paddingVertical: 12,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <CustomButton
            onPress={() => setCurrentTab(0)}
            style={{ height: 44, borderBottomWidth: currentTab === 0 ? 2 : 0, justifyContent: 'center' }}
          >
            <View style={{ height: 26, width: 63 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Cupist/Main/logo.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </CustomButton>
          <CustomButton
            onPress={() => setCurrentTab(1)}
            style={{
              marginLeft: 20,
              height: 44,
              borderBottomWidth: currentTab === 1 ? 2 : 0,
              justifyContent: 'center',
            }}
          >
            <CustomText style={{ fontSize: 20, fontWeight: '600', color: currentTab === 1 ? 'black' : Color.Gray2 }}>
              근처
            </CustomText>
          </CustomButton>
          <CustomButton
            onPress={() => setCurrentTab(2)}
            style={{
              marginLeft: 20,
              height: 44,
              borderBottomWidth: currentTab === 2 ? 2 : 0,
              justifyContent: 'center',
            }}
          >
            <CustomText style={{ fontSize: 20, fontWeight: '600', color: currentTab === 2 ? 'black' : Color.Gray2 }}>
              라이브
            </CustomText>
          </CustomButton>
        </View>
        <CustomButton onPress={() => navigate('ProfileScreen')}>
          <View style={{ height: 28, width: 28 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Cupist/Main/setting.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </CustomButton>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 4 }}>
        <FlatList
          data={[0]}
          renderItem={({ item, index }) => (
            <View>
              {/* ================== 맞춤추천 목록 ================== */}
              {introductionCustomList?.length > 0 && (
                <FlatList
                  data={introductionCustomList || []}
                  renderItem={({ item: item1, index: index1 }) => (
                    <>
                      {/* ================== 이미지 영역 ================== */}
                      <View
                        style={{
                          width: width - 8,
                          height: (width - 8) * 1.4,
                          borderRadius: 6,
                          marginBottom: 12,
                        }}
                      >
                        <FastImage
                          style={{ width: '100%', height: '100%', borderRadius: 6 }}
                          source={{ uri: `https://test.dev.cupist.de${item1?.pictures[0]}` || '' }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                      {/* ================== 카드 데이터 영역 ================== */}
                      <LinearGradient
                        start={{ x: 0, y: 0.6 }}
                        end={{ x: 0, y: 0.85 }}
                        colors={['transparent', '#333333']}
                        style={{
                          backgroundColor: 'transparent',
                          // paddingVertical: 12,
                          paddingHorizontal: 13,
                          position: 'absolute',
                          width: width - 8,
                          borderRadius: 6,
                          height: (width - 8) * 1.4,
                        }}
                      >
                        <View style={{ position: 'absolute', bottom: 0, width: width - 8, padding: 12 }}>
                          <View style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center' }}>
                            <CustomText style={{ fontSize: 24, fontWeight: '600', color: 'white' }}>
                              {item1?.name}, {item1?.age}
                            </CustomText>
                            <CustomButton style={{ height: 16, width: 17, marginLeft: 3 }}>
                              <FastImage
                                style={{ width: '100%', height: '100%' }}
                                source={require('@/Assets/Images/Cupist/Main/info.png')}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </CustomButton>
                          </View>
                          <View style={{ marginTop: 8 }}>
                            {item1?.introduction ? (
                              <View>
                                <CustomText style={{ fontSize: 16, color: 'white' }} numberOfLines={2}>
                                  {item1?.introduction}
                                </CustomText>
                              </View>
                            ) : (
                              <View>
                                <CustomText style={{ fontSize: 16, color: 'white' }}>
                                  {`${item1?.job} \u2022 ${item1?.distance / 1000}km`}
                                </CustomText>
                                <CustomText
                                  style={{ fontSize: 16, color: `${Color.White}${Opacity._60}`, marginTop: 6 }}
                                >
                                  {item1?.height}cm
                                </CustomText>
                              </View>
                            )}
                          </View>
                          {/* ================== 카드 하단 버튼 영역 ================== */}
                          <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <CustomButton
                              onPress={() => onPressDeleteIntroductionCustom(item)}
                              style={{
                                padding: 10,
                                backgroundColor: Color.Gray4,
                                width: 44,
                                height: 44,
                                borderRadius: 4,
                              }}
                            >
                              <View style={{ height: 24, width: 24 }}>
                                <FastImage
                                  style={{ width: '100%', height: '100%' }}
                                  source={require('@/Assets/Images/Cupist/Main/delete.png')}
                                  resizeMode={FastImage.resizeMode.cover}
                                />
                              </View>
                            </CustomButton>
                            <CustomButton
                              onPress={() => onPressDeleteIntroductionCustom(item)}
                              style={{
                                flex: 1,
                                marginLeft: 6,
                                backgroundColor: Color.GlamBlue,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4,
                              }}
                            >
                              <CustomText style={{ fontSize: 14, color: 'white', fontWeight: '600' }}>
                                좋아요
                              </CustomText>
                            </CustomButton>
                          </View>
                        </View>
                      </LinearGradient>
                    </>
                  )}
                  keyExtractor={(item1, index1) => index1.toString()}
                  initialNumToRender={2}
                  maxToRenderPerBatch={1}
                  windowSize={7}
                  showsVerticalScrollIndicator={false}
                />
              )}
              {/* ================== 오늘의 추천 목록 ================== */}
              <FlatList
                data={introductionList || []}
                renderItem={({ item: item2, index: index2 }) => (
                  <>
                    <View
                      style={{
                        width: width - 8,
                        height: (width - 8) * 1.4,
                        borderRadius: 6,
                        marginBottom: 12,
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%', borderRadius: 6 }}
                        source={{ uri: `https://test.dev.cupist.de${item2?.pictures[0]}` || '' }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <LinearGradient
                      start={{ x: 0, y: 0.6 }}
                      end={{ x: 0, y: 0.85 }}
                      colors={['transparent', '#333333']}
                      style={{
                        backgroundColor: 'transparent',
                        // paddingVertical: 12,
                        paddingHorizontal: 13,
                        position: 'absolute',
                        width: width - 8,
                        borderRadius: 6,
                        height: (width - 8) * 1.4,
                      }}
                    >
                      <View style={{ position: 'absolute', bottom: 0, width: width - 8, padding: 12 }}>
                        <View
                          style={{
                            width: 90,
                            backgroundColor: `${Color.White}${Opacity._25}`,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 4,
                          }}
                        >
                          <CustomText style={{ fontSize: 14, color: 'white' }}>오늘의 추천</CustomText>
                        </View>
                        <View style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center' }}>
                          <CustomText style={{ fontSize: 24, fontWeight: '600', color: 'white' }}>
                            {item2?.name}, {item2?.age}
                          </CustomText>
                          <CustomButton style={{ height: 16, width: 17, marginLeft: 3 }}>
                            <FastImage
                              style={{ width: '100%', height: '100%' }}
                              source={require('@/Assets/Images/Cupist/Main/info.png')}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </CustomButton>
                        </View>
                        <View style={{ marginTop: 8 }}>
                          {item2?.introduction ? (
                            <View>
                              <CustomText style={{ fontSize: 16, color: 'white' }} numberOfLines={2}>
                                {item2?.introduction}
                              </CustomText>
                            </View>
                          ) : (
                            <View>
                              <CustomText style={{ fontSize: 16, color: 'white' }}>
                                {`${item2?.job} \u2022 ${item2?.distance / 1000}km`}
                              </CustomText>
                              <CustomText style={{ fontSize: 16, color: `${Color.White}${Opacity._60}`, marginTop: 6 }}>
                                {item2?.height}cm
                              </CustomText>
                            </View>
                          )}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                          <CustomButton
                            onPress={() => onPressDeleteIntroduction(item)}
                            style={{
                              padding: 10,
                              backgroundColor: Color.Gray4,
                              width: 44,
                              height: 44,
                              borderRadius: 4,
                            }}
                          >
                            <View style={{ height: 24, width: 24 }}>
                              <FastImage
                                style={{ width: '100%', height: '100%' }}
                                source={require('@/Assets/Images/Cupist/Main/delete.png')}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </View>
                          </CustomButton>
                          <CustomButton
                            onPress={() => onPressDeleteIntroduction(item)}
                            style={{
                              flex: 1,
                              marginLeft: 6,
                              backgroundColor: Color.GlamBlue,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 4,
                            }}
                          >
                            <CustomText style={{ fontSize: 14, color: 'white', fontWeight: '600' }}>좋아요</CustomText>
                          </CustomButton>
                        </View>
                      </View>
                    </LinearGradient>
                  </>
                )}
                keyExtractor={(item2, index2) => index2.toString()}
                initialNumToRender={2}
                maxToRenderPerBatch={1}
                windowSize={7}
                showsVerticalScrollIndicator={false}
              />
              {/* ================== 맞춤추천 ================== */}
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingBottom: 16,
                  borderWidth: 1,
                  borderColor: Color.Gray1,
                  borderRadius: 10,
                }}
              >
                <CustomText style={{ marginTop: 24 }}>맞춤 추천</CustomText>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ height: 40, width: 40 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Cupist/Recommendations/today.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
                      <CustomText>글램 추천</CustomText>
                      <View style={{ height: 13, width: 30, marginLeft: 4 }}>
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={require('@/Assets/Images/Cupist/Recommendations/hot.png')}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                    </View>
                  </View>
                  <CustomButton
                    onPress={() => onPressCustom()}
                    style={{
                      width: 76,
                      height: 32,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.GlamBlue,
                      borderRadius: 4,
                    }}
                  >
                    <CustomText style={{ fontSize: 14, color: 'white' }}>선택</CustomText>
                  </CustomButton>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ height: 40, width: 40 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Cupist/Recommendations/dia.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
                      <CustomText>최상위 매력</CustomText>
                      <View style={{ height: 13, width: 30, marginLeft: 4 }}>
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={require('@/Assets/Images/Cupist/Recommendations/hot.png')}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                    </View>
                  </View>
                  <CustomButton
                    style={{
                      width: 76,
                      height: 32,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.GlamBlue,
                      borderRadius: 4,
                    }}
                  >
                    <CustomText style={{ fontSize: 14, color: 'white' }}>선택</CustomText>
                  </CustomButton>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ height: 40, width: 40 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Cupist/Recommendations/glamour.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
                      <CustomText>볼륨감 있는 체형</CustomText>
                      <View style={{ height: 13, width: 30, marginLeft: 4 }}>
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={require('@/Assets/Images/Cupist/Recommendations/hot.png')}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                    </View>
                  </View>
                  <CustomButton
                    style={{
                      width: 76,
                      height: 32,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.GlamBlue,
                      borderRadius: 4,
                    }}
                  >
                    <CustomText style={{ fontSize: 14, color: 'white' }}>선택</CustomText>
                  </CustomButton>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ height: 40, width: 40 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Cupist/Recommendations/withpet.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
                      <CustomText>반려 동물을 키우는</CustomText>
                      {/* <View style={{ height: 13, width: 30, marginLeft: 4 }}> */}
                      {/*  <FastImage */}
                      {/*    style={{ width: '100%', height: '100%' }} */}
                      {/*    source={require('@/Assets/Images/Cupist/Recommendations/hot.png')} */}
                      {/*    resizeMode={FastImage.resizeMode.cover} */}
                      {/*  /> */}
                      {/* </View> */}
                    </View>
                  </View>
                  <CustomButton
                    style={{
                      width: 76,
                      height: 32,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.GlamBlue,
                      borderRadius: 4,
                    }}
                  >
                    <CustomText style={{ fontSize: 14, color: 'white' }}>선택</CustomText>
                  </CustomButton>
                </View>
                <CustomButton
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 44,
                    backgroundColor: Color.Gray1,
                    marginTop: 16,
                    borderRadius: 4,
                  }}
                >
                  <CustomText style={{ fontSize: 14, fontWeight: '600' }}>24개 항목 모두 보기</CustomText>
                </CustomButton>
              </View>
              {/* ================== 추가추천 목록 ================== */}
              <FlatList
                data={introductionAdditionalList || []}
                renderItem={({ item: item3, index: index3 }) => (
                  <>
                    <View
                      style={{
                        width: width - 8,
                        height: (width - 8) * 1.4,
                        backgroundColor: 'red',
                        borderRadius: 6,
                        marginTop: 12,
                        marginBottom: 12,
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%', borderRadius: 6 }}
                        source={{ uri: `https://test.dev.cupist.de${item3?.pictures[0]}` || '' }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                    <LinearGradient
                      start={{ x: 0, y: 0.6 }}
                      end={{ x: 0, y: 0.85 }}
                      colors={['transparent', Color.DarkGray1]}
                      style={{
                        backgroundColor: 'transparent',
                        // paddingVertical: 12,
                        paddingHorizontal: 13,
                        position: 'absolute',
                        width: width - 8,
                        borderRadius: 6,
                        height: (width - 8) * 1.4,
                        bottom: 12,
                      }}
                    >
                      <View style={{ position: 'absolute', bottom: 0, width: width - 8, padding: 12 }}>
                        <View style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center' }}>
                          <CustomText style={{ fontSize: 24, fontWeight: '600', color: 'white' }}>
                            {item3?.name}, {item3?.age}
                          </CustomText>
                          <CustomButton style={{ height: 16, width: 17, marginLeft: 3 }}>
                            <FastImage
                              style={{ width: '100%', height: '100%' }}
                              source={require('@/Assets/Images/Cupist/Main/info.png')}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </CustomButton>
                        </View>
                        <View style={{ marginTop: 8 }}>
                          {item3?.introduction ? (
                            <View>
                              <CustomText style={{ fontSize: 16, color: 'white' }} numberOfLines={2}>
                                {item3?.introduction}
                              </CustomText>
                            </View>
                          ) : (
                            <View>
                              <CustomText style={{ fontSize: 16, color: 'white' }}>
                                {`${item3?.job} \u2022 ${item3?.distance / 1000}km`}
                              </CustomText>
                              <CustomText style={{ fontSize: 16, color: `${Color.White}${Opacity._60}`, marginTop: 6 }}>
                                {item3?.height}cm
                              </CustomText>
                            </View>
                          )}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                          <CustomButton
                            onPress={() => onPressDeleteIntroductionAdditional(item)}
                            style={{
                              padding: 10,
                              backgroundColor: Color.Gray4,
                              width: 44,
                              height: 44,
                              borderRadius: 4,
                            }}
                          >
                            <View style={{ height: 24, width: 24 }}>
                              <FastImage
                                style={{ width: '100%', height: '100%' }}
                                source={require('@/Assets/Images/Cupist/Main/delete.png')}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </View>
                          </CustomButton>
                          <CustomButton
                            onPress={() => onPressDeleteIntroductionAdditional(item)}
                            style={{
                              flex: 1,
                              marginLeft: 6,
                              backgroundColor: Color.GlamBlue,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 4,
                            }}
                          >
                            <CustomText style={{ fontSize: 14, color: 'white', fontWeight: '600' }}>좋아요</CustomText>
                          </CustomButton>
                        </View>
                      </View>
                    </LinearGradient>
                  </>
                )}
                keyExtractor={(item3, index3) => index3.toString()}
                initialNumToRender={2}
                maxToRenderPerBatch={1}
                windowSize={7}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={1}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          onEndReached={() => onMore()}
          onEndReachedThreshold={0.8}
          refreshing={false}
          onRefresh={() => onRefresh()}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
