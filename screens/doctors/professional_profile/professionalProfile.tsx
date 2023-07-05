import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import DropdownArrow from '@svgs/dropdown_arrow';
import UploadIcon from '@svgs/upload_icon';
import React, {useRef, useState} from 'react';
import {Switch, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from '../personal_profile/styles';

const ProfessionalProfile = ({
  setIsEditMode,
  selectedSpeciality,
  setSelectedSpeciality,
  medicalSpecialities,
}: {
  setIsEditMode: any;
  selectedSpeciality: number;
  setSelectedSpeciality: any;
  medicalSpecialities: Array<any>;
}) => {
  const doctor = useSelector((state: any) => {
    return state.user.doctor;
  });
  const [isOnline, setIsOnline] = useState(doctor.isDoctor247);

  return (
    <>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>About:</TEXT>
        <TEXT text_style={styles.info_text}>
          {doctor.about.toString().substring(0, 40)}
        </TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Degree:</TEXT>
        <TEXT text_style={styles.info_text}>{doctor.degree}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Institute:</TEXT>
        <TEXT text_style={styles.info_text}>{doctor.institute}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Chamber/Hospital Address:</TEXT>
        <TEXT text_style={styles.info_text}>
          {doctor.chamberORhospitalAddress}
        </TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Medical Certificate No:</TEXT>
        <TEXT text_style={styles.info_text}>
          {doctor.medical_certificate.certificate_number}
        </TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Certificate Upload:</TEXT>
        <View style={styles.info_icon}>
          <UploadIcon />
        </View>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Government id no:</TEXT>
        <TEXT text_style={styles.info_text}>{doctor.gov_id.gov_id_number}</TEXT>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Govt ID front:</TEXT>
        <View style={styles.info_icon}>
          <UploadIcon />
        </View>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Govt ID back:</TEXT>
        <View style={styles.info_icon}>
          <UploadIcon />
        </View>
      </View>
      {/* <TouchableOpacity onPress={() => {}}> */}
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Medical Field:</TEXT>
        <TEXT text_style={styles.info_text}>{doctor.medical_field}</TEXT>
        <View style={styles.dropdown_icon}>
          <DropdownArrow color={'#27AD80'} />
        </View>
      </View>

      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Medical Category:</TEXT>
        <TEXT text_style={styles.info_text}>{doctor.medical_category}</TEXT>
        <View style={styles.dropdown_icon}>
          <DropdownArrow color={'#27AD80'} />
        </View>
      </View>
      {/* </TouchableOpacity> */}
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Medical Speciality:</TEXT>
        <TEXT text_style={styles.info_text}>{doctor.medical_speciality}</TEXT>

        <View style={styles.dropdown_icon}>
          <DropdownArrow color={'#27AD80'} />
        </View>
      </View>
      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Consultation Fee:</TEXT>
        <TEXT text_style={styles.info_text}> {doctor.consultation_fee}$</TEXT>
      </View>

      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>Follow Up Fee:</TEXT>
        <TEXT text_style={styles.info_text}>{doctor.follow_up_fee}$</TEXT>
      </View>

      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>
          Experience: {doctor.experience} years
        </TEXT>
        <TEXT text_style={styles.info_text}> </TEXT>
      </View>

      <View style={styles.info_wrapper}>
        <TEXT text_style={styles.info_text}>24/7 Doctor:</TEXT>
        <Switch
          trackColor={{
            false: 'rgba(155,155,155,0.1)',
            true: 'rgba(155,155,155,0.1)',
          }}
          thumbColor={isOnline ? '#27AD80' : '#27AD80'}
          ios_backgroundColor="rgba(155,155,155,0.1)"
          onValueChange={() => {
            // setIsOnline(!doctor.is_24_7);
          }}
          value={Boolean(doctor.is_24_7)}
        />
      </View>
      <View style={styles.edit_btn_wrapper}>
        <PrimaryButton
          handleOnPress={() => {
            setIsEditMode(true);
          }}
          text="edit"
        />
      </View>
    </>
  );
};

export default ProfessionalProfile;
