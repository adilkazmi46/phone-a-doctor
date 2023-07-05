import {
  fontPixel,
  pixelSizeVertical,
  widthPixel,
  heightPixel,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  page_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  welcome_wrapper: {
    justifyContent: 'center',
  },
  doctor_name: {
    marginTop: pixelSizeVertical(42),
    marginBottom: pixelSizeVertical(36),
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '500',
    color: '#1c1c1c',
    textTransform: 'capitalize',
  },
  description_text: {
    width: widthPixel(299),
    textAlign: 'center',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    color: '#1C1C1C',
    marginBottom: pixelSizeVertical(112),
  },
  btn_wrapper: {
    marginTop: pixelSizeVertical(141),
    height: heightPixel(54),
    width: widthPixel(283),
  },
  welcome_btn_wrapper: {
    marginTop: pixelSizeVertical(121),
    height: heightPixel(54),
    width: widthPixel(283),
  },
  welcome_description_text: {
    width: widthPixel(299),
    textAlign: 'center',
    fontSize: fontPixel(24),
    lineHeight: fontPixel(28),
    color: '#1C1C1C',
    height: 'auto',
    marginBottom: pixelSizeVertical(57),
  },
  welcome_pro_description_text: {
    fontSize: fontPixel(20),
    lineHeight: fontPixel(24),
  },
});
export default styles;
