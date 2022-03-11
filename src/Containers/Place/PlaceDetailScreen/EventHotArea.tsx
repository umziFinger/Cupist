import React from 'react';
import { FlatList, View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import EventHotCard from '@/Components/Card/Home/EventHotCard';
import { PlaceDetail } from '@/Stores/Place/InitialState';

interface PropTypes {
  item: PlaceDetail['event'];
}
const EventHotArea = ({ item }: PropTypes) => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: Color.Black1000, fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2 }}>
          이벤트 HOT
        </CustomText>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={item}
          renderItem={({ item: event }) => (
            <View style={{ marginTop: 20 }}>
              <EventHotCard item={event} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={3}
          maxToRenderPerBatch={6}
          windowSize={7}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default EventHotArea;
