import React from 'react';
import { View, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { Color, Opacity } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CommonActions from '@/Stores/Common/Actions';
import CustomText from '@/Components/CustomText';

const AttachFileAddView = (props: any) => {
  const { setCallAttachFile, attachFile, indexZeroMarginLeft = 20 } = props;
  const dispatch = useDispatch();

  const onDelete = (index: any) => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'attachFileDelete', data: index }));
  };

  return (
    <View style={{ height: 90, flexDirection: 'row' }}>
      <CustomButton onPress={() => setCallAttachFile(true)} style={{ alignSelf: 'center' }}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 5,
            backgroundColor: Color.White,
            borderWidth: 1,
            borderColor: Color.Gray300,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: attachFile?.length > 0 ? 0 : indexZeroMarginLeft,
            // marginRight: 20,
          }}
        >
          <View style={{ width: 24, height: 24 }}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={require('@/Assets/Images/Common/icInquiryPhoto.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{ marginTop: 2 }}>
            <CustomText
              style={{
                fontSize: 12,
                color: Color.Gray800,
              }}
            >
              <CustomText
                style={{
                  color: Color.Point1000,
                }}
              >
                {attachFile?.length || 0}
              </CustomText>{' '}
              / 5
            </CustomText>
          </View>
        </View>
      </CustomButton>
      <FlatList
        data={attachFile}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 5,
              marginLeft: index === 0 ? 8 : 18,
              marginRight: index === attachFile?.length - 1 ? 20 : 0,
              backgroundColor: Color.Gray200,
              alignSelf: 'center',
            }}
          >
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={{ uri: item.url || '' }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <CustomButton
              onPress={() => onDelete(index)}
              hitSlop={{ left: 7, right: 7, bottom: 7, top: 7 }}
              style={{
                zIndex: 99,
                position: 'absolute',
                top: -10,
                right: -10,
                width: 20,
                height: 20,
                backgroundColor: `#000000${Opacity._60}`,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View style={{ width: 16, height: 16 }}>
                <FastImage
                  style={{ width: '100%', height: '100%' }}
                  source={require('@/Assets/Images/Button/icClose.png')}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </CustomButton>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        initialNumToRender={5}
        maxToRenderPerBatch={8}
        windowSize={7}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default AttachFileAddView;
