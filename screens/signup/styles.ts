import {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
  heightPixel,
  fontPixel,
} from '../../utils/normalize';

const styles = StyleSheet.create({
  signup_wrapper: {
    backgroundColor: '#FAF9FC',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: pixelSizeHorizontal(20),
    width: '100%',
    height: '100%',
    flex: 1,
  },
  bg_white: {
    backgroundColor: '#ffffff',
  },

  signup_type_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: pixelSizeVertical(40),
    width: '100%',
  },
  type_item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: widthPixel(142),
    height: heightPixel(167),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: pixelSizeVertical(16),
  },
  patient_icon_wrapper: {
    width: widthPixel(80),
    height: heightPixel(80),
    borderRadius: 80,
    backgroundColor: '#FAF9FC',
    paddingHorizontal: pixelSizeHorizontal(14),
    paddingVertical: pixelSizeVertical(13),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  type: {
    color: '#1C1C1C',
    fontSize: fontPixel(12),
    lineHeight: fontPixel(16),
    textTransform: 'capitalize',
    marginTop: pixelSizeVertical(16),
    fontWeight: 'bold',
  },
  signup_text: {
    color: '#27AD80',
    fontSize: fontPixel(10),
    lineHeight: fontPixel(13),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#27AD80',
    marginTop: pixelSizeVertical(10),
  },
});

export default styles;
