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
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';
import CustomButton from '@/Components/CustomButton';

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

  const onTotalImage = (photoIdx: number, value: number) => {
    console.log('totalImage : ', photoIdx, value);
    const idx = myQnaDetail?.QnaPhoto.findIndex((photo: any) => photo.idx === photoIdx);
    if (idx > -1) {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'totalImage',
          data: {
            totalImageType: 'review',
            totalImageList: myQnaDetail?.QnaPhoto || [],
          },
        }),
      );
      navigate('TotalImageScreen', { startIdx: value });
    }
  };

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
                  {myQnaDetail?.createAt || ''}
                </CustomText>
                <View style={{ marginTop: 8 }}>
                  <CustomText style={{ fontSize: 16, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}>
                    {myQnaDetail?.type || ''}
                  </CustomText>
                </View>
                <View style={{ height: 1, backgroundColor: Color.Gray200, marginVertical: 20 }} />
                <View>
                  <CustomText style={{ fontSize: 14, letterSpacing: -0.25, color: Color.Black1000 }}>
                    {myQnaDetail?.content || ''}
                  </CustomText>
                </View>
              </View>

              {myQnaDetail?.QnaPhoto?.length > 0 && (
                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
                  <FlatList
                    data={myQnaDetail?.QnaPhoto}
                    // data={[0, 1, 2, 3, 4]}
                    renderItem={({ item, index }) => (
                      <CustomButton onPress={() => onTotalImage(item.idx, index)}>
                        <View
                          style={{
                            width: (width - 48 - 32) / 5,
                            height: 70,
                            backgroundColor: Color.Grayyellow200,
                            marginRight: 8,
                            borderRadius: 3,
                          }}
                        >
                          <FastImage
                            style={{ width: '100%', height: '100%', borderRadius: 3 }}
                            source={{ uri: item.url }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      </CustomButton>
                    )}
                    initialNumToRender={5}
                    maxToRenderPerBatch={7}
                    keyExtractor={(keyItem, keyIndex) => keyIndex.toString()}
                    windowSize={7}
                    numColumns={5}
                  />
                </View>
              )}

              {myQnaDetail?.answerYN === 'Y' && (
                <>
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
                          답변완료
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
                          {myQnaDetail?.answerDate || ''}
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
                        {myQnaDetail?.answer || ''}
                      </CustomText>
                    </View>
                  </View>
                </>
              )}
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
