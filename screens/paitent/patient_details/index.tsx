import PatientInfo from '@components/patient_info';
import TEXT from '@components/text';
import {Picker} from '@react-native-picker/picker';
import GreenRightArrowHead from '@svgs/greenRightArrowHead';
import GreenArrowHeadDown from '@svgs/green_arrowhead_down';
import Upload from '@svgs/upload';
import {useFormik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import DocumentPicker, {types} from 'react-native-document-picker';
import SelectPicker from '@components/picker';
import CheckBox from '@components/checkbox';

const PatientDetails = ({navigation}: {navigation: any}) => {
  useEffect(() => {}, []);
  const reasons = [
    'Diabetes or Blood Pressure',
    'Headaches and migraines',
    'Cold, Cough',
    'Sex Problems',
    'Children health',
    'Nose, Ear and Throat problem',
    'Female health Or Pregnancy or Gyne',
    'Pain',
    'Skin issues',
    'Diarrhea Or Vomiting',
  ];

  const [selectedReason, setSelectedReason] = useState('Skin issues');
  const form = useFormik({
    initialValues: {
      fullName: '',
      weight: '',
      height_inches: '',
      height_ft: '',
      bloodGroup: '',
      is_under_doctor_care: '',
      diseases_or_conditions: [],
    },
    onSubmit: async (values, actions) => {},
  });

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
        <View style={styles.patient_info_wrapper}>
          <PatientInfo />
        </View>
        <View style={styles.info_wrapper}>
          <TEXT text_style={styles.label}>full name</TEXT>
          <TextInput
            style={styles.info_text_wrapper}
            value={form.values.fullName}
            onChangeText={form.handleChange('fullName')}>
            {/* <TEXT text_style={styles.text}>john doe</TEXT> */}
          </TextInput>
        </View>

        <TouchableOpacity
          onPress={() => {
            handleFileUpload({type: [types.images, types.pdf]});
          }}
          style={styles.info_wrapper}>
          <TEXT text_style={styles.label}>attach photos or documents</TEXT>
          <View style={[styles.info_text_wrapper, styles.upload_wrapper]}>
            <TEXT text_style={styles.pic_input_text}>
              JPG, PNG, PDF (MAX 10 attachments)
            </TEXT>
            <Upload />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ConnectWithDoctor');
          }}>
          <View
            style={[styles.info_text_wrapper, styles.payment_method_wrapper]}>
            <TEXT text_style={styles.payment_method_text}>
              select payment methods
            </TEXT>
            <GreenRightArrowHead />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PatientDetails;
