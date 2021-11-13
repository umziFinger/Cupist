import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import SearchActions from '@/Stores/Search/Actions';
import { SearchState } from '@/Stores/Search/InitialState';
import CustomButton from '@/Components/CustomButton';
import { MyState } from '@/Stores/My/InitialState';
import MyActions from '@/Stores/My/Actions';
import { navigate } from '@/Services/NavigationService';

const QnaTabMenu = (props: any) => {
  const { data } = props;

  const dispatch = useDispatch();
  const { qnaSelectedTab = { name: '문의내역', key: 'list' } } = useSelector((state: MyState) => state.my);

  const onSelectMenu = (item: any): void => {
    if (item.key === 'write') {
      navigate('QnaWriteScreen');
    } else if (item.key === 'list') {
      dispatch(MyActions.fetchMyReducer({ type: 'qnaSelectedTab', data: item }));
    }
  };

  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: Color.White,
        borderBottomColor: Color.Gray200,
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          let textColor = Color.Gray400;
          let bottomWidth = 0;
          if (qnaSelectedTab.key === item.key) {
            textColor = Color.Black1000;
            bottomWidth = 2;
          }
          return (
            <CustomButton onPress={() => onSelectMenu(item)}>
              <View
                style={{
                  marginRight: index === 0 ? 42 : 0,
                  paddingBottom: 8,
                  borderBottomColor: textColor,
                  borderBottomWidth: bottomWidth,
                }}
              >
                <View style={{ justifyContent: 'center' }}>
                  <CustomText
                    style={{
                      color: textColor,
                      fontSize: 15,
                      letterSpacing: -0.2,
                      fontWeight: qnaSelectedTab.key === item.key ? 'bold' : 'normal',
                    }}
                  >
                    {item.name}
                  </CustomText>
                </View>
              </View>
            </CustomButton>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={7}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      />
    </View>
  );
};
export default QnaTabMenu;
