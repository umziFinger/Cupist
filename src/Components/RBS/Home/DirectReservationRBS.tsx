import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useWindowDimensions, View } from 'react-native';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CustomText from '@/Components/CustomText';

const DirectReservationRBS = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const { heightInfo, isOpenDirectReservationRBS } = useSelector((state: CommonState) => state.common);
  const RBSheetRef = useRef<any>();

  useEffect(() => {
    if (isOpenDirectReservationRBS) {
      RBSheetRef?.current.open();
    }
  }, [isOpenDirectReservationRBS]);

  return (
    <RBSheet
      ref={RBSheetRef}
      height={height * 0.5}
      openDuration={500}
      customStyles={{
        container: {
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      }}
      onClose={() => dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenDirectReservationRBS', data: false }))}
    >
      <View style={{ width: '100%', height: height * 0.5 }}>
        <View style={{ justifyContent: 'center' }}>
          <CustomText style={{ color: '#333', fontSize: 14 }}>hello</CustomText>
        </View>
      </View>
    </RBSheet>
  );
};

export default DirectReservationRBS;
