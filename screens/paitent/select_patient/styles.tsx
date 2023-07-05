import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  select_patient_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: pixelSizeHorizontal(38),
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  title: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    marginBottom: pixelSizeVertical(21),
    textTransform: 'capitalize',
  },
  info_wrapper: {
    width: widthPixel(300),
    height: heightPixel(135),
  },
  add_patient_wrapper: {
    width: widthPixel(300),
    height: heightPixel(100),
    marginVertical: pixelSizeVertical(10),
  },
});
export default styles;
