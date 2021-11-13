import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import AttachFileAddView from '@/Components/Picture/AttachFileAddView';
import { CommonState } from '@/Stores/Common/InitialState';
import CallAttachFile from '@/Components/Picture/CallAttachFile';
import MyActions from '@/Stores/My/Actions';
import CommonActions from '@/Stores/Common/Actions';
import { MyState } from '@/Stores/My/InitialState';

const PLACEHOLDER = `아래 내용을 입력해주시면 보다 빠른 답변에 도움이 됩니다.\n
볼링장명 :
예약일 :
예약시간 :
예약번호 :
예약자명 :
취소사유 :
문의내용 :
(문의 내용을 기재하시고 문제 화면을 첨부해주시면 빠른 확인이 가능합니다.)`;

const QnaWriteList = () => {
  const dispatch = useDispatch();

  const { attachFile } = useSelector((state: CommonState) => state.common);
  const { writeQnaContent, qnaType = { idx: 0, key: 'all', content: '앱 사용 문의' } } = useSelector(
    (state: MyState) => state.my,
  );

  const [callAttachFile, setCallAttachFile] = useState(false);
  const [attachFileIdx, setAttachFileIdx] = useState(0);
  useEffect(() => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileInit' }));
    dispatch(MyActions.fetchMyReducer({ type: 'writeQnaContent', data: '' }));

    return () => {
      dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileInit' }));
      dispatch(MyActions.fetchMyReducer({ type: 'writeQnaContent', data: '' }));
    };
  }, []);

  const onChangeText = (content: string) => {
    dispatch(MyActions.fetchMyReducer({ type: 'writeQnaContent', data: content }));

    if (!writeQnaContent || writeQnaContent?.length < 3) {
      dispatch(MyActions.fetchMyReducer({ type: 'writeQnaValid', data: false }));
    } else {
      dispatch(MyActions.fetchMyReducer({ type: 'writeQnaValid', data: true }));
    }
  };

  const onOpenRBS = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenQnaTypeRBS', data: true }));
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingTop: 30,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ marginBottom: 12 }}>
          <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow1000 }}>문의유형</CustomText>
        </View>

        <CustomButton onPress={() => onOpenRBS()}>
          <View
            style={{
              borderRadius: 3,
              backgroundColor: Color.White,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: Color.Gray300,
              paddingVertical: 13,
              paddingLeft: 12,
              paddingRight: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomText style={{ fontSize: 14, letterSpacing: -0.25, color: Color.Black1000 }}>
                {qnaType?.content}
              </CustomText>
            </View>

            <View style={{ width: 24, height: 24 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Arrow/icArrowDw.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </CustomButton>

        <View style={{ marginTop: 24 }}>
          <CustomText style={{ fontSize: 12, fontWeight: '500', color: Color.Grayyellow1000 }}>내용</CustomText>
        </View>

        <View
          style={{
            marginTop: 12,
            justifyContent: 'flex-start',
            borderRadius: 3,
            backgroundColor: Color.White,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: Color.Gray300,
            padding: 16,
            minHeight: 268,
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
            placeholder={PLACEHOLDER}
            multiline
            onChangeText={(value) => onChangeText(value)}
            value={writeQnaContent}
            keyboardType={'default'}
          />
        </View>

        <View
          style={{
            marginTop: 24,
          }}
        >
          <View style={{ marginBottom: 2 }}>
            <CustomText style={{ fontSize: 14, letterSpacing: -0.25, color: Color.Black1000 }}>사진</CustomText>
          </View>
        </View>
      </View>

      <View style={{ paddingLeft: 24 }}>
        <AttachFileAddView setCallAttachFile={setCallAttachFile} attachFile={attachFile} indexZeroMarginLeft={0} />
      </View>

      <CallAttachFile
        setCallAttachFile={setCallAttachFile}
        isOpen={callAttachFile}
        setAttachFileIdx={setAttachFileIdx}
        attachFileIdx={attachFileIdx}
      />
    </>
  );
};

export default QnaWriteList;
