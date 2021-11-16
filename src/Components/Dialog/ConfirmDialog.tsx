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
  const { versionInfo, heightInfo } = useSelector((state: CommonState) => state.common);

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
        renderItem={() => {
          return (
            <>
              {title && (
                <View
                  style={{
                    backgroundColor: Color.White,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                  }}
                >
                  <View style={{ alignItems: 'center' }}>
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
              {text ? (
                <View
                  style={{
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundColor: Color.White,
                    paddingTop: 57,
                    paddingBottom: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CustomText
                    style={{
                      fontSize: 13,
                      letterSpacing: -0.2,
                      textAlign: 'center',
                      color: Color.Gray800,
                    }}
                  >
                    {text}
                  </CustomText>

                  {/* <View style={{ paddingLeft: 5 }}></View> */}
                </View>
              ) : (
                <View style={{ backgroundColor: Color.White }} />
              )}
            </>
          );
        }}
        ListFooterComponent={() => (
          <CustomButton onPress={() => onConfirm()} effect={false}>
            <View
              style={{
                backgroundColor: Color.Primary1000,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                paddingVertical: 15,
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
