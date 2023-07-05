import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {fontPixel, heightPixel, widthPixel} from '@utils/normalize';

const SingleDigitInput = React.forwardRef(
  (
    {
      value,
      handleOnChange,
      onKeyPress,
    }: {
      value: string;
      handleOnChange: any;
      onKeyPress: any;
    },
    ref,
  ) => {
    return (
      <TextInput
        value={value}
        onChangeText={handleOnChange}
        keyboardType="decimal-pad"
        style={styles.input_field}
        maxLength={1}
        onKeyPress={(el: any) => {
          onKeyPress(el);
        }}
        //@ts-ignore
        ref={ref}
      />
    );
  },
);

export default SingleDigitInput;
const styles = StyleSheet.create({
  input_field: {
    width: widthPixel(32),
    borderBottomColor: '#686868',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    height: '100%',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textAlign: 'center',
  },
});
