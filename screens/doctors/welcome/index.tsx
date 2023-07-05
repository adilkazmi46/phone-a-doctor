import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';
const Welcome = () => {
  const user: any = useSelector((state: any) => {
    return state.user;
  });
  const navigation = useNavigation();
  return (
    <View style={[styles.page_wrapper, styles.welcome_wrapper]}>
      {user.doctor.is_personal_profile_created === false &&
      user.doctor.is_professional_profile_created === false ? (
        <>
          <TEXT text_style={styles.welcome_description_text}>
            Welcome to 247-Dcotor Platform
          </TEXT>
          <TEXT text_style={styles.welcome_description_text}>
            We are excited to have your here!
          </TEXT>

          <TEXT text_style={styles.welcome_description_text}>
            Let’s get your Personal Profile Done!
          </TEXT>
        </>
      ) : null}
      {user.doctor.is_personal_profile_created === true &&
      user.doctor.is_professional_profile_created === false ? (
        <>
          <TEXT text_style={styles.welcome_description_text}>
            Almost there!
          </TEXT>

          <TEXT
            text_style={[
              styles.welcome_description_text,
              styles.welcome_pro_description_text,
            ]}>
            Let’s get your Professional Profile Done!
          </TEXT>
        </>
      ) : null}
      <View style={styles.welcome_btn_wrapper}>
        <PrimaryButton
          handleOnPress={() => {
            //@ts-ignore
            navigation.navigate('DoctorPersonalProfile');
          }}
          text="let's go"
        />
      </View>
    </View>
  );
};

export default Welcome;
