import PrimaryButton from '@components/buttons/primaryButton';
import CheckBox from '@components/checkbox';
import TEXT from '@components/text';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {doctor_schema} from './schema';
import ErrorTEXT from '@components/text/error_text';
import SkipIcon from '@svgs/skip_icon';
const DoctorQAForm = ({
  step,
  setStep,
  userAttributes,
  handleDoctorInformation,
}: {
  step: number;
  setStep: any;
  userAttributes: any;
  handleDoctorInformation: any;
}) => {
  const [isSkiped, setIsSkiped] = useState(false);

  const form = useFormik({
    initialValues: {
      gender: 'male',
      name: userAttributes.name,
      title: 'dr',
      phone_number: userAttributes.phone_number,
      email: 'testing123@test.com',
    },
    validationSchema: doctor_schema,
    onSubmit: (values, actions) => {},
  });

  const handleValidation = async (is_skiped?: boolean) => {
    if (step === 1) {
      await form.setFieldTouched('title');
      await form.validateField('title');
      if (form.errors.title === undefined) {
        setStep(2);
      }
    } else if (step === 2) {
      await form.setFieldTouched('email');
      await form.validateField('email');
      if (form.errors.email === undefined) {
        handleDoctorInformation({
          title: form.values.title,
          email: form.values.email,
          isSkiped: isSkiped,
        });
      }
    }
  };
  return (
    <View>
      <View style={styles.form_wrapper}>
        <TEXT text_style={styles.label}>
          {step === 1
            ? 'What is your title ?'
            : step === 2
            ? 'What is your email ?'
            : ''}
        </TEXT>

        {step === 1 ? (
          <View style={styles.checkboxes_wrapper}>
            <TouchableOpacity
              onPress={() => {
                form.setFieldValue('title', 'dr');
              }}>
              <View style={styles.checkbox_wrapper}>
                <CheckBox
                  isChecked={form.values.title === 'dr' ? true : false}
                />

                <TEXT
                  text_style={
                    form.values.title === 'dr'
                      ? [styles.checkbox_label, styles.selected_checkbox_label]
                      : styles.checkbox_label
                  }>
                  dr
                </TEXT>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                form.setFieldValue('title', 'consultant');
              }}>
              <View style={styles.checkbox_wrapper}>
                <CheckBox
                  isChecked={form.values.title === 'consultant' ? true : false}
                />

                <TEXT
                  text_style={
                    form.values.title === 'consultant'
                      ? [styles.checkbox_label, styles.selected_checkbox_label]
                      : styles.checkbox_label
                  }>
                  consultant
                </TEXT>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                form.setFieldValue('title', 'professor');
              }}>
              <View style={styles.checkbox_wrapper}>
                <CheckBox
                  isChecked={form.values.title === 'professor' ? true : false}
                />
                <TEXT
                  text_style={
                    form.values.title === 'professor'
                      ? [styles.checkbox_label, styles.selected_checkbox_label]
                      : styles.checkbox_label
                  }>
                  professor
                </TEXT>
              </View>
            </TouchableOpacity>
            <ErrorTEXT>
              {form.touched.title && form.errors.title ? form.errors.title : ''}
            </ErrorTEXT>
          </View>
        ) : null}

        {step === 2 ? (
          <>
            <TextInput
              style={styles.text_input}
              value={form.values.email}
              onChangeText={form.handleChange('email')}
            />
            <ErrorTEXT>
              {form.touched.email && form.errors.email
                ? form.errors.email
                : isSkiped === false &&
                  form.touched.email &&
                  form.values.email === ''
                ? 'email is required'
                : ''}
            </ErrorTEXT>
          </>
        ) : null}
        {step === 2 ? (
          <TouchableOpacity
            onPress={() => {
              setIsSkiped(true);
              handleValidation(true);
            }}
            style={styles.skip_btn}>
            <TEXT text_style={styles.skip_text}>skip</TEXT>
            <View style={styles.skip_icon}>
              <SkipIcon />
            </View>
          </TouchableOpacity>
        ) : null}
        <View style={[styles.next_btn]}>
          <PrimaryButton
            text="next"
            handleOnPress={() => {
              setIsSkiped(false);
              handleValidation(false);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DoctorQAForm;
