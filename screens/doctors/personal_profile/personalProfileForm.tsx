import PrimaryButton from '@components/buttons/primaryButton';
import CheckBox from '@components/checkbox';
import Text_input_field from '@components/input_fields/text_input_field';
import TEXT from '@components/text';
import ErrorTEXT from '@components/text/error_text';
import {updatePersonalProfile} from '@utils/doctor/profile';
import {useFormik} from 'formik';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import schema from './schema';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import {LoadingContext} from '@contexts/loadingContext';
import timezones from 'timezones-list';
import SelectPicker from '@components/picker';
import {Country, State, City} from 'country-state-city';
import {save_user} from '@actions/auth';

const PersonalProfileForm = ({setIsEditMode}: {setIsEditMode: any}) => {
  const dispatch = useDispatch();
  const titleRef: any = useRef();
  const timezone_ref: any = useRef();
  const language_ref: any = useRef();
  const countries_ref: any = useRef();
  const cities_ref: any = useRef();

  const loadingContext: any = useContext(LoadingContext);
  const [showDOBPicker, setShowDOBPicker] = useState<boolean>(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const doctor: any = useSelector((state: any) => {
    return state.user.doctor;
  });

  const user: any = useSelector((state: any) => {
    return state.user;
  });
  const [serverErrors, setServerErrors] = useState('');
  const titles = ['dr', 'consultant', 'professor'];
  const form = useFormik({
    initialValues: {
      title: doctor.title,
      fullName: user.full_name,
      address: user.address,
      email: user.email,
      phone: user.phone_number,
      dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
      gender: user.gender,
      city: user.city,
      country: user.country,
      area: user.area,
      division: user.division,
      timezone_utc: user.timezone === undefined ? '' : user.timezone.utc,
      timezone_code: user.timezone === undefined ? '' : user.timezone.code,
      languageSpoken: user.language,
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      await loadingContext.handleToggleLoader(true);
      let res = await updatePersonalProfile({
        title: values.title,
        area: values.area,
        country: values.country,
        languageSpoken: values.languageSpoken,
        full_name: values.fullName,
        email: values.email,
        gender: values.gender,
        address: values.address,
        dob: values.dob,
        city: values.city,
        division: values.division,
        phone: values.phone,
        timezone_code: values.timezone_code,
        timezone_utc: values.timezone_utc,
      });
      console.log('form response=', res);
      if (res.user) {
        await dispatch(save_user(res.user));
        await loadingContext.handleToggleLoader(false);
        setIsEditMode(false);
      }
      if (res.error === true) {
        setServerErrors(res.message);
        await loadingContext.handleToggleLoader(false);
      }
    },
  });

  return (
    <View style={styles.form_wrapper}>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            titleRef.current.focus();
          } else if (Platform.OS === 'ios') {
            titleRef.current.togglePicker(true);
          }
        }}
        style={[styles.input_wrapper]}>
        <Text_input_field
          label="title"
          value={form.values.title}
          handleOnChange={form.handleChange('title')}
          isSecure={false}
          isEditable={false}
        />
      </TouchableOpacity>

      <ErrorTEXT>
        {form.touched.title && form.errors.title ? form.errors.title : ''}
      </ErrorTEXT>
      <View style={styles.input_wrapper}>
        <Text_input_field
          label="full name"
          value={form.values.fullName}
          handleOnChange={form.handleChange('fullName')}
          isSecure={false}
        />
      </View>

      <ErrorTEXT>
        {form.touched.fullName && form.errors.fullName
          ? form.errors.fullName
          : ''}
      </ErrorTEXT>

      <View style={styles.input_wrapper}>
        <Text_input_field
          label="email"
          value={form.values.email}
          handleOnChange={form.handleChange('email')}
          isSecure={false}
        />
      </View>

      <ErrorTEXT>
        {form.touched.email && form.errors.email ? form.errors.email : ''}
      </ErrorTEXT>

      <ErrorTEXT>
        {form.touched.address && form.errors.address ? form.errors.address : ''}
      </ErrorTEXT>
      <View style={styles.input_wrapper}>
        <TouchableOpacity
          onPress={() => {
            setShowDOBPicker(true);
          }}>
          <Text_input_field
            label="dob"
            value={form.values.dob}
            handleOnChange={form.handleChange('dob')}
            isSecure={false}
            isEditable={false}
          />
        </TouchableOpacity>
        <DatePicker
          modal
          open={showDOBPicker}
          date={new Date()}
          mode="date"
          onConfirm={async (date: any) => {
            console.log('Date=', date);
            setShowDOBPicker(false);
            let tmp = new Date(date).toISOString().split('T')[0];

            await form.setFieldValue('dob', tmp);
          }}
          onCancel={() => {
            setShowDOBPicker(false);
          }}
        />
      </View>

      <ErrorTEXT>
        {form.touched.dob && form.errors.dob ? form.errors.dob : ''}
      </ErrorTEXT>
      <View style={styles.input_wrapper}>
        <TEXT text_style={styles.gender_label}>gender</TEXT>
        <TouchableOpacity
          onPress={async () => {
            await form.setFieldValue('gender', 'male');
          }}
          style={styles.checkbox_wrapper}>
          <CheckBox isChecked={form.values.gender === 'male'} />
          <TEXT text_style={styles.checkbox_label}>male</TEXT>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await form.setFieldValue('gender', 'female');
          }}
          style={styles.checkbox_wrapper}>
          <CheckBox isChecked={form.values.gender === 'female'} />
          <TEXT text_style={styles.checkbox_label}>female</TEXT>
        </TouchableOpacity>
      </View>

      <ErrorTEXT>
        {form.touched.gender && form.errors.gender ? form.errors.gender : ''}
      </ErrorTEXT>

      <View
        // onPress={() => {
        //   if (Platform.OS === 'android') {
        //     // countries_ref.current.focus();
        //   }
        //   if (Platform.OS === 'ios') {
        //     // countries_ref.current.togglePicker(true);
        //   }
        // }}
        style={styles.input_wrapper}>
        <Text_input_field
          label="country"
          value={form.values.country}
          handleOnChange={form.handleChange('country')}
          isSecure={false}
          isEditable={true}
        />
      </View>

      <ErrorTEXT>
        {form.touched.country && form.errors.country ? form.errors.country : ''}
      </ErrorTEXT>
      <View
        // onPress={() => {
        //   if (Platform.OS === 'android') {
        //     // cities_ref.current.focus();
        //   }
        //   if (Platform.OS === 'ios') {
        //     // cities_ref.current.togglePicker(true);
        //   }
        // }}
        style={styles.input_wrapper}>
        <Text_input_field
          label="city"
          value={form.values.city}
          handleOnChange={form.handleChange('city')}
          isSecure={false}
          isEditable={true}
        />
      </View>

      <ErrorTEXT>
        {form.touched.city && form.errors.city ? form.errors.city : ''}
      </ErrorTEXT>

      <View style={styles.input_wrapper}>
        <Text_input_field
          label="address"
          value={form.values.address}
          handleOnChange={form.handleChange('address')}
          isSecure={false}
        />
      </View>

      <ErrorTEXT>
        {form.touched.address && form.errors.address ? form.errors.address : ''}
      </ErrorTEXT>
      <View style={styles.input_wrapper}>
        <Text_input_field
          label="area"
          value={form.values.area}
          handleOnChange={form.handleChange('area')}
          isSecure={false}
        />
      </View>
      <ErrorTEXT>
        {form.touched.area && form.errors.area ? form.errors.area : ''}
      </ErrorTEXT>

      <View style={styles.input_wrapper}>
        <Text_input_field
          label="division"
          value={form.values.division}
          handleOnChange={form.handleChange('division')}
          isSecure={false}
        />
      </View>
      <ErrorTEXT>
        {form.touched.division && form.errors.division
          ? form.errors.division
          : ''}
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
          : ''}
      </ErrorTEXT>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            language_ref.current.focus();
          }
          if (Platform.OS === 'ios') {
            language_ref.current.togglePicker(true);
          }
        }}
        style={styles.input_wrapper}>
        <Text_input_field
          label="language"
          value={form.values.languageSpoken}
          handleOnChange={form.handleChange('languageSpoken')}
          isSecure={false}
          isEditable={false}
        />
      </TouchableOpacity>

      <ErrorTEXT>
        {form.touched.languageSpoken && form.errors.languageSpoken
          ? form.errors.languageSpoken
          : ''}
      </ErrorTEXT>
      <ErrorTEXT>{serverErrors.length > 0 ? serverErrors : ''}</ErrorTEXT>
      <View style={[styles.edit_btn_wrapper, {alignSelf: 'center'}]}>
        <PrimaryButton
          handleOnPress={() => {
            form.handleSubmit();
          }}
          text={'update'}
        />
      </View>

      <Picker
        ref={titleRef}
        style={{display: 'none'}}
        onValueChange={async (itemValue, itemIndex) => {
          await form.setFieldValue('title', itemValue);
        }}>
        <Picker.Item label={'options'} value={form.values.title} />
        {titles.map((item, index) => {
          return (
            <Picker.Item
              value={item}
              label={item}
              key={index}
              fontFamily="Poppins-Regular"
            />
          );
        })}
      </Picker>
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

      <SelectPicker
        items={[
          {label: 'urdu', value: 'urdu'},
          {label: 'hindi', value: 'hindi'},
          {label: 'english', value: 'english'},
          {label: 'french', value: 'french'},
          {label: 'arabic', value: 'arabic'},
        ]}
        ref={language_ref}
        handleOnChange={async (itemValue: any, itemIndex: number) => {
          await form.setFieldValue('languageSpoken', itemValue.value);
        }}
        label={'label'}
      />
    </View>
  );
};

export default PersonalProfileForm;
