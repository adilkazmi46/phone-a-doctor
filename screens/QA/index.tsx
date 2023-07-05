import {save_user} from '@actions/auth';
import TEXT from '@components/text';
import {LoadingContext} from '@contexts/loadingContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {save_doctor_information} from '@utils/doctor/profile';
import {update_Patient_Profile} from '@utils/patient/profile';
import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import DoctorQAForm from './doctor_qa_form';
import PatientQAForm from './patient_qa_form';
import styles from './styles';

const Information = () => {
  const route = useRoute();

  const [step, setStep] = useState(1);
  const user = useSelector((state: any) => {
    return state.user;
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userType = user.userType;
  const loadingContext: any = useContext(LoadingContext);
  const handleDoctorInformation = async ({
    title,
    email,
    isSkiped,
  }: {
    title: string;
    email: string;
    isSkiped: boolean;
  }) => {
    await loadingContext.handleToggleLoader(true);
    let res: any = await save_doctor_information({title, email, isSkiped});
    console.log('doctor information res=', res);
    if (res.success === true) {
      await dispatch(save_user(res.user));
    } else {
      await loadingContext.handleToggleLoader(false);
    }
  };
  const handleProfileInformation = async ({
    phone,
    email,
    gender,
    dob,
    height_ft,
    height_inches,
    weight,
    bloodGroup,
    isUnderDoctorCare,
    language,
    diseases,
    isSkipedEmail,
    timezone_code,
    timezone_utc,
  }: {
    email: string;
    phone: string;
    gender: string;
    dob: string;
    height_ft: string;
    height_inches: string;
    weight: string;
    bloodGroup: string;
    isUnderDoctorCare: boolean;
    language: string;
    diseases: Array<string>;
    isSkipedEmail: boolean;

    timezone_code: string;
    timezone_utc: string;
  }) => {
    await loadingContext.handleToggleLoader(true);

    let res: any = await update_Patient_Profile({
      phone,
      gender,
      dob,
      email,
      height_ft,
      height_inches,
      bloodGroup,
      deseases: diseases,
      language,
      isUnderDoctorCare,
      weight,
      isSkipedEmail,
      timezone_code,
      timezone_utc,
    });
    console.log('res profile information method=', res);

    if (res.user) {
      await dispatch(save_user(res.user));
      await loadingContext.handleToggleLoader(false);
    } else if (res.error === true) {
      // console.log('error detected!!!');
      await loadingContext.handleToggleLoader(false);

      return {error: true, message: res.err_msg, err_code: res.err_code};
    }
  };

  return (
    <View style={styles.information_qa_wrapper}>
      <ScrollView>
        <View style={styles.complete_label_wrapper}>
          <TEXT text_style={styles.complete_label}>
            completed{' '}
            {userType === 'patient' && step == 1
              ? '12.5'
              : userType === 'patient' && step === 2
              ? '25'
              : userType === 'patient' && step === 3
              ? '37.5'
              : userType === 'patient' && step === 4
              ? '50%'
              : userType === 'patient' && step === 5
              ? '62.5'
              : userType === 'patient' && step === 6
              ? '75'
              : userType === 'patient' && step === 7
              ? '87.5'
              : userType === 'patient' && step === 8
              ? '100'
              : userType === 'doctor' && step == 1
              ? '50'
              : userType === 'doctor' && step === 2
              ? '100'
              : ''}
            <TEXT text_style={styles.percent_sign}>%</TEXT>
          </TEXT>
        </View>

        <LinearGradient
          colors={['#E1EDF8', '#EEF1F3']}
          style={styles.linearGradient}>
          <View
            style={[
              styles.progress_bar,
              step === 1 && userType === 'doctor'
                ? {width: '50%'}
                : step === 2 && userType === 'doctor'
                ? {width: '100%'}
                : step === 1 && userType === 'patient'
                ? {width: '12.5%'}
                : step === 2 && userType === 'patient'
                ? {width: '25%'}
                : step === 3 && userType === 'patient'
                ? {width: '37.5%'}
                : step === 4 && userType === 'patient'
                ? {width: '50%'}
                : step === 5 && userType === 'patient'
                ? {width: '62.5%'}
                : step === 6 && userType === 'patient'
                ? {width: '74.5%'}
                : step === 7 && userType === 'patient'
                ? {width: '87.5%'}
                : step === 8 && userType === 'patient'
                ? {width: '100%'}
                : {},
            ]}></View>
        </LinearGradient>

        {userType === 'doctor' ? (
          <DoctorQAForm
            userAttributes={user}
            step={step}
            setStep={setStep}
            handleDoctorInformation={handleDoctorInformation}
          />
        ) : null}

        {userType === 'patient' ? (
          <>
            <PatientQAForm
              userAttributes={user}
              step={step}
              setStep={setStep}
              handleProfileCreate={handleProfileInformation}
            />
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Information;
