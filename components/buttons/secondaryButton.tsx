import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {fontPixel} from '@utils/normalize';
import TEXT from '@components/text';
const SecondaryButton = ({
  label,
  handleOnPress,
  btnStyle,
}: {
  label: string;
  handleOnPress: any;
  btnStyle?: any;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleOnPress();
      }}>
      <View
        style={
          btnStyle ? [styles.btn_wrapper, ...btnStyle] : [styles.btn_wrapper]
        }>
        <TEXT text_style={styles.text}>{label}</TEXT>
      </View>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles: any = StyleSheet.create({
  btn_wrapper: {
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.1,
    shadowColor: '#000000',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: fontPixel(17),
    lineHeight: fontPixel(25),
    color: '#27AD80',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
