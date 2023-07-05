import {StyleSheet} from 'react-native';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../utils/normalize';

const styles = StyleSheet.create({
  verify_wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  phone_code_icon: {
    width: widthPixel(80),
    height: heightPixel(80),
    marginTop: pixelSizeVertical(36),
  },
  verification_text: {
    color: '#686868',
    textAlign: 'center',
    fontSize: fontPixel(13),
    lineHeight: fontPixel(16),
    width: widthPixel(278),
    marginTop: pixelSizeVertical(37),
  },
  input_fields_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: widthPixel(300),
    marginTop: pixelSizeVertical(40),
  },
  submit_btn_wrapper: {
    width: widthPixel(300),
    height: heightPixel(60),
    marginTop: pixelSizeVertical(30),
  },
  bottom_text: {
    color: '#1c1c1c',
    marginTop: pixelSizeVertical(6),
    fontSize: fontPixel(15),
    lineHeight: fontPixel(22),
  },
  bottom_bold_text: {
    textDecorationLine: 'underline',
    textDecorationColor: '#27AD80',
    color: '#27AD80',
  },
});

export default styles;
