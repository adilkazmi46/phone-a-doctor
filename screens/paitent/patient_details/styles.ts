import {
  widthPixel,
  heightPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  fontPixel,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  patient_details_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: pixelSizeHorizontal(36),
  },
  patient_info_wrapper: {
    width: widthPixel(300),
    height: heightPixel(135),
    marginTop: pixelSizeVertical(86),
  },
  info_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: pixelSizeVertical(12),
  },
  info_text_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPixel(295),
    height: heightPixel(48),
    borderRadius: 13,
    backgroundColor: 'rgba(39,173,128,0.1)',
    paddingHorizontal: pixelSizeHorizontal(10),
    marginTop: pixelSizeVertical(15),
  },
  label: {
    color: '#373737',
    textTransform: 'capitalize',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
    fontWeight: '500',
  },
  text: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
  },
  picker_test: {
    fontSize: fontPixel(14),
    lineHeight: fontPixel(18),
    color: '#686868',
    textTransform: 'capitalize',
  },
  picker_wrapper: {
    display: 'none',
  },
  pic_input_text: {
    fontSize: fontPixel(10),
    lineHeight: fontPixel(15),
  },
  upload_wrapper: {
    height: heightPixel(57),
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  payment_method_wrapper: {
    height: heightPixel(78),
    borderRadius: 13,
    justifyContent: 'space-around',
    marginBottom: pixelSizeVertical(20),
  },
  payment_method_text: {
    fontSize: fontPixel(18),
    lineHeight: fontPixel(24),
    color: '#1c1c1c',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  diseases_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    height: heightPixel(300),
    width: '100%',
    marginTop: pixelSizeVertical(25),
  },
  diseases_checkbox: {
    width: '100%',
  },
  checkboxes_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  checkbox_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: pixelSizeVertical(5),
  },
  checkbox_label: {
    color: '#686868',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
    textTransform: 'capitalize',
    marginLeft: pixelSizeHorizontal(6),
  },
  selected_checkbox_label: {
    color: '#27AD80',
  },
});

export default styles;
