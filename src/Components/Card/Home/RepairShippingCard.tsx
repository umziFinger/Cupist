import { Dimensions, FlatList, TouchableWithoutFeedback, View, ViewToken } from 'react-native';
import FastImage from 'react-native-fast-image';
import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import { ShippingIcon } from '@/Containers/Home/HomeScreen/data';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';
import { AuthState } from '@/Stores/Auth/InitialState';

interface RepairShippingCardProps {
  item: any;
  cnt?: number;
}
const { width } = Dimensions.get('window');

const RepairShippingCard = (props: RepairShippingCardProps) => {
  const { item, cnt } = props;
  const dispatch = useDispatch();
  const [viewableIndex, setViewableIndex] = useState<number | null>(0);
  const { userIdx } = useSelector((state: AuthState) => state.auth);

  const onRepairHistoryNavigate = (value: any) => {
    const idx = value.rstr_no.replace('rstr_', '');
    if (!userIdx) {
      dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSimpleLoginRBS', data: true }));
    } else if (value.state === 'SRSE') {
      navigate('RepairDetailScreen', { rstr_no: idx });
    } else {
      navigate('RepairHistoryDetailScreen', { rstr_no: idx });
    }
  };

  const onViewableItemsChanged = React.useRef(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      if (info.viewableItems) {
        const tempViewableIndex = info.viewableItems[0]?.key;

        let changeViewableIndex = 0;
        if (tempViewableIndex !== undefined) {
          changeViewableIndex = parseInt(tempViewableIndex);
        }
        setViewableIndex(changeViewableIndex);
      }
    },
  );
  return (
    <View style={{ borderRadius: 24, backgroundColor: Color.skin, marginHorizontal: 24, height: width - 48 }}>
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => onRepairHistoryNavigate(item[viewableIndex])}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 24,
                paddingTop: 24,
              }}
            >
              <CustomText style={{ fontSize: 13, fontWeight: '500', letterSpacing: -0.33, color: Color.Black1000 }}>
                내 명품 수선 현황
              </CustomText>
            </View>
            <View style={{ position: 'absolute', top: 24, right: 24 }}>
              <View
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  backgroundColor: Color.Primary1000,
                  borderRadius: 15,
                }}
              >
                <View style={{ justifyContent: 'center' }}>
                  <CustomText style={{ color: Color.White, fontSize: 12 }}>{`${viewableIndex + 1 || 0} / ${
                    item?.length || 0
                  }`}</CustomText>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 1 }}>
          <FlatList
            data={item}
            renderItem={({ item, index }) => {
              const code = item.state;
              const subCode = item.substate;
              let finalCode = code;
              if (subCode) {
                finalCode = `${code}_${subCode}`;
              }
              return (
                <TouchableWithoutFeedback onPress={() => onRepairHistoryNavigate(item)}>
                  <View style={{ paddingHorizontal: 24, width: width - 48 }}>
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <View
                          style={{
                            width: width - (48 + 48 + 46 + 16),
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <CustomText
                              style={{
                                fontSize: 21,
                                // lineHeight: 31,
                                fontWeight: 'bold',
                                letterSpacing: -0.53,
                                color: Color.Black1000,
                              }}
                              numberOfLines={2}
                            >
                              {`${item?.message || ''}`}
                            </CustomText>
                          </View>
                        </View>
                        <View style={{ width: 46, height: 59 }}>
                          <FastImage
                            style={{ width: '100%', height: '100%' }}
                            source={ShippingIcon(finalCode)}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      </View>

                      <View style={{ marginTop: 23 }}>
                        <Progress.Bar
                          progress={item?.status / 100 || 0.1}
                          width={width - 96}
                          height={8}
                          color={`${Color.Primary1000}`}
                          unfilledColor={`${Color.White}`}
                          borderWidth={0}
                        />
                      </View>

                      <View style={{ marginTop: 11 }}>
                        <CustomText
                          style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            letterSpacing: -0.33,
                            color: Color.Primary1000,
                          }}
                        >
                          {`${item?.dday || ''} / ${item?.endtime || ''}`}
                        </CustomText>
                      </View>
                    </View>

                    <View
                      style={{
                        zIndex: 99,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: width - 48,
                        height: 131,
                        borderBottomEndRadius: 24,
                        borderBottomStartRadius: 24,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{
                          width: '50%',
                          height: '100%',
                        }}
                      >
                        <FastImage
                          style={{
                            width: '100%',
                            height: '100%',
                            borderBottomLeftRadius: 24,
                          }}
                          source={{ uri: item?.thumbimg1 || '' }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                      <View
                        style={{
                          width: '50%',
                          height: '100%',
                        }}
                      >
                        <FastImage
                          style={{
                            width: '100%',
                            height: '100%',
                            borderBottomRightRadius: 24,
                          }}
                          source={{ uri: item?.thumbimg2 || '' }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
            pagingEnabled
            horizontal
            disableIntervalMomentum
            decelerationRate="fast"
            snapToInterval={width - 48}
            snapToAlignment={'start'}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={2}
            maxToRenderPerBatch={5}
            windowSize={7}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged?.current}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default RepairShippingCard;
