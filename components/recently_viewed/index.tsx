import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import TEXT from '@components/text';

const RecentlyViewed = () => {
  return (
    <View style={styles.recently_viewed_wrapper}>
      <TEXT text_style={styles.title}>Recently Viewed</TEXT>
      <View style={styles.images_wrapper}>
        <View style={styles.item_wrapper}>
          <Image
            source={require('../../assets/images/pic_1.png')}
            resizeMode="contain"
          />
          <View style={styles.online_dot}></View>
        </View>
        <View style={styles.item_wrapper}>
          <Image
            source={require('../../assets/images/pic_2.png')}
            resizeMode="contain"
          />
          <View style={styles.online_dot}></View>
        </View>
        <View style={styles.item_wrapper}>
          <Image
            source={require('../../assets/images/pic_3.png')}
            resizeMode="contain"
          />
          <View style={styles.online_dot}></View>
        </View>
        <View style={styles.item_wrapper}>
          <Image
            source={require('../../assets/images/pic_1.png')}
            resizeMode="contain"
          />
          <View style={styles.online_dot}></View>
        </View>
        <View style={styles.item_wrapper}>
          <Image
            source={require('../../assets/images/pic_2.png')}
            resizeMode="contain"
          />
          <View style={styles.online_dot}></View>
        </View>
        <View style={styles.item_wrapper}>
          <Image
            source={require('../../assets/images/pic_3.png')}
            resizeMode="contain"
          />
          <View style={styles.online_dot}></View>
        </View>
      </View>
    </View>
  );
};

export default RecentlyViewed;

const styles = StyleSheet.create({
  recently_viewed_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '500',
  },
  images_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: pixelSizeVertical(21),
  },
  item_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: pixelSizeHorizontal(1),
  },
  online_dot: {
    width: widthPixel(10),
    height: heightPixel(10),
    backgroundColor: '#27AD80',
    borderRadius: 10,
    marginLeft: pixelSizeHorizontal(-10),
    marginTop: pixelSizeVertical(2),
  },
});
