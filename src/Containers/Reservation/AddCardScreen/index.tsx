import React from 'react';
import { FlatList, TextInput, useWindowDimensions, View } from 'react-native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import Header from '@/Components/Header';
import CardNumberInput from '@/Containers/Reservation/AddCardScreen/CardNumberInput';
import CardDefaultInput from '@/Containers/Reservation/AddCardScreen/CardDefaultInput';
import CardPasswordInput from '@/Containers/Reservation/AddCardScreen/CardPasswordInput';
import AgreeArea from '@/Containers/Reservation/AddCardScreen/AgreeArea';

const AddCardScreen = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'close'} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[0]}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 20 }}>
                <View style={{ justifyContent: 'center', marginTop: 16 }}>
                  <CustomText style={{ color: Color.Black1000, fontSize: 22, fontWeight: 'bold', letterSpacing: -0.4 }}>
                    카드 등록하기
                  </CustomText>
                </View>
                <View style={{ justifyContent: 'center', marginTop: 6 }}>
                  <CustomText style={{ color: Color.Gray600, fontSize: 13, letterSpacing: -0.2 }}>
                    카드정보를 입력해주세요.
                  </CustomText>
                </View>

                {/* 카드정보 입력 영역 */}
                <View>
                  <View style={{ justifyContent: 'center', marginTop: 16 }}>
                    <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                      카드번호
                    </CustomText>
                  </View>
                  <View style={{ justifyContent: 'center', marginTop: 8 }}>
                    <CardNumberInput />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 12,
                  }}
                >
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                        유효기간
                      </CustomText>
                    </View>
                    <View style={{ marginTop: 8 }}>
                      <CardDefaultInput placeHolder={'MMYY'} maxLength={4} />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                        CVC
                      </CustomText>
                    </View>
                    <View style={{ marginTop: 8 }}>
                      <CardDefaultInput placeHolder={'카드 뒷면 3자리'} maxLength={3} />
                    </View>
                  </View>
                </View>

                <View style={{ justifyContent: 'center', marginTop: 12 }}>
                  <CustomText style={{ color: Color.Grayyellow500, fontSize: 12, fontWeight: '500' }}>
                    카드 비밀번호
                  </CustomText>
                </View>
                <View style={{ justifyContent: 'center', marginTop: 8 }}>
                  <CardPasswordInput placeHolder={'비밀번호 앞 2자리 숫자'} maxLength={2} />
                </View>
              </View>
              <View style={{ height: 8, backgroundColor: Color.Gray200, marginTop: 24 }} />
              <View style={{ marginTop: 24 }}>
                <AgreeArea />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={5}
          windowSize={7}
        />
      </View>
    </View>
  );
};

export default AddCardScreen;
