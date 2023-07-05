import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SearchIcon from '@svgs/search_icon';
import {fontPixel, pixelSizeHorizontal} from '@utils/normalize';

const SearchInput = ({
  placeholder,
  value,
  handleOnChange,
  handleOnSubmit,
}: {
  placeholder: string;
  value: string;
  handleOnChange: any;
  handleOnSubmit: any;
}) => {
  return (
    <View style={styles.input_wrapper}>
      <TextInput
        keyboardType="default"
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleOnChange}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          handleOnSubmit();
        }}>
        <View style={styles.search_btn}>
          <SearchIcon />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SearchInput;
const styles = StyleSheet.create({
  input_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#FAF9FC',
    borderRadius: 73,
  },
  input: {
    backgroundColor: 'transparent',
    width: '75%',
    height: '100%',
    color: 'rgba(104,104,104,0.6)',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    paddingHorizontal: pixelSizeHorizontal(15),
  },
  search_btn: {
    height: fontPixel(57),
    width: '25%',
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'center',
    backgroundColor: '#27AD80',
    borderRadius: 64,
  },
});
