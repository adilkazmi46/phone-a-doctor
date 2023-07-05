import AddPatient from '@components/add_patient/add_patient';
import PatientInfo from '@components/patient_info';
import TEXT from '@components/text';
import {user} from '@reducers/auth';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const ManagePatient = ({navigation}: {navigation: any}) => {
  const user = useSelector((state: any) => {
    return state.user;
  });
  return (
    <View style={styles.manage_patients_wrapper}>
      <View style={styles.patient_info_wrapper}>
        <PatientInfo />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewPatientDetails');
        }}>
        <View style={styles.add_patient_wrapper}>
          <AddPatient />
        </View>
      </TouchableOpacity>
      {user.relative_patients.map((item: any, index: any) => {
        var today = new Date();
        var birthDate = new Date(item.dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return (
          <View key={index} style={styles.relative_patient_info_wrapper}>
            <TEXT text_style={styles.patient_name}>{item.full_name} </TEXT>
            <TEXT text_style={styles.patient_info}>
              {item.gender} | {age} years | {item.weight} kg
            </TEXT>
          </View>
        );
      })}
    </View>
  );
};

export default ManagePatient;

const styles = StyleSheet.create({
  manage_patients_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    paddingHorizontal: pixelSizeHorizontal(38),
  },
  add_patient_wrapper: {
    width: widthPixel(300),
    height: heightPixel(100),
  },
  patient_info_wrapper: {
    height: heightPixel(125),
    width: widthPixel(300),
    marginVertical: pixelSizeVertical(10),
  },

  patient_name: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  patient_info: {
    color: '#686868',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
  },
  relative_patient_info_wrapper: {
    width: widthPixel(300),
    height: heightPixel(96),
    borderRadius: 13,
    backgroundColor: 'rgba(39,173,128,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: pixelSizeHorizontal(20),
    marginVertical: pixelSizeVertical(10),
  },
});
