import AddPatient from '@components/add_patient/add_patient';
import PatientInfo from '@components/patient_info';
import TEXT from '@components/text';
import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import styles from './styles';

const SelectPatient = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.select_patient_wrapper}>
      <TEXT text_style={styles.title}>patient selection</TEXT>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PatientDetails');
        }}>
        <View style={styles.info_wrapper}>
          <PatientInfo />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewPatientDetails');
        }}>
        <View style={styles.add_patient_wrapper}>
          <AddPatient />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectPatient;
