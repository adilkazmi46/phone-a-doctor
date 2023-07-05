import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import TEXT from '@components/text';

const Offers = () => {
  return (
    <View style={styles.offers_wrapper}>
      <TEXT text_style={styles.title}>offers</TEXT>

      <View style={styles.offer_card}>
        <Image
          source={require('@images/Offer-New.png')}
          resizeMode="cover"
          style={styles.img}
        />
      </View>
    </View>
  );
};

export default Offers;

const styles = StyleSheet.create({
  offers_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  offer_card: {
    width: widthPixel(314),
    height: heightPixel(161),
    marginTop: pixelSizeVertical(13),
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
