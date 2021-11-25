import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { Color } from '@/Assets/Color';
import CustomButton from '@/Components/CustomButton';
import CustomText from '@/Components/CustomText';
import { CommonState } from '@/Stores/Common/InitialState';

import { MainStackParamList } from '@/Navigators/MainNavigator';
import CommonActions from '@/Stores/Common/Actions';
import { REPORT_CODE } from '@/Containers/Report/data';
import ReportList from '@/Containers/Report/ReportList';
import Header from '@/Components/Header';

interface ReporProps {
  route: RouteProp<MainStackParamList, 'ReportScreen'>;
}

const ReportScreen = ({ route }: ReporProps) => {
  const { mainIdx, subIdx, reportType } = route.params;
  const [report, setReport] = useState(REPORT_CODE);
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const dispatch = useDispatch();

  const isChecked = () => {
    const selected: any = report.find((item) => {
      return item.check;
    });

    return !!selected;
  };

  const onReport = () => {
    const selected: any = report.find((item) => {
      return item.check;
    });

    if (selected) {
      const params = {
        reportType,
        mainIdx,
        subIdx,
        reportCode: selected.code,
      };

      dispatch(CommonActions.fetchCommonReport(params));
    }
  };

  const onCheck = (index: number) => {
    setReport(report.map((item) => (item.idx === index ? { ...item, check: true } : { ...item, check: false })));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'close'} />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ marginTop: 43, marginBottom: 20 }}>
          <CustomText style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: -0.2, color: Color.Black1000 }}>
            신고하기
          </CustomText>
        </View>
        <FlatList
          data={report}
          renderItem={({ item }) => <ReportList item={item} onCheck={onCheck} />}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={report.length || 1}
          maxToRenderPerBatch={report.length + 3 || 3}
          windowSize={7}
        />
        <CustomButton onPress={() => onReport()}>
          <View
            style={{
              justifyContent: 'center',
              borderRadius: 3,
              backgroundColor: isChecked() ? Color.Primary1000 : Color.Grayyellow200,
              paddingVertical: 15,
              alignItems: 'center',
              marginBottom: statusHeight,
            }}
          >
            <CustomText
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                letterSpacing: -0.25,
                textAlign: 'center',
                color: Color.White,
              }}
            >
              제출하기
            </CustomText>
          </View>
        </CustomButton>
      </View>
    </View>
  );
};

export default ReportScreen;
