import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import Header from '@/Components/Header';
import MyActions from '@/Stores/My/Actions';
import { MyState } from '@/Stores/My/InitialState';
import { numberFormat } from '@/Components/Function';

const MyPointScreen = () => {
  const dispatch = useDispatch();
  const { statusHeight } = useSelector((state: CommonState) => state.common.heightInfo);
  const { myPointList, total_mileage = 0, myPointListPage } = useSelector((state: MyState) => state.my);

  useEffect(() => {
    const params = {
      page: 1,
      per_page: 10,
    };
    dispatch(MyActions.fetchMyPointList(params));
    return () => {
      dispatch(MyActions.fetchMyReducer({ type: 'myPointList', data: [] }));
    };
  }, []);

  const onMore = () => {
    if (myPointListPage > 1) {
      const params = {
        page: myPointListPage,
        per_page: 10,
      };
      dispatch(MyActions.fetchMyPointList(params));
    }
  };

  const renderDate = () => {
    return moment().add(-1, 'month').format('YYYY년 M월 D일');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.White }}>
      <Header type={'back'} text={`앤올캐시 내역`} />
      <View style={{ height: 8, backgroundColor: Color.grayBg }} />
      <FlatList
        data={[0]}
        renderItem={() => (
          <View
            style={{
              paddingHorizontal: 24,
              marginBottom: 24,
            }}
          >
            <View style={{ marginTop: 36 }}>
              <CustomText style={{ fontSize: 15, letterSpacing: -0.25, textAlign: 'center', color: Color.black70 }}>
                현재 사용가능한 앤올캐시
              </CustomText>
            </View>

            <View
              style={{
                marginTop: 11.7,
                flex: 1,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  paddingBottom: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.Primary1000,
                }}
              >
                <CustomText
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    letterSpacing: -0.65,
                    textAlign: 'center',
                    color: Color.Black1000,
                    paddingBottom: 1,
                  }}
                >
                  {numberFormat(total_mileage)} P
                </CustomText>
              </View>
            </View>

            <View style={{ marginTop: 49.5 }}>
              <CustomText style={{ fontSize: 13, letterSpacing: -0.25, color: Color.black70 }}>
                * 앤올캐시는 결제하실 때 현금처럼 사용가능합니다.
              </CustomText>
            </View>

            <View style={{ marginTop: 14 }}>
              <CustomText style={{ fontSize: 13, letterSpacing: -0.25, color: Color.black70, lineHeight: 21 }}>
                {`* 적립 5년 이후 미사용된 앤올캐시는 적립된 시간 순으로\n소멸됩니다.`}
              </CustomText>
            </View>

            <View style={{ marginTop: 14 }}>
              <CustomText style={{ fontSize: 13, letterSpacing: -0.25, color: Color.black70, lineHeight: 21 }}>
                {`* ${renderDate()} 소멸되는 앤올캐시 : 0 P`}
              </CustomText>
            </View>

            <View style={{ marginTop: 30, flexDirection: 'row', borderTopColor: Color.grayBg200, borderTopWidth: 1 }}>
              <View style={{ flex: 1, alignItems: 'center', paddingVertical: 15 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.25, color: Color.Black1000, lineHeight: 21 }}>
                  적립일/사용일
                </CustomText>
              </View>
              <View style={{ flex: 1, alignItems: 'center', paddingVertical: 15 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.25, color: Color.Black1000, lineHeight: 21 }}>
                  적립내용/사용내용
                </CustomText>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', paddingVertical: 15, paddingRight: 10 }}>
                <CustomText style={{ fontSize: 13, letterSpacing: -0.25, color: Color.Black1000, lineHeight: 21 }}>
                  앤올캐시
                </CustomText>
              </View>
            </View>

            <View>
              <FlatList
                data={myPointList}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      borderTopColor: Color.borderVertical,
                      borderTopWidth: 1,
                      borderBottomColor: Color.borderVertical,
                      borderBottomWidth: index === myPointList?.length - 1 ? 1 : 0,
                    }}
                  >
                    <View style={{ flex: 1, alignItems: 'center', paddingVertical: 15 }}>
                      <CustomText
                        style={{ fontSize: 15, letterSpacing: -0.25, color: Color.Black1000, lineHeight: 21 }}
                      >
                        {item?.log_time.substring(0, 10).replace(/-/g, '.')}
                      </CustomText>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-start', paddingVertical: 15, paddingLeft: 10 }}>
                      <CustomText
                        style={{ fontSize: 15, letterSpacing: -0.25, color: Color.Black1000, lineHeight: 21 }}
                      >
                        {item?.state_txt}
                      </CustomText>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', paddingVertical: 15, paddingRight: 10 }}>
                      <CustomText
                        style={{ fontSize: 15, letterSpacing: -0.25, color: Color.Black1000, lineHeight: 21 }}
                      >
                        {item?.mileage_use > 0 ? '+' : ''}
                        {item?.mileage_use ? numberFormat(item?.mileage_use) : 0}P
                      </CustomText>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={10}
                maxToRenderPerBatch={13}
                windowSize={7}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                onEndReached={() => onMore()}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ marginBottom: statusHeight }} />}
      />
    </View>
  );
};

export default MyPointScreen;
