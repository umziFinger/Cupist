import React, { useEffect } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import HTML from 'react-native-render-html';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';
import { MyState } from '@/Stores/My/InitialState';
import MyActions from '@/Stores/My/Actions';

const NoticeDetailScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { myNoticeDetail } = useSelector((state: MyState) => state.my);

  useEffect(() => {
    return () => {
      dispatch(
        MyActions.fetchMyReducer({
          type: 'myNoticeDetail',
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
              <View style={{}}>
                <View style={{ paddingHorizontal: 24 }}>
                  <CustomText style={{ fontSize: 13, letterSpacing: -0.2, color: Color.Gray600 }}>
                    {myNoticeDetail?.regDateView || ''}
                  </CustomText>
                  <View style={{ marginTop: 8 }}>
                    <CustomText
                      style={{ fontSize: 16, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}
                    >
                      {myNoticeDetail?.title || ''}
                    </CustomText>
                  </View>
                  <View style={{ height: 1, backgroundColor: Color.Gray200, marginTop: 20, marginBottom: 10 }} />
                </View>

                {/* <HTMLView value={`${myNoticeDetail?.content || ''}`} /> */}
                <HTML
                  containerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: 24,
                  }}
                  contentWidth={width}
                  source={{
                    html: `${myNoticeDetail?.content || ''}`,
                  }}
                />
              </View>

              {myNoticeDetail?.NoticePhoto?.length > 0 && (
                <View style={{ marginTop: 24, backgroundColor: 'red' }}>
                  <FlatList
                    data={myNoticeDetail?.NoticePhoto}
                    renderItem={({ item }) => (
                      <View style={{ width, height: width, backgroundColor: 'green' }}>
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={{ uri: item.url }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                    )}
                    initialNumToRender={3}
                    maxToRenderPerBatch={5}
                    windowSize={7}
                  />
                </View>
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

export default NoticeDetailScreen;
