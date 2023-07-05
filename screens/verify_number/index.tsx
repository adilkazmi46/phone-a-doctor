import React, {useContext, useRef, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import PhoneSMSCode from '@svgs/phone_sms_code';
import PrimaryButton from '@components/buttons/primaryButton';
import SingleDigitInput from '@components/input_fields/singleDigitInput';
import TEXT from '@components/text';
import styles from './styles';
import {useFormik} from 'formik';
import schema from './schema';
import {resendOTP, verifyOTP} from '@utils/auth';
import {useDispatch, useSelector} from 'react-redux';
import {remove_user, save_user, signout} from '@actions/auth';
import {LoadingContext} from '@contexts/loadingContext';
import ErrorTEXT from '@components/text/error_text';
import AsyncStorage from '@react-native-async-storage/async-storage';
const VerifyNumber = ({navigation}: {navigation: any}) => {
  const [showServerError, setShowServerError] = useState(false);
  const [error_msg, set_error_msg] = useState('');
  const loadingContext: any = useContext(LoadingContext);
  const user: any = useSelector((state: any) => {
    return state.user;
  });
  const dispatch = useDispatch();

  const code_1_ref = useRef();
  const code_2_ref = useRef();
  const code_3_ref = useRef();
  const code_4_ref = useRef();
  const code_5_ref = useRef();
  const code_6_ref = useRef();

  const form = useFormik({
    initialValues: {
      code_1: '',
      code_2: '',
      code_3: '',
      code_4: '',
      code_5: '',
      code_6: '',
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      await loadingContext.handleToggleLoader(true);
      let otp =
        values.code_1 +
        values.code_2 +
        values.code_3 +
        values.code_4 +
        values.code_5 +
        values.code_6;
      let res: any = await verifyOTP(otp);
      if (res.user) {
        await dispatch(save_user(res.user));
      }
      if (res.err_code === 422) {
        setShowServerError(true);
        set_error_msg(res.message);
      }
      await loadingContext.handleToggleLoader(false);
    },
  });
  const handleResendVerificationCode = async (phone: string) => {
    await loadingContext.handleToggleLoader(true);
    let res: any = await resendOTP();
    console.log('resend res=', res);
    if (res.resend === true) {
      Alert.alert('OTP code resend successfully!');
    }
    await loadingContext.handleToggleLoader(false);
  };

  const handleLogout = async () => {
    await loadingContext.handleToggleLoader(true);
    await AsyncStorage.removeItem('jwt_token');
    await dispatch(signout(false));
    await dispatch(remove_user());

    console.log('logout 35 =');

    //@ts-ignore
    // navigation.navigate('Splash');

    await loadingContext.handleToggleLoader(false);
  };
  return (
    <View style={styles.verify_wrapper}>
      <View style={styles.phone_code_icon}>
        <PhoneSMSCode />
      </View>
      <TEXT text_style={styles.verification_text}>
        {/* @ts-ignore */}
        we have sent you an SMS on {user.phone_number} with 6 digit verification
        code
      </TEXT>
      <View style={styles.input_fields_wrapper}>
        <SingleDigitInput
          handleOnChange={async (val: string) => {
            //@ts-ignore
            if (isNaN(val) === false && val != ' ') {
              await form.setFieldValue('code_1', val);

              if (val.length > 0) {
                //@ts-ignore
                await code_2_ref.current.focus();
              }
            }
          }}
          onKeyPress={(el: any) => {
            if (el.nativeEvent.key === 'Backspace') {
            }
          }}
          value={form.values.code_1}
          ref={code_1_ref}
        />
        <SingleDigitInput
          handleOnChange={async (val: string) => {
            await form.setFieldValue('code_2', val);
            if (val.length === 1) {
              //@ts-ignore
              await code_3_ref.current.focus();
            }
          }}
          onKeyPress={(el: any) => {
            if (el.nativeEvent.key === 'Backspace') {
              //@ts-ignore
              code_1_ref.current.focus();
            }
          }}
          value={form.values.code_2}
          ref={code_2_ref}
        />
        <SingleDigitInput
          handleOnChange={async (val: string) => {
            //@ts-ignore
            if (isNaN(val) === false && val != ' ') {
              await form.setFieldValue('code_3', val);
              if (val.length > 0) {
                //@ts-ignore
                await code_4_ref.current.focus();
              }
            }
          }}
          onKeyPress={(el: any) => {
            if (el.nativeEvent.key === 'Backspace') {
              //@ts-ignore
              code_2_ref.current.focus();
            }
          }}
          value={form.values.code_3}
          ref={code_3_ref}
        />

        <SingleDigitInput
          handleOnChange={async (val: string) => {
            console.log('val 143=', val);
            //@ts-ignore
            if (isNaN(val) === false && val != ' ') {
              await form.setFieldValue('code_4', val);
              if (val.length > 0) {
                //@ts-ignore
                await code_5_ref.current.focus();
              }
            }
          }}
          onKeyPress={(el: any) => {
            if (el.nativeEvent.key === 'Backspace') {
              //@ts-ignore
              code_3_ref.current.focus();
            }
          }}
          value={form.values.code_4}
          ref={code_4_ref}
        />

        <SingleDigitInput
          handleOnChange={async (val: string) => {
            //@ts-ignore
            if (isNaN(val) === false && val != ' ') {
              await form.setFieldValue('code_5', val);
              if (val.length > 0) {
                //@ts-ignore
                await code_6_ref.current.focus();
              }
            }
          }}
          onKeyPress={(el: any) => {
            if (el.nativeEvent.key === 'Backspace') {
              //@ts-ignore
              code_4_ref.current.focus();
            }
          }}
          value={form.values.code_5}
          ref={code_5_ref}
        />

        <SingleDigitInput
          handleOnChange={async (val: string) => {
            //@ts-ignore
            console.log('168=', isNaN(val) === false && val != ' ');
            //@ts-ignore
            if (isNaN(val) === false && val != ' ') {
              await form.setFieldValue('code_6', val);
            }
          }}
          onKeyPress={(el: any) => {
            if (el.nativeEvent.key === 'Backspace') {
              //@ts-ignore
              code_5_ref.current.focus();
            }
          }}
          value={form.values.code_6}
          ref={code_6_ref}
        />
      </View>
      <View style={styles.bottom_text}>
        <ErrorTEXT>{showServerError === true ? error_msg : null}</ErrorTEXT>
      </View>

      <View style={styles.submit_btn_wrapper}>
        <PrimaryButton
          text="submit"
          handleOnPress={() => {
            form.handleSubmit();
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          handleResendVerificationCode();
        }}>
        <TEXT text_style={styles.bottom_text}>
          Didn't receive the code?{' '}
          <TEXT text_style={styles.bottom_bold_text}>Resend Now</TEXT>
        </TEXT>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          //@ts-ignore
          handleLogout();
        }}>
        <TEXT text_style={styles.bottom_text}>
          <TEXT text_style={styles.bottom_bold_text}>Logout</TEXT>
        </TEXT>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyNumber;
