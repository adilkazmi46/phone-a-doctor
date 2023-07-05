import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {fontPixel} from '@utils/normalize';
import TEXT from '@components/text';

const PrimaryButton = ({
  text,
  handleOnPress,
  _styles,
}: {
  text: string;
  handleOnPress: any;
  _styles?: any;
}) => {
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={[styles.btn_wrapper, _styles ? _styles : {}]}>
        <TEXT text_style={styles.text}>{text}</TEXT>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
const styles = StyleSheet.create({
  btn_wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27AD80',
    borderRadius: 15,
    width: '100%',
    height: '100%',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 10,
    },
  },
  text: {
    color: '#ffffff',
    fontSize: fontPixel(17),
    lineHeight: fontPixel(25),
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
