import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import RepairActions from '@/Stores/Repair/Actions';

import CustomButton from '@/Components/CustomButton';
import { RepairState } from '@/Stores/Repair/InitialState';

const { width } = Dimensions.get('window');
const RepairHistoryTabMenu = (props: any) => {
  const { data } = props;

  const dispatch = useDispatch();
  const { repairHistoryTabSelectMenu: selectMenu } = useSelector((state: RepairState) => state.repair);

  const onSelectMenu = (item: any): void => {
    dispatch(RepairActions.fetchRepairReducer({ type: 'selectMenu', data: item.selectKey }));
  };

  return (
    <View
      style={{
        backgroundColor: Color.White,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => {
          let textColor = Color.grayDefault;
          let bottomWidth = 0;
          if (selectMenu === item.selectKey) {
            textColor = Color.Primary1000;
            bottomWidth = 3;
          }
          return (
            <CustomButton onPress={() => onSelectMenu(item)}>
              <View
                style={{
                  width: (width - 48) / 3,
                  paddingTop: 17,
                  paddingBottom: 15,
                  paddingHorizontal: 24,
                  borderBottomWidth: bottomWidth,
                  borderBottomColor: textColor,
                  alignItems: 'center',
                }}
              >
                <View style={{ justifyContent: 'center' }}>
                  <CustomText
                    style={{
                      color: textColor,
                      fontSize: 15,
                      letterSpacing: -0.25,
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
        initialNumToRender={data?.length}
        maxToRenderPerBatch={data?.length + 3}
        windowSize={7}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};
export default RepairHistoryTabMenu;
