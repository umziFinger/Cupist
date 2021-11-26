import React from 'react';
import { ImageRequireSource, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '@/Components/CustomText';
import CustomButton from '@/Components/CustomButton';

interface CustomCheckBox {
  type: any;
  value: boolean;
  onValueChange: Function;
  enableIcon: ImageRequireSource;
  disableIcon: ImageRequireSource;
}
function CustomCheckBox(props: CustomCheckBox) {
  const { value, onValueChange, type, disableIcon, enableIcon } = props;
  // console.log('oncheck', onCheck);
  const onClick = () => {
    const returnValue = {
      checkType: type,
      value: !value,
    };
    return onValueChange(returnValue);
  };
  return (
    <CustomButton onPress={() => onClick()}>
      <View style={{ width: 22, height: 22 }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={value ? enableIcon : disableIcon}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </CustomButton>
  );
}
export default CustomCheckBox;
