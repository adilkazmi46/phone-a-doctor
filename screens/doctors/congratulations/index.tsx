import React from 'react';
import {View} from 'react-native';
import styles from '@screens/doctors/welcome/styles';
import TEXT from '@components/text';
import {useSelector} from 'react-redux';
import PrimaryButton from '@components/buttons/primaryButton';
import {useNavigation} from '@react-navigation/native';
const Congratulations = () => {
  const user: any = useSelector((state: any) => {
    return state.user;
  });
  const navigation = useNavigation();
  return (
    <View style={styles.page_wrapper}>
      <TEXT text_style={styles.doctor_name}>{user.full_name}</TEXT>
      <TEXT text_style={styles.description_text}>
        Sign up process and profile is complete!
      </TEXT>

      <TEXT text_style={styles.description_text}>
        Your profile will be live and ready for patients upon verification by
        our 247-Doctor team!
      </TEXT>
      <View style={styles.btn_wrapper}>
        <PrimaryButton
          handleOnPress={() => {
            //@ts-ignore
            navigation.navigate('WelcomeDoctor');
          }}
          text="get started"
        />
      </View>
    </View>
  );
};

export default Congratulations;
