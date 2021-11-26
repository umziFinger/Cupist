import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FlatList, View } from 'react-native';
import CommonActions from '@/Stores/Common/Actions';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import { AuthState } from '@/Stores/Auth/InitialState';
import { REVIEW_DATA_ME_MORE, REVIEW_DATA_OTHER_MORE, ReviewMoreItemProp } from '@/Components/RBS/Place/data';
import { navigate } from '@/Services/NavigationService';
import { PlaceState } from '@/Stores/Place/InitialState';

const PlaceReviewMoreRBS = () => {
  const dispatch = useDispatch();
  const RBSheetRef = useRef<any>();
  const { heightInfo, isOpenPlaceReviewMoreRBS } = useSelector((state: CommonState) => state.common);
  const { userIdx } = useSelector((state: AuthState) => state.auth);
  const { clickedReviewItem } = useSelector((state: PlaceState) => state.place);

  useEffect(() => {
    if (isOpenPlaceReviewMoreRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenPlaceReviewMoreRBS]);

  const onClick = (data: ReviewMoreItemProp): any => {
    console.log(data.selectKey);
    // const placeReviewIdx = item.idx;
    switch (data.selectKey) {
      case 'modify': {
        console.log('더보기', clickedReviewItem);
        navigate('ReviewModifyScreen', { reviewData: clickedReviewItem, type: clickedReviewItem?.screenType });
        break;
      }

      case 'remove': {
        const params = {
          reviewIdx: clickedReviewItem?.idx,
          placeIdx: clickedReviewItem?.placeIdx,
          type: clickedReviewItem?.screenType,
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
        navigate('ReportScreen', {
          mainIdx: clickedReviewItem?.placeIdx,
          subIdx: clickedReviewItem?.idx,
          reportType: 'placeReview',
        });
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
        dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenPlaceReviewMoreRBS', data: false }));
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
          data={clickedReviewItem?.User?.idx === userIdx ? REVIEW_DATA_ME_MORE : REVIEW_DATA_OTHER_MORE}
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
              marginBottom: 10,
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

export default PlaceReviewMoreRBS;
