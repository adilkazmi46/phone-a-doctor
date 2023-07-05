import TEXT from '@components/text';
import {Picker} from '@react-native-picker/picker';
import DropdownArrow from '@svgs/dropdown_arrow';
import UsaFlagSmall from '@svgs/usa_flag_small';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useRef, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const LangPicker = () => {
  const [selectecLang, setSelectedLang] = useState('eng');
  const [langs, setLangs] = useState([
    {label: 'english', value: 'english'},
    {label: 'arabic', value: 'arabic'},
    {label: 'hindi', value: 'hindi'},
  ]);
  const lang_ref_android: any = useRef();
  const lang_ref_ios: any = useRef();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            lang_ref_android.current.focus();
          } else if (Platform.OS === 'ios') {
            lang_ref_ios.current.togglePicker(true);
          }
        }}>
        <View style={styles.lang_select}>
          <TEXT text_style={styles.lang_select_text}>Select Language</TEXT>

          <View style={styles.dropdown_icon_wrapper}>
            <DropdownArrow color="#1c1c1c" />
          </View>
          <View style={styles.flag_wrapper}>
            <UsaFlagSmall />
          </View>
        </View>
      </TouchableOpacity>
      {Platform.OS === 'android' ? (
        <View style={styles.picker}>
          <Picker
            ref={lang_ref_android}
            dropdownIconColor="#1c1c1c"
            selectedValue={selectecLang}
            onValueChange={(itemValue: string, itemIndex: number) =>
              setSelectedLang(itemValue)
            }>
            {langs.map((item: any, index: number) => {
              return (
                <Picker.Item
                  value={item.value}
                  label={item.label}
                  key={index}
                  fontFamily="Poppins-Regular"
                />
              );
            })}
          </Picker>
        </View>
      ) : null}
      {Platform.OS === 'ios' ? (
        <RNPickerSelect
          items={langs}
          ref={lang_ref_ios}
          style={{
            inputIOS: {
              display: 'none',
            },
          }}
          onValueChange={async (itemValue, itemIndex) => {
            await setSelectedLang(itemValue);
          }}></RNPickerSelect>
      ) : null}
    </>
  );
};

export default LangPicker;
const styles = StyleSheet.create({
  lang_select: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pixelSizeVertical(24),
    justifyContent: 'flex-start',
    height: pixelSizeVertical(20),
  },
  lang_select_text: {
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
  },
  picker: {
    display: 'none',
  },
  dropdown_icon_wrapper: {
    width: widthPixel(10),
    height: heightPixel(6),
    marginLeft: pixelSizeHorizontal(5),
    textTransform: 'capitalize',
  },
  flag_wrapper: {
    width: widthPixel(15),
    height: heightPixel(15),
    marginLeft: pixelSizeHorizontal(15),
  },
});
