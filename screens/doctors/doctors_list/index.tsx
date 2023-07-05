import DoctorListItem from '@components/doctors/doctors_item/doctor_list_item';
import TEXT from '@components/text';
import {LoadingContext} from '@contexts/loadingContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getAllDoctorsForeign, getAllDoctorsLocal} from '@utils/doctor';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Platform, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import ErrorTEXT from '@components/text/error_text';
import SelectPicker from '@components/picker';
import GreenArrowHeadDown from '@svgs/green_arrowhead_down';

const DoctorsList = () => {
  const navigation = useNavigation();
  const loadingContext: any = useContext(LoadingContext);
  const [doctors, setDoctors] = useState([]);

  const [isLocalDoctors, setIsLocalDoctors] = useState(false);
  const [isForeignDoctors, setIsForeignDoctors] = useState(false);
  const [showError, setShowError] = useState(false);
  const [serverError, setServerError] = useState('');
  const pickerRef = useRef();
  const focus = useIsFocused();
  const route = useRoute();

  const getDoctors = async (val: string) => {
    await loadingContext.handleToggleLoader(true);

    if (val === 'foreign') {
      let res: any = await getAllDoctorsForeign();
      if (res.users) {
        setDoctors(res.users);
      }
      if (res.error === true) {
        setServerError(res.message);
        setShowError(true);
      }
    } else if (val === 'local') {
      let res: any = await getAllDoctorsLocal();
      if (res.users) {
        setDoctors(res.users);
      }
      if (res.error === true) {
        setServerError(res.message);
        setShowError(true);
      }
    }
    await loadingContext.handleToggleLoader(false);
  };
  useEffect(() => {
    if (route.params === undefined) {
      setIsLocalDoctors(true);
      getDoctors('local');
      setIsForeignDoctors(false);
      //@ts-ignore
    } else if (route.params.doctors) {
      //@ts-ignore
      setDoctors(route.params.doctors);
    }
    return () => {
      setIsForeignDoctors(false);
      setIsLocalDoctors(false);
    };
  }, [focus]);
  useEffect(() => {
    //@ts-ignore
    if (isForeignDoctors === true && route.params === undefined) {
      getDoctors('foreign');
    }
  }, [isForeignDoctors]);
  useEffect(() => {
    //@ts-ignore
    if (isLocalDoctors === true && route.params === undefined) {
      getDoctors('local');
    }
  }, [isLocalDoctors]);

  return (
    <View style={styles.doctors_wrapper}>
      <View style={styles.header}>
        <TEXT text_style={styles.title}>Doctors</TEXT>
        {route.params === undefined ? (
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'android') {
                //@ts-ignore
                pickerRef.current.focus();
              } else if (Platform.OS === 'ios') {
                //@ts-ignore
                pickerRef.current.togglePicker(true);
              }
            }}
            style={styles.dropdown_wrapper}>
            <TEXT text_style={styles.dropdown_text}>
              {isLocalDoctors === true
                ? 'local doctors'
                : isForeignDoctors === true
                ? 'foreign doctors'
                : null}
            </TEXT>
            <View style={styles.dropdown_arrow_wrapper}>
              <GreenArrowHeadDown />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView>
        {doctors.length > 0 ? (
          doctors.map((item: any, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  //@ts-ignore
                  navigation.navigate('DoctorDetail', {
                    doctor_user: item,
                  });
                }}>
                <View style={styles.doctor_item}>
                  <DoctorListItem
                    name={item.doctor.title + '.' + ' ' + item.full_name}
                    title={item.doctor.medical_speciality}
                    icon={item.profile_pic ? item.profile_pic.url : null}
                  />
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <ErrorTEXT>no doctor founds</ErrorTEXT>
        )}
      </ScrollView>

      <SelectPicker
        items={[
          {label: 'local', value: 'local'},
          {label: 'foreign', value: 'foreign'},
        ]}
        label={'label'}
        ref={pickerRef}
        handleOnChange={async (itemValue: any, itemIndex: number) => {
          if (itemValue.value === 'local') {
            await setIsForeignDoctors(false);
            await setIsLocalDoctors(true);
          }
          if (itemValue.value === 'foreign') {
            await setIsForeignDoctors(true);
            await setIsLocalDoctors(false);
          }
        }}
      />
    </View>
  );
};

export default DoctorsList;
