import React, {useState, useEffect, useContext} from 'react';
import DoctorProfileIcon from '@svgs/doctor_profile_icon';
import {View, ScrollView} from 'react-native';
import styles from '../personal_profile/styles';
import ProfessionalProfile from './professionalProfile';
import ProfessionalProfileForm from './professionalProfileForm';
import {getMedicalCategories, getMedicalSpecialities} from '@utils/index';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {LoadingContext} from '@contexts/loadingContext';

const ProfessionalInformation = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedSpeciality, setSelectedSpeciality] = useState(0);
  const [medicalCategories, setMedicalCategories] = useState([]);

  const [medicalSpecialities, setMedicalSpecialities] = useState([]);

  const loadingContext: any = useContext(LoadingContext);
  const focus = useIsFocused();
  const doctor = useSelector((state: any) => {
    return state.user.doctor;
  });
  useEffect(() => {
    const getSpecialities = async () => {
      await loadingContext.handleToggleLoader(true);
      let res = await getMedicalSpecialities();
      console.log('res 29=', res);
      //@ts-ignore
      setMedicalSpecialities(res);
      await GetMedicalCategories();
      await loadingContext.handleToggleLoader(false);
    };

    const GetMedicalCategories = async () => {
      let res: any = await getMedicalCategories();
      console.log('res 38=', res);
      setMedicalCategories(res);
    };
    getSpecialities();
    return () => {
      setMedicalSpecialities([]);
      setMedicalCategories([]);
    };
  }, [focus]);

  useEffect(() => {
    if (doctor.is_professional_profile_created === false) {
      setIsEditMode(true);
    }
  }, [doctor]);

  return (
    <View style={styles.profile_wrapper}>
      <ScrollView style={{flex: 1, height: '100%'}}>
        <View style={styles.profile_pic_wrapper}>
          <DoctorProfileIcon />
        </View>
        {isEditMode === true ? (
          <ProfessionalProfileForm
            setIsEditMode={setIsEditMode}
            medicalSpecialities={medicalSpecialities}
            medicalCategories={medicalCategories}
          />
        ) : null}
        {isEditMode === false &&
        doctor.is_professional_profile_created === true ? (
          <ProfessionalProfile
            setIsEditMode={setIsEditMode}
            medicalSpecialities={medicalSpecialities}
            selectedSpeciality={selectedSpeciality}
            setSelectedSpeciality={setSelectedSpeciality}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProfessionalInformation;
