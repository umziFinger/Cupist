import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import Header from '@/Components/Header';
import SettingList from '@/Containers/More/ServiceSettingScreen/SettingList';

const ServiceSettingScreen = () => {
  const { heightInfo } = useSelector((state: CommonState) => state.common);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.White,
      }}
    >
      <Header type={'back'} />
      <View
        style={{
          marginTop: 16,
          backgroundColor: Color.White,
          paddingHorizontal: 24,
        }}
      >
        <CustomText
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            letterSpacing: -0.4,
            color: Color.Black1000,
          }}
        >
          서비스설정
        </CustomText>
      </View>

      <View style={{ flex: 1, backgroundColor: Color.White, paddingHorizontal: 24, paddingTop: 16 }}>
        <FlatList
          data={[0, 1, 2, 3]}
          renderItem={({ index }) => <SettingList index={index} />}
          maxToRenderPerBatch={10}
          initialNumToRender={7}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ marginBottom: heightInfo.subBottomHeight }} />}
          contentContainerStyle={{ paddingTop: 44 }}
        />
      </View>
    </View>
  );
};

export default ServiceSettingScreen;
