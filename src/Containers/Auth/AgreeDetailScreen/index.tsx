import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import Header from '@/Components/Header';
import { CommonState } from '@/Stores/Common/InitialState';
import { AuthState } from '@/Stores/Auth/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { MainStackParamList } from '@/Navigators/MainNavigator';

const { height } = Dimensions.get('window');

interface AgreeDetailProps {
  route: RouteProp<MainStackParamList, 'AgreeDetailScreen'>;
}

function AgreeDetailScreen({ route }: AgreeDetailProps) {
  const dispatch = useDispatch();
  const { item } = route.params;
  const { heightInfo } = useSelector((state: CommonState) => state.common);
  const { agreeInfo } = useSelector((state: AuthState) => state.auth);

  return (
    <View style={{ flex: 1 }}>
      <Header type="back" text={item?.terms_title || ''} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[0]}
          renderItem={() => (
            <View style={{ paddingHorizontal: 16, flex: 1 }}>
              <View style={{ width: '100%', height: '100%' }}>
                <View style={{ justifyContent: 'center', marginTop: 30 }}>
                  <View style={{ justifyContent: 'center' }}>
                    <CustomText
                      style={{ color: Color.Black1000, fontSize: 14, fontWeight: 'bold', letterSpacing: -0.28 }}
                    >
                      {item?.terms_title}
                    </CustomText>
                  </View>
                  <View style={{ justifyContent: 'center', marginTop: 12 }}>
                    <CustomText style={{ color: Color.gray1000, fontSize: 14, letterSpacing: -0.26 }}>
                      {item?.terms}
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={7}
          ListFooterComponent={<View style={{ marginBottom: heightInfo.fixBottomHeight }} />}
        />
      </View>
    </View>
  );
}

export default AgreeDetailScreen;
