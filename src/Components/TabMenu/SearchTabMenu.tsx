import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import SearchActions from '@/Stores/Search/Actions';
import { SearchState } from '@/Stores/Search/InitialState';
import CustomButton from '@/Components/CustomButton';

const SearchTabMenu = (props: any) => {
  const { data } = props;

  const dispatch = useDispatch();
  const { selectMenu, searchQuery } = useSelector((state: SearchState) => state.search);

  useEffect(() => {
    if (!selectMenu) {
      dispatch(SearchActions.fetchSearchReducer({ type: 'selectMenu', data: 'all' }));
    }
    return () => {
      dispatch(SearchActions.fetchSearchReducer({ type: 'selectMenu', data: 'all' }));
    };
  }, []);
  const onSelectMenu = (item: any): void => {
    // const params = {
    //   type: item.selectKey,
    //   query: searchQuery,
    //   per_page: 10,
    //   page: 1,
    // };
    dispatch(SearchActions.fetchSearchReducer({ type: 'selectMenu', data: item.selectKey }));
    // dispatch(SearchActions.fetchSearchList(params));
  };

  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: Color.White,
        borderBottomColor: Color.Gray600,
        borderBottomWidth: 1,
        paddingHorizontal: 16,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => {
          let textColor = Color.Gray600;
          let bottomWidth = 0;
          if (selectMenu === item.selectKey) {
            textColor = Color.Primary1000;
            bottomWidth = 2;
          }
          return (
            <CustomButton onPress={() => onSelectMenu(item)}>
              <View
                style={{
                  marginRight: 24,
                  paddingVertical: 9,
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
                      fontWeight: selectMenu === item.selectKey ? 'bold' : 'normal',
                    }}
                  >
                    {item.title}
                  </CustomText>
                </View>
              </View>
            </CustomButton>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={data.length}
        maxToRenderPerBatch={data.length + 3}
        windowSize={7}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ flex: 1 }}
      />
    </View>
  );
};
export default SearchTabMenu;
