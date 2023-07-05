import {
  heightPixel,
  widthPixel,
  pixelSizeVertical,
  fontPixel,
} from '../../utils/normalize';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  splash_wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#27AD80',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  doctor_bg_wrapper: {
    width: widthPixel(307),
    height: heightPixel(307),
    marginTop: pixelSizeVertical(141),
  },
  doctor_24_7_white: {
    width: widthPixel(205),
    height: heightPixel(103),
    marginTop: pixelSizeVertical(35),
  },
  btn_wrapper: {
    width: widthPixel(300),
    height: heightPixel(60),
    marginTop: pixelSizeVertical(48),
  },
  login_text: {
    color: '#1C1C1C',
    fontSize: fontPixel(15),
    lineHeight: fontPixel(22),
    textAlign: 'center',
    marginTop: pixelSizeVertical(8),
  },
  underline_text: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: '#1C1C1C',
  },
});

export default styles;
