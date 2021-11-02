import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import MyActions from '@/Stores/My/Actions';
import { AuthState } from '@/Stores/Auth/InitialState';

interface PlaceCardXSmallProps {
  item: any;
}
const PlaceXSmallCard = (props: PlaceCardXSmallProps) => {
  const dispatch = useDispatch();
  const { userInfo, log_cert } = useSelector((state: AuthState) => state.auth);
  const [isError, setIsError] = useState(false);
  const { item } = props;
  // console.log(log_cert);

  const onSelectPlace = () => {
    const params = {
      placeIdx: item.idx,
    };
    dispatch(MyActions.fetchMyProfilePatch(params));
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
              // console.log('에러: ');
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
