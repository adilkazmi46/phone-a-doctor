import DoctorProfileIcon from '@svgs/doctor_profile_icon';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import PersonalProfileForm from './personalProfileForm';
import DoctorPersonalProfile from './personal_profile';
import styles from './styles';

const PersonalProfile = () => {
  const [isEditMode, setIsEditMode] = useState();

  const doctor: any = useSelector((state: any) => {
    return state.user.doctor;
  });

  useEffect(() => {
    if (doctor.is_personal_profile_created === false) {
      //@ts-ignore
      setIsEditMode(true);
    } else {
      //@ts-ignore
      setIsEditMode(false);
    }
  }, [doctor]);
  return (
    <View style={styles.profile_wrapper}>
      <ScrollView
        style={{flex: 1, display: 'flex', flexDirection: 'column'}}
        keyboardShouldPersistTaps="always">
        <View style={styles.profile_pic_wrapper}>
          <DoctorProfileIcon />
        </View>
        {isEditMode === true ? (
          <PersonalProfileForm setIsEditMode={setIsEditMode} />
        ) : null}
        {isEditMode === false ? (
          <DoctorPersonalProfile setIsEditMode={setIsEditMode} />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default PersonalProfile;
