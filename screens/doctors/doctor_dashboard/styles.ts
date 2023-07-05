import {
  fontPixel,
  pixelSizeVertical,
  widthPixel,
  heightPixel,
  pixelSizeHorizontal,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  doctors_dashboard_wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '100%',
    
  },
  title: {
    color: '#1c1c1c',
    fontSize: fontPixel(24),
    lineHeight: fontPixel(36),
    textTransform: 'capitalize',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appointments_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: heightPixel(205),
    width: widthPixel(325),
    marginHorizontal: 'auto',
  },
  appointment_item_wrapper: {
    width: widthPixel(300),
    height: heightPixel(87),
    marginVertical: pixelSizeVertical(5),
  },
  appointment_label: {
    marginVertical: pixelSizeVertical(40),
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
    color: '#1c1c1c',
    fontWeight: '500',
  },
});

export default styles;
