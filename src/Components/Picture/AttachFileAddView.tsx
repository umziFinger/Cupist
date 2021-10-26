import React from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';

const AttachFileAddView = (props: any) => {
  const { setCallAttachFile, attachFile, indexZeroMarginLeft = 20 } = props;
  const dispatch = useDispatch();

  const onDelete = (index: any) => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileDelete', data: index }));
  };

  return (
    <FlatList
      data={attachFile}
      renderItem={({ item, index }) => (
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 5,
            marginRight: 8,
            marginLeft: index === 0 ? indexZeroMarginLeft : 0,
            backgroundColor: Color.grayBlue900,
          }}
        >
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{ uri: item.url || '' }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <TouchableWithoutFeedback onPress={() => onDelete(index)} hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}>
            <View style={{ width: 16, height: 16, position: 'absolute', top: 6, right: 6 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Section/icPhotoDel.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      initialNumToRender={attachFile?.length || 3}
      maxToRenderPerBatch={attachFile?.length || 6}
      windowSize={7}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={
        <CustomButton onPress={() => setCallAttachFile(true)}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 5,
              backgroundColor: Color.White,
              borderStyle: 'dotted',
              borderWidth: 1,
              borderColor: Color.Black1000,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: attachFile?.length > 0 ? 0 : indexZeroMarginLeft,
              marginRight: 20,
            }}
          >
            <View style={{ width: 30, height: 30 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('@/Assets/Images/Common/icImgplus.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </CustomButton>
      }
    />
  );
};

export default AttachFileAddView;
