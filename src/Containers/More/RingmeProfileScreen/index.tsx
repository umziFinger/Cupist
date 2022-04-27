import React, { useEffect, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import CustomText from '@/Components/CustomText';
import Header from '@/Components/Header';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomButton from '@/Components/CustomButton';
import { MainStackParamList } from '@/Navigators/MainNavigator';
import CommonActions from '@/Stores/Common/Actions';
import MyActions from '@/Stores/My/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';
import { MyState } from '@/Stores/My/InitialState';

const RingmeProfileScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { userInfo } = useSelector((state: AuthState) => state.auth);
  const { ringmeList } = useSelector((state: MyState) => state.my);
  const [selectedCode, setSelectedCode] = useState<string>(userInfo?.ringme || '');

  useEffect(() => {
    dispatch(CommonActions.fetchCommonCode({ code: 'ringme' }));
  }, []);

  const onPressImage = (item: any) => {
    setSelectedCode(item.code);
  };

  const onPressSave = () => {
    dispatch(MyActions.fetchMyProfileRingme({ code: selectedCode }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'close'} text={'링미로 선택하기'} />
      <View style={{ flex: 1, paddingHorizontal: 24, marginTop: 20 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={[0]}
            renderItem={() => (
              <FlatList
                data={ringmeList || []}
                renderItem={({ item, index }) => (
                  <CustomButton onPress={() => onPressImage(item)}>
                    <View
                      style={{
                        width: (width - 48 - 18) / 3,
                        marginTop: index > 2 ? 9 : 0,
                        marginRight: 9,
                        paddingHorizontal: 4,
                        paddingBottom: 19,
                        paddingTop: 4,
                        borderColor: selectedCode === item.code ? Color.Primary1000 : Color.Gray300,
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    >
                      <View style={{ alignItems: 'flex-end' }}>
                        <View style={{ width: 24, height: 24 }}>
                          {selectedCode === item.code && (
                            <FastImage
                              style={{ width: '100%', height: '100%' }}
                              source={require('@/Assets/Images/Button/icCheckCircleOn.png')}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          )}
                        </View>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <View style={{ width: 88, height: 70 }}>
                          <FastImage
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: item.value }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      </View>
                    </View>
                  </CustomButton>
                )}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={12}
                maxToRenderPerBatch={15}
                windowSize={7}
                numColumns={3}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={7}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
        <CustomButton onPress={() => onPressSave()}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 15,
              backgroundColor: Color.Primary1000,
              borderRadius: 3,
              marginBottom: heightInfo.statusHeight,
            }}
          >
            <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
              저장하기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
};

export default RingmeProfileScreen;
