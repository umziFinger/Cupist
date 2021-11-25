import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import PlaceSmallCard from '@/Components/Card/Common/PlaceSmallCard';

interface PropTypes {
  list: any;
}

const TogetherArea = (props: PropTypes) => {
  const { width } = useWindowDimensions();
  const { list } = props;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2 }}>
          다른 유저들이 함께 본 볼링장
        </CustomText>
      </View>
      <View style={{ flex: 1, paddingLeft: 20, marginTop: 21 }}>
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <View style={{ marginRight: 11 }}>
              <PlaceSmallCard item={item} width={(width - 48 - 12) / 2} showRate={false} showTicketName />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={3}
          maxToRenderPerBatch={6}
          windowSize={7}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default TogetherArea;
