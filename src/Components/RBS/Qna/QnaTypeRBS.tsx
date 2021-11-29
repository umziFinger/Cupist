import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, useWindowDimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { QNA_TYPE } from '@/Containers/More/QnaWriteScreen/data';
import MyActions from '@/Stores/My/Actions';
import { MyState } from '@/Stores/My/InitialState';

const QnaTypeRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const { height } = useWindowDimensions();
  const { heightInfo, isOpenQnaTypeRBS } = useSelector((state: CommonState) => state.common);
  const { qnaType = { key: '앱 사용 문의', content: '앱 사용 문의' } } = useSelector((state: MyState) => state.my);

  useEffect(() => {
    if (isOpenQnaTypeRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenQnaTypeRBS]);

  const onPressClose = () => {
    RBSheetRef?.current.close();
  };

  const onPressFilter = (item: any) => {
    console.log('onPressFilter : ', item);
    dispatch(MyActions.fetchMyReducer({ type: 'qnaType', data: item }));
    RBSheetRef?.current.close();
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
        dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenQnaTypeRBS', data: false }));
      }}
    >
      <View style={{ flex: 1, height: height * 0.5, paddingBottom: heightInfo.statusHeight }}>
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <View style={{ paddingTop: 35, paddingBottom: 12 }}>
            <CustomText style={{ color: Color.Black1000, fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3 }}>
              문의유형
            </CustomText>
          </View>
          <FlatList
            data={QNA_TYPE}
            renderItem={({ item, index }) => (
              <CustomButton onPress={() => onPressFilter(item)}>
                <View
                  style={{
                    paddingVertical: 16,
                    borderBottomWidth: QNA_TYPE?.length - 1 === index ? 0 : 1,
                    borderBottomColor: Color.Gray200,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <CustomText
                        style={{ color: Color.Grayyellow1000, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.12 }}
                      >
                        {item.content}
                      </CustomText>
                    </View>

                    <View style={{ width: 24, height: 24 }}>
                      {qnaType?.key === item.key && (
                        <FastImage
                          style={{ width: '100%', height: '100%' }}
                          source={require('@/Assets/Images/Arrow/icCheck.png')}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      )}
                    </View>
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
                marginTop: 12,
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

export default QnaTypeRBS;
