import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CountryCodePicker from '@components/coutryCodePicker';

import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import PrimaryButton from '@components/buttons/primaryButton';
import Phone_input_field from '@components/input_fields/phone_input_field';
import Text_input_field from '@components/input_fields/text_input_field';
import TEXT from '@components/text';
import ErrorTEXT from '@components/text/error_text';
const SignUPForm = ({
  type,
  schema,
  handleDoctorSignUP,
  handleToggleLoader,
  serverError,
}: {
  type: string;
  schema: any;
  handleDoctorSignUP: any;
  handleToggleLoader: any;
  serverError: any;
}) => {
  const navigation = useNavigation();
  const [showCountryCodesModal, setShowCountryCodesModal] = useState(true);
  const [countryCode, setCountryCode] = useState({});

  useEffect(() => {
    console.log('line 82=', showCountryCodesModal);
  }, [showCountryCodesModal]);
  const countryCodes = [
    {
      country_name: 'myanmar',
      country_code: 'mm',
      phone_code: '+95',
    },
    {
      country_name: 'united states of america',
      country_code: 'us',
      phone_code: '+1',
    },
    {
      country_name: 'india',
      country_code: 'ind',
      phone_code: '+91',
    },
    {
      country_name: 'pakistan',
      country_code: 'pk',
      phone_code: '+92',
    },
    {
      country_name: 'canada',
      country_code: 'ca',
      phone_code: '+1',
    },
    {
      country_name: 'bangladesh',
      country_code: 'bd',
      phone_code: '+880',
    },
  ];

  const formik = useFormik({
    initialValues: {
      type: type,
      fullName: 'adil test',
      phone: '3248847481',
      password: 'Qwerty@123',
      confirm_password: 'Qwerty@123',
      country_code: '',
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      handleToggleLoader(true);
      //@ts-ignore
      let phone_number = countryCode.phone_code + values.phone;
      console.log('phone number 85=', phone_number);
      await handleDoctorSignUP({
        phone: phone_number,
        password: values.password,
        fullName: values.fullName,
      });
    },
  });
  useEffect(() => {
    console.log('server error=', serverError);
  }, [serverError]);
  return (
    <View
      // style={styles.form_wrapper}
      style={styles.form_wrapper}>
      <View style={styles.input_field_wrappper}>
        <Text_input_field
          handleOnChange={formik.handleChange('fullName')}
          label="enter full name"
          isSecure={false}
          value={formik.values.fullName}
        />
      </View>

      <ErrorTEXT>
        {formik.touched.fullName && formik.errors.fullName
          ? formik.errors.fullName
          : ''}
      </ErrorTEXT>

      <TouchableOpacity
        onPress={() => {
          setShowCountryCodesModal(true);
        }}
        style={styles.input_field_wrappper}>
        <Text_input_field
          handleOnChange={formik.handleChange('phone_code')}
          label="country code"
          isSecure={false}
          value={
            //@ts-ignore
            countryCode.phone_code //@ts-ignore
              ? countryCode.phone_code
              : ''
          }
          isEditable={false}
        />
      </TouchableOpacity>
      <ErrorTEXT>
        {formik.touched.country_code && formik.errors.country_code
          ? formik.errors.country_code
          : ''}
      </ErrorTEXT>
      <View style={styles.input_field_wrappper}>
        <Phone_input_field
          handleOnChange={formik.handleChange('phone')}
          label="phone"
          value={formik.values.phone}
          //@ts-ignore
          country={countryCode.country_code ? countryCode.country_code : ''}
        />
      </View>

      <ErrorTEXT>
        {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
      </ErrorTEXT>
      <View style={styles.input_field_wrappper}>
        <Text_input_field
          handleOnChange={formik.handleChange('password')}
          label="password"
          isSecure={true}
          value={formik.values.password}
          RightIcon={'eye-icon'}
        />
      </View>
      <ErrorTEXT>
        {formik.touched.fullName && formik.errors.password
          ? formik.errors.password
          : ''}
      </ErrorTEXT>
      <View style={styles.input_field_wrappper}>
        <Text_input_field
          handleOnChange={formik.handleChange('confirm_password')}
          label="re-type password"
          isSecure={true}
          value={formik.values.confirm_password}
          RightIcon={'eye-icon'}
        />
      </View>
      <ErrorTEXT>
        {formik.touched.confirm_password && formik.errors.confirm_password
          ? formik.errors.confirm_password
          : ''}
      </ErrorTEXT>
      <ErrorTEXT>{serverError ? serverError.errorMsg : ''}</ErrorTEXT>
      <View style={styles.btn_wrapper}>
        <PrimaryButton
          text="sign up"
          handleOnPress={() => {
            formik.handleSubmit();
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          navigation.navigate('SignIn');
        }}>
        <TEXT text_style={styles.bottom_login_text}>
          Already have an acount?
          <TEXT text_style={styles.login_text}>login</TEXT>
        </TEXT>
      </TouchableOpacity>
      {showCountryCodesModal === true ? (
        <CountryCodePicker
          selectedCountryCode={countryCode}
          setSelectedCountryCode={async (val: any) => {
            setCountryCode(val);
            await formik.setFieldValue('country_code', val.phone_code);
            setShowCountryCodesModal(false);
          }}
          showModal={false}
          countries={countryCodes}
        />
      ) : null}
    </View>
  );
};

export default SignUPForm;

const styles = StyleSheet.create({
  form_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginVertical: pixelSizeVertical(34),
    flex: 1,
  },
  input_field_wrappper: {
    marginVertical: pixelSizeVertical(16),
    width: widthPixel(300),
    height: heightPixel(85),
  },
  btn_wrapper: {
    width: widthPixel(300),
    height: heightPixel(60),
    marginTop: pixelSizeVertical(28),
  },
  bottom_login_text: {
    color: '#1C1C1C',
    fontSize: fontPixel(15),
    lineHeight: fontPixel(22),
    marginTop: pixelSizeVertical(8),
  },
  login_text: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textTransform: 'capitalize',
  },
});
