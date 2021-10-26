import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from '@/Components/CustomText';
import CommonActions from '@/Stores/Common/Actions';
import { OnAlbum, OnCamera } from '@/Components/Picture';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';

const RBSheetAttachFile = (props: any) => {
  const { isOpen, setCallAttachFile, attachFileIdx, setAttachFileIdx } = props;
  // console.log('attatchidxxxx', attachFileIdx);
  const { heightInfo, attachFile } = useSelector((state: CommonState) => state.common);
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();

  useEffect(() => {
    if (isOpen) RBSheetRef.current.open();
  }, [isOpen]);

  const onPicture = async (type: string) => {
    const newAttach = type === 'album' ? await OnAlbum(attachFileIdx) : await OnCamera(attachFileIdx);
    if (newAttach) {
      let attachCnt = 0;
      if (attachFile?.length > 0) {
        attachCnt = attachFile.length;
      }
      const maxCntCheck = attachCnt + newAttach.length;
      if (maxCntCheck > 10) {
        setCallAttachFile(false);
        RBSheetRef.current.close();
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertDialog',
            data: {
              alertDialog: true,
              alertDialogType: 'confirm',
              alertDialogDataType: 'maxAttachFileCheck',
              alertDialogTitle: '사진 첨부는 최대 10장까지 가능합니다',
            },
          }),
        );
      } else {
        dispatch(CommonActions.fetchCommonReducer({ type: 'attachFile', data: newAttach }));
        if (newAttach && newAttach.length > 0) {
          setAttachFileIdx(attachFileIdx + newAttach.length);
        } else {
          setAttachFileIdx(attachFileIdx + 1);
        }
        setCallAttachFile(false);
        RBSheetRef.current.close();
      }
    }
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={250}
      openDuration={500}
      closeDuration={100}
      customStyles={{
        container: {
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          paddingBottom: heightInfo.fixBottomHeight,
        },
      }}
      onClose={() => setCallAttachFile(false)}
    >
      <View style={{ flex: 1, backgroundColor: Color.White, padding: 20 }}>
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ color: Color.Gray800, fontSize: 13, fontWeight: 'bold' }}>사진 첨부</CustomText>
        </View>
        <CustomButton onPress={() => onPicture('camera')}>
          <View style={{ flexDirection: 'row', paddingVertical: 18, marginTop: 16 }}>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <CustomText
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.2,
                }}
              >
                카메라
              </CustomText>
            </View>
          </View>
        </CustomButton>
        <CustomButton onPress={() => onPicture('album')}>
          <View style={{ flexDirection: 'row', paddingVertical: 18 }}>
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <CustomText
                style={{
                  color: Color.Black1000,
                  fontSize: 15,
                  letterSpacing: -0.2,
                }}
              >
                앨범에서 선택하기
              </CustomText>
            </View>
          </View>
        </CustomButton>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <CustomButton onPress={() => RBSheetRef.current.close()}>
            <View
              style={{
                paddingVertical: 13,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: Color.Gray800,
                borderRadius: 5,
              }}
            >
              <CustomText style={{ color: Color.Gray800, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.2 }}>
                닫기
              </CustomText>
            </View>
          </CustomButton>
        </View>
      </View>
    </RBSheet>
  );
};

export default RBSheetAttachFile;
