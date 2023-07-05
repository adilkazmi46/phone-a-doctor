import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  connect_doc_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
  },
  profile_pic_wrapper: {
    width: widthPixel(88),
    height: heightPixel(107),
    marginTop: pixelSizeVertical(18),
  },
  name: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '500',
    textTransform: 'capitalize',
    marginTop: pixelSizeVertical(15),
  },
  title: {
    color: '#686868',
    fontSize: fontPixel(13),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
  },
  tag_line: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '700',
    textAlign: 'center',
  },
  timer_text: {
    marginTop: pixelSizeVertical(68),
  },
  timmer_wrapper: {
    width: widthPixel(144),
    height: heightPixel(144),
    borderRadius: 144,
    borderColor: '#000000',
    borderWidth: 2,
    borderStyle: 'dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pixelSizeVertical(30),
  },
  time: {
    fontSize: fontPixel(24),
    lineHeight: fontPixel(36),
    color: '#1c1c1c',
    fontWeight: 'bold',
  },
  alert: {
    backgroundColor: 'rgba(250,44,155,0.27)',
    borderRadius: 13,
    width: widthPixel(300),
    height: heightPixel(78),
    marginTop: pixelSizeVertical(118),
    marginBottom: pixelSizeVertical(20),
    paddingHorizontal: pixelSizeHorizontal(32),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alert_text: {
    fontSize: fontPixel(16),
    color: '#1c1c1c',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: fontPixel(24),
  },
});

export default styles;
