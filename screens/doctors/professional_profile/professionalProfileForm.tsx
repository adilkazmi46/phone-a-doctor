import PrimaryButton from '@components/buttons/primaryButton';
import Text_input_field from '@components/input_fields/text_input_field';
import TEXT from '@components/text';
import ErrorTEXT from '@components/text/error_text';
import RNPickerSelect from 'react-native-picker-select';
import schema from './schema';
import React, {useContext, useEffect, useRef} from 'react';
import {
  Platform,
  Pressable,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../personal_profile/styles';
import {useFormik} from 'formik';
import {LoadingContext} from '@contexts/loadingContext';
import {professionalProfileUpdate} from '@utils/doctor/profile';
import DocumentPicker, {types} from 'react-native-document-picker';
import SelectPicker from '@components/picker';
import {useNavigation} from '@react-navigation/native';
import {save_user} from '@actions/auth';

const ProfessionalProfileForm = ({
  setIsEditMode,
  medicalSpecialities,
  medicalCategories,
}: {
  setIsEditMode: any;
  medicalSpecialities: Array<any>;
  medicalCategories: Array<any>;
}) => {
  const user = useSelector((state: any) => {
    return state.user;
  });
  const dispath = useDispatch();
  const navigation = useNavigation();
  const medical_speciality_ref: any = useRef();
  const medical_category_ref: any = useRef();

  const loadingContext: any = useContext(LoadingContext);
  const form = useFormik({
    initialValues: {
      about: user.doctor.about,
      degree: user.doctor.degree,
      institute: user.doctor.institute,
      chamber_or_hospital_address: user.doctor.chamberORhospitalAddress,
      medical_certificate_no: user.doctor.medical_certificate
        ? user.doctor.medical_certificate.certificate_number
        : '',
      certificate_upload: '',
      gov_id_no:
        user.doctor && user.doctor.gov_id
          ? user.doctor.gov_id.gov_id_number
          : '',
      gov_id_front: null,
      gov_id_back: null,
      medical_category: user.doctor.medical_category,
      medical_field: user.doctor.medical_field,
      medical_speciality: user.doctor.medical_speciality,
      consultation_fee: user.doctor.consultation_fee
        ? user.doctor.consultation_fee.toString()
        : '',
      follow_up_fee: user.doctor.follow_up_fee
        ? user.doctor.follow_up_fee.toString()
        : '',
      experience: user.doctor.experience
        ? user.doctor.experience.toString()
        : '',
      doctor_24_7: user.doctor.is_24_7 ? Boolean(user.doctor.is_24_7) : false,
    },

    validationSchema: schema,
    onSubmit: async (values, actions) => {
      await loadingContext.handleToggleLoader(true);

      let res = await professionalProfileUpdate({
        degree: values.degree,
        Institute: values.institute,
        chamberOrHospitality: values.chamber_or_hospital_address,
        medicalCertificateNo: values.medical_certificate_no,
        certificate: values.certificate_upload,
        govIDNo: values.gov_id_no,
        govIDFront: values.gov_id_front,
        govIDBack: values.gov_id_back,
        medicalField: values.medical_field,
        medicalCategory: values.medical_category,
        medicalSpeciality: values.medical_speciality,
        consultationFee: values.consultation_fee,
        followUpFee: values.follow_up_fee,
        experience: values.experience,
        isDoctor247: values.doctor_24_7,
        about: values.about,
      });

      // console.log('form submit response=', res);
      console.log('doctor_profile=', res);

      if (res.success === true && res.user) {
        console.log('doctor_profile=', res.success);
        await dispath(save_user(res.user));

        //@ts-ignore
        navigation.navigate('DoctorsHome');
      }
      if (user.doctor.is_professional_profile_created === true) {
        await dispath(save_user(user));
        setIsEditMode(false);
      }
      await loadingContext.handleToggleLoader(false);
    },
  });

  const handleFileUpload = async (field: string, options: any) => {
    try {
      let res = await DocumentPicker.pickSingle(options);

      if (res.copyError) {
      }
      if (field === 'certificate') {
        await form.setFieldValue('certificate_upload', res);
      } else if (field === 'gov_id_back') {
        await form.setFieldValue('gov_id_back', res);
      } else if (field === 'gov_id_front') {
        await form.setFieldValue('gov_id_front', res);
      }
    } catch (err) {
      console.log('error=', err);
    }
  };
  return (
    <View style={styles.form_wrapper}>
      <View style={(styles.input_wrapper, styles.about_wrapper)}>
        <Text_input_field
          label="about"
          value={form.values.about}
          handleOnChange={form.handleChange('about')}
          isSecure={false}
          multiline={true}
        />
      </View>
      <ErrorTEXT>
        {form.touched.about && form.errors.about ? form.errors.about : ''}
      </ErrorTEXT>
      <View style={styles.input_wrapper}>
        <Text_input_field
          label="degree"
          value={form.values.degree}
          handleOnChange={form.handleChange('degree')}
          isSecure={false}
        />
      </View>
      <ErrorTEXT>
        {form.touched.degree && form.errors.degree ? form.errors.degree : ''}
      </ErrorTEXT>
      <View style={styles.input_wrapper}>
        <Text_input_field
          label="institute"
          value={form.values.institute}
          handleOnChange={form.handleChange('institute')}
          isSecure={false}
        />
      </View>

      <ErrorTEXT>
        {form.touched.institute && form.errors.institute
          ? form.errors.institute
          : ''}
      </ErrorTEXT>

      <View style={styles.input_wrapper}>
        <Text_input_field
          label="chamber/hospital address"
          value={form.values.chamber_or_hospital_address}
          handleOnChange={form.handleChange('chamber_or_hospital_address')}
          isSecure={false}
        />
      </View>

      <ErrorTEXT>
        {form.touched.chamber_or_hospital_address &&
        form.errors.chamber_or_hospital_address
          ? form.errors.chamber_or_hospital_address
          : ''}
      </ErrorTEXT>
      <View style={styles.input_wrapper}>
        <Text_input_field
          label="medical certificate no"
          value={form.values.medical_certificate_no}
          handleOnChange={form.handleChange('medical_certificate_no')}
          isSecure={false}
          type="decimal-pad"
        />
      </View>

      <ErrorTEXT>
        {form.touched.medical_certificate_no &&
        form.errors.medical_certificate_no
          ? form.errors.medical_certificate_no
          : ''}
      </ErrorTEXT>
      <Pressable
        onPress={() => {
          handleFileUpload('certificate', {type: types.images});
        }}
        style={styles.input_wrapper}>
        <Text_input_field
          label="certificate upload"
          value={
            //@ts-ignore
            form.values.certificate_upload //@ts-ignore
              ? form.values.certificate_upload.name
              : null
          }
          handleOnChange={form.handleChange('certificate_upload')}
          isSecure={false}
          isEditable={false}
        />
      </Pressable>
      <ErrorTEXT>
        {form.touched.certificate_upload && form.errors.certificate_upload
          ? form.errors.certificate_upload
          : ''}
      </ErrorTEXT>
      <View style={styles.input_wrapper}>
        <Text_input_field
          label="gov_id_no"
          value={form.values.gov_id_no}
          handleOnChange={form.handleChange('gov_id_no')}
          isSecure={false}
          type="decimal-pad"
        />
      </View>

      <ErrorTEXT>
        {form.touched.gov_id_no && form.errors.gov_id_no
          ? form.errors.gov_id_no
          : ''}
      </ErrorTEXT>
      <TouchableOpacity
        onPress={() => {
          handleFileUpload('gov_id_front', {type: types.images});
        }}
        style={styles.input_wrapper}>
        <Text_input_field
          label="govt ID front"
          value={
            //@ts-ignore
            form.values.gov_id_front ? form.values.gov_id_front.name : null
          }
          handleOnChange={() => {}}
          isSecure={false}
          isEditable={false}
        />
      </TouchableOpacity>

      <ErrorTEXT>
        {form.touched.gov_id_front && form.errors.gov_id_front
          ? form.errors.gov_id_front
          : ''}
      </ErrorTEXT>
      <TouchableOpacity
        onPress={() => {
          handleFileUpload('gov_id_back', {type: types.images});
        }}
        style={styles.input_wrapper}>
        <Text_input_field
          label="govt ID back" //@ts-ignore
          value={form.values.gov_id_back ? form.values.gov_id_back.name : null}
          handleOnChange={() => {}}
          isSecure={false}
          isEditable={false}
        />
      </TouchableOpacity>

      <ErrorTEXT>
        {form.touched.gov_id_back && form.errors.gov_id_back
          ? form.errors.gov_id_back
          : ''}
      </ErrorTEXT>

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            medical_category_ref.current.focus();
          }
          if (Platform.OS === 'ios') {
            medical_category_ref.current.togglePicker(true);
          }
        }}
        style={styles.input_wrapper}>
        <Text_input_field
          label="medical category"
          value={form.values.medical_category}
          handleOnChange={form.handleChange('medical_category')}
          isSecure={false}
          isEditable={false}
        />
      </TouchableOpacity>

      <ErrorTEXT>
        {form.touched.medical_category && form.errors.medical_category
          ? form.errors.medical_category
          : ''}
      </ErrorTEXT>

      <View style={styles.input_wrapper}>
        <Text_input_field
          label="medical field"
          value={form.values.medical_field}
          handleOnChange={form.handleChange('medical_field')}
          isSecure={false}
        />
      </View>

      <ErrorTEXT>
        {form.touched.medical_field && form.errors.medical_field
          ? form.errors.medical_field
          : ''}
      </ErrorTEXT>

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            medical_speciality_ref.current.focus();
          }
          if (Platform.OS === 'ios') {
            medical_speciality_ref.current.togglePicker(true);
          }
        }}
        style={[styles.input_wrapper, {backgroundColor: 'transparent'}]}>
        <Text_input_field
          label="medical speciality"
          value={form.values.medical_speciality}
          handleOnChange={form.handleChange('medical_speciality')}
          isSecure={false}
          isEditable={false}
        />
      </TouchableOpacity>

      <ErrorTEXT>
        {form.touched.medical_speciality && form.errors.medical_speciality
          ? form.errors.medical_speciality
          : ''}
      </ErrorTEXT>

      <View style={styles.input_wrapper}>
        <Text_input_field
          label="consultation fee"
          value={form.values.consultation_fee}
          handleOnChange={form.handleChange('consultation_fee')}
          isSecure={false}
          type="decimal-pad"
        />
      </View>

      <ErrorTEXT>
        {form.touched.consultation_fee && form.errors.consultation_fee
          ? form.errors.consultation_fee
          : ''}
      </ErrorTEXT>

      <View style={styles.input_wrapper}>
        <Text_input_field
          label="follow up fee"
          value={form.values.follow_up_fee}
          handleOnChange={form.handleChange('follow_up_fee')}
          isSecure={false}
          type="decimal-pad"
        />
      </View>

      <ErrorTEXT>
        {form.touched.follow_up_fee && form.errors.follow_up_fee
          ? form.errors.follow_up_fee
          : ''}
      </ErrorTEXT>

      <View style={styles.input_wrapper}>
        <Text_input_field
          label="experience (in years)"
          value={form.values.experience}
          handleOnChange={form.handleChange('experience')}
          isSecure={false}
          type="decimal-pad"
        />
      </View>

      <ErrorTEXT>
        {form.touched.experience && form.errors.experience
          ? form.errors.experience
          : ''}
      </ErrorTEXT>

      <View style={styles.input_wrapper}>
        <TEXT text_style={styles.input_label}>24/7 Doctor</TEXT>
        <Switch
          trackColor={{
            false: 'rgba(155,155,155,0.1)',
            true: 'rgba(155,155,155,0.1)',
          }}
          thumbColor={form.values.doctor_24_7 ? '#27AD80' : '#27AD80'}
          ios_backgroundColor="rgba(155,155,155,0.1)"
          onValueChange={async () => {
            await form.setFieldValue('doctor_24_7', !form.values.doctor_24_7);
          }}
          value={Boolean(form.values.doctor_24_7)}
        />
      </View>
      <ErrorTEXT>
        {form.touched.doctor_24_7 && form.errors.doctor_24_7
          ? form.errors.doctor_24_7
          : ''}
      </ErrorTEXT>

      <View style={[styles.edit_btn_wrapper, {alignSelf: 'center'}]}>
        <PrimaryButton
          _styles={form.isValid === false ? {backgroundColor: 'red'} : {}}
          handleOnPress={async () => {
            await form.handleSubmit();
            let tmp = await form.isValid;
            //@ts-ignore
            await console.log('check validation=', tmp);

            return;
          }}
          text={'update'}
        />
      </View>
      <View>
        <SelectPicker
          items={medicalSpecialities}
          handleOnChange={async (itemValue: any) => {
            console.log('item value=', itemValue);
            await form.setFieldValue('medical_speciality', itemValue.value);
          }}
          label="label"
          ref={medical_speciality_ref}
        />
      </View>

      <View>
        <SelectPicker
          items={medicalCategories}
          handleOnChange={async (itemValue: any) => {
            console.log('item value=', itemValue);
            await form.setFieldValue('medical_category', itemValue.value);
          }}
          label="label"
          ref={medical_category_ref}
        />
      </View>
    </View>
  );
};

export default ProfessionalProfileForm;
