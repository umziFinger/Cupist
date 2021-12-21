import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CustomText from '@/Components/CustomText';
import { MyState } from '@/Stores/My/InitialState';
import Star from '@/Components/Star';
import MyActions from '@/Stores/My/Actions';
import AttachFileAddView from '@/Components/Picture/AttachFileAddView';
import { CommonState } from '@/Stores/Common/InitialState';
import CallAttachFile from '@/Components/Picture/CallAttachFile';
import CommonActions from '@/Stores/Common/Actions';
import { KeyboardSpacerProvider } from '@/Components/Keyboard';
import CustomButton from '@/Components/CustomButton';
import { MainStackParamList } from '@/Navigators/MainNavigator';

interface PropTypes {
  route: RouteProp<MainStackParamList, 'ReviewModifyScreen'>;
}

const WriteReviewDetailScreen = ({ route }: PropTypes) => {
  const { type } = route?.params;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { attachFile, heightInfo } = useSelector((state: CommonState) => state.common);
  const { writeReviewInfo } = useSelector((state: MyState) => state.my);
  const [callAttachFile, setCallAttachFile] = useState(false);
  const [attachFileIdx, setAttachFileIdx] = useState(0);
  // console.log('==============', writeReviewInfo);
  useEffect(() => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileInit' }));
    dispatch(MyActions.fetchMyReducer({ type: 'writeQnaContent', data: '' }));

    return () => {
      dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileInit' }));
      dispatch(MyActions.fetchMyReducer({ type: 'writeQnaContent', data: '' }));
    };
  }, []);
  const onStarUpdate = (e: number) => {
    dispatch(
      MyActions.fetchMyReducer({
        type: 'setWriteReview',
        data: { key: 'star', value: e },
      }),
    );
  };

  const onChangeText = (content: string) => {
    if (writeReviewInfo?.content?.length <= 499) {
      dispatch(MyActions.fetchMyReducer({ type: 'setWriteReview', data: { key: 'content', value: content } }));
    }
  };

  const onWrite = () => {
    if (writeReviewInfo?.content?.length > 20 && writeReviewInfo?.content?.length <= 499) {
      const params = {
        paymentIdx: writeReviewInfo.paymentIdx,
        files: attachFile,
        content: writeReviewInfo.content,
        star: writeReviewInfo.star,
        screenType: type,
        placeIdx: writeReviewInfo.placeIdx,
      };
      dispatch(MyActions.fetchMyReviewWrite(params));
    } else {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'alertToast',
          data: {
            alertToast: true,
            alertToastPosition: 'top',
            alertToastMessage: '글자수 최소 20자 이상 작성해주세요.',
          },
        }),
      );
    }
  };

  return (
    <KeyboardSpacerProvider>
      <View style={{ flex: 1 }}>
        <Header type={'back'} />
        <View
          style={{ backgroundColor: Color.White, flex: 1, paddingTop: 16, alignItems: 'center', paddingHorizontal: 24 }}
        >
          <FlatList
            data={[0]}
            renderItem={({}) => (
              <View style={{ width: width - 48 }}>
                <View style={{ alignItems: 'center' }}>
                  <CustomText style={{ fontSize: 15, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Black1000 }}>
                    {writeReviewInfo?.placeName || ''}
                  </CustomText>
                </View>

                <View style={{ alignItems: 'center', marginTop: 8 }}>
                  <Star
                    default={writeReviewInfo?.star || 0}
                    opacity
                    count={5}
                    starSize={24}
                    spacing={0}
                    fullStar={require('@/Assets/Images/Common/icStarOnBig.png')}
                    emptyStar={require('@/Assets/Images/Common/icStarOffBig.png')}
                    update={(e: any) => onStarUpdate(e)}
                  />
                </View>

                <View
                  style={{
                    marginTop: 24,
                    justifyContent: 'flex-start',
                    borderRadius: 5,
                    backgroundColor: Color.Gray200,
                    paddingTop: 16,
                    paddingLeft: 17,
                    paddingRight: 15,
                    paddingBottom: 12,
                    height: 148,
                    width: width - 48,
                  }}
                >
                  <TextInput
                    style={{
                      color: Color.Black1000,
                      padding: 0,
                      fontSize: 14,
                      letterSpacing: -0.25,
                    }}
                    placeholderTextColor={Color.Gray400}
                    allowFontScaling={false}
                    placeholder={
                      '예약하신 볼링장의 후기(이용시설, 편의시설)를 20자 이상 남겨주시면 다른 회원분들에게도 도움이 됩니다.'
                    }
                    multiline
                    onChangeText={(value) => onChangeText(value)}
                    value={writeReviewInfo.content}
                    keyboardType={'default'}
                  />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <View style={{ flex: 1 }}>
                    <CustomText style={{ fontSize: 12, letterSpacing: -0.21, color: Color.Gray600 }}>
                      최소 20자 이상 작성해주세요.
                    </CustomText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <CustomText style={{ fontSize: 12, letterSpacing: -0.21, color: Color.Gray800 }}>
                      {writeReviewInfo?.content.length}
                    </CustomText>
                    <CustomText style={{ fontSize: 12, letterSpacing: -0.21, color: Color.Gray600 }}>/500</CustomText>
                  </View>
                </View>

                <View style={{ marginTop: 16 }}>
                  <AttachFileAddView
                    setCallAttachFile={setCallAttachFile}
                    attachFile={attachFile}
                    indexZeroMarginLeft={0}
                  />
                </View>
              </View>
            )}
            initialNumToRender={1}
            maxToRenderPerBatch={3}
            windowSize={7}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />

          <View>
            <CustomText
              style={{ fontSize: 10, letterSpacing: 0, color: Color.Gray400 }}
            >{`광고나 비방 등 부적절한 내용이 있을 경우,\n또는 볼링장과 무관한 내용이거나 부적절한 사진을 첨부할 경우 노출제한 처리와 차후 리뷰 작성에 제한이 생길 수 있습니다.`}</CustomText>
          </View>
          <CustomButton onPress={() => onWrite()} style={{ width: '100%' }}>
            <View
              style={{
                marginTop: 24,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 3,
                backgroundColor:
                  writeReviewInfo?.content?.length > 20 && writeReviewInfo?.content?.length <= 500
                    ? Color.Primary1000
                    : Color.Grayyellow200,
                paddingVertical: 15,
                marginBottom: heightInfo.statusHeight,
              }}
            >
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  letterSpacing: -0.25,
                  textAlign: 'center',
                  color: Color.White,
                }}
              >
                작성완료
              </CustomText>
            </View>
          </CustomButton>
        </View>
        <CallAttachFile
          setCallAttachFile={setCallAttachFile}
          isOpen={callAttachFile}
          setAttachFileIdx={setAttachFileIdx}
          attachFileIdx={attachFileIdx}
        />
      </View>
    </KeyboardSpacerProvider>
  );
};

export default WriteReviewDetailScreen;
