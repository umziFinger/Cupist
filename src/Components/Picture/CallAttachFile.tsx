import React, { useEffect, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from '@/Components/CustomText';
import CommonActions from '@/Stores/Common/Actions';
import { OnAlbum, OnCamera } from '@/Components/Picture';
import CustomButton from '@/Components/CustomButton';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import { navigate } from '@/Services/NavigationService';

const RBSheetAttachFile = (props: any) => {
  const { isOpen, setCallAttachFile, attachFileIdx, setAttachFileIdx } = props;
  // console.log('attatchidxxxx', attachFileIdx);
  const { heightInfo, attachFile } = useSelector((state: CommonState) => state.common);
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();

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
      if (maxCntCheck > 5) {
        setCallAttachFile(false);
        RBSheetRef.current.close();
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertDialog',
            data: {
              alertDialog: true,
              alertDialogType: 'confirm',
              alertDialogDataType: 'maxAttachFileCheck',
              alertDialogTitle: '사진 첨부는 최대 5장까지 가능합니다',
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

  const onRingmeImage = () => {
    RBSheetRef.current.close();
    navigate('RingmeProfileScreen');
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.39}
      openDuration={500}
      closeDuration={100}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          paddingBottom: heightInfo.fixBottomHeight,
          // flex: 1,
        },
      }}
      onClose={() => setCallAttachFile(false)}
    >
      <View style={{ flex: 1, backgroundColor: Color.White, paddingHorizontal: 24, paddingTop: 28 }}>
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: 'center' }}>
            <CustomText style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3, color: Color.Black1000 }}>
              사진
            </CustomText>
          </View>
          <CustomButton onPress={() => onPicture('camera')}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 16,
                marginTop: 12,
                borderBottomColor: Color.Gray200,
                borderBottomWidth: 1,
              }}
            >
              <View style={{ justifyContent: 'center', flex: 1 }}>
                <CustomText
                  style={{
                    fontSize: 14,
                    letterSpacing: -0.25,
                    color: Color.Grayyellow1000,
                  }}
                >
                  카메라
                </CustomText>
              </View>
            </View>
          </CustomButton>
          <CustomButton onPress={() => onPicture('album')}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 16,
                borderBottomColor: Color.Gray200,
                borderBottomWidth: 1,
              }}
            >
              <View style={{ justifyContent: 'center', flex: 1 }}>
                <CustomText
                  style={{
                    fontSize: 14,
                    letterSpacing: -0.25,
                    color: Color.Grayyellow1000,
                  }}
                >
                  앨범에서 선택하기
                </CustomText>
              </View>
            </View>
          </CustomButton>
          <CustomButton onPress={() => onRingmeImage()}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 16,
                borderBottomColor: Color.Gray200,
                borderBottomWidth: 1,
              }}
            >
              <View style={{ justifyContent: 'center', flex: 1 }}>
                <CustomText
                  style={{
                    fontSize: 14,
                    letterSpacing: -0.25,
                    color: Color.Grayyellow1000,
                  }}
                >
                  링미로 선택하기
                </CustomText>
              </View>
            </View>
          </CustomButton>
        </View>

        <CustomButton onPress={() => RBSheetRef.current.close()}>
          <View
            style={{
              paddingVertical: 15,
              borderRadius: 3,
              alignItems: 'center',
              backgroundColor: Color.Primary1000,
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
              닫기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </RBSheet>
  );
};

export default RBSheetAttachFile;
