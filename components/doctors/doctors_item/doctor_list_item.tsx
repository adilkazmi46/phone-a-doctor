import HeartSurgeon from '@svgs/heart_surgeon';
import EyeSpecialist from '@svgs/eye_specialist';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import Neurologist from '@svgs/neurologist';
import TEXT from '@components/text';
import Heart from '@svgs/heart';

const DoctorListItem = ({
  icon,
  name,
  title,
}: {
  icon: string;
  name: string;
  title: string;
}) => {
  const [isLike, setIsLike] = useState(false);
  return (
    <View style={styles.doctor_item_wrapper}>
      <View style={styles.img_wrapper}>
        {icon === null ? (
          <HeartSurgeon />
        ) : (
          <Image
            style={styles.img_wrapper}
            source={{
              uri: icon,
            }}
          />
        )}
      </View>
      <View style={styles.content_wrapper}>
        <TEXT text_style={styles.name}>{name}</TEXT>
        <TEXT text_style={styles.title}>{title}</TEXT>
      </View>
      <TouchableOpacity
        onPress={() => {
          setIsLike(!isLike);
        }}
        style={styles.like_btn_wrapper}>
        <Heart color={isLike === true ? '#DC3545' : 'transparent'} />
      </TouchableOpacity>
    </View>
  );
};

export default DoctorListItem;

const styles = StyleSheet.create({
  doctor_item_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    borderRadius: 13,
    backgroundColor: '#FAF9FC',

    paddingVertical: pixelSizeVertical(5.5),
    paddingHorizontal: pixelSizeHorizontal(21),
  },
  img_wrapper: {
    width: widthPixel(60),
    height: heightPixel(60),
    borderRadius: 60,
  },
  content_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: pixelSizeHorizontal(10),
  },
  name: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  title: {
    textTransform: 'capitalize',
    color: '#27AD80',
    fontSize: fontPixel(13),
    lineHeight: fontPixel(24),
  },
  like_btn_wrapper: {
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: pixelSizeVertical(13),
  },
});
