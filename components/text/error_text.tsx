import {fontPixel, pixelSizeVertical} from '@utils/normalize';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

const ErrorTEXT = ({children}: {children: any}) => {
  return <Text style={[styles.text]}>{children}</Text>;
};

export default ErrorTEXT;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
  },
});
