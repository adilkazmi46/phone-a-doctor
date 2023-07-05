import {
  widthPixel,
  heightPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  fontPixel,
} from '@utils/normalize';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  all_categories_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    paddingTop: pixelSizeVertical(20),
  },
  search_input_wrapper: {
    width: widthPixel(302),
    height: heightPixel(65),
    marginBottom: pixelSizeVertical(35),
  },
  category: {
    backgroundColor: 'rgba(39,173,128,0.1)',
    borderRadius: 13,
    width: widthPixel(300),
    minHeight: heightPixel(78),
    paddingHorizontal: pixelSizeHorizontal(11),
    paddingVertical: pixelSizeVertical(17),
    marginVertical: pixelSizeVertical(10),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  category_text: {
    color: '#000000',
    fontSize: fontPixel(18),
    lineHeight: fontPixel(27),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
export default styles;
