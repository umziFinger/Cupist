import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonActions from '@/Stores/Common/Actions';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import { Color, Opacity } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import { onAppUpdate } from '@/Components/Function';

interface ConfirmDialogProps {
  item: {
    type?: string;
    dataType?: string;
    title?: string;
    text?: string;
  };
}
const { width, height } = Dimensions.get('window');

const ConfirmDialog = (props: ConfirmDialogProps) => {
  const dispatch = useDispatch();
  const { item } = props;
  const { dataType, title, text } = item;
  const { versionInfo, heightInfo, alertDialogParams } = useSelector((state: CommonState) => state.common);

  const onConfirm = () => {
    switch (dataType) {
      case 'errorRBS': {
        // RBS에서 발생한 에러인 경우 lastest RBS 재오픈
        dispatch(CommonActions.fetchCommonReducer({ type: 'openCurrentRBS' }));
        // dispatch(AuthActions.fetchAuthReducer({ type: 'joinInfoInit' }));
        break;
      }
      case 'goToStore': {
        onAppUpdate(versionInfo.minimumVersion);
        break;
      }
      default:
        dispatch(
          CommonActions.fetchCommonReducer({
            type: 'alertDialogInit',
          }),
        );
    }
    dispatch(CommonActions.fetchCommonReducer({ type: 'alertDialogInit' }));
  };

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        zIndex: 99,
        backgroundColor: `${Color.Black1000}${Opacity._70}`,
      }}
    >
      <FlatList
        data={[0]}
        ListHeaderComponent={() => (
          <View
            style={{
              backgroundColor: Color.White,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingHorizontal: 21.2,
            }}
          >
            <View style={{ alignItems: 'center', marginTop: 36, marginBottom: 8 }}>
              <CustomText
                style={{
                  color: Color.Black1000,
                  fontSize: 19,
                  letterSpacing: -0.48,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {title}
              </CustomText>
            </View>
          </View>
        )}
        renderItem={() =>
          text ? (
            <View
              style={{
                backgroundColor: Color.White,
                paddingBottom: 24,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CustomText
                style={{
                  fontSize: 15,
                  letterSpacing: -0.38,
                  textAlign: 'center',
                  color: Color.Black1000,
                }}
              >
                {text}
              </CustomText>

              {/* <View style={{ paddingLeft: 5 }}></View> */}
            </View>
          ) : (
            <View style={{ paddingBottom: 24, backgroundColor: Color.White }} />
          )
        }
        ListFooterComponent={() => (
          <CustomButton onPress={() => onConfirm()}>
            <View
              style={{
                backgroundColor: Color.Primary1000,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                paddingVertical: 21.5,
              }}
            >
              <CustomText
                style={{
                  color: Color.White,
                  letterSpacing: -0.43,
                  fontSize: 17,
                  textAlign: 'center',
                }}
              >
                확인
              </CustomText>
            </View>
          </CustomButton>
        )}
        keyExtractor={(keyItem, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{
          marginTop: heightInfo.statusHeight + height / 3,
          width: width - 48,
        }}
      />
    </View>
  );
};

export default ConfirmDialog;
