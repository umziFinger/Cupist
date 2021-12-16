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
      <View style={{ flex: 1 }}>
        <FlatList
          data={[0]}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={{ width: '100%', height: 240 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={
                  myEventDetail?.bannerFile
                    ? { uri: myEventDetail?.bannerFile || '' }
                    : require('@/Assets/Images/Common/icNoImage.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          }
          renderItem={() => (
            <View style={{ flex: 1, paddingHorizontal: 24, marginTop: 40 }}>
              <View style={{ justifyContent: 'center' }}>
                <CustomText style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3 }}>
                  {myEventDetail?.title || ''}
                </CustomText>
              </View>
              <View style={{ justifyContent: 'center', marginTop: 12 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.15 }}>{myEventDetail?.content || ''}</CustomText>
              </View>
              {/* <View style={{ width: width - 48, height, backgroundColor: Color.Grayyellow100 }}> */}
              {/*  <FastImage */}
              {/*    style={{ width: '100%', height: '100%' }} */}
              {/*    source={{ uri: myEventDetail?.mainFile }} */}
              {/*    resizeMode={FastImage.resizeMode.stretch} */}
              {/*  /> */}
              {/* </View> */}
            </View>
          )}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: heightInfo.subBottomHeight }} />}
        />
      </View>
    </View>
  );
};

export default EventDetailScreen;
