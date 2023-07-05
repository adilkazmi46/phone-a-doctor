import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import UsaFlagIcon from '@svgs/usa_flag';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '@utils/normalize';
import TEXT from '@components/text';
import CountryFlag from 'react-native-country-flag';

const Phone_input_field = ({
  label,
  handleOnChange,
  value,
  country,
}: {
  label: string;
  handleOnChange: any;
  value: string;
  country?: string;
}) => {
  return (
    <View style={styles.wrapper}>
      <TEXT text_style={styles.label}>{label}</TEXT>
      <View style={styles.input_wrapper}>
        {country && country.length > 0 ? (
          <CountryFlag isoCode={country} size={25} />
        ) : null}
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          onChangeText={handleOnChange}
          value={value}
        />
      </View>
    </View>
  );
};

export default Phone_input_field;

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
    marginLeft: pixelSizeHorizontal(5),
    fontFamily: 'Poppins-Regular',
  },
});
