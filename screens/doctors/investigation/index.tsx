import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import ErrorTEXT from '@components/text/error_text';
import {useNavigation, useRoute} from '@react-navigation/native';
import AddIcon from '@svgs/add_icon';
import DeleteIcon from '@svgs/delete_icon';
import EditIcon from '@svgs/edit_icon';
import {heightPixel, pixelSizeVertical} from '@utils/normalize';
import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {Styles} from '../advice';
import styles from '../prescription/styles';
import {useIsFocused} from '@react-navigation/native';

const Investigation = () => {
  const router = useRoute();

  const [investigation, setInvestigation] = useState('');
  const [error, setError] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const focus = useIsFocused();

  //@ts-ignore
  const appointment = router.params.appointment;
  //@ts-ignore
  const complains = router.params.complains;
  //@ts-ignore
  const age = router.params.age;
  //@ts-ignore
  const dygnosis = router.params.dygnosis;

  //@ts-ignore
  const medicines = router.params.medicines;

  const navigation = useNavigation();

  useEffect(() => {
    if (focus === true) {
      if (appointment.is_prescription_written === true) {
        setInvestigation(appointment.prescription.investigation);
      }
    }
  }, [focus]);

  const handleNext = async () => {
    if (investigation.length === 0) {
      setError('investigation required');
      setShowErrors(true);
    } else {
      //@ts-ignore
      navigation.navigate('Advice', {
        appointment: appointment,
        age,
        complains,
        dygnosis,
        medicines: medicines,
        investigation,
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

        <TEXT text_style={styles.complains_label}>Investigation</TEXT>

        <View style={Styles.advice_wrapper}>
          <TextInput
            style={[styles.input_wrapper, {textAlignVertical: 'top'}]}
            onChangeText={(val: string) => {
              setInvestigation(val);
            }}
            multiline={true}
            value={investigation}
            placeholder="Enter investigation"
          />
        </View>

        <ErrorTEXT>
          {showErrors === true && error.length > 0 ? error : null}
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

export default Investigation;
