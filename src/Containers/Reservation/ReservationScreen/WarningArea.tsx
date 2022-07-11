import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { PlaceState } from '@/Stores/Place/InitialState';
import Config from '@/Config';
import CustomDashed from '@/Components/CustomDashed';

const WarningArea = () => {
  const { selectedTicket } = useSelector((state: PlaceState) => state.place);
  // caution이 없는 경우 config에 하드코딩된 유의사항 넣어줌
  const warningItem = selectedTicket?.caution
    ? selectedTicket?.caution
    : selectedTicket?.eventType === 'normal'
    ? Config.NORMAL_CAUTION_INFO
    : Config.FREE_CAUTION_INFO;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center' }}>
        <CustomText style={{ color: Color.Error, fontSize: 15, fontWeight: '500', letterSpacing: -0.2 }}>
          유의 사항
        </CustomText>
      </View>
      <View style={{ justifyContent: 'center', marginTop: 20 }}>
        {selectedTicket?.eventType === 'free' && (
          <CustomText
            style={{
              fontWeight: '500',
              fontSize: 13,
              letterSpacing: -0.2,
              lineHeight: 18,
              color: 'black',
            }}
          >
            {`자유볼링은 정해진 시간동안 ${
              selectedTicket?.gameCnt === 0
                ? '무제한'
                : selectedTicket?.gameCnt === 1
                ? '1G'
                : `1G ~ ${selectedTicket?.gameCnt}G`
            }으로 즐길 수 있는 상품입니다.`}
          </CustomText>
        )}
        <FlatList
          data={warningItem?.split('\n')}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: selectedTicket?.eventType === 'normal' && index === 0 ? 0 : 8 }}>
              <CustomText
                style={{
                  fontWeight: selectedTicket?.eventType === 'normal' && index === 0 ? '500' : 'normal',
                  fontSize: selectedTicket?.eventType === 'normal' && index === 0 ? 13 : 12,
                  letterSpacing: -0.2,
                  lineHeight: 18,
                  color: selectedTicket?.eventType === 'normal' && index === 0 ? 'black' : Color.Gray600,
                }}
              >
                {item}
              </CustomText>
            </View>
          )}
          listKey={'title'}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={4}
          maxToRenderPerBatch={3}
          windowSize={7}
        />

        {/* <CustomText style={{ fontWeight: '500', fontSize: 13, letterSpacing: -0.2, lineHeight: 18 }}> */}
        {/*  {warningItem} */}
        {/* </CustomText> */}
        {/* <CustomText style={{ color: Color.Gray600, fontSize: 12, marginTop: 8 }}>{warningItemSubTitle}</CustomText> */}
        <View style={{ height: 1, marginVertical: 20 }}>
          <CustomDashed dashLength={2.7} dashColor={Color.Gray350} style={{ height: '100%' }} />
        </View>

        <FlatList
          data={Config.COMMON_CAUTION_INFO?.split('\n') || []}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', marginTop: index === 0 ? 0 : 8 }}>
              <View>
                <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>{'\u2022 '}</CustomText>
              </View>
              <View style={{ flex: 1 }}>
                <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>{item}</CustomText>
              </View>
            </View>
          )}
          listKey={'contents'}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={1}
          windowSize={7}
        />
        {/* <View> */}
        {/*  <CustomText style={{ color: Color.Gray600, fontSize: 12 }}>{warningItemContents}</CustomText> */}
        {/* </View> */}
      </View>
    </View>
  );
};

export default WarningArea;
