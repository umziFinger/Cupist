import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CustomText from '@/Components/CustomText';
import { HomeState } from '@/Stores/Home/InitialState';
import { DATA_TIME_FILTER } from '@/Containers/Home/HomeScreen/data';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import HomeActions from '@/Stores/Home/Actions';

const TimeFilterRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const { width, height } = useWindowDimensions();
  const { heightInfo, isOpenTimeFilterRBS } = useSelector((state: CommonState) => state.common);
  const { timeFilterIdx } = useSelector((state: HomeState) => state.home);
  const [tempFilterIdx, setTempFilterIdx] = useState<number>(timeFilterIdx);
  console.log('timeFilterIdx: ', timeFilterIdx);

  useEffect(() => {
    if (isOpenTimeFilterRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenTimeFilterRBS]);

  const onPressClose = () => {
    dispatch(HomeActions.fetchHomeReducer({ type: 'timeFilterIdx', data: tempFilterIdx }));
    RBSheetRef?.current.close();
  };

  const onPressFilter = (value: number) => {
    console.log('onPressFilter : ', value);
    setTempFilterIdx(value);
    // dispatch(HomeActions.fetchHomeReducer({ type: 'timeFilterIdx', data: value }));
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.5}
      openDuration={500}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => {
        dispatch(HomeActions.fetchHomeReducer({ type: 'timeFilterIdx', data: tempFilterIdx }));
        dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenTimeFilterRBS', data: false }));
      }}
    >
      <View style={{ flex: 1, height: height * 0.5, paddingBottom: heightInfo.statusHeight }}>
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <View style={{ paddingTop: 28, paddingBottom: 20 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3 }}>
              볼링장 이용시간
            </CustomText>
          </View>
          <FlatList
            data={DATA_TIME_FILTER}
            renderItem={({ item, index }) => (
              <CustomButton onPress={() => onPressFilter(index)}>
                <View
                  style={{
                    marginBottom: 12,
                    paddingVertical: tempFilterIdx === index ? 16 : 19,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: tempFilterIdx === index ? Color.Primary1000 : Color.Grayyellow200,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                    <View style={{ flex: 1 }}>
                      <CustomText
                        style={{ color: Color.Grayyellow1000, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.12 }}
                      >
                        {item.content}
                      </CustomText>
                    </View>
                    {tempFilterIdx === index && (
                      <View style={{ width: 24, height: 24 }}>
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={require('@/Assets/Images/Arrow/icCheck.png')}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </CustomButton>
            )}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={4}
            maxToRenderPerBatch={7}
            windowSize={7}
            showsVerticalScrollIndicator={false}
          />
          <CustomButton onPress={() => onPressClose()}>
            <View
              style={{
                alignItems: 'center',
                borderRadius: 3,
                paddingVertical: 15,
                marginTop: 32,
                backgroundColor: Color.Primary1000,
              }}
            >
              <CustomText style={{ color: Color.White, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.25 }}>
                닫기
              </CustomText>
            </View>
          </CustomButton>
        </View>
      </View>
    </RBSheet>
  );
};

export default TimeFilterRBS;
