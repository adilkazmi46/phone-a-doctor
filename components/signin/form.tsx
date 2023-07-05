import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
import {LoadingContext} from '@contexts/loadingContext';

const SignInForm = ({
  schema,
  handleSignIn,
  serverError,
}: {
  schema: any;
  handleSignIn: any;
  serverError: any;
}) => {
  const navigation = useNavigation();
  const loadingContext: any = useContext(LoadingContext);

  const formik = useFormik({
    initialValues: {
      phone: '3248847481',
      password: 'Qwerty@123',
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      await loadingContext.handleToggleLoader(true);
      await handleSignIn({
        password: values.password,
        phone: values.phone,
      });
    },
  });

  return (
    <View
      // style={styles.form_wrapper}
      style={styles.form_wrapper}>
      <View style={styles.input_field_wrappper}>
        <Phone_input_field
          handleOnChange={formik.handleChange('phone')}
          label="phone"
          value={formik.values.phone}
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

        <ErrorTEXT>
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ''}
        </ErrorTEXT>
      </View>
      <View style={styles.btn_wrapper}>
        <PrimaryButton
          text="sign in"
          handleOnPress={() => {
            formik.handleSubmit();
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          navigation.push('ForgotPassword');
        }}>
        <TEXT text_style={styles.bottom_login_text}>Forgot password ?</TEXT>
      </TouchableOpacity>

      <ErrorTEXT>{serverError ? serverError.errorMsg : ''}</ErrorTEXT>
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  form_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: pixelSizeVertical(34),
    flex: 1,
  },
  input_field_wrappper: {
    marginVertical: pixelSizeVertical(16),
    width: widthPixel(300),
    height: heightPixel(90),
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
