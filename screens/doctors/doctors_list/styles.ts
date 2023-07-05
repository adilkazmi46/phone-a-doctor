import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  doctors_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: pixelSizeHorizontal(37),
    paddingVertical: pixelSizeVertical(20),
  },
  title: {
    color: '#1c1c1c',
    fontSize: fontPixel(17),
    lineHeight: fontPixel(22),
    textTransform: 'capitalize',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: pixelSizeVertical(20),
  },
  dropdown_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: pixelSizeVertical(15),
    height: heightPixel(50),
    width: widthPixel(100),
  },
  dropdown_text: {
    color: '#27AD80',
    fontSize: fontPixel(13),
    lineHeight: fontPixel(18),
    textTransform: 'capitalize',
  },
  doctor_item: {
    width: widthPixel(300),
    height: heightPixel(87),
    marginVertical: pixelSizeVertical(8),
  },
  dropdown_arrow_wrapper: {
    width: widthPixel(10),
    height: heightPixel(10),
    marginLeft: pixelSizeHorizontal(10),
  },
  no_doctor_text: {},
});

export default styles;
