import TEXT from '@components/text';
import EditIcon from '@svgs/edit_icon';
import ProfileInfoPic from '@svgs/profile_info_pic';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

const PatientInfo = () => {
  const user = useSelector((state: any) => {
    return state.user;
  });
  const [age, setAge] = useState(0);
  useEffect(() => {
    var today = new Date();
    var birthDate = new Date(user.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  }, []);

  return (
    <View style={styles.patient_info_wrapper}>
      <View style={styles.content_wrapper}>
        <TEXT text_style={styles.name}>{user.full_name}</TEXT>
        <TEXT text_style={styles.info_text}>{user.gender}</TEXT>
        <View style={styles.kg_wrapper}>
          <TEXT text_style={styles.info_text}>{user.patient.weight} kg</TEXT>
          <View style={styles.edit_icon_wrapper}>
            {/* <EditIcon color={'green'} /> */}
          </View>
        </View>
      </View>
      <View style={styles.profile_section_wrapper}>
        <View style={styles.profile_icon}>
          <ProfileInfoPic />
        </View>
        <TEXT text_style={styles.vertical_bar}>|</TEXT>
        <TEXT text_style={styles.vertical_bar}>|</TEXT>
      </View>
      <View style={styles.content_wrapper}>
        <TEXT text_style={styles.name}> </TEXT>
        <TEXT text_style={[styles.info_text]}>{age} years</TEXT>
        <TEXT text_style={styles.info_text}>
          {user.patient.height.ft} feet {user.patient.height.inches} inches
        </TEXT>
      </View>
    </View>
  );
};

export default PatientInfo;

const styles = StyleSheet.create({
  patient_info_wrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    backgroundColor: 'rgba(39,173,128,0.1)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: pixelSizeHorizontal(13),
    paddingVertical: pixelSizeVertical(9),
  },
  profile_icon: {
    width: widthPixel(33),
    height: heightPixel(31),
    marginBottom: pixelSizeVertical(27),
  },
  content_wrapper: {
    display: 'flex',
    flexDirection: 'column',

    marginTop: pixelSizeVertical(8),
  },
  content_pic_wrapper: {
    width: widthPixel(33),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    color: '#1c1c1c',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: pixelSizeVertical(25),
  },
  kg_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  age: {},
  info_text: {
    color: '#686868',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
    textTransform: 'capitalize',
  },
  edit_icon_wrapper: {
    width: widthPixel(25),
    height: heightPixel(21),
    marginLeft: pixelSizeHorizontal(50),
  },
  info_partition: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vertical_bar: {
    width: widthPixel(5),
    marginHorizontal: pixelSizeHorizontal(10),
  },
  profile_section_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: widthPixel(33),
  },
});
