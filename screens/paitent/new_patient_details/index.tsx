import PatientInfo from '@components/patient_info';
import TEXT from '@components/text';
import GreenRightArrowHead from '@svgs/greenRightArrowHead';
import GreenArrowHeadDown from '@svgs/green_arrowhead_down';
import Upload from '@svgs/upload';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import {useFormik} from 'formik';
import React, {useContext, useRef, useState} from 'react';
import {View, ScrollView, StyleSheet, TextInput, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native';
import styles from '../patient_details/styles';
import DocumentPicker, {types} from 'react-native-document-picker';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@components/checkbox';
import schema from './schema';
import SelectPicker from '@components/picker';
import ErrorTEXT from '@components/text/error_text';
import DatePicker from 'react-native-date-picker';
import {LoadingContext} from '@contexts/loadingContext';
import {addRelativePatient} from '@utils/patient';
import {useDispatch} from 'react-redux';
import {save_user} from '@actions/auth';
import SelectPatientModal from '@components/appointment/selectPatientModal';
const NewPatientDetails = ({navigation}: {navigation: any}) => {
  const reasons = [
    {label: 'Diabetes or Blood Pressure', value: 'Diabetes or Blood Pressure'},
    {label: 'Headaches and migraines', value: 'Headaches and migraines'},
    {label: 'Cold, Cough', value: 'Cold, Cough'},
    {label: 'Sex Problems', value: 'Sex Problems'},
    {label: 'Children health', value: 'Children health'},
    {
      label: 'Nose, Ear and Throat problem',
      value: 'Nose, Ear and Throat problem',
    },
    {
      label: 'Female health Or Pregnancy or Gyne',
      value: 'Female health Or Pregnancy or Gyne',
    },
    {label: 'Pain', value: 'Pain'},
    {label: 'Skin issues', value: 'Skin issues'},
    {label: 'Diarrhea Or Vomiting', value: 'Diarrhea Or Vomiting'},
  ];
  const reason_ref_android: any = useRef();
  const reason_ref_ios: any = useRef();
  const [serverErrors, setServerErrors] = useState('');
  const [selectedDiseasesConditions, setSelectedDiseasesConditions] = useState(
    [],
  );
  const [selectedGender, setSelectedGender] = useState('Male');
  const loadingContext: any = useContext(LoadingContext);
  const gender_ref: any = useRef();
  const diseases_ref = useRef();
  const bloodGroup_ref = useRef();
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const dispatch = useDispatch();
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
  const reason_ref = useRef();
  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];
  const form = useFormik({
    initialValues: {
      fullName: '',
      height_ft: '',
      height_inches: '',
      weight: '',
      gender: '',
      diseases_and_conditions: '',
      isUnderDoctorCare: false,
      blood_group: '',
      dob: '',
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      await loadingContext.handleToggleLoader(true);
      let res = await addRelativePatient({
        full_name: values.fullName,
        height_ft: values.height_ft,
        height_inches: values.height_inches,
        weight: values.weight,
        gender: values.gender,
        diseases_and_conditions: values.diseases_and_conditions,
        is_under_doctor_care: values.isUnderDoctorCare,
        bloodGroup: values.blood_group,
        dob: values.dob,
      });
      console.log('res 125 ==', res);

      if (res.user) {
        dispatch(save_user(res.user));
        actions.resetForm();
        //@ts-ignore
        navigation.navigate('ManagePatients');
      }
      await loadingContext.handleToggleLoader(false);
      console.log('values 90=', values);
    },
  });

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
        'diseases_and_conditions',
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
        'diseases_and_conditions',
        selectedDiseasesConditions,
      );
    }
  };
  const handleFileUpload = async (options: any) => {
    await DocumentPicker.pickMultiple(options)
      .then(res => {})
      .catch(err => {
        if (DocumentPicker.isCancel(err)) {
          console.warn('cancelled');
          // User cancelled the picker, exit any dialogs or menus and move on
        }
      });
  };

  return (
    <View style={styles.patient_details_wrapper}>
      <ScrollView style={{flex: 1}}>
        <TEXT text_style={Styles.title}>Patient Selection</TEXT>
        <View
          style={[styles.patient_info_wrapper, Styles.patient_info_wrapper]}>
          <PatientInfo />
        </View>
        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.label}>full name</TEXT>
          <TextInput
            style={[styles.info_text_wrapper, Styles.info_text_wrapper]}
            value={form.values.fullName}
            onChangeText={form.handleChange('fullName')}></TextInput>
        </View>
        <ErrorTEXT>
          {form.touched.fullName && form.errors.fullName
            ? form.errors.fullName
            : null}
        </ErrorTEXT>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: pixelSizeHorizontal(250),
            justifyContent: 'space-between',
          }}>
          <View style={Styles.info_parent}>
            <View style={styles.info_wrapper}>
              <TEXT text_style={styles.label}>Gender</TEXT>
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS === 'android') {
                    gender_ref.current.focus();
                  } else if (Platform.OS === 'ios') {
                    gender_ref.current.togglePicker(true);
                  }
                }}>
                <View
                  style={[
                    styles.info_text_wrapper,
                    Styles.info_text_wrapper,
                    Styles.sm_info_text_wrapper,
                  ]}>
                  <TEXT text_style={Styles.text}>{form.values.gender}</TEXT>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.info_parent}>
            <View style={styles.info_wrapper}>
              <TEXT text_style={styles.label}>DOB</TEXT>
              <TouchableOpacity
                onPress={() => {
                  setShowDOBPicker(true);
                }}>
                <View
                  style={[
                    styles.info_text_wrapper,
                    Styles.info_text_wrapper,
                    Styles.sm_info_text_wrapper,
                  ]}>
                  <TEXT text_style={Styles.text}>{form.values.dob}</TEXT>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TEXT text_style={styles.label}>is under doctor care</TEXT>

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
        <ErrorTEXT>
          {form.touched.gender && form.errors.gender
            ? form.errors.gender
            : null}
        </ErrorTEXT>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: pixelSizeHorizontal(250),
            justifyContent: 'space-between',
          }}>
          <View style={styles.info_wrapper}>
            <TEXT text_style={styles.label}>height in ft</TEXT>
            <TextInput
              style={[
                styles.info_text_wrapper,
                Styles.info_text_wrapper,
                Styles.sm_info_text_wrapper,
              ]}
              keyboardType="number-pad"
              value={form.values.height_ft}
              onChangeText={form.handleChange('height_ft')}></TextInput>
          </View>
          <View style={styles.info_wrapper}>
            <TEXT text_style={styles.label}>height in inches</TEXT>
            <TextInput
              style={[
                styles.info_text_wrapper,
                Styles.info_text_wrapper,
                Styles.sm_info_text_wrapper,
              ]}
              keyboardType="number-pad"
              value={form.values.height_inches}
              onChangeText={form.handleChange('height_inches')}></TextInput>
          </View>
        </View>
        <ErrorTEXT>
          {form.touched.height_ft && form.errors.height_ft
            ? form.errors.height_ft
            : null}
        </ErrorTEXT>

        <ErrorTEXT>
          {form.touched.height_inches && form.errors.height_inches
            ? form.errors.height_inches
            : null}
        </ErrorTEXT>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: pixelSizeHorizontal(250),
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => {}} style={styles.info_wrapper}>
            <TEXT text_style={styles.label}>Weight</TEXT>
            <TextInput
              style={[
                styles.info_text_wrapper,
                Styles.info_text_wrapper,
                Styles.sm_info_text_wrapper,
              ]}
              value={form.values.weight}
              keyboardType="number-pad"
              onChangeText={form.handleChange('weight')}></TextInput>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'android') {
                //@ts-ignore
                bloodGroup_ref.current.focus();
              } else if (Platform.OS === 'ios') {
                //@ts-ignore
                bloodGroup_ref.current.togglePicker(true);
              }
            }}
            style={styles.info_wrapper}>
            <TEXT text_style={styles.label}>bloodgroup</TEXT>

            <TextInput
              style={[
                styles.info_text_wrapper,
                Styles.info_text_wrapper,
                Styles.sm_info_text_wrapper,
              ]}
              editable={false}
              value={form.values.blood_group}
              onChangeText={form.handleChange('blood_group')}></TextInput>
          </TouchableOpacity>
        </View>

        <ErrorTEXT>
          {form.touched.weight && form.errors.weight
            ? form.errors.weight
            : null}
        </ErrorTEXT>

        <TEXT text_style={styles.label}>Diseases and Conditions</TEXT>

        <View style={styles.diseases_wrapper}>
          <ScrollView
            nestedScrollEnabled={true}
            style={{flex: 1, width: '100%', height: '100%'}}>
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
          {form.touched.diseases_and_conditions &&
          form.errors.diseases_and_conditions
            ? form.errors.diseases_and_conditions
            : null}
        </ErrorTEXT>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('ConnectWithDoctor');
            form.handleSubmit();
            console.log('form errors status', form.errors);
          }}>
          <View
            style={[styles.info_text_wrapper, styles.payment_method_wrapper]}>
            <TEXT text_style={styles.payment_method_text}>add patient</TEXT>
            <GreenRightArrowHead />
          </View>
        </TouchableOpacity>
      </ScrollView>
      <SelectPicker
        items={genders}
        ref={gender_ref}
        handleOnChange={async (itemValue: any, itemIndex: number) => {
          await form.setFieldValue('gender', itemValue.value);
        }}
        label={'label'}
      />
      <SelectPicker
        items={diseases_and_conditions}
        ref={diseases_ref}
        handleOnChange={async (itemValue: any, itemIndex: number) => {
          await form.setFieldValue('diseases_and_conditions', itemValue.value);
        }}
        label={'label'}
      />

      <SelectPicker
        items={blood_groups}
        ref={bloodGroup_ref}
        handleOnChange={async (itemValue: any, itemIndex: number) => {
          await form.setFieldValue('blood_group', itemValue.value);
        }}
        label={'label'}
      />
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
    </View>
  );
};

export default NewPatientDetails;

const Styles = StyleSheet.create({
  info_text_wrapper: {
    backgroundColor: 'rgba(167, 145, 30, 0.13)',
  },
  text: {
    color: '#686868',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
  },
  info_parent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sm_info_text_wrapper: {
    backgroundColor: 'rgba(167, 145, 30, 0.13)',
    width: widthPixel(88),
    height: heightPixel(48),
  },
  title: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
    fontWeight: '500',
    marginTop: pixelSizeVertical(42),
  },
  patient_info_wrapper: {
    marginTop: pixelSizeVertical(21),
  },
});
