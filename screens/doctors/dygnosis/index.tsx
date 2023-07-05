import PrimaryButton from '@components/buttons/primaryButton';
import AddCompliants from '@components/prescription/add_compliants';
import TEXT from '@components/text';
import ErrorTEXT from '@components/text/error_text';
import {useNavigation, useRoute} from '@react-navigation/native';
import AddIcon from '@svgs/add_icon';
import DeleteIcon from '@svgs/delete_icon';
import {getAllDygnosis} from '@utils/index';
import {heightPixel, pixelSizeVertical} from '@utils/normalize';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../prescription/styles';
import {useIsFocused} from '@react-navigation/native';

const Dygnosis = () => {
  const [diagnosis, setDiagnosis] = useState([]);
  const router = useRoute();
  //@ts-ignore
  const appointment = router.params.appointment;
  //@ts-ignore
  const complains = router.params.complains;
  //@ts-ignore
  const age = router.params.age;

  const [showErrors, setShowErros] = useState(false);
  const diagnosis_ref = useRef();
  const [selectedDiagnosis, setSelectedDiagnosis] = useState([]);
  const [showAddComplaints, setShowAddComplaints] = useState(false);
  const focus = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const get_all_dygnosis = async () => {
      let res: any = await getAllDygnosis();
      console.log('res=', res);
      if (res.dygnoses) {
        setDiagnosis(res.dygnoses);
      }
    };
    if (focus === true) {
      console.log('focused line 40 ===== ', focus);
      if (appointment === null || complains === null) {
        //@ts-ignore
        navigation.navigate('DoctorsHome');
      } else {
        if (appointment.is_prescription_written === true) {
          setSelectedDiagnosis(appointment.prescription.dygnoses);
        }
        get_all_dygnosis();
      }
    }
  }, [focus]);
  const handleRemoveComplaint = async (dygnosis: string) => {
    let new_complaints = await selectedDiagnosis.filter(
      (item: string, index: number) => {
        return item != dygnosis;
      },
    );
    await setSelectedDiagnosis(new_complaints);
  };
  const handleAddMedcine = async () => {
    if (selectedDiagnosis.length === 0) {
      setShowErros(true);
    } else {
      // return;
      //@ts-ignore
      navigation.navigate('AddMedicine', {
        appointment: appointment,
        age: age,
        complains: complains,
        dygnosis: selectedDiagnosis,
      });
    }
  };
  return (
    <View style={styles.prescriptions_wrapper}>
      <ScrollView
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View style={styles.patient_info_wrapper}>
          <TEXT text_style={styles.patient_name}>
            {appointment.user[0].full_name}
          </TEXT>
          <TEXT text_style={styles.patient_info}>
            {appointment.user[0].gender} | {age} years |{' '}
            {appointment.user[0].patient.weight} kg
          </TEXT>
        </View>

        <TouchableOpacity
          onPress={() => {
            setShowAddComplaints(true);
          }}>
          <View
            style={[
              styles.add_prescription_item_wrapper,
              {marginTop: pixelSizeVertical(59)},
            ]}>
            <View pointerEvents="none">
              <TextInput
                style={styles.input_wrapper}
                editable={false}
                placeholder="Add diagnosis here"
              />
            </View>
            <View style={styles.add_btn_wrapper}>
              <AddIcon />
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{
            height: heightPixel(157),
            marginTop: pixelSizeVertical(30),
            width: '100%',
            alignItems: 'center',
          }}>
          {selectedDiagnosis.map((item: string, index: number) => {
            return (
              <View key={index} style={styles.prescription_item}>
                <TEXT text_style={styles.prescription_text}>{item}</TEXT>
                <TouchableOpacity
                  onPress={() => {
                    handleRemoveComplaint(item);
                  }}
                  style={styles.delete_wrapper}>
                  <DeleteIcon />
                </TouchableOpacity>
              </View>
            );
          })}
          {selectedDiagnosis.length === 0 ? (
            <TEXT text_style={styles.diagnosis_text}>No diagnosis added</TEXT>
          ) : null}
        </ScrollView>

        {showAddComplaints === true ? (
          <AddCompliants
            complaints={diagnosis}
            selectedComplaints={selectedDiagnosis}
            setSelectedComplaints={setSelectedDiagnosis}
            handleCloseModal={() => {
              setShowAddComplaints(false);
            }}
          />
        ) : null}

        <ErrorTEXT>
          {showErrors === true && selectedDiagnosis.length === 0
            ? 'minimum 1 dygnosis should be selected'
            : null}
        </ErrorTEXT>
        <View style={styles.next_btn}>
          <PrimaryButton
            text="next"
            handleOnPress={() => {
              handleAddMedcine();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Dygnosis;
