import React, { useEffect } from 'react';
import { View, Platform, StatusBar, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import { RouteProp } from '@react-navigation/native';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';
import { CommonState } from '@/Stores/Common/InitialState';
import CommonActions from '@/Stores/Common/Actions';
import CustomButton from '@/Components/CustomButton';
import { navigateGoBack } from '@/Services/NavigationService';
import { MainStackParamList } from '@/Navigators/MainNavigator';

interface TotalImageProps {
  route: RouteProp<MainStackParamList, 'TotalImageScreen'>;
}

const TotalImageScreen = ({ route }: TotalImageProps) => {
  const dispatch = useDispatch();
  const { startIdx } = route.params;
  const { totalImageList, heightInfo, totalImageType } = useSelector((state: CommonState) => state.common);
  const { width } = useWindowDimensions();
  // console.log(width);
  useEffect(() => {
    console.log('totalImageList', totalImageList);
    return () => {
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'totalImage',
          data: { totalImageType: '', totalImageList: [] },
        }),
      );
    };
  }, []);

  const ImageComponent = () => {
    if (totalImageList) {
      const items = totalImageList?.map((attach, i) => ({
        idx: i,
        url: totalImageType === 'review' ? attach.url : attach,
        width,
        height: totalImageType === 'placeDetail' ? (9 / 16) * width : width,
      }));
      return (
        <ImageViewer
          index={startIdx}
          imageUrls={items}
          renderIndicator={(currentIndex, allSize) => {
            return (
              <View
                style={{
                  position: 'absolute',
                  top: Platform.OS === 'ios' ? heightInfo.statusHeight : 0,
                  height: 44,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 24,
                  }}
                >
                  <CustomButton onPress={() => navigateGoBack()}>
                    <View style={{ width: 24, height: 24 }}>
                      <FastImage
                        style={{ width: '100%', height: '100%' }}
                        source={require('@/Assets/Images/Button/icCloseWhite.png')}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </CustomButton>

                  <View style={{}}>
                    <CustomText
                      style={{
                        fontSize: 15,
                        letterSpacing: -0.2,
                        fontWeight: '500',
                        color: Color.White,
                      }}
                    >
                      {currentIndex}
                      <CustomText
                        style={{
                          fontSize: 15,
                          fontWeight: 'normal',
                          letterSpacing: -0.2,
                          color: Color.White,
                        }}
                      >
                        {` / ${allSize}`}
                      </CustomText>
                    </CustomText>
                  </View>
                  <View style={{ width: 24 }} />
                </View>
              </View>
            );
          }}
          saveToLocalByLongPress={false}
        />
      );
    }
    return null;
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      {ImageComponent()}
    </View>
  );
};
export default TotalImageScreen;
