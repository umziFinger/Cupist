import React, { useEffect } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color, Opacity } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import { MyState } from '@/Stores/My/InitialState';
import MyActions from '@/Stores/My/Actions';

const QnaDetailScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { myQnaDetail } = useSelector((state: MyState) => state.my);

  useEffect(() => {
    return () => {
      dispatch(
        MyActions.fetchMyReducer({
          type: 'myQnaDetail',
          data: null,
        }),
      );
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type="back" />
      <View style={{ flex: 1, backgroundColor: Color.White }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ marginTop: 16 }}>
              <View style={{ paddingHorizontal: 24 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                  {/* {myQnaDetail?.regDateView || ''} */}
                  21.09.13 12:11
                </CustomText>
                <View style={{ marginTop: 8 }}>
                  <CustomText style={{ fontSize: 16, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}>
                    {/* {myQnaDetail?.title || ''} */}앱 사용 문의
                  </CustomText>
                </View>
                <View style={{ height: 1, backgroundColor: Color.Gray200, marginVertical: 20 }} />
                <View>
                  <CustomText style={{ fontSize: 14, letterSpacing: -0.25, color: Color.Black1000 }}>
                    {/* {myQnaDetail?.content || ''} */}
                    문의에용, 나문희에용.
                  </CustomText>
                </View>
              </View>

              {/* {myQnaDetail?.NoticePhoto?.length > 0 && ( */}
              <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
                <FlatList
                  // data={myQnaDetail?.NoticePhoto}
                  data={[0, 1, 2, 3, 4]}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        width: (width - 48 - 32) / 5,
                        height: 70,
                        backgroundColor: 'green',
                        marginRight: 8,
                        borderRadius: 3,
                      }}
                    >
                      {/* <FastImage */}
                      {/*  style={{ width: '100%', height: '100%' ,borderRadius:3 }} */}
                      {/*  source={{ uri: item.url }} */}
                      {/*  resizeMode={FastImage.resizeMode.stretch} */}
                      {/* /> */}
                    </View>
                  )}
                  initialNumToRender={5}
                  maxToRenderPerBatch={7}
                  keyExtractor={(keyItem, keyIndex) => keyIndex.toString()}
                  windowSize={7}
                  numColumns={5}
                />
              </View>
              {/* )} */}

              <View style={{ height: 8, backgroundColor: Color.Gray200, marginVertical: 30 }} />

              <View style={{ paddingHorizontal: 24 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      marginRight: 6,
                      borderRadius: 2,
                      backgroundColor: `${Color.Gray600}${Opacity._10}`,
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                    }}
                  >
                    <CustomText style={{ fontSize: 11, letterSpacing: -0.2, color: Color.Gray600 }}>
                      {/* {item?.type || ''} */}답변완료
                    </CustomText>
                  </View>
                  <View>
                    <CustomText
                      style={{
                        fontSize: 11,
                        letterSpacing: -0.2,
                        color: Color.Gray600,
                      }}
                    >
                      {/* {item?.regDate || ''} */}21.09.13 12:11
                    </CustomText>
                  </View>
                </View>

                <View style={{ marginTop: 14 }}>
                  <CustomText
                    style={{
                      fontSize: 14,
                      letterSpacing: -0.25,
                      color: Color.Black1000,
                    }}
                  >
                    안녕하세요 :) 볼링할땐 날 찾아와, 볼리미입니다! 나문희님이 저희 볼리미를 찾아주셔서 얼마나 감사한지
                    모릅니다. 더욱 더 편하게 이용할 수 있는 볼리미가 되겠습니다. 감사합니다 :)
                  </CustomText>
                </View>
              </View>
            </View>
          )}
          scrollEnabled
          initialNumToRender={1}
          maxToRenderPerBatch={3}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ marginBottom: heightInfo.fixBottomHeight }} />}
        />
      </View>
    </View>
  );
};

export default QnaDetailScreen;
