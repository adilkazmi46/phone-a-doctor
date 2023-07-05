import PrimaryButton from '@components/buttons/primaryButton';
import AddCompliants from '@components/prescription/add_compliants';
import TEXT from '@components/text';
import ErrorTEXT from '@components/text/error_text';
import {LoadingContext} from '@contexts/loadingContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import AddIcon from '@svgs/add_icon';
import DeleteIcon from '@svgs/delete_icon';
import {getAllComplains} from '@utils/index';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';

const Prescription = () => {
  const [showAddComplaints, setShowAddComplaints] = useState(false);
  const [selectedComplaints, setSelectedComplaints] = useState([]);
  const loadingContext: any = useContext(LoadingContext);
  const [complains, setComplains] = useState([]);
  const [showErrors, setShowErros] = useState(false);
  const router = useRoute();
  const focus = useIsFocused();
  //@ts-ignore
  const appointment = router.params.appointment;
  //@ts-ignore
  const age = router.params.age;

  useEffect(() => {
    const get_all_complains = async () => {
      await loadingContext.handleToggleLoader(true);
      let res: any = await getAllComplains();
      if (res.complains) {
        setComplains(res.complains);
      }
      await loadingContext.handleToggleLoader(false);
    };
    if (focus) {
      if (appointment === null) {
        //@ts-ignore
        navigation.navigate('DoctorsHome');
      } else {
        console.log('appointment 42=', appointment.user.patient);
        if (appointment.is_prescription_written === true) {
          setSelectedComplaints(appointment.prescription.complains);
        }
        get_all_complains();
      }
    }
  }, [focus]);

  const navigation = useNavigation();

  const handleRemoveComplaint = async (complaint: string) => {
    let new_complaints = await selectedComplaints.filter(
      (item: string, index: number) => {
        return item != complaint;
      },
    );
    await setSelectedComplaints(new_complaints);
  };
  const handleNext = async () => {
    if (selectedComplaints.length > 0) {
      //@ts-ignore
      navigation.navigate('Diagnosis', {
        appointment: appointment,
        age: age,
        complains: selectedComplaints,
      });
    } else {
      setShowErros(true);
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
        }}>
        <TEXT text_style={styles.new_prescription_label}>
          new prescription for
        </TEXT>
        <View style={styles.patient_info_wrapper}>
          <TEXT text_style={styles.patient_name}>
            {appointment.user[0].full_name}
          </TEXT>
          <TEXT text_style={styles.patient_info}>
            {appointment.user[0].gender} | {age} years |{' '}
            {appointment.user[0].patient.weight} kg
          </TEXT>
        </View>

        <TEXT text_style={styles.complains_label}>Presenting Complaints</TEXT>

        <TouchableOpacity
          onPress={() => {
            setShowAddComplaints(true);
          }}
          style={styles.add_prescription_item_wrapper}>
          <View pointerEvents="none">
            <TextInput
              style={styles.input_wrapper}
              editable={false}
              placeholder="P/C"
            />
          </View>
          <View style={styles.add_btn_wrapper}>
            <AddIcon />
          </View>
        </TouchableOpacity>

        <View style={styles.prescription_items_wrapper}>
          {selectedComplaints.map((item: string, index: number) => {
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
        </View>
        {showAddComplaints === true ? (
          <AddCompliants
            complaints={complains}
            selectedComplaints={selectedComplaints}
            setSelectedComplaints={setSelectedComplaints}
            handleCloseModal={() => {
              setShowAddComplaints(false);
            }}
          />
        ) : null}
        <ErrorTEXT>
          {showErrors === true && selectedComplaints.length === 0
            ? 'minimum 1 complain is required'
            : null}
        </ErrorTEXT>

        <View style={styles.next_btn}>
          <PrimaryButton
            text="next"
            handleOnPress={() => {
              handleNext();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Prescription;
