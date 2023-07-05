import React, {useContext, useState} from 'react';
import {ScrollView, View} from 'react-native';
import SignInForm from '@components/signin/form';
import styles from '../signup/styles';
import LangPicker from '@components/lang_picker';
import schema from './schema';
import {login} from '@utils/auth';
import {LoadingContext} from '@contexts/loadingContext';
import {useDispatch} from 'react-redux';
import {save_user, signin} from '@actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const SignIn = ({navigation}: {navigation: any}) => {
  const loadingContext: any = useContext(LoadingContext);
  const [serverError, setServerError] = useState({});
  const dispatch = useDispatch();

  const handleSignIn = async ({
    password,
    phone,
  }: {
    password: string;
    phone: string;
  }) => {
    let res: any = await login({password: password, phone: phone});
    console.log('login_res=', res);
    if (res.error === true) {
      setServerError({errorCode: res.err_code, errorMsg: res.message});
      loadingContext.handleToggleLoader(false);
    }
    if (res.success === true) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.token}`;

      await AsyncStorage.setItem('jwt_token', res.data.token);
      dispatch(save_user(res.data.user));
      dispatch(signin(true));
      loadingContext.handleToggleLoader(false);
    }
  };

  return (
    <View style={[styles.signup_wrapper, styles.bg_white]}>
      <ScrollView>
        <LangPicker />

        <SignInForm
          serverError={serverError}
          schema={schema}
          handleSignIn={handleSignIn}
        />
      </ScrollView>
    </View>
  );
};

export default SignIn;
