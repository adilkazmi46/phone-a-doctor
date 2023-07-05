import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Doctor_27_7_White from '@svgs/doctor_27_7_white';
import SplashDoctor from '@svgs/doctor_splash';
import SecondaryButton from '@components/buttons/secondaryButton';
import TEXT from '@components/text';
import styles from './styles';
const Splash = ({navigation}: {navigation: any}) => {
  //const navigation=useNavigation();

  const handleSignUPNavigation = () => {
    navigation.navigate('SignUP');
  };

  const handleLoginNavigation = () => {
    navigation.navigate('SignIn');
  };
  return (
    <View style={styles.splash_wrapper}>
      <View style={styles.doctor_bg_wrapper}>
        <SplashDoctor />
      </View>
      <View style={styles.doctor_24_7_white}>
        <Doctor_27_7_White />
      </View>
      <SecondaryButton
        label={'get started'}
        handleOnPress={() => {
          handleSignUPNavigation();
        }}
        btnStyle={[styles.btn_wrapper]}
      />
      <TouchableOpacity
        onPress={() => {
          handleLoginNavigation();
        }}>
        <TEXT text_style={styles.login_text}>
          Already have an account?{' '}
          <Text style={styles.underline_text}>Log In</Text>
        </TEXT>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;
