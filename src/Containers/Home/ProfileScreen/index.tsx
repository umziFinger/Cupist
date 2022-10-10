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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header text={'프로필 수정'} type={'back'} />
      <FlatList
        data={[0]}
        renderItem={({ item, index }) => (
          <View>
            <View>
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
                  다양한 매력을 보여줄 수 있는 사진을 올려주세요
                </CustomText>
                <CustomButton style={{ marginLeft: 4 }}>
                  <CustomText style={{ fontSize: 12, fontWeight: '600', color: Color.DarkGray1 }}>
                    더 알아보기
                  </CustomText>
                </CustomButton>
              </View>
            </View>
            <View
              style={{ paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderColor: Color.Gray300 }}
            >
              <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
                <CustomText style={{ flex: 0.35, fontSize: 16 }}>닉네임</CustomText>
                <View style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                  <CustomText style={{ fontSize: 16, color: Color.GlamBlue }}>라로앙</CustomText>
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
                <CustomText style={{ flex: 0.35, fontSize: 16 }}>성별</CustomText>
                <CustomButton style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                  <CustomText style={{ fontSize: 16, color: Color.GlamBlue }}>
                    {profile?.gender === 'F' ? '여성' : '남성'}
                  </CustomText>
                </CustomButton>
              </View>
              <DataBlueInput title={'생일'} data={profile?.birthday} />
              <DataBlueInput title={'위치'} data={profile?.location} />
            </View>
            <View
              style={{ paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: Color.Gray300 }}
            >
              <View style={{ height: 35, justifyContent: 'center' }}>
                <CustomText style={{ fontSize: 16 }}>소개</CustomText>
              </View>

              <TextInput
                style={{ padding: 0, fontSize: 14 }}
                placeholderTextColor={Color.Gray2}
                placeholder={'회원님의 매력을 간단하게 소개해주세요'}
                value={introduce}
                onChangeText={(value) => setIntroduce(value)}
              />
              <View style={{ height: 33, justifyContent: 'center' }}>
                <CustomText style={{ fontSize: 12, color: Color.Gray4 }}>
                  SNS 아이디 등 연락처 입력 시 서비스 이용 제한됩니다
                </CustomText>
              </View>
            </View>
            <View
              style={{ paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: Color.Gray300 }}
            >
              <DataBlueInput title={'키'} data={`${profile?.height}cm`} onPressData={() => onPressHeigth()} />
              <DataBlueInput
                title={'체형'}
                data={meta?.body_types?.[meta?.body_types?.findIndex((v) => v?.key === profile?.body_type)]?.name || ''}
                onPressData={() => onPressBodyType()}
              />
            </View>
            <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
              <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
                <CustomText style={{ flex: 0.35, fontSize: 16 }}>직장</CustomText>
                <View style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    style={{ padding: 0, fontSize: 16, color: Color.GlamBlue }}
                    placeholderTextColor={Color.Gray2}
                    placeholder={'입력해주세요'}
                    value={company}
                    onChangeText={(value) => setCompany(value)}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
                <CustomText style={{ flex: 0.35, fontSize: 16 }}>직업</CustomText>
                <View style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    style={{ padding: 0, fontSize: 16, color: Color.GlamBlue }}
                    placeholderTextColor={Color.Gray2}
                    placeholder={'입력해주세요'}
                    value={job}
                    onChangeText={(value) => setJob(value)}
                  />
                </View>
              </View>
              <DataBlueInput
                title={'학력'}
                data={
                  meta?.educations?.[meta?.educations?.findIndex((v) => v?.key === profile?.education)]?.name ||
                  '선택해주세요'
                }
                color={
                  meta?.educations?.[meta?.educations?.findIndex((v) => v?.key === profile?.education)]?.name
                    ? ''
                    : Color.Gray2
                }
                onPressData={() => onPressEducate()}
              />
              <View style={{ flexDirection: 'row', height: 44, alignItems: 'center' }}>
                <CustomText style={{ flex: 0.35, fontSize: 16 }}>학교</CustomText>
                <View style={{ flex: 0.65, flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    style={{ padding: 0, fontSize: 16, color: Color.GlamBlue }}
                    placeholderTextColor={Color.Gray2}
                    placeholder={'입력해주세요'}
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
      {isOpenSelectHeightDialog && <SelectDialog title={'키'} data={heightData()} height={412} />}
      {isOpenSelectBodyTypeDialog && <SelectDialog title={'체형'} data={meta?.body_types} height={412} />}
      {isOpenSelectEducateDialog && <SelectDialog title={'학력'} data={meta?.educations} height={412} />}
    </View>
  );
};
export default ProfileScreen;
