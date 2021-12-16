import React from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import NotificationActions from '@/Stores/Notification/Actions';
import CustomButton from '@/Components/CustomButton';
import { NotificationState } from '@/Stores/Notification/InitialState';

const NotificationTabMenu = (props: any) => {
  const { data } = props;
  const dispatch = useDispatch();

  const { notificationCategory = { name: '전체', category: 'all' } } = useSelector(
    (state: NotificationState) => state.notification,
  );

  const onSelectCategory = (item: any): void => {
    const params = {
      per_page: 10,
      page: 1,
      category: item.category,
    };
    dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationCategory', data: item }));
    dispatch(NotificationActions.fetchNotificationReducer({ type: 'notificationListPage', data: 1 }));

    dispatch(NotificationActions.fetchNotificationList(params));
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CustomButton onPress={() => onSelectCategory(item)}>
            <View style={{ flexDirection: 'row', marginRight: 8, alignItems: 'center' }}>
              <View
                style={{
                  borderRadius: 16.5,
                  paddingHorizontal: 18,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: notificationCategory?.category === item.category ? undefined : Color.Gray300,
                  backgroundColor:
                    notificationCategory?.category === item.category ? Color.Grayyellow1000 : Color.White,
                }}
              >
                <CustomText
                  style={{
                    color: notificationCategory?.category === item.category ? Color.White : Color.Grayyellow1000,
                    fontSize: 13,
                    fontWeight: notificationCategory?.category === item.category ? '500' : undefined,
                    letterSpacing: -0.2,
                  }}
                >
                  {item.name}
                </CustomText>
              </View>
            </View>
          </CustomButton>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={8}
        windowSize={7}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};
export default NotificationTabMenu;
