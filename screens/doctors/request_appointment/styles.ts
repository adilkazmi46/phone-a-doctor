import {
  widthPixel,
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  appointment_wrapper: {
    display: 'flex',
    flexDirection: 'column',   
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  appointments_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appointment_item_wrapper: {
    width: widthPixel(300),
    height: heightPixel(87),
    marginVertical: pixelSizeVertical(5),
    marginHorizontal: 'auto',
    elevation:2,
    backgroundColor:"white",
    paddingVertical:pixelSizeVertical(10),
    paddingHorizontal:pixelSizeHorizontal(10),
    borderRadius:15,
   display:"flex",
   flexDirection:"column",
   alignItems:"flex-start",
   justifyContent:"space-between" 
  },
  error_wrapper:{
    width:widthPixel(300),
    marginHorizontal:"auto",
    marginVertical:pixelSizeVertical(5)
  },
  confirm_text: {
    color: '#27AD80',
    fontSize: fontPixel(11),
    lineHeight: fontPixel(12),
    marginLeft: 'auto',
  },
  confirm_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // marginLeft: 'auto',  
    width: widthPixel(300),
    marginVertical: pixelSizeVertical(10),
    // marginRight: pixelSizeHorizontal(20),  
  },
  arrow_head_wrapper: {
    width: widthPixel(10),
    height: heightPixel(6),
    marginLeft: pixelSizeHorizontal(3),
  },
  label:{
    color:"black",
    fontSize:fontPixel(14),
    lineHeight:fontPixel(16)
  },
  value:{
    color:"black",
    fontSize:fontPixel(18),
    lineHeight:fontPixel(22) 
  }
});
export default styles;
