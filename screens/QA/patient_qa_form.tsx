import PrimaryButton from '@components/buttons/primaryButton';
import CheckBox from '@components/checkbox';
import TEXT from '@components/text';
import {useNavigation} from '@react-navigation/native';
import CalendarIcon from '@svgs/calendar_icon';
import DropdownArrow from '@svgs/dropdown_arrow';
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import {useFormik} from 'formik';
import React, {useContext, useRef, useState} from 'react';
import {
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from './styles';
import {patient_schema} from './schema';
import ErrorTEXT from '@components/text/error_text';
import {LoadingContext} from '@contexts/loadingContext';
import {useDispatch} from 'react-redux';
import SelectPicker from '@components/picker';
import SkipIcon from '@svgs/skip_icon';
import Text_input_field from '@components/input_fields/text_input_field';
import timezones from 'timezones-list';

const PatientQAForm = ({
  step,
  setStep,
  userAttributes,
  handleProfileCreate,
}: {
  step: number;
  setStep: any;
  userAttributes: any;
  handleProfileCreate: any;
}) => {
  const navigation = useNavigation();
  const bloodGroupRef: any = useRef();
  const [showError, setShowError] = useState(false);
  const [serverErrors, setServerErrors] = useState();
  const [showDOBPicker, setShowDOBPicker] = useState<boolean>(false);
  const [dob, setDOB] = useState('');
  const timezone_ref: any = useRef();

  const [selectedDiseasesConditions, setSelectedDiseasesConditions] = useState(
    [],
  );
  const [showSelectedDiseasesError, setShowSelectedDiseasesError] =
    useState(false);

  const loadingContext: any = useContext(LoadingContext);
  const dispatch = useDispatch();
  const [isSkiped, setIsSkiped] = useState(false);

  const diseases_and_conditions: any = [
    'Pain',
    'Back Problem',
    'Female Health Issues',
    'Ear, Nose & Throat Problems',
    'Children Health',
    'Sex Issue',
    'Diabetic / Blood Pressure / Hypertension',
    'Diarrhea / Vomiting',
    'Headaches / Migraine',
    'Cold , cough and fever',
    'Diabetes',
    'Asthma',
    'Chronic Kidney Disease',
    'Cancer',
    'Obesity',
    'Arthritis / Rheumatological Condition',
    'Skin Conditions: Psoriasis/Dandruff/Others',
    'Eye Conditions: Glaucoma/Cataract/Others',
    'Other',
    'None',
  ];
  // "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
  const blood_groups = [
    {label: 'A+', value: 'A+'},
    {label: 'A-', value: 'A-'},
    {label: 'B+', value: 'B+'},
    {label: 'B-', value: 'B-'},
    {label: 'AB+', value: 'AB+'},
    {label: 'AB-', value: 'AB-'},
    {label: 'O+', value: 'O+'},
    {label: 'O-', value: 'O-'},
  ];
  const form = useFormik({
    initialValues: {
      phone_number: userAttributes.phone_number,
      gender: 'male',
      dob: dob,
      height_ft: '5',
      height_inches: '4',
      weight: '65',
      blood_group: 'AB+',
      language: 'english',
      isUnderDoctorCare: false,
      diseases_or_conditions: selectedDiseasesConditions,
      email: 'asklak@askla.asc',
      timezone_code: '',
      timezone_utc: '',
    },
    validationSchema: patient_schema,
    onSubmit: async (values, actions) => {},
  });

  const handleValidation = async (is_skiped?: boolean) => {
    if (step === 1) {
      await form.setFieldTouched('gender');
      await form.validateField('gender');
      if (form.errors.gender === undefined) {
        setStep(2);
      }
    } else if (step === 2) {
      await form.setFieldTouched('dob');
      await form.validateField('dob');
      await form.setFieldTouched('timezone_utc');
      await form.validateField('timezone_utc');
      await form.setFieldTouched('timezone_code');
      await form.validateField('timezone_code');
      if (
        form.errors.dob === undefined &&
        form.errors.timezone_code === undefined &&
        form.errors.timezone_utc === undefined
      ) {
        setStep(3);
      }
    } else if (step === 3) {
      await form.setFieldTouched('height_ft');
      await form.setFieldTouched('height_inches');
      await form.setFieldTouched('weight');
      await form.setFieldTouched('blood_group');

      await form.validateField('height_ft');
      await form.validateField('height_inches');
      await form.validateField('weight');
      await form.validateField('blood_group');
      if (
        form.errors.height_ft === undefined &&
        form.errors.height_inches === undefined &&
        form.errors.weight === undefined &&
        form.errors.blood_group === undefined
      ) {
        setStep(4);
      }
    } else if (step === 4) {
      await form.setFieldTouched('isUnderDoctorCare');
      await form.validateField('isUnderDoctorCare');

      if (form.errors.isUnderDoctorCare === undefined) {
        setStep(5);
      }
    } else if (step === 5) {
      await form.setFieldTouched('language');
      await form.validateField('language');

      if (form.errors.language === undefined) {
        setStep(6);
      }
    } else if (step === 6) {
      if (selectedDiseasesConditions.length > 0) {
        setShowSelectedDiseasesError(false);
        setStep(7);
      } else {
        setShowSelectedDiseasesError(true);
      }
    } else if (step === 7) {
      await form.setFieldTouched('email');
      await form.validateField('email');
      if (
        form.errors.email === undefined &&
        is_skiped === false &&
        form.values.email != ''
      ) {
        await loadingContext.handleToggleLoader(true);
        let res: any = await handleProfileCreate({
          email: form.values.email,
          phone: form.values.phone_number,
          gender: form.values.gender,
          isUnderDoctorCare: form.values.isUnderDoctorCare,
          isSkiped: false,
          dob: form.values.dob,
          height_ft: form.values.height_ft,
          height_inches: form.values.height_inches,
          weight: form.values.weight,
          bloodGroup: form.values.blood_group,
          diseases: form.values.diseases_or_conditions,
          language: form.values.language,
          isSkipedEmail: false,
          timezone_code: form.values.timezone_code,
          timezone_utc: form.values.timezone_utc,
        });
        console.log('res 1234567890=', res);
        if (res.err === true) {
          setServerErrors(res.message);
          setShowError(true);
        }

        // navigation.navigate('PatientHome');
      } else if (is_skiped === true) {
        // navigation.navigate('PatientHome');
        let res = await handleProfileCreate({
          email: form.values.email,
          phone: form.values.phone_number,
          gender: form.values.gender,
          isUnderDoctorCare: form.values.isUnderDoctorCare,
          dob: form.values.dob,
          height_ft: form.values.height_ft,
          height_inches: form.values.height_inches,
          weight: form.values.weight,
          bloodGroup: form.values.blood_group,
          diseases: form.values.diseases_or_conditions,
          language: form.values.language,
          isSkipedEmail: true,
          timezone_code: form.values.timezone_code,
          timezone_utc: form.values.timezone_utc,
        });
        console.log('res 1234567890=', res);
        if (res.error === true) {
          setServerErrors(res.message);
          setShowError(true);
        }
        // await loadingContext.handleToggleLoader(false);
      }
    }
  };

  const handleSelectedDiseasesConditions = async (index: number) => {
    console.log('selectedDiseases=', selectedDiseasesConditions);
    if (
      //@ts-ignore

      selectedDiseasesConditions.includes(diseases_and_conditions[index]) ===
      true
    ) {
      let tmp = await selectedDiseasesConditions.filter(
        (item: string, Index: number) => {
          return item != diseases_and_conditions[index];
        },
      );

      setSelectedDiseasesConditions(tmp);
      await form.setFieldValue(
        'diseases_or_conditions',
        selectedDiseasesConditions,
      );
    } else {
      //@ts-ignore

      setSelectedDiseasesConditions([
        //@ts-ignore

        diseases_and_conditions[index],
        ...selectedDiseasesConditions,
      ]);
      await form.setFieldValue(
        'diseases_or_conditions',
        selectedDiseasesConditions,
      );
    }
    console.log('selectedDiseases update=', selectedDiseasesConditions);
    console.log('dieseas form', form.values.diseases_or_conditions);
  };

  return (
    <View style={styles.form_wrapper}>
      <TEXT text_style={styles.label}>
        {step === 1
          ? 'Please select your gender ?'
          : step === 2
          ? 'what is your date of birth ?'
          : step === 3
          ? 'Please enter your height ?'
          : step === 4
          ? 'Are you under Doctor care now ?'
          : step === 5
          ? 'Please select the language you speak'
          : step === 6
          ? 'Do you have any of the following deseases/conditions?'
          : step === 7
          ? 'What is your email?'
          : ''}
      </TEXT>

      {/* {step == 1 ? (
        <> 
          <TextInput
            style={styles.text_input}
            value={form.values.phone_number}
            onChangeText={form.handleChange('phone_number')}
            keyboardType="number-pad"
          />

          <ErrorTEXT>
            {form.touched.phone_number && form.errors.phone_number
              ? form.errors.phone_number
              : ''}
          </ErrorTEXT>
        </>
      ) : null} */}

      {step === 1 ? (
        <View style={styles.checkboxes_wrapper}>
          <TouchableOpacity
            onPress={() => {
              form.setFieldValue('gender', 'male');
            }}>
            <View style={styles.checkbox_wrapper}>
              <CheckBox
                isChecked={form.values.gender === 'male' ? true : false}
              />

              <TEXT
                text_style={
                  form.values.gender === 'male'
                    ? [styles.checkbox_label, styles.selected_checkbox_label]
                    : styles.checkbox_label
                }>
                male
              </TEXT>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              form.setFieldValue('gender', 'female');
            }}>
            <View style={styles.checkbox_wrapper}>
              <CheckBox
                isChecked={form.values.gender === 'female' ? true : false}
              />

              <TEXT
                text_style={
                  form.values.gender === 'female'
                    ? [styles.checkbox_label, styles.selected_checkbox_label]
                    : styles.checkbox_label
                }>
                female
              </TEXT>
            </View>
          </TouchableOpacity>

          <ErrorTEXT>
            {form.touched.gender && form.errors.gender
              ? form.errors.gender
              : ''}
          </ErrorTEXT>
        </View>
      ) : null}

      {step === 2 ? (
        <>
          <TouchableOpacity
            onPress={() => {
              setShowDOBPicker(true);
            }}>
            <View style={styles.row_wrapper} pointerEvents="none">
              <TextInput
                editable={false}
                style={[styles.text_input, {width: widthPixel(250)}]}
                value={form.values.dob.toString()}
                //onChangeText={form.handleChange('dob')}
              />
              <View style={styles.calendar_icon_wrapper}>
                <CalendarIcon />
              </View>
            </View>
          </TouchableOpacity>
          <DatePicker
            modal
            open={showDOBPicker}
            date={new Date()}
            mode="date"
            onConfirm={async date => {
              setShowDOBPicker(false);
              var tmp: any = new Date(date);
              // tmp = tmp.toLocaleDateString();
              tmp = await tmp.toISOString().split('T')[0];
              console.log('date=', tmp);
              form.setFieldValue('dob', tmp);
              // form.handleSubmit();
            }}
            onCancel={() => {
              setShowDOBPicker(false);
            }}
          />
          <ErrorTEXT>
            {form.touched.dob && form.errors.dob ? form.errors.dob : ''}
          </ErrorTEXT>

          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'android') {
                timezone_ref.current.focus();
              }
            }}
            style={styles.input_wrapper}>
            <Text_input_field
              label="timezone"
              value={form.values.timezone_code + ' ' + form.values.timezone_utc}
              handleOnChange={form.handleChange('timezone_code')}
              isSecure={false}
              isEditable={false}
            />
          </TouchableOpacity>

          <ErrorTEXT>
            {form.touched.timezone_code && form.errors.timezone_code
              ? form.errors.timezone_code
              : form.touched.timezone_utc && form.errors.timezone_utc
              ? form.errors.timezone_utc
              : ''}
          </ErrorTEXT>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <View style={styles.height_wrapper}>
            <View style={[styles.height_wrapper]}>
              <TextInput
                style={[styles.text_input, styles.height_input]}
                value={form.values.height_ft}
                keyboardType="number-pad"
                onChangeText={form.handleChange('height_ft')}
              />
              <TEXT text_style={styles.unit_text}>ft</TEXT>
            </View>

            <View
              style={[
                styles.height_wrapper,
                {marginLeft: pixelSizeHorizontal(48)},
              ]}>
              <TextInput
                style={[styles.text_input, styles.height_input]}
                value={form.values.height_inches}
                keyboardType="number-pad"
                onChangeText={form.handleChange('height_inches')}
              />
              <TEXT text_style={styles.unit_text}>inches</TEXT>
            </View>
          </View>
          <View style={styles.height_errors_wrapper}>
            <ErrorTEXT>
              {form.touched.height_ft && form.errors.height_ft
                ? form.errors.height_ft
                : ''}
            </ErrorTEXT>

            <ErrorTEXT>
              {form.touched.height_inches && form.errors.height_inches
                ? form.errors.height_inches
                : ''}
            </ErrorTEXT>
          </View>
          <View style={styles.weight_wrapper}>
            <TEXT text_style={styles.label}>Please enter your weight</TEXT>
            <View
              style={[styles.row_wrapper, {marginTop: pixelSizeVertical(15)}]}>
              <TextInput
                style={[styles.text_input, styles.weight_input]}
                value={form.values.weight}
                keyboardType="number-pad"
                onChangeText={form.handleChange('weight')}
              />
              <TEXT text_style={styles.unit_text}>kg</TEXT>
            </View>

            <ErrorTEXT>
              {form.touched.weight && form.errors.weight
                ? form.errors.weight
                : ''}
            </ErrorTEXT>
          </View>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <View style={styles.blood_grp_wrapper}>
            <TEXT text_style={styles.label}>
              Please enter your blood group{' '}
            </TEXT>
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === 'android') {
                  bloodGroupRef.current.focus();
                } else if (Platform.OS === 'ios') {
                  bloodGroupRef.current.togglePicker(true);
                }
              }}
              style={styles.blood_group_text_input}>
              <TextInput
                style={styles.blood_group_input}
                value={form.values.blood_group}
                onChangeText={form.handleChange('blood_group')}
                editable={false}
              />
              <View>
                <DropdownArrow color="#27AD80" />
              </View>
            </TouchableOpacity>

            <ErrorTEXT>
              {form.touched.blood_group && form.errors.blood_group
                ? form.errors.blood_group
                : ''}
            </ErrorTEXT>
          </View>
        </>
      ) : null}

      {step === 4 ? (
        <View style={styles.checkboxes_wrapper}>
          <TouchableOpacity
            onPress={() => {
              form.setFieldValue('isUnderDoctorCare', true);
            }}>
            <View style={styles.checkbox_wrapper}>
              <CheckBox
                isChecked={
                  form.values.isUnderDoctorCare === true ? true : false
                }
              />
              <TEXT
                text_style={
                  form.values.isUnderDoctorCare === true
                    ? [styles.checkbox_label, styles.selected_checkbox_label]
                    : styles.checkbox_label
                }>
                yes
              </TEXT>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              form.setFieldValue('isUnderDoctorCare', false);
            }}>
            <View style={styles.checkbox_wrapper}>
              <CheckBox
                isChecked={
                  form.values.isUnderDoctorCare === false ? true : false
                }
              />

              <TEXT
                text_style={
                  form.values.isUnderDoctorCare === false
                    ? [styles.checkbox_label, styles.selected_checkbox_label]
                    : styles.checkbox_label
                }>
                no
              </TEXT>
            </View>
          </TouchableOpacity>

          <ErrorTEXT>
            {form.touched.isUnderDoctorCare && form.errors.isUnderDoctorCare
              ? form.errors.isUnderDoctorCare
              : ''}
          </ErrorTEXT>
        </View>
      ) : null}

      {step === 5 ? (
        <View style={styles.checkboxes_wrapper}>
          <TouchableOpacity
            onPress={() => {
              form.setFieldValue('language', 'english');
            }}>
            <View style={styles.checkbox_wrapper}>
              <CheckBox
                isChecked={form.values.language === 'english' ? true : false}
              />

              <TEXT
                text_style={
                  form.values.language === 'english'
                    ? [styles.checkbox_label, styles.selected_checkbox_label]
                    : styles.checkbox_label
                }>
                english
              </TEXT>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              form.setFieldValue('language', 'russian');
            }}>
            <View style={styles.checkbox_wrapper}>
              <CheckBox
                isChecked={form.values.language === 'russian' ? true : false}
              />

              <TEXT
                text_style={
                  form.values.language === 'russian'
                    ? [styles.checkbox_label, styles.selected_checkbox_label]
                    : styles.checkbox_label
                }>
                russian
              </TEXT>
            </View>
          </TouchableOpacity>

          <ErrorTEXT>
            {form.touched.language && form.errors.language
              ? form.errors.language
              : ''}
          </ErrorTEXT>
        </View>
      ) : null}

      {step === 6 ? (
        <>
          {/* <TextInput style={styles.text_input} /> */}
          <View style={styles.diseases_wrapper}>
            <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
              {diseases_and_conditions.map((item: string, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.diseases_checkbox}
                    onPress={() => {
                      handleSelectedDiseasesConditions(index);
                    }}>
                    <View
                      style={[
                        styles.checkbox_wrapper,
                        {alignItems: 'flex-start'},
                      ]}>
                      <CheckBox
                        isChecked={
                          //@ts-ignore
                          selectedDiseasesConditions.includes(item) === true
                            ? true
                            : false
                        }
                      />
                      <TEXT
                        text_style={
                          //@ts-ignore
                          selectedDiseasesConditions.includes(item) === true
                            ? [
                                styles.checkbox_label,
                                styles.selected_checkbox_label,
                              ]
                            : styles.checkbox_label
                        }>
                        {item}
                      </TEXT>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <ErrorTEXT>
            {showSelectedDiseasesError === true
              ? 'please select at least one diseases or condition or select none at the last'
              : ''}
          </ErrorTEXT>
        </>
      ) : null}
      {step === 7 ? (
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

      {step === 7 ? (
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
      <View
        style={[
          styles.next_btn,
          step === 8 ? {marginTop: pixelSizeVertical(5)} : {},
        ]}>
        <PrimaryButton
          text="next"
          handleOnPress={() => {
            setIsSkiped(false);
            handleValidation(false);
          }}
        />
      </View>

      {step > 1 ? (
        <View style={styles.back_btn}>
          <PrimaryButton
            text="back"
            handleOnPress={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
          />
        </View>
      ) : null}
      {showError === true ? <ErrorTEXT>{serverErrors}</ErrorTEXT> : null}

      <SelectPicker
        handleOnChange={async (value: any, index: number) => {
          await form.setFieldValue('blood_group', value.value);
        }}
        items={blood_groups}
        label={'label'}
        ref={bloodGroupRef}
      />

      <SelectPicker
        items={timezones}
        ref={timezone_ref}
        handleOnChange={async (itemValue: any, itemIndex: number) => {
          console.log('item value=', itemValue);
          await form.setFieldValue('timezone_code', itemValue.tzCode);
          await form.setFieldValue('timezone_utc', itemValue.utc);
        }}
        label={'tzCode'}
      />
    </View>
  );
};

export default PatientQAForm;
