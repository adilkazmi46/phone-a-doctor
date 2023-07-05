import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MenuBar from '@svgs/menu_bar';
import ProfileHeaderIcon from '@svgs/profile_header_icon';
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';

const Header = ({handleSideBarToggle}: {handleSideBarToggle: any}) => {
  return (
    <View style={styles.header_wrapper}>
      <TouchableOpacity>
        <View style={styles.menu_bar}>
          <MenuBar />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSideBarToggle}>
        <View style={styles.profile_header_icon_wrapper}>
          <ProfileHeaderIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header_wrapper: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: pixelSizeVertical(50),
  },
  menu_bar: {
    width: widthPixel(26.23),
    height: heightPixel(11),
  },
  profile_header_icon_wrapper: {
    width: widthPixel(41.48),
    height: heightPixel(41.24),
  },
});
