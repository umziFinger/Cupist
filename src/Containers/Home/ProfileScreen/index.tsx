import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, useWindowDimensions, TextInput } from 'react-native';
import Header from '@/Components/Header';
import FastImage from 'react-native-fast-image';
import { Color } from '@/Assets/Color';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';
import DataBlueInput from '@/Components/Input/DataBlueInput';
import { useDispatch, useSelector } from 'react-redux';
import { HomeState } from '@/Stores/Home/InitialState';
import HomeActions from '@/Stores/Home/Actions';
import SelectDialog from '@/Components/CupistDialog/SelectDialog';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { profile, meta } = useSelector((state: HomeState) => state.home);
  const { isOpenSelectHeightDialog, isOpenSelectBodyTypeDialog, isOpenSelectEducateDialog } = useSelector(
    (state: CommonState) => state.common,
  );
  const [introduce, setIntroduce] = useState('');
  const [company, setCompany] = useState('');
  const [job, setJob] = useState('');
  const [school, setSchool] = useState('');

  useEffect(() => {
    dispatch(HomeActions.fetchProfile());

    return () => {
      dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSelectHeightDialog', data: false }));
      dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSelectBodyTypeDialog', data: false }));
      dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSelectEducateDialog', data: false }));
    };
  }, []);

  useEffect(() => {
    setIntroduce(profile?.introduction);
    setCompany(profile?.company);
    setJob(profile?.job);
    setSchool(profile?.school);
  }, [profile]);

  const onPressHeigth = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSelectHeightDialog', data: true }));
  };

  const onPressBodyType = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSelectBodyTypeDialog', data: true }));
  };

  const onPressEducate = () => {
    dispatch(CommonActions.fetchCommonReducer({ type: 'isOpenSelectEducateDialog', data: true }));
  };

  console.log('@@@@@@ :::', meta);

  const heightData = () => {
    return Array.from({ length: meta?.height_range?.max - meta?.height_range?.min + 1 }, (v, i) => i + 120);
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header text={'????????? ??????'} type={'back'} />
        <FlatList
          data={[0]}
          renderItem={({ item, index }) => (
            <View>
              <View>
                {/* ================== ????????? ?????? ?????? ================== */}
                <FlatList
                  data={[0, 1, 2, 3, 4, 5]}
                  renderItem={({ item: item1, index: index1 }) => (
                    <View
                      style={{
                        width: (width - 4) / 3,
                        height: (width - 4) / 3,
                        marginLeft: index1 === 0 || index1 === 3 ? 0 : 2,
                        marginTop: index1 > 2 ? 2 : 0,
                        borderWidth: 0.3,
                        borderColor: Color.Gray300,
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={
                          profile?.pictures?.[index1]
                            ? { uri: `https://test.dev.cupist.de${profile?.pictures[index1]}` }
                            : require('@/Assets/Images/Cupist/ProfileEdit/person.png')
                        }
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  )}
                  keyExtractor={(item1, index1) => index1.toString()}
                  initialNumToRender={2}
                  maxToRenderPerBatch={1}
                  windowSize={7}
                  numColumns={3}
                />
                <View
                  style={{
                    height: 44,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: Color.Gray300,
                  }}
                >
                  <CustomText style={{ fontSize: 12, color: Color.Gray4 }}>
                    ????????? ????????? ????????? ??? ?????? ????????? ???????????????
                  </CustomText>
                  <CustomButton style={{ marginLeft: 4 }}>
                    <CustomText style={{ fontSize: 12, fontWeight: '600', color: Color.DarkGray1 }}>
                      ??? ????????????
                    </CustomText>
                  </CustomButton>
                </View>
              </View>
              {/* ================== ?????????, ??????, ??????, ?????? ?????? ================== */}
              <View
                style={{ paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderColor: Color.Gray300 }}
              >
                <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
                  <CustomText style={{ flex: 0.35, fontSize: 16 }}>?????????</CustomText>
                  <View style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                    <CustomText style={{ fontSize: 16, color: Color.GlamBlue }}>{profile?.name || ''}</CustomText>
                    <View
                      style={{
                        width: 14,
                        height: 14,
                        marginLeft: 4,
                      }}
                    >
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Cupist/ProfileEdit/lock.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
                  <CustomText style={{ flex: 0.35, fontSize: 16 }}>??????</CustomText>
                  <CustomButton style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                    <CustomText style={{ fontSize: 16 }}>{profile?.gender === 'F' ? '??????' : '??????'}</CustomText>
                  </CustomButton>
                </View>
                <DataBlueInput title={'??????'} data={profile?.birthday} />
                <DataBlueInput title={'??????'} data={profile?.location} />
              </View>
              {/* ================== ?????? ?????? ================== */}
              <View
                style={{ paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: Color.Gray300 }}
              >
                <View style={{ height: 35, justifyContent: 'center' }}>
                  <CustomText style={{ fontSize: 16 }}>??????</CustomText>
                </View>

                <TextInput
                  style={{ padding: 0, fontSize: 14 }}
                  placeholderTextColor={Color.Gray2}
                  placeholder={'???????????? ????????? ???????????? ??????????????????'}
                  value={introduce}
                  onChangeText={(value) => setIntroduce(value)}
                />
                <View style={{ height: 33, justifyContent: 'center' }}>
                  <CustomText style={{ fontSize: 12, color: Color.Gray4 }}>
                    SNS ????????? ??? ????????? ?????? ??? ????????? ?????? ???????????????
                  </CustomText>
                </View>
              </View>
              {/* ================== ???????????? ?????? ?????? ================== */}
              <View
                style={{ paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: Color.Gray300 }}
              >
                <DataBlueInput title={'???'} data={`${profile?.height}cm`} onPressData={() => onPressHeigth()} />
                <DataBlueInput
                  title={'??????'}
                  data={
                    meta?.body_types?.[meta?.body_types?.findIndex((v) => v?.key === profile?.body_type)]?.name || ''
                  }
                  onPressData={() => onPressBodyType()}
                />
              </View>
              <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
                  <CustomText style={{ flex: 0.35, fontSize: 16 }}>??????</CustomText>
                  <View style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      style={{ padding: 0, fontSize: 14, color: Color.GlamBlue }}
                      placeholderTextColor={Color.Gray2}
                      placeholder={'??????????????????'}
                      value={company}
                      onChangeText={(value) => setCompany(value)}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
                  <CustomText style={{ flex: 0.35, fontSize: 16 }}>??????</CustomText>
                  <View style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      style={{ padding: 0, fontSize: 14, color: Color.GlamBlue }}
                      placeholderTextColor={Color.Gray2}
                      placeholder={'??????????????????'}
                      value={job}
                      onChangeText={(value) => setJob(value)}
                    />
                  </View>
                </View>
                <DataBlueInput
                  title={'??????'}
                  data={
                    meta?.educations?.[meta?.educations?.findIndex((v) => v?.key === profile?.education)]?.name ||
                    '??????????????????'
                  }
                  color={
                    meta?.educations?.[meta?.educations?.findIndex((v) => v?.key === profile?.education)]?.name
                      ? ''
                      : Color.Gray2
                  }
                  onPressData={() => onPressEducate()}
                />
                <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
                  <CustomText style={{ flex: 0.35, fontSize: 16 }}>??????</CustomText>
                  <View style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      style={{ padding: 0, fontSize: 14, color: Color.GlamBlue }}
                      placeholderTextColor={Color.Gray2}
                      placeholder={'??????????????????'}
                      value={school}
                      onChangeText={(value) => setSchool(value)}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={2}
          maxToRenderPerBatch={1}
          windowSize={7}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
        {/* ================== ?????? ?????? ================== */}
      </View>
      {isOpenSelectHeightDialog && <SelectDialog title={'???'} data={heightData()} height={412} />}
      {isOpenSelectBodyTypeDialog && <SelectDialog title={'??????'} data={meta?.body_types} height={412} />}
      {isOpenSelectEducateDialog && <SelectDialog title={'??????'} data={meta?.educations} height={324} />}
    </>
  );
};
export default ProfileScreen;
