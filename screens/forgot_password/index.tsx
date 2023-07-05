import {useFormik} from 'formik';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import PrimaryButton from '@components/buttons/primaryButton';
import Text_input_field from '@components/input_fields/text_input_field';
import styles from '../change_password/styles';
import {
  phone_number_schema,
  new_password_schema,
  code_schema,
  verify_code_schema,
} from './schema';
import ErrorTEXT from '@components/text/error_text';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {LoadingContext} from '@contexts/loadingContext';
import {
  save_new_password,
  sendForgotPasswordOTP,
  verify_forgot_password_otp,
} from '@utils/auth';
import SingleDigitInput from '@components/input_fields/singleDigitInput';
import TEXT from '@components/text';
import PhoneSMSCode from '@svgs/phone_sms_code';
import Styles from './styles';
const ForgotPassword = () => {
  const focus = useIsFocused();

  const loadingContext: any = useContext(LoadingContext);

  const code_1_ref = useRef();
  const code_2_ref = useRef();
  const code_3_ref = useRef();
  const code_4_ref = useRef();
  const code_5_ref = useRef();
  const code_6_ref = useRef();

  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCodeVerificationForm, setShowCodeVerificationCode] =
    useState(true);
  const [serverError, setServerError] = useState('');
  const [showError, setShowError] = useState(false);

  const password_form = useFormik({
    initialValues: {
      new_password: 'Qwerty@1234',
      confirm_new_password: 'Qwerty@1234',
    },
    validationSchema: new_password_schema,
    onSubmit: async (values, actions) => {
      await loadingContext.handleToggleLoader(true);

      console.log('password form values=', values);
      let otp_code =
        code_verification_form.values.code_1 +
        code_verification_form.values.code_2 +
        code_verification_form.values.code_3 +
        code_verification_form.values.code_4 +
        code_verification_form.values.code_5 +
        code_verification_form.values.code_6;
      let res: any = await save_new_password({
        phone_number: phone_form.values.phone_number,
        otp_code: otp_code,
        new_password: values.new_password,
        confirm_new_password: values.confirm_new_password,
      });
      console.log('response55=', res);
      if (res.success == true) {
        setShowError(true);
        //@ts-ignore
        setServerError('');
        setShowPhoneForm(false);
        setShowCodeVerificationCode(false);
        setShowPasswordForm(true);
        await loadingContext.handleToggleLoader(false);

        Alert.alert('successfully changed password');
        setTimeout(() => {
          //@ts-ignore
          navigation.navigate('SignIn');
        }, 3000);
      }
      if (res.error === true) {
        setServerError(res.message);
        setShowError(true);
        await loadingContext.handleToggleLoader(false);
      }
    },
  });

  const navigation = useNavigation();

  const code_verification_form = useFormik({
    initialValues: {
      code_1: '',
      code_2: '',
      code_3: '',
      code_4: '',
      code_5: '',
      code_6: '',
    },
    validationSchema: verify_code_schema,
    onSubmit: async (values, actions) => {
      await loadingContext.handleToggleLoader(true);
      let otp =
        values.code_1 +
        values.code_2 +
        values.code_3 +
        values.code_4 +
        values.code_5 +
        values.code_6;
      console.log('values=', otp);
      let res: any = await verify_forgot_password_otp({
        phone_number: phone_form.values.phone_number,
        otp_code: otp,
      });
      await loadingContext.handleToggleLoader(false);
      console.log('res-success 65=', res);
      if (res.success == true) {
        setShowError(true);
        //@ts-ignore
        setServerError('');
        setShowPhoneForm(false);
        setShowCodeVerificationCode(false);
        setShowPasswordForm(true);
      }
      if (res.error === true) {
        setServerError(res.message);
        setShowError(true);
      }
    },
  });

  const phone_form = useFormik({
    initialValues: {phone_number: '+923248847483'},
    validationSchema: phone_number_schema,
    onSubmit: async (values, actions) => {
      console.log('values=', values);
      await loadingContext.handleToggleLoader(true);
      let res: any = await sendForgotPasswordOTP(values.phone_number);
      console.log('res_success=', res.success);
      if (res.error === true) {
        setServerError(res.message);
        setShowError(true);
      }
      if (res.success === true) {
        setShowError(true);
        //@ts-ignore
        setServerError('');
        setShowPhoneForm(false);
        setShowPasswordForm(false);
        setShowCodeVerificationCode(true);
      }
      await loadingContext.handleToggleLoader(false);
    },
  });

  useEffect(() => {
    if (focus === true) {
      setShowPasswordForm(false);
      setShowPhoneForm(true);
      setShowCodeVerificationCode(false);
    }
  }, [focus]);

  return (
    <View style={styles.change_password_wrapper}>
      {showPhoneForm === true ? (
        <View style={styles.change_password_wrapper}>
          <View style={styles.input_field_wrappper}>
            <Text_input_field
              handleOnChange={phone_form.handleChange('phone_number')}
              label="phone number"
              isSecure={false}
              value={phone_form.values.phone_number}
            />
            <ErrorTEXT>
              {phone_form.touched.phone_number && phone_form.errors.phone_number
                ? phone_form.errors.phone_number
                : ''}
            </ErrorTEXT>

            <ErrorTEXT>
              {showError === true && serverError.length > 0 ? serverError : ''}
            </ErrorTEXT>
          </View>
          <View style={styles.btn_wrapper}>
            <PrimaryButton
              text="send pin code"
              handleOnPress={() => {
                phone_form.handleSubmit();
              }}
            />
          </View>
        </View>
      ) : null}

      {showCodeVerificationForm === true ? (
        <View style={styles.change_password_wrapper}>
          <View style={Styles.phone_code_icon}>
            <PhoneSMSCode />
          </View>
          <TEXT text_style={Styles.verification_text}>
            {/* @ts-ignore */}
            we have sent you an SMS on {phone_form.values.phone_number} with 6
            digit verification code
          </TEXT>
          <View style={Styles.input_fields_wrapper}>
            <SingleDigitInput
              handleOnChange={async (val: string) => {
                await code_verification_form.setFieldValue('code_1', val);
                //@ts-ignore
                await code_2_ref.current.focus();
              }}
              ref={code_1_ref}
              value={code_verification_form.values.code_1}
            />
            <SingleDigitInput
              handleOnChange={async (val: string) => {
                await code_verification_form.setFieldValue('code_2', val);
                //@ts-ignore
                await code_3_ref.current.focus();
              }}
              ref={code_2_ref}
              value={code_verification_form.values.code_2}
            />
            <SingleDigitInput
              handleOnChange={async (val: string) => {
                await code_verification_form.setFieldValue('code_3', val);
                //@ts-ignore
                await code_4_ref.current.focus();
              }}
              ref={code_3_ref}
              value={code_verification_form.values.code_3}
            />

            <SingleDigitInput
              handleOnChange={async (val: string) => {
                await code_verification_form.setFieldValue('code_4', val);
                //@ts-ignore
                await code_5_ref.current.focus();
              }}
              ref={code_4_ref}
              value={code_verification_form.values.code_4}
            />

            <SingleDigitInput
              handleOnChange={async (val: string) => {
                await code_verification_form.setFieldValue('code_5', val);
                //@ts-ignore
                await code_6_ref.current.focus();
              }}
              ref={code_5_ref}
              value={code_verification_form.values.code_5}
            />

            <SingleDigitInput
              handleOnChange={async (val: string) => {
                await code_verification_form.setFieldValue('code_6', val);
              }}
              ref={code_6_ref}
              value={code_verification_form.values.code_6}
            />
          </View>
          <View style={Styles.errors_wrapper}>
            <ErrorTEXT>
              {code_verification_form.touched.code_1 &&
              code_verification_form.errors.code_1
                ? code_verification_form.errors.code_1
                : ''}
            </ErrorTEXT>
            <ErrorTEXT>
              {code_verification_form.touched.code_2 &&
              code_verification_form.errors.code_2
                ? code_verification_form.errors.code_2
                : ''}
            </ErrorTEXT>

            <ErrorTEXT>
              {code_verification_form.touched.code_3 &&
              code_verification_form.errors.code_3
                ? code_verification_form.errors.code_3
                : ''}
            </ErrorTEXT>

            <ErrorTEXT>
              {code_verification_form.touched.code_4 &&
              code_verification_form.errors.code_4
                ? code_verification_form.errors.code_4
                : ''}
            </ErrorTEXT>

            <ErrorTEXT>
              {code_verification_form.touched.code_5 &&
              code_verification_form.errors.code_5
                ? code_verification_form.errors.code_5
                : ''}
            </ErrorTEXT>

            <ErrorTEXT>
              {code_verification_form.touched.code_6 &&
              code_verification_form.errors.code_6
                ? code_verification_form.errors.code_6
                : ''}
            </ErrorTEXT>

            <ErrorTEXT>
              {showError === true && serverError.length > 0 ? serverError : ''}
            </ErrorTEXT>
          </View>
          <View style={styles.btn_wrapper}>
            <PrimaryButton
              text="verify"
              handleOnPress={() => {
                code_verification_form.handleSubmit();
              }}
            />
          </View>
        </View>
      ) : null}
      {showPasswordForm === true ? (
        <View style={styles.change_password_wrapper}>
          <View style={styles.input_field_wrappper}>
            <Text_input_field
              handleOnChange={password_form.handleChange('new_password')}
              label="new password"
              isSecure={true}
              value={password_form.values.new_password}
              RightIcon={'eye-icon'}
            />
          </View>
          <ErrorTEXT>
            {password_form.touched.new_password &&
            password_form.errors.new_password
              ? password_form.errors.new_password
              : null}
          </ErrorTEXT>
          <View style={styles.input_field_wrappper}>
            <Text_input_field
              handleOnChange={password_form.handleChange(
                'confirm_new_password',
              )}
              label="confirm new password"
              isSecure={true}
              value={password_form.values.confirm_new_password}
              RightIcon={'eye-icon'}
            />
          </View>
          <ErrorTEXT>
            {password_form.touched.confirm_new_password &&
            password_form.errors.confirm_new_password
              ? password_form.errors.confirm_new_password
              : null}
          </ErrorTEXT>
          <ErrorTEXT>
            {showError === true && serverError.length > 0 ? serverError : null}
          </ErrorTEXT>
          <View style={styles.btn_wrapper}>
            <PrimaryButton
              text="reset password"
              handleOnPress={() => {
                password_form.handleSubmit();
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ForgotPassword;
