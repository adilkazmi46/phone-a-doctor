import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const DoctorPersonalProfile = ({setIsEditMode}: {setIsEditMode: any}) => {
  const personalProfile: any = useSelector((state: any) => {
    return state.user.doctor;
  });
  const user: any = useSelector((state: any) => {
    return state.user;
  });

  return (
    <>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>title:</TEXT>
        <TEXT text_style={styles.info_text}>{personalProfile.title}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Full Name:</TEXT>
        <TEXT text_style={styles.info_text}>{user.full_name}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Email:</TEXT>
        <TEXT text_style={styles.info_text}>{user.email}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Phone:</TEXT>
        <TEXT text_style={styles.info_text}>{user.phone_number}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Date of Birth:</TEXT>
        <TEXT text_style={styles.info_text}>
          {new Date(user.dob).toLocaleDateString('en-US')}
        </TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Gender:</TEXT>
        <TEXT text_style={styles.info_text}>{user.gender}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Address:</TEXT>
        <TEXT text_style={styles.info_text}>{user.address}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Country:</TEXT>
        <TEXT text_style={styles.info_text}>{user.country}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Area (Optional):</TEXT>
        <TEXT text_style={styles.info_text}>{user.area}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>timezone:</TEXT>
        <TEXT text_style={styles.info_text}>
          {user.timezone.code + '   ' + user.timezone.utc}
        </TEXT>
      </View>

      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Spoken Language:</TEXT>
        <TEXT text_style={styles.info_text}>{user.language}</TEXT>
      </View>
      <View style={[styles.edit_btn_wrapper, {alignSelf: 'center'}]}>
        <PrimaryButton
          handleOnPress={() => {
            setIsEditMode(true);
          }}
          text={'edit'}
        />
      </View>
    </>
  );
};

export default DoctorPersonalProfile;
