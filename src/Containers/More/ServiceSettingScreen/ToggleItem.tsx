import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import React from 'react';
import MyActions from '@/Stores/My/Actions';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomSwitch from '@/Components/CustomSwitch';

enum enumYN {
  Y = 'Y',
  N = 'N',
}

type PropTypes = {
  title: string;
  subTitle: string;
  status: enumYN;
  type: 'notification' | 'marketing' | 'event';
};
const ToggleItem = ({ title, subTitle, status, type }: PropTypes) => {
  const dispatch = useDispatch();
  const handlerTogglePushYN = (toggleType: PropTypes['type'], toggleStatus: enumYN) => {
    switch (toggleType) {
      case 'notification': {
        const params = {
          pushYN: toggleStatus === enumYN.Y ? enumYN.N : enumYN.Y,
        };
        dispatch(MyActions.fetchMyNotificationPushYN(params));
        break;
      }
      case 'marketing': {
        const params = {
          pushYN: toggleStatus === enumYN.Y ? enumYN.N : enumYN.Y,
        };
        dispatch(MyActions.fetchMyMarketingPushYN(params));
        break;
      }
      case 'event': {
        const params = {
          pushYN: toggleStatus === enumYN.Y ? enumYN.N : enumYN.Y,
        };
        dispatch(MyActions.fetchMyEventPushYN(params));
        break;
      }
      default:
        return false;
    }
    return false;
  };

  console.log('###### status : ', status);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomColor: Color.Gray200,
        borderBottomWidth: 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 8 }}>
          <CustomText style={{ fontSize: 16, letterSpacing: -0.25, color: Color.Black1000 }}>{title}</CustomText>
        </View>
        <View>
          <CustomText
            style={{
              fontSize: 13,
              letterSpacing: -0.2,
              color: Color.Gray600,
            }}
          >
            {subTitle}
          </CustomText>
        </View>
      </View>
      <View>
        <CustomSwitch
          style={{ width: 44, height: 26 }}
          trackColor={{ false: Color.Gray300, true: Color.Primary1000 }}
          onValueChange={() => handlerTogglePushYN(type, status)}
          value={status === 'Y'}
        />
      </View>
    </View>
  );
};

export default ToggleItem;
