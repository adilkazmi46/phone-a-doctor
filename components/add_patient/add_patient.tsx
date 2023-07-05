import TEXT from '@components/text';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const AddPatient = () => {
  return (
    <View style={styles.add_patient_wrapper}>
      <TEXT text_style={[styles.text, {lineHeight: fontPixel(36)}]}>+</TEXT>
      <TEXT text_style={styles.text}>add new patient</TEXT>
    </View>
  );
};

export default AddPatient;
const styles = StyleSheet.create({
  add_patient_wrapper: {
    backgroundColor: 'rgba(39,173,128,0.1)',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 13,
    paddingHorizontal: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeVertical(10),
  },
  text: {
    fontWeight: 'bold',
    fontSize: fontPixel(24),
    lineHeight: fontPixel(24),
    color: '#1c1c1c',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
