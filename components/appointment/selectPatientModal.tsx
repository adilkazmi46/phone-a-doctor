import TEXT from '@components/text';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';

const SelectPatientModal = ({
  handleCloseModal,
  handleSelectPatient,
}: {
  handleCloseModal: any;
  handleSelectPatient: any;
}) => {
  const user: any = useSelector((state: any) => {
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
  }, [user]);

  const selectPatient = async ({
    item,
    is_relative,
  }: {
    item?: any;
    is_relative: boolean;
  }) => {
    if (is_relative === true) {
      handleSelectPatient({is_relative, patient: item});
    } else {
      handleSelectPatient({is_relative});
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={true}>
        <View style={styles.modal_wrapper}>
          <View style={[styles.centeredView, styles.modal_body]}>
            <ScrollView style={{flex: 1}}>
              <TEXT text_style={styles.text}>Select Patient</TEXT>
              <TouchableOpacity
                onPress={() => {
                  selectPatient({is_relative: false});
                }}
                style={styles.relative_patient_info_wrapper}>
                <TEXT text_style={styles.patient_name}>{user.full_name} </TEXT>
                <TEXT text_style={styles.patient_info}>
                  {user.gender} | {age} years | {user.weight} kg
                </TEXT>
              </TouchableOpacity>

              {user.relative_patients.length > 0 ? (
                <TEXT text_style={styles.text}>Relative Patients</TEXT>
              ) : null}
              {user.relative_patients.map((item: any, index: any) => {
                var today = new Date();
                var birthDate = new Date(item.dob);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (
                  m < 0 ||
                  (m === 0 && today.getDate() < birthDate.getDate())
                ) {
                  age--;
                }
                return (
                  <TouchableOpacity
                    onPress={() => {
                      selectPatient({is_relative: true, item: item});
                    }}
                    key={index}
                    style={styles.relative_patient_info_wrapper}>
                    <TEXT text_style={styles.patient_name}>
                      {item.full_name}
                    </TEXT>
                    <TEXT text_style={styles.patient_info}>
                      {item.gender} | {age} years | {item.weight} kg
                    </TEXT>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                onPress={() => {
                  handleCloseModal();
                }}>
                <View style={styles.btn_wrapper}>
                  <TEXT text_style={styles.btn_text}>close</TEXT>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectPatientModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  modal_wrapper: {
    backgroundColor: 'rgba(57,72,85,0.9)',
    flex: 1,
  },
  modal_body: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
    borderRadius: 10,
    position: 'absolute',
    top: '5%',
    left: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  text: {
    color: '#1c1c1c',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(20),
    textAlign: 'center',
    marginTop: pixelSizeVertical(40),
    marginBottom: pixelSizeVertical(25),
    width: widthPixel(180),
    minHeight: heightPixel(60),
  },
  btn_wrapper: {
    width: widthPixel(80),
    height: heightPixel(24),
    backgroundColor: '#27AD80',
    borderRadius: 5,
    elevation: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    color: '#ffffff',
    fontSize: fontPixel(12),
    lineHeight: fontPixel(16),
    textTransform: 'uppercase',
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
});
