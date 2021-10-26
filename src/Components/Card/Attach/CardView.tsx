import React from 'react';
import { View, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import { Color } from '@/Assets/Color';

const { width } = Dimensions.get('window');
const CardView = (props: any) => {
  const { images } = props;
  const imageCnt = images?.length || 0;
  if (imageCnt < 6) {
    switch (imageCnt) {
      case 1:
        return (
          <View style={{ width: width - 32, height: 343 }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={images[0].url ? { uri: images[0].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        );
      case 2:
        return (
          <View style={{ width: width - 32, height: 169, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '49.5%' }}>
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                source={images[0].url ? { uri: images[0].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ width: '49.5%', marginLeft: 5 }}>
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                source={images[1].url ? { uri: images[1].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={{ width: width - 32, height: 208, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '70%', height: '100%' }}>
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                source={images[0].url ? { uri: images[0].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ width: '30%', marginLeft: 5, height: '100%' }}>
              <View style={{ width: '100%', height: 208 / 2 - 2.5 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[1].url ? { uri: images[1].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ width: '100%', height: 208 / 2 - 2.5, marginTop: 5 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[2].url ? { uri: images[2].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </View>
        );
      case 4:
        return (
          <View style={{ width: width - 32, height: 208, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '80%', height: '100%' }}>
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                source={images[0].url ? { uri: images[0].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={{ width: '20%', marginLeft: 5, height: '100%' }}>
              <View style={{ width: '100%', height: 208 / 3 - 2.5 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[1].url ? { uri: images[1].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ width: '100%', height: 208 / 3 - 2.5, marginTop: 5 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[2].url ? { uri: images[2].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ width: '100%', height: 208 / 3 - 2.5, marginTop: 5 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[3].url ? { uri: images[3].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </View>
        );
      case 5:
        return (
          <View style={{ width: width - 32, height: 169 + 111 + 5, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', width: '100%', height: 169 }}>
              <View style={{ width: '50%', height: '100%' }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[0].url ? { uri: images[0].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ width: '50%', height: '100%', marginLeft: 5 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[1].url ? { uri: images[1].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 111 }}>
              <View style={{ width: '33%', height: '100%' }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[2].url ? { uri: images[2].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ width: '33%', height: '100%', marginLeft: 5 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[3].url ? { uri: images[3].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{ width: '33%', height: '100%', marginLeft: 5 }}>
                <FastImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={
                    images[4].url ? { uri: images[4].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')
                  }
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  } else if (imageCnt === 0) {
    return null;
  } else {
    const anotherCnt = imageCnt - 5 || 0;
    return (
      <View style={{ width: width - 32, height: 169 + 111 + 5, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', width: '100%', height: 169 }}>
          <View style={{ width: '50%', height: '100%' }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={images[0].url ? { uri: images[0].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{ width: '50%', height: '100%', marginLeft: 5 }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={images[1].url ? { uri: images[1].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', height: 111 }}>
          <View style={{ width: '33%', height: '100%' }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={images[2].url ? { uri: images[2].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{ width: '33%', height: '100%', marginLeft: 5 }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={images[3].url ? { uri: images[3].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{ width: '33%', height: '100%', marginLeft: 5 }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
              source={images[4].url ? { uri: images[4].url || '' } : require('@/Assets/Images/Common/imgDramaN.png')}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CustomText style={{ color: Color.White, fontSize: 14, letterSpacing: -0.2, fontWeight: 'bold' }}>
                {`+ ${anotherCnt}`}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default CardView;
