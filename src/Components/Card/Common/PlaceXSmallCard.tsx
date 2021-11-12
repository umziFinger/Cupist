import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import MyActions from '@/Stores/My/Actions';

export enum SCREEN_TYPE {
  JOIN = 'join',
  MODIFY = 'modify',
}

interface PlaceCardXSmallProps {
  item: any;
  type: SCREEN_TYPE;
}
const PlaceXSmallCard = (props: PlaceCardXSmallProps) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const { item, type } = props;
  // console.log(log_cert);

  const onSelectPlace = () => {
    if (type === SCREEN_TYPE.JOIN) {
      const params = {
        placeIdx: item.idx,
        type: SCREEN_TYPE.JOIN,
      };
      dispatch(MyActions.fetchMyPlacePatch(params));
    } else {
      const params = {
        placeIdx: item.idx,
        type: SCREEN_TYPE.MODIFY,
      };
      dispatch(MyActions.fetchMyPlacePatch(params));
    }
  };

  return (
    <CustomButton onPress={() => onSelectPlace()}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: Color.Gray200,
          borderBottomWidth: 1,
          paddingBottom: 16,
          marginBottom: 16,
        }}
      >
        <View style={{ width: 40, height: 40, borderRadius: 3 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 3 }}
            source={
              !item?.placePhotoArr[0] || isError
                ? require('@/Assets/Images/Common/icNoImage.png')
                : { uri: item?.placePhotoArr[0] }
            }
            resizeMode={FastImage.resizeMode.cover}
            onError={() => {
              setIsError(true);
            }}
          />
        </View>
        <View style={{ marginLeft: 12, flex: 1 }}>
          <View style={{ marginBottom: 4 }}>
            <CustomText
              style={{ fontSize: 14, fontWeight: '500', letterSpacing: -0.25, color: Color.Black1000 }}
              numberOfLines={1}
            >
              {item?.name || ''}
            </CustomText>
          </View>

          <View>
            <CustomText
              style={{
                fontSize: 12,
                color: Color.Gray700,
              }}
              numberOfLines={1}
            >
              {item?.newAddress || ''}
            </CustomText>
          </View>
        </View>
      </View>
    </CustomButton>
  );
};

export default PlaceXSmallCard;
