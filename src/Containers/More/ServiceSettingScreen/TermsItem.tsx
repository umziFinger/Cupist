import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import React from 'react';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import AuthActions from '@/Stores/Auth/Actions';
import CommonActions from '@/Stores/Common/Actions';
import { navigate } from '@/Services/NavigationService';
import { DATA_PERMISSION_DETAILS } from '@/Containers/Auth/AgreeDetailScreen/data';

type PropTypes = {
  title: string;
  type: 'service' | 'personal' | 'location';
};
const TermsItem = ({ title, type }: PropTypes) => {
  const dispatch = useDispatch();
  const handlerOpenTermsDetail = (termsType: PropTypes['type']) => {
    switch (termsType) {
      case 'service': {
        dispatch(AuthActions.fetchAuthReducer({ type: 'selectedAgreeIdx', data: { selectedAgreeIdx: 0 } }));
        // dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenAgreeDetailRBS', data: true }));
        navigate('PermissionDetailScreen', { title: DATA_PERMISSION_DETAILS[0].title, agreeIdx: 0 });
        break;
      }
      case 'personal': {
        dispatch(AuthActions.fetchAuthReducer({ type: 'selectedAgreeIdx', data: { selectedAgreeIdx: 2 } }));
        // dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenAgreeDetailRBS', data: true }));
        navigate('PermissionDetailScreen', { title: DATA_PERMISSION_DETAILS[0].title, agreeIdx: 2 });
        break;
      }
      case 'location': {
        dispatch(AuthActions.fetchAuthReducer({ type: 'selectedAgreeIdx', data: { selectedAgreeIdx: 3 } }));
        // dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenAgreeDetailRBS', data: true }));
        navigate('PermissionDetailScreen', { title: DATA_PERMISSION_DETAILS[0].title, agreeIdx: 3 });
        break;
      }
      default:
        return false;
    }
    return false;
  };

  return (
    <CustomButton onPress={() => handlerOpenTermsDetail(type)}>
      <View
        style={{
          justifyContent: 'center',
          paddingVertical: 24,
          borderBottomColor: Color.Gray200,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomText
            style={{
              fontSize: 16,
              letterSpacing: -0.25,
              color: Color.Black1000,
            }}
          >
            {title}
          </CustomText>
        </View>
      </View>
    </CustomButton>
  );
};

export default TermsItem;
