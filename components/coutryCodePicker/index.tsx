import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useRef, useState} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import CountryFlag from 'react-native-country-flag';
import TEXT from '@components/text';
import CheckBox from '@components/checkbox';

const CountryCodeModal = ({
  selectedCountryCode,
  setSelectedCountryCode,
  countries,
  showModal,
}: {
  countries: any;
  selectedCountryCode: any;
  setSelectedCountryCode: any;
  showModal: boolean;
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={true}>
        <View style={styles.modal_wrapper}>
          <View style={[styles.centeredView, styles.modal_body]}>
            <TEXT text_style={styles.title}>Country Codes:</TEXT>
            <View style={styles.country_codes_wrapper}>
              {countries.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCountryCode({...item, index: index});
                    }}
                    key={index}
                    style={styles.country_code_item}>
                    <CheckBox
                      isChecked={
                        //@ts-ignore
                        selectedCountryCode.country_code ===
                          item.country_code &&
                        //@ts-ignore
                        selectedCountryCode.country_name ===
                          item.country_name &&
                        //@ts-ignore
                        selectedCountryCode.phone_code === item.phone_code
                          ? true
                          : false
                      }
                    />
                    <TEXT text_style={styles.text}>
                      {item.country_name + ': ' + item.phone_code}
                    </TEXT>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default CountryCodeModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  modal_wrapper: {
    backgroundColor: 'rgba(57,72,85,0.9)',
    flex: 1,
  },
  modal_body: {
    backgroundColor: 'white',
    width: widthPixel(280),
    height: heightPixel(500),
    borderRadius: 10,
    position: 'absolute',
    top: 100,
    left: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tick_wrapper: {
    width: widthPixel(120),
    height: heightPixel(120),
    marginTop: pixelSizeVertical(60),
  },
  title: {
    fontSize: fontPixel(18),
    lineHeight: fontPixel(22),
    textTransform: 'capitalize',
    color: 'black',
    marginVertical: pixelSizeVertical(10),
  },
  text: {
    color: '#1c1c1c',
    fontSize: fontPixel(15),
    lineHeight: fontPixel(20),
    textAlign: 'center',
    marginLeft: pixelSizeHorizontal(20),
    textTransform: 'capitalize',
  },
  btn_wrapper: {
    width: widthPixel(80),
    height: heightPixel(24),
    backgroundColor: '#27AD80',
    borderRadius: 5,
    elevation: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    color: '#ffffff',
    fontSize: fontPixel(12),
    lineHeight: fontPixel(16),
    textTransform: 'uppercase',
  },
  country_codes_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '90%',
  },
  country_code_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: pixelSizeVertical(10),
    height: heightPixel(25),
    width: '100%',
  },
});
