import Text_input_field from '@components/input_fields/text_input_field';
import ErrorTEXT from '@components/text/error_text';
import {useFormik} from 'formik';
import React, {useContext, useRef, useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Styles from '@screens/doctors/personal_profile/styles';
import schema from './schema';
import {useDispatch, useSelector} from 'react-redux';
import {LoadingContext} from '@contexts/loadingContext';
import {updateProfile} from '@utils/patient/profile';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import PrimaryButton from '@components/buttons/primaryButton';
import {save_user} from '@actions/auth';
import SelectPicker from '@components/picker';
import timezones from 'timezones-list';
import {ScrollView} from 'react-native-gesture-handler';

const PatientProfileForm = ({setIsEditMode}: {setIsEditMode: any}) => {
  const [showDOBPicker, setShowDOBPicker] = useState<boolean>(false);

  const loadingContext: any = useContext(LoadingContext);

  const user: any = useSelector((state: any) => {
    return state.user;
  });

  const [dob, setDOB] = useState(user.birthdate);
  const timezone_ref: any = useRef();

  const dispatch = useDispatch();
  const [bloodGroupList, setBloodGroupList] = useState([
    {
      label: 'A+',
      value: 'A_POSITIVE',
    },
    {
      label: 'A-',
      value: 'A_NEGATIVE',
    },
    {
      label: 'B+',
      value: 'B_POSITIVE',
    },
    {
      label: 'B-',
      value: 'B_NEGATIVE',
    },
    {
      label: 'AB+',
      value: 'AB_POSITIVE',
    },
    {
      label: 'AB-',
      value: 'AB_NEGATIVE',
    },
    {
      label: 'O+',
      value: 'O_POSITIVE',
    },
    {
      label: 'O-',
      value: 'O_NEGATIVE',
    },
  ]);
  const bloodGroup_ref: any = useRef();

  console.log(
    'user=',
    user.dob,
    new Date(user.dob).toLocaleDateString('en-US'),
  );
  const form = useFormik({
    initialValues: {
      name: user.full_name,
      division: user.division,
      city: user.city,
      country: user.country,
      area: user.area,
      address: user.address,
      timezone_utc: user.timezone === undefined ? '' : user.timezone.utc,
      timezone_code: user.timezone === undefined ? '' : user.timezone.code,
      height_ft: user.patient.height ? user.patient.height.ft.toString() : '',
      height_inches: user.patient.height
        ? user.patient.height.inches.toString()
        : '',
      weight: user.patient.weight ? user.patient.weight.toString() : '',
      language: user.language,
      gender: user.gender,
      dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
      blood_grp: user.patient.bloodGroup,
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      console.log('values=', values);
      await loadingContext.handleToggleLoader(true);
      let res: any = await updateProfile({
        address: values.address,
        bloodGroup: values.blood_grp,
        city: values.city,
        area: values.area,
        division: values.division,
        height_ft: values.height_ft,
        height_inches: values.height_inches,
        weight: values.weight,
        languageSpoken: values.language,
        country: values.country,
        dob: values.dob,
        gender: values.gender,
        name: values.name,
      });

      if (res.patient) {
        await dispatch(save_user(res.user));
        setIsEditMode(false);
      }
      await loadingContext.handleToggleLoader(false);
      // setIsEditMode(false);
    },
  });

  return (
    <ScrollView style={{flex: 1}}>
      <View style={Styles.input_wrapper}>
        <Text_input_field
          label="name"
          value={form.values.name}
          handleOnChange={form.handleChange('name')}
          isSecure={false}
        />
      </View>
      <ErrorTEXT>
        {form.touched.name && form.errors.name ? form.errors.name : ''}
      </ErrorTEXT>

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            bloodGroup_ref.current.focus();
          } else if (Platform.OS === 'ios') {
            bloodGroup_ref.current.togglePicker(true);
          }
        }}
        style={Styles.input_wrapper}>
        <Text_input_field
          label="Blood Group"
          value={form.values.blood_grp}
          handleOnChange={form.handleChange('blood_grp')}
          isSecure={false}
          isEditable={false}
        />
      </TouchableOpacity>

      <Picker
        ref={bloodGroup_ref}
        style={{display: 'none'}}
        selectedValue={form.values.blood_grp}
        onValueChange={(itemValue: string, itemIndex: number) =>
          // console.log(itemValue, itemIndex, )
          form.setFieldValue('blood_grp', bloodGroupList[itemIndex].label)
        }>
        {bloodGroupList.map((item: any, index: number) => {
          return (
            <Picker.Item
              value={item.value}
              label={item.label}
              key={index}
              fontFamily="Poppins-Regular"
            />
          );
        })}
      </Picker>

      <ErrorTEXT>
        {form.touched.blood_grp && form.errors.blood_grp
          ? form.errors.blood_grp
          : ''}
      </ErrorTEXT>
      <View style={Styles.input_wrapper}>
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
            setShowDOBPicker(false);
            let tmp = new Date(date).toISOString().split('T')[0];

            await form.setFieldValue('dob', date);
            await setDOB(tmp);
          }}
          onCancel={() => {
            setShowDOBPicker(false);
          }}
        />
      </View>

      <View style={Styles.input_wrapper}>
        <Text_input_field
          label="coutry"
          value={form.values.country}
          handleOnChange={form.handleChange('country')}
          isSecure={false}
        />
      </View>
      <ErrorTEXT>
        {form.touched.country && form.errors.country ? form.errors.country : ''}
      </ErrorTEXT>
      <View style={Styles.input_wrapper}>
        <Text_input_field
          label="city"
          value={form.values.city}
          handleOnChange={form.handleChange('city')}
          isSecure={false}
        />
      </View>
      <ErrorTEXT>
        {form.touched.city && form.errors.city ? form.errors.city : ''}
      </ErrorTEXT>
      <View style={Styles.input_wrapper}>
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

      <View style={Styles.input_wrapper}>
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

      <View style={Styles.input_wrapper}>
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

      <View style={Styles.input_wrapper}>
        <Text_input_field
          label="height in ft"
          value={form.values.height_ft}
          handleOnChange={form.handleChange('height_ft')}
          isSecure={false}
          type="number-pad"
        />
      </View>
      <ErrorTEXT>
        {form.touched.height_ft && form.errors.height_ft
          ? form.errors.height_ft
          : ''}
      </ErrorTEXT>

      <View style={Styles.input_wrapper}>
        <Text_input_field
          label="height in inches"
          value={form.values.height_inches}
          handleOnChange={form.handleChange('height_inches')}
          isSecure={false}
          type="number-pad"
        />
      </View>
      <ErrorTEXT>
        {form.touched.height_inches && form.errors.height_inches
          ? form.errors.height_inches
          : ''}
      </ErrorTEXT>

      <View style={Styles.input_wrapper}>
        <Text_input_field
          label="weight in kg"
          value={form.values.weight}
          handleOnChange={form.handleChange('weight')}
          isSecure={false}
          type="number-pad"
        />
      </View>
      <ErrorTEXT>
        {form.touched.weight && form.errors.weight ? form.errors.weight : ''}
      </ErrorTEXT>

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            timezone_ref.current.focus();
          }
        }}
        style={Styles.input_wrapper}>
        <Text_input_field
          label="timezone"
          value={form.values.timezone_code + ' ' + form.values.timezone_utc}
          handleOnChange={form.handleChange('timezone_code')}
          isSecure={false}
          isEditable={false}
        />
      </TouchableOpacity>

      <View style={Styles.input_wrapper}>
        <Text_input_field
          label="language"
          value={form.values.language}
          handleOnChange={form.handleChange('language')}
          isSecure={false}
        />
      </View>
      <ErrorTEXT>
        {form.touched.language && form.errors.language
          ? form.errors.language
          : ''}
      </ErrorTEXT>

      <View style={styles.btn_wrapper}>
        <PrimaryButton
          text="update"
          handleOnPress={async () => {
            console.log('===========submiting form===========');
            console.log('bloodGroup=', form.values.blood_grp);
            let tmp = await form.validateForm();
            console.log(tmp);
            await form.handleSubmit();
          }}
        />
      </View>
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
    </ScrollView>
  );
};

export default PatientProfileForm;
