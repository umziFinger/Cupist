import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import PlaceActions from '@/Stores/Place/Actions';
import { navigate } from '@/Services/NavigationService';

const UnsupportAlbamon = () => {
  const dispatch = useDispatch();
  const onGoMyAroundAlbamon = () => {
    dispatch(
      PlaceActions.fetchPlaceReducer({
        type: 'myAroundSort',
        data: {
          index: 3,
          key: 'albamon',
          value: '알코볼',
        },
      }),
    );
    navigate('MyAroundScreen');
  };

  return (
    <View style={{ paddingTop: 140 }}>
      <CustomText
        style={{ textAlign: 'center', fontSize: 14, lineHeight: 20, letterSpacing: -0.25, color: Color.Gray400 }}
      >
        {'해당 볼링장은 알.코.볼 예선전을\n진행하지 않는 볼링장 입니다.\n예선전을 진행하는 볼링장을 확인해 보세요!'}
      </CustomText>
      <CustomButton
        onPress={() => onGoMyAroundAlbamon()}
        style={{
          borderWidth: 1,
          borderColor: Color.Grayyellow200,
          borderRadius: 3,
          alignItems: 'center',
          marginHorizontal: 24,
          paddingVertical: 12,
          marginTop: 80,
          marginBottom: 256,
        }}
      >
        <CustomText>알.코.볼 볼링장 리스트 바로가기</CustomText>
      </CustomButton>
    </View>
  );
};
export default UnsupportAlbamon;
