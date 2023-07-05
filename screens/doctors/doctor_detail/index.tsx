import SelectPatientModal from '@components/appointment/selectPatientModal';
import TEXT from '@components/text';
import {useNavigation, useRoute} from '@react-navigation/native';
import Calendar from '@svgs/calendar';
import DoctorPicLg from '@svgs/doctor_pic_lg';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const DoctorDetails = ({navigation}: {navigation: any}) => {
  const route = useRoute();

  const [showSelectPatientModal, setShowSelectPatientModal] = useState(false);
  const [selectedPatient, setselectedPatient] = useState({});

  const user = useSelector((state: any) => {
    return state.user;
  });
  //@ts-ignore
  const doctor_user = route.params.doctor_user;
  useEffect(() => {
    //@ts-ignore
    if (route.params.doctor_user === null) {
      navigation.navigate('PatientHome');
    }
  }, [doctor_user]);

  const handlePatientSelection = async ({
    is_relative,
    patient,
  }: {
    is_relative: boolean;
    patient?: any;
  }) => {
    if (is_relative === true) {
      navigation.navigate('RequestAppointment', {
        doctor_user: doctor_user,
        is_relative: true,
        relative_patient: patient,
      });
    }
    if (is_relative === false) {
      navigation.navigate('RequestAppointment', {
        doctor_user: doctor_user,
        is_relative: false,
      });
    }
  };
  return (
    <View style={styles.doctor_details_wrapper}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profile_pic_wrapper}>
            {doctor_user.profile_pic && doctor_user.profile_pic.url ? (
              <Image
                source={{
                  uri: doctor_user.profile_pic.url,
                }}
                style={styles.profile_pic}
              />
            ) : (
              <DoctorPicLg />
            )}
          </View>
          <View style={styles.header_content_wrapper}>
            <TEXT text_style={styles.name}>
              {doctor_user.doctor.title + ' ' + doctor_user.full_name || ''}
            </TEXT>
            <TEXT text_style={styles.title}>
              {doctor_user.doctor.medical_speciality || ''}
            </TEXT>
            <TouchableOpacity
              onPress={() => {
                setShowSelectPatientModal(true);
              }}>
              <View style={styles.request_appointment_wrapper}>
                <View style={styles.calendar_icon}>
                  <Calendar />
                </View>
                <TEXT text_style={styles.request_appointment_text}>
                  request appointment
                </TEXT>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TEXT text_style={styles.about_title}>about doctor</TEXT>
        <TEXT text_style={styles.about_details}>
          {doctor_user.doctor.about}
        </TEXT>
        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.info_text}>
            Degree: {doctor_user.doctor.degree}
          </TEXT>
        </View>

        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.info_text}>
            License No{' '}
            {doctor_user.doctor.medical_certificate.certificate_number}
          </TEXT>
        </View>

        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.info_text}>
            Experience: {doctor_user.doctor.experience} years
          </TEXT>
        </View>

        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.info_text}>Number of Patients: 300+</TEXT>
        </View>

        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.info_text}>
            chamber or hospital address:{' '}
            {doctor_user.doctor.chamberORhospitalAddress
              .toString()
              .slice(0, 10)}
          </TEXT>
        </View>

        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.info_text}>
            consultation fee: {doctor_user.doctor.consultation_fee}
          </TEXT>
        </View>

        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.info_text}>
            follow up fee: {doctor_user.doctor.follow_up_fee}
          </TEXT>
        </View>

        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.info_text}>
            medical field: {doctor_user.doctor.medical_field}
          </TEXT>
        </View>
      </ScrollView>
      {showSelectPatientModal === true ? (
        <SelectPatientModal
          handleSelectPatient={({
            is_relative,
            patient,
          }: {
            is_relative: boolean;
            patient: any;
          }) => {
            if (is_relative === true) {
              handlePatientSelection({is_relative: true, patient: patient});
            }
            if (is_relative === false) {
              handlePatientSelection({
                is_relative: false,
              });
            }
          }}
          handleCloseModal={() => {
            setShowSelectPatientModal(false);
          }}
        />
      ) : null}
    </View>
  );
};

export default DoctorDetails;
