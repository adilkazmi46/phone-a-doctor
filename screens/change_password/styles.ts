import {StyleSheet} from 'react-native';
import {
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../../utils/normalize';

const styles = StyleSheet.create({
  change_password_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  input_field_wrappper: {
    width: widthPixel(300),
    height: heightPixel(95),
    marginVertical: pixelSizeVertical(17),
  },
  btn_wrapper: {
    marginTop: pixelSizeVertical(62),
    width: widthPixel(300),
    height: heightPixel(60),
  },
});

export default styles;
