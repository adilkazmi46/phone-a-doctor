import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import EyeIcon from '@svgs/eye_icon';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '@utils/normalize';
import TEXT from '@components/text';

const Text_input_field = ({
  label,
  handleOnChange,
  value,
  isSecure,
  RightIcon,
  isEditable,
  type,
  multiline,
}: {
  label: string;
  handleOnChange: any;
  value: string;
  isSecure: boolean;
  RightIcon?: any;
  type?: any;
  isEditable?: boolean;
  multiline?: boolean;
}) => {
  const [is_secure, setIsSecure] = useState(isSecure);

  const toggleIsSecure = () => {
    setIsSecure(!is_secure);
  };
  return (
    <View
      style={styles.wrapper}
      pointerEvents={isEditable === false ? 'none' : 'auto'}>
      <TEXT text_style={styles.label}>{label}</TEXT>
      <View
        style={
          multiline === true
            ? [styles.input_wrapper, styles.multi_line_input_wrapper]
            : styles.input_wrapper
        }>
        <TextInput
          style={
            multiline === true
              ? [styles.input, {textAlignVertical: 'top'}]
              : styles.input
          }
          secureTextEntry={is_secure}
          onChangeText={handleOnChange}
          value={value}
          editable={isEditable === false ? false : true}
          keyboardType={type ? type : 'default'}
          multiline={multiline ? multiline : false}
          numberOfLines={10}
        />
        {RightIcon ? (
          <TouchableOpacity onPress={toggleIsSecure}>
            {RightIcon === 'eye-icon' && isSecure === true ? <EyeIcon /> : null}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Text_input_field;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  label: {
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#373737',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
  },
  input_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#373737',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    marginTop: pixelSizeVertical(10),
    height: pixelSizeVertical(55),
    width: pixelSizeHorizontal(300),
    backgroundColor: '#FAF9FC',
    paddingHorizontal: pixelSizeHorizontal(10),
  },
  input: {
    color: '#373737',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    width: '90%',
    height: '100%',
    fontFamily: 'Poppins-Regular',
  },
  multi_line_input_wrapper: {
    height: heightPixel(255),

    alignItems: 'flex-start',
  },
});
