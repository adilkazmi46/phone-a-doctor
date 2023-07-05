import {
  widthPixel,
  heightPixel,
  pixelSizeHorizontal,
  fontPixel,
  pixelSizeVertical,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  all_appointments_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: pixelSizeHorizontal(37),
    flex: 1,
    width: '100%',
  },
  profile_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: pixelSizeVertical(33),
  },
  content_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: pixelSizeHorizontal(27),
    marginTop: pixelSizeVertical(20),
  },
  name: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  title: {
    color: '#686868',
    fontSize: fontPixel(13),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
  },
  call_btn_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  call_btn: {
    width: widthPixel(35),
    height: heightPixel(35),
    marginHorizontal: pixelSizeHorizontal(7.5),
  },
  profile_pic: {
    width: widthPixel(88),
    height: heightPixel(88),
    borderRadius: 44,
  },
  appointment_label: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
    marginTop: pixelSizeVertical(38),
    alignSelf: 'flex-start',
    fontWeight: '500',
    marginBottom: pixelSizeVertical(11.5),
  },
  appointment_item: {
    width: widthPixel(300),
    height: heightPixel(87),
    marginVertical: pixelSizeVertical(25),
  },
});

export default styles;
