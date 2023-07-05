import React from 'react';
import {StyleSheet, Text} from 'react-native';

const TEXT = ({children, text_style}: {children: any; text_style: any}) => {
  return <Text style={[styles.text, text_style]}>{children}</Text>;
};

export default TEXT;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
  },
});
