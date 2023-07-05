import {
  widthPixel,
  heightPixel,
  pixelSizeVertical,
  fontPixel,
  pixelSizeHorizontal,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  profile_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  profile_pic_wrapper: {
    width: widthPixel(88),
    height: heightPixel(107),
    marginVertical: pixelSizeVertical(30),
  },

  info_wrapper: {
    backgroundColor: 'rgba(39,173,128,0.1)',
    borderRadius: 8,
    width: widthPixel(300),
    height: heightPixel(35),
    marginVertical: pixelSizeVertical(2.5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    paddingHorizontal: pixelSizeHorizontal(6),
  },
  info_text: {
    color: '#27AD80',
    fontSize: fontPixel(10),
    lineHeight: fontPixel(18),
    textTransform: 'capitalize',
    textAlign: 'left',
    width: 'auto',
    flexWrap: 'nowrap',
    marginRight: 'auto',
  },
  edit_btn_wrapper: {
    width: widthPixel(221),
    height: heightPixel(51),
    marginVertical: pixelSizeVertical(10),
  },
  info_icon: {
    width: widthPixel(25),
    height: heightPixel(18.25),
    marginLeft: 'auto',
  },
  dropdown_icon: {
    width: widthPixel(9.26),
    height: heightPixel(16),
  },
  picker_wrapper: {
    display: 'none',
  },
  payment_information_title: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    marginVertical: pixelSizeVertical(25),
    textTransform: 'capitalize',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontWeight: '500',
  },
  input_wrapper: {
    marginVertical: pixelSizeVertical(10),
    width: '100%',
    height: heightPixel(100),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  about_wrapper: {
    height: heightPixel(300),
  },
  form_wrapper: {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  checkbox_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: pixelSizeVertical(10),
  },
  checkbox_label: {
    marginLeft: pixelSizeHorizontal(10),
    textTransform: 'capitalize',
    color: '#1c1c1c',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(16),
  },
  gender_label: {
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#373737',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
  },
  input_label: {
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#373737',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
  },

  buttonContainer: {
    marginTop: 20,
  },
});
export default styles;
