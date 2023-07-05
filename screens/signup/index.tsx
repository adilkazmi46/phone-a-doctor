import React, {useContext, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Doctor_Icon from '@svgs/doctor_icon';
import Patient_Icon from '@svgs/patient_icon';
import SignUPForm from '@components/signup/form';
import TEXT from '@components/text';
import styles from './styles';
import {ScrollView} from 'react-native';
import LangPicker from '@components/lang_picker';
import schema from './schema';
import {signUp} from '@utils/auth';
import {LoadingContext} from '@contexts/loadingContext';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {save_user, signin} from '@actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUP = () => {
  const [selectedType, setSelectedType] = useState('');
  const [serverError, setServerError] = useState({});
  const loadingContext: any = useContext(LoadingContext);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleDoctorSignup = async ({
    fullName,
    phone,
    password,
  }: {
    fullName: string;
    phone: string;
    password: string;
  }) => {
    let res: any = await signUp(phone, password, fullName, selectedType);

    if (res.success === true) {
      await AsyncStorage.setItem('jwt_token', res.token);
      await dispatch(save_user(res.user));
      await dispatch(signin(true));
      await loadingContext.handleToggleLoader(false);

      if (selectedType === 'doctor') {
        //@ts-ignore
        // navigation.navigate('Information');
      }
    } else if (res.error === true) {
      await setServerError({
        errorCode: res.err_code,
        errorMsg: res.message,
      });
      await loadingContext.handleToggleLoader(false);
    }
  };
  return (
    <View
      style={
        selectedType != ''
          ? [styles.signup_wrapper, styles.bg_white]
          : styles.signup_wrapper
      }>
      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedType === '' ? <LangPicker /> : null}
        {selectedType === '' ? (
          <View style={styles.signup_type_wrapper}>
            <TouchableOpacity
              onPress={() => {
                setSelectedType('patient');
              }}>
              <View style={styles.type_item}>
                <View style={styles.patient_icon_wrapper}>
                  <Patient_Icon />
                </View>
                <TEXT text_style={styles.type}>patient</TEXT>
                <TEXT text_style={styles.signup_text}>sign up</TEXT>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedType('doctor');
              }}>
              <View style={styles.type_item}>
                <View style={styles.patient_icon_wrapper}>
                  <Doctor_Icon />
                </View>
                <TEXT text_style={styles.type}>doctor</TEXT>
                <TEXT text_style={styles.signup_text}>sign up</TEXT>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        {selectedType === 'doctor' || selectedType === 'patient' ? (
          <SignUPForm
            type={selectedType}
            schema={schema}
            handleToggleLoader={loadingContext.handleToggleLoader}
            handleDoctorSignUP={handleDoctorSignup}
            serverError={serverError}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default SignUP;
