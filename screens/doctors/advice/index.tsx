import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import ErrorTEXT from '@components/text/error_text';
import {LoadingContext} from '@contexts/loadingContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {write_appointment_prescription} from '@utils/doctor/appointment';
import {useIsFocused} from '@react-navigation/native';

import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../prescription/styles';

const Advice = () => {
  const loadingContext: any = useContext(LoadingContext);

  const router = useRoute();
  //@ts-ignore
  const appointment = router.params.appointment;
  //@ts-ignore
  const age = router.params.age;
  //@ts-ignore
  const complains = router.params.complains;
  //@ts-ignore
  const dygnosis = router.params.dygnosis;
  //@ts-ignore
  const medicines = router.params.medicines;

  //@ts-ignore
  const investigation = router.params.investigation;

  const [showErrors, setShowErrors] = useState(false);
  const [error, setError] = useState('');
  const [advice, setAdvice] = useState('');
  const [neeed_follow_up, set_need_follow_up] = useState(false);
  const navigation = useNavigation();
  const focus = useIsFocused();
  useEffect(() => {
    if (focus === true) {
      if (
        age === null ||
        appointment === null ||
        complains === null ||
        dygnosis === null ||
        medicines === null
      ) {
        //@ts-ignore
        navigation.navigate('DoctorsHome');
      } else {
        set_need_follow_up(
          appointment.prescription.need_follow_up_consultation,
        );
        setAdvice(appointment.prescription.advice);
      }
    }
  }, [focus]);

  const handleSend = async () => {
    await loadingContext.handleToggleLoader(true);

    //@ts-ignore
    let res = await write_appointment_prescription({
      appointment_id: appointment._id,
      patient_id: appointment.user[0]._id,
      complains,
      dygnosis,
      medicines,
      need_follow_up_consultation: neeed_follow_up,
      advice: advice,
      investigation,
    });
    console.log('res write=', res);
    //@ts-ignore
    if (res.appointment) {
      //@ts-ignore
      navigation.navigate('PatientDetails');
    }
    await loadingContext.handleToggleLoader(false);
  };

  return (
    <View style={styles.prescriptions_wrapper}>
      <ScrollView
        style={{}}
        contentContainerStyle={{
          flexGrow: 1,
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
        }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.patient_info_wrapper}>
          <TEXT text_style={styles.patient_name}>
            {appointment.user[0].full_name}
          </TEXT>
          <TEXT text_style={styles.patient_info}>
            {appointment.user[0].gender} | {age} years |{' '}
            {appointment.user[0].patient.weight} kg
          </TEXT>
        </View>

        <TEXT text_style={styles.complains_label}>Advice</TEXT>

        <View style={Styles.advice_wrapper}>
          <TextInput
            placeholder="Enter advice"
            multiline={true}
            onChangeText={(val: string) => {
              setAdvice(val);
            }}
            value={advice}
          />
        </View>

        <TEXT
          text_style={[
            styles.complains_label,
            {
              width: '100%',
              textAlign: 'center',
              marginTop: pixelSizeVertical(57),
              marginBottom: pixelSizeVertical(28),
            },
          ]}>
          This patient needs follow-up consultation
        </TEXT>
        <View style={styles.follow_up_btn_wrapper}>
          <TouchableOpacity
            onPress={() => {
              set_need_follow_up(false);
            }}>
            <View
              style={[
                styles.follow_up_btn,
                styles.no_btn,
                neeed_follow_up === false ? {backgroundColor: '#F10C0C'} : {},
              ]}>
              <TEXT
                text_style={[
                  styles.follow_btn_text,
                  neeed_follow_up === false ? {color: '#ffffff'} : {},
                ]}>
                no
              </TEXT>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              set_need_follow_up(true);
            }}>
            <View
              style={[
                styles.follow_up_btn,
                styles.yes_btn,
                neeed_follow_up === true ? {backgroundColor: '#27AD86'} : {},
              ]}>
              <TEXT
                text_style={[
                  styles.follow_btn_text,
                  neeed_follow_up === true ? {color: '#ffffff'} : {},
                ]}>
                yes
              </TEXT>
            </View>
          </TouchableOpacity>
        </View>
        <ErrorTEXT>
          {showErrors === true && error.length > 0 ? error : null}
        </ErrorTEXT>
        <View style={styles.next_btn}>
          <PrimaryButton
            text="send"
            handleOnPress={() => {
              handleSend();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Advice;

export const Styles = StyleSheet.create({
  advice_wrapper: {
    width: widthPixel(319),
    height: heightPixel(150),
    borderRadius: 8,
    backgroundColor: 'rgba(39,173,128,0.1)',
    paddingHorizontal: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeVertical(10),
    textAlign: 'left',
    textAlignVertical: 'top',
    marginTop: pixelSizeVertical(10),
  },
});
