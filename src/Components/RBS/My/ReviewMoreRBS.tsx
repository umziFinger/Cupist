import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, useWindowDimensions, View } from 'react-native';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { AuthState } from '@/Stores/Auth/InitialState';
import { REVIEW_DATA_ME_MORE, ReviewMoreItemProp } from '@/Components/RBS/My/data';
import { navigate } from '@/Services/NavigationService';
import MyActions from '@/Stores/My/Actions';
import { MyState } from '@/Stores/My/InitialState';

const MyReviewMoreRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const { width, height } = useWindowDimensions();
  const { heightInfo, isOpenMyReviewMoreRBS } = useSelector((state: CommonState) => state.common);
  const { clickedReviewItem } = useSelector((state: MyState) => state.my);

  useEffect(() => {
    if (isOpenMyReviewMoreRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenMyReviewMoreRBS]);

  const onClick = (data: ReviewMoreItemProp): any => {
    console.log(data.selectKey);
    // const placeReviewIdx = item.idx;
    switch (data.selectKey) {
      case 'modify':
        navigate('ReviewModifyScreen');
        break;

      case 'remove': {
        const params = {
          reviewIdx: clickedReviewItem?.PlaceReview?.idx,
        };
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertDialog',
            data: {
              alertDialog: true,
              alertDialogType: 'choice',
              alertDialogDataType: 'myReviewRemove',
              alertDialogMessage: '리뷰를 정말 삭제 하시겠습니까?',
              alertDialogParams: params,
            },
          }),
        );
        break;
      }

      case 'report':
        // navigate('ReportScreen', { mainIdx: placeIdx, subIdx: placeReviewIdx, reportType: 'placeReview' });
        break;

      default:
        break;
    }
  };

  return (
    <RBSheet
      ref={RBSheetRef}
      height={317}
      openDuration={500}
      closeDuration={200}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => {
        dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenMyReviewMoreRBS', data: false }));
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Color.White,
          paddingTop: 28,
          paddingHorizontal: 24,
          paddingBottom: heightInfo.fixBottomHeight,
        }}
      >
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ fontSize: 17, fontWeight: 'bold', letterSpacing: -0.3, color: Color.Black1000 }}>
            리뷰
          </CustomText>
        </View>
        <FlatList
          data={REVIEW_DATA_ME_MORE}
          renderItem={(x) => (
            <CustomButton onPress={() => [onClick(x.item), RBSheetRef.current.close()]}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 16,
                  marginTop: x.index === 0 ? 12 : 0,
                  borderBottomColor: Color.Gray200,
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ justifyContent: 'center', flex: 1 }}>
                  <CustomText
                    style={{
                      color: Color.Grayyellow1000,
                      fontSize: 14,
                      letterSpacing: -0.25,
                    }}
                  >
                    {x.item.title}
                  </CustomText>
                </View>
              </View>
            </CustomButton>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(keyItem, index) => `rbs${index.toString()}`}
          scrollEnabled={false}
          initialNumToRender={3}
          maxToRenderPerBatch={6}
          windowSize={7}
        />

        <CustomButton onPress={() => RBSheetRef.current.close()}>
          <View
            style={{
              paddingVertical: 15,
              backgroundColor: Color.Primary1000,
              borderRadius: 3,
              alignItems: 'center',
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

export default MyReviewMoreRBS;
