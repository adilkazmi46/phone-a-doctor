import TEXT from '@components/text';
import GreenArrowRight from '@svgs/greenArrowRight';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Patient_Info_24_7 = ({
  isIcon,
  user,
  age,
  status,
}: {
  isIcon: boolean;
  user: any;
  age: number;
  status: string;
}) => {
  return (
    <View style={styles.patient_info}>
      <View style={styles.patient_content}>
        <TEXT text_style={styles.info_header}>{user.userType}</TEXT>
        <TEXT text_style={styles.name}>{user.full_name}</TEXT>

        <TEXT text_style={styles.info_header}>
          {user.gender} | {age} years |{' '}
          {user.userType === 'patient' ? user.patient.weight + ' kg' : null}
        </TEXT>
      </View>
      {isIcon === true ? (
        <View style={styles.icon_wrapper}>
          <TEXT text_style={styles.icon_text}>{status}</TEXT>
          <View style={styles.info_icon}>
            <GreenArrowRight />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Patient_Info_24_7;

const styles = StyleSheet.create({
  patient_info: {
    height: heightPixel(110),
    width: widthPixel(300),
    borderRadius: 13,
    backgroundColor: 'rgba(39,173,128,0.1)',
    paddingVertical: pixelSizeVertical(15),
    paddingHorizontal: pixelSizeHorizontal(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: pixelSizeVertical(15),
  },
  info_header: {
    color: '#686868',
    fontSize: fontPixel(13),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
  },
  header_content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  patient_content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  icon_wrapper: {
    width: widthPixel(82),
    height: heightPixel(56),
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#27AD80',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: pixelSizeVertical(10),
  },
  icon_text: {
    color: '#27AD80',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
  },
  info_icon: {
    width: widthPixel(33),
    height: heightPixel(13.21),
  },
});
