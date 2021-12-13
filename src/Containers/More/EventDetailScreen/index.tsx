import React, { useEffect } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import { MyState } from '@/Stores/My/InitialState';
import MyActions from '@/Stores/My/Actions';
import CustomText from '@/Components/CustomText';

const EventDetailScreen = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { myEventDetail } = useSelector((state: MyState) => state.my);

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
      <Header type="back" text={myEventDetail?.title} />
      <View style={{ flex: 1, backgroundColor: Color.White }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{}}>
              <View style={{ width, height: 318, backgroundColor: Color.Grayyellow100 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: myEventDetail?.bannerFile }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </View>

              <View style={{ paddingHorizontal: 24, marginVertical: 40 }}>
                <CustomText>{myEventDetail?.title || ''}</CustomText>

                <View style={{ marginTop: 12 }}>
                  <CustomText>{myEventDetail?.content || ''}</CustomText>
                </View>
              </View>

              <View style={{ width, height, backgroundColor: Color.Grayyellow100 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: myEventDetail?.mainFile }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
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

export default EventDetailScreen;
