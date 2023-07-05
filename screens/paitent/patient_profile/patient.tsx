import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Download from '@svgs/download';
import ProfilePicIcon from '@svgs/profile_pic_icon';
import TEXT from '@components/text';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Patient_Profile from './patient_profile';
import PatientProfileForm from './patient_profile_form';
const PatientProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const user = useSelector((state: any) => {
    return state.user;
  });
  return (
    <View style={styles.profile_wrapper}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
        <TouchableOpacity>
          <View style={styles.profile_pic_wrapper}>
            <ProfilePicIcon />
          </View>
        </TouchableOpacity>

        <TEXT text_style={styles.profile_name}>{user.full_name}</TEXT>
        {/* <TEXT text_style={styles.profile_id}>id: </TEXT> */}
        <View style={styles.download_prescriptions_wrapper}>
          <Download />
          <TEXT text_style={styles.donwload_text}>download prescriptions</TEXT>
        </View>
        <TEXT text_style={styles.date_blood_grp_text}>
          {new Date(user.dob).toISOString().split('T')[0]}{' '}
          {user.dob && user.patient.bloodGroup ? '|' : null}
          {user.patient.bloodGroup ? ' blood group  ' : null}
          {user.patient.bloodGroup}
        </TEXT>
        {isEditMode === true ? (
          <>
            <PatientProfileForm setIsEditMode={setIsEditMode} />
          </>
        ) : null}
        {isEditMode === false ? (
          <Patient_Profile setIsEditMode={setIsEditMode} />
        ) : null}
        {/* <View style={styles.btn_wrapper}>
          <PrimaryButton
            text={isEditMode === true ? 'update' : 'edit'}
            handleOnPress={async () => {
              if (isEditMode === true) {
                // await form.handleSubmit();
                // console.log('form errors=', form.errors);
              } else if (isEditMode === false) {
                setIsEditMode(true);
              }
            }}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default PatientProfile;
