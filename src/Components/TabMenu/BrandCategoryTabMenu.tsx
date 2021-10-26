import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from '@/Assets/Color';
import { RepairState } from '@/Stores/Repair/InitialState';

const { width } = Dimensions.get('window');
const BrandCategoryTabMenu = (props: any) => {
  const { data = '33%' } = props;
  const { brandStep } = useSelector((state: RepairState) => state.repair);

  let brandWidth = '25%';
  if (brandStep === 1) {
    brandWidth = '33%';
  } else if (brandStep === 2) {
    brandWidth = '66%';
  } else if (brandStep === 3) {
    brandWidth = '100%';
  }
  return (
    <View style={{ height: 4, backgroundColor: Color.grayBg }}>
      <View style={{ position: 'absolute', top: 0, width: data, height: '100%' }}>
        <LinearGradient
          start={{ x: 2, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={[Color.Primary1000, '#fff8e3']}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      {/* <FlatList */}
      {/*  data={data} */}
      {/*  renderItem={({ item, index }) => { */}
      {/*    return ( */}
      {/*      <View */}
      {/*        style={{ */}
      {/*          width: width / 4, */}
      {/*          height: 4, */}
      {/*          backgroundColor: brandStep > item.idx ? Color.Primary1000 : undefined, */}
      {/*        }} */}
      {/*      > */}
      {/*        {brandStep > item.idx ? ( */}
      {/*          <LinearGradient */}
      {/*            start={{ x: 0, y: 0 }} */}
      {/*            end={{ x: 1, y: 0 }} */}
      {/*            colors={[Color.Primary1000, '#fff8e3']} */}
      {/*            style={{ width: '100%', height: '100%' }} */}
      {/*          /> */}
      {/*        ) : null} */}
      {/*      </View> */}
      {/*    ); */}
      {/*  }} */}
      {/*  keyExtractor={(item, index) => index.toString()} */}
      {/*  initialNumToRender={2} */}
      {/*  maxToRenderPerBatch={5} */}
      {/*  windowSize={7} */}
      {/*  horizontal */}
      {/*  contentContainerStyle={{ height: 4, backgroundColor: Color.grayBg, flexGrow: 1 }} */}
      {/* /> */}
    </View>
  );
};

export default BrandCategoryTabMenu;
