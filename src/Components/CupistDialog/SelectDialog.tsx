import React from 'react';
import { Dimensions, FlatList, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Color, Opacity } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import CustomText from '@/Components/CustomText';
import CommonActions from '@/Stores/Common/Actions';
import CustomButton from '@/Components/CustomButton';
import HomeActions from '@/Stores/Home/Actions';
import { HomeState } from '@/Stores/Home/InitialState';

interface SelectDialogProps {
  data: any;
  title: string;
  height: number;
}
const { width } = Dimensions.get('window');

const SelectDialog = (props: SelectDialogProps) => {
  const dispatch = useDispatch();
  const { data, title, height } = props;
  const { profile } = useSelector((state: HomeState) => state.home);
  const {
    versionInfo,
    heightInfo,
    alertDialogParams,
    isOpenSelectHeightDialog,
    isOpenSelectBodyTypeDialog,
    isOpenSelectEducateDialog,
  } = useSelector((state: CommonState) => state.common);

  const onPressHeightItem = (item: any) => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSelectHeightDialog', data: false }));
    dispatch(HomeActions.fetchHomeReducer({ type: 'profile', data: { ...profile, height: item } }));
  };
  const onPressBodyTypeItem = (item: any) => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSelectBodyTypeDialog', data: false }));
    dispatch(HomeActions.fetchHomeReducer({ type: 'profile', data: { ...profile, body_type: item?.key } }));
  };
  const onPressEducateItem = (item: any) => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSelectEducateDialog', data: false }));
    dispatch(HomeActions.fetchHomeReducer({ type: 'profile', data: { ...profile, education: item?.key } }));
  };

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        zIndex: 99,
        backgroundColor: `${Color.Black1000}${Opacity._70}`,
      }}
    >
      <FlatList
        data={[0]}
        renderItem={() => (
          <View style={{ height, backgroundColor: 'white', borderRadius: 10 }}>
            <View
              style={{
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderColor: Color.Gray300,
              }}
            >
              <CustomText>{title}</CustomText>
            </View>
            {isOpenSelectHeightDialog && (
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                {data?.map((el: any, i: number) => (
                  <CustomButton
                    key={i.toString()}
                    onPress={() => onPressHeightItem(el)}
                    style={{ height: 44, paddingHorizontal: 12, justifyContent: 'center' }}
                  >
                    <CustomText>{el}cm</CustomText>
                  </CustomButton>
                ))}
              </ScrollView>
            )}
            {isOpenSelectBodyTypeDialog && (
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                {data?.map((el: any, i: number) => (
                  <CustomButton
                    key={i.toString()}
                    onPress={() => onPressBodyTypeItem(el)}
                    style={{ height: 44, paddingHorizontal: 12, justifyContent: 'center' }}
                  >
                    <CustomText>{el?.name}</CustomText>
                  </CustomButton>
                ))}
              </ScrollView>
            )}
            {isOpenSelectEducateDialog && (
              <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                {data?.map((el: any, i: number) => (
                  <CustomButton
                    key={i.toString()}
                    onPress={() => onPressEducateItem(el)}
                    style={{ height: 44, paddingHorizontal: 12, justifyContent: 'center' }}
                  >
                    <CustomText>{el?.name}</CustomText>
                  </CustomButton>
                ))}
              </ScrollView>
            )}
          </View>
        )}
        keyExtractor={(keyItem, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        // scrollEnabled={false}
        contentContainerStyle={{
          marginTop: heightInfo.statusHeight + height / 3,
          width: width - 80,
        }}
      />
    </View>
  );
};

export default SelectDialog;
