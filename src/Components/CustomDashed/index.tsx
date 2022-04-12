import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const CustomDashed = ({
  axis = 'horizontal',
  dashGap = 2,
  dashLength = 4,
  dashThickness = 2,
  dashColor = '#000',
  dashStyle,
  style,
}: any) => {
  const [lineLength, setLineLength] = useState(0);
  const isRow = axis === 'horizontal';
  const numOfDashes = Math.ceil(lineLength / (dashGap + dashLength));

  return (
    <View
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setLineLength(isRow ? width : height);
      }}
      style={[style, isRow ? styles.row : styles.column]}
    >
      {[...Array(numOfDashes)].map((_, i) => {
        // eslint-disable-next-line react/no-array-index-key
        return (
          <View
            key={i.toString()}
            style={[
              {
                width: isRow ? dashLength : dashThickness,
                height: isRow ? dashThickness : dashLength,
                marginRight: isRow ? dashGap : 0,
                marginBottom: isRow ? 0 : dashGap,
                backgroundColor: dashColor,
              },
              dashStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});

export default CustomDashed;
