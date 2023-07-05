import CheckboxTick from '@svgs/checkbox_tick';
import {heightPixel, widthPixel} from '@utils/normalize';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const CheckBox = ({isChecked}: {isChecked: boolean}) => {
  return (
    // <TouchableOpacity>
    <View
      style={
        isChecked === true
          ? [styles.checkbox_wrapper, styles.checked_checkbox_wrapper]
          : styles.checkbox_wrapper
      }>
      {isChecked === true ? <CheckboxTick /> : null}
    </View>
    // </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkbox_wrapper: {
    width: widthPixel(21),
    height: heightPixel(17),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1c1c1c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked_checkbox_wrapper: {
    borderColor: '#27AD80',
  },
});
