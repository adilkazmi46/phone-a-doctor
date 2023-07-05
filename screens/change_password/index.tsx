import {useFormik, validateYupSchema} from 'formik';
import React, {useContext, useState} from 'react';
import {View, Alert} from 'react-native';
import PrimaryButton from '@components/buttons/primaryButton';
import Text_input_field from '@components/input_fields/text_input_field';
import styles from './styles';
import schema from './schema';
import ErrorTEXT from '@components/text/error_text';
import {LoadingContext} from '@contexts/loadingContext';
import {changePassword} from '@utils/index';

const ChangePassword = () => {
  const loadingContext: any = useContext(LoadingContext);
  const [serverErrors, setServerErrors] = useState('');
  const form = useFormik({
    initialValues: {
      old_password: 'Qwerty@123',
      new_password: 'Qwertyu@123',
      confirm_new_password: 'Qwertyu@123',
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      setServerErrors('');
      console.log('values=', values);
      await loadingContext.handleToggleLoader(true);
      let res = await changePassword({
        old_password: values.old_password,
        new_password: values.new_password,
        confirm_new_password: values.confirm_new_password,
      });
      if (res.success === true) {
        console.log('formik res=', res);
        Alert.alert('successfully changed password');
      } else {
        console.log('formik error=', res);
        setServerErrors(res.message);
      }
      await loadingContext.handleToggleLoader(false);
    },
  });
  return (
    <View style={styles.change_password_wrapper}>
      <View style={styles.input_field_wrappper}>
        <Text_input_field
          handleOnChange={form.handleChange('old_password')}
          label="old password"
          isSecure={true}
          value={form.values.old_password}
          RightIcon={'eye-icon'}
        />
        <ErrorTEXT>
          {form.touched.old_password && form.errors.old_password
            ? form.errors.old_password
            : null}
        </ErrorTEXT>
      </View>
      <View style={styles.input_field_wrappper}>
        <Text_input_field
          handleOnChange={form.handleChange('new_password')}
          label="new password"
          isSecure={true}
          value={form.values.new_password}
          RightIcon={'eye-icon'}
        />

        <ErrorTEXT>
          {form.touched.new_password && form.errors.new_password
            ? form.errors.new_password
            : null}
        </ErrorTEXT>
      </View>
      <View style={styles.input_field_wrappper}>
        <Text_input_field
          handleOnChange={form.handleChange('confirm_new_password')}
          label="confirm new password"
          isSecure={true}
          value={form.values.confirm_new_password}
          RightIcon={'eye-icon'}
        />
        <ErrorTEXT>
          {form.touched.confirm_new_password && form.errors.confirm_new_password
            ? form.errors.confirm_new_password
            : null}
        </ErrorTEXT>
      </View>
      <View style={styles.input_field_wrappper}>
        <ErrorTEXT>{serverErrors ? serverErrors : null}</ErrorTEXT>
      </View>
      <View style={styles.btn_wrapper}>
        <PrimaryButton
          text="change password"
          handleOnPress={() => {
            form.handleSubmit();
          }}
        />
      </View>
    </View>
  );
};

export default ChangePassword;
