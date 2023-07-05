import {
  widthPixel,
  heightPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  fontPixel,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  doctor_details_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    paddingHorizontal: pixelSizeHorizontal(38),
    paddingVertical: pixelSizeVertical(34),
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: heightPixel(107),
  },
  profile_pic_wrapper: {
    width: widthPixel(107),
    height: heightPixel(107),
  },
  profile_pic:{
    width: widthPixel(88),
    height: heightPixel(88),
    borderRadius:44  
  },
  header_content_wrapper: {
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
    textTransform: 'capitalize',
    fontSize: fontPixel(13),
    lineHeight: fontPixel(24),
    marginBottom: pixelSizeVertical(7),
  },
  request_appointment_wrapper: {
    width: widthPixel(160),
    height: heightPixel(33.33),
    borderRadius: 8,
    backgroundColor: 'rgba(39,173,128,0.1)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendar_icon: {
    width: widthPixel(18),
    height: heightPixel(18),
    marginLeft: pixelSizeHorizontal(9),
  },
  request_appointment_text: {
    color: '#27AD80',
    fontSize: fontPixel(10),
    lineHeight: fontPixel(13),
    textTransform: 'capitalize',
    marginLeft: pixelSizeHorizontal(9),
  },
  about_title: {
    color: '#1c1c1c',
    fontSize: fontPixel(18),
    lineHeight: fontPixel(24),
    marginTop: pixelSizeVertical(40),
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  about_details: {
    color: '#686868',
    fontSize: fontPixel(12),
    lineHeight: 18,
    fontWeight: '300',
    marginTop: pixelSizeVertical(12),
    width: widthPixel(300),
    marginBottom: pixelSizeVertical(16),
  },
  info_wrapper: {
    backgroundColor: 'rgba(39,173,128,0.1)',
    width: widthPixel(300),
    height: heightPixel(35),
    borderRadius: 8,
    paddingHorizontal: pixelSizeHorizontal(12),
    paddingVertical: pixelSizeVertical(8),
    marginVertical: pixelSizeVertical(3),
  },
  info_text: {
    color: '#27AD80',
    fontSize: fontPixel(10),
    lineHeight: fontPixel(18),
    textTransform: 'capitalize',
  },
});
export default styles;
