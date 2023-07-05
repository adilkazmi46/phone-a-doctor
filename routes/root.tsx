import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '@screens/splash';
import SignUP from '@screens/signup';
import BackButton from '@components/buttons/backButton';
import ChangePassword from '@screens/change_password';
import ForgotPassword from '@screens/forgot_password';
import VerifyNumber from '@screens/verify_number';
import PatientProfile from '@screens/paitent/patient_profile/patient';
import SignIn from '@screens/signin';
import PatientDrawer from './patient_drawer';
import AllCategories from '@screens/all_categories';
import DoctorsList from '@screens/doctors/doctors_list';
import DoctorDetails from '@screens/doctors/doctor_detail';
import RequestAppointment from '@screens/doctors/request_appointment';
import PaymentMethod from '@screens/payment_method';
import DoctorDrawer from './doctor_drawer';
import Information from '@screens/QA';
import {StripeProvider} from '@stripe/stripe-react-native';
import {LoadingContext} from '@contexts/loadingContext';
import Loader from '@components/loader';
import {useDispatch, useSelector} from 'react-redux';
import {save_user, signin, signout} from '@actions/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserAttributes} from '@utils/auth';
import DoctorAvailableHours from '@screens/doctors/available_hours';
import {fontPixel} from '@utils/normalize';
import {getDoctorAttributes} from '@utils/doctor';
import PaymentInformation from '@screens/doctors/payment_information/index';
import Welcome from '@screens/doctors/welcome';
import Congratulations from '@screens/doctors/congratulations';
import PersonalProfile from '@screens/doctors/personal_profile';
import ProfessionalInformation from '@screens/doctors/professional_profile';
import {getPatientAttributes} from '@utils/patient';

import {io} from 'socket.io-client';

import {save_socket} from '@actions/socket';
const Stack = createNativeStackNavigator();

const Screens = () => {
  //@ts-ignore
  const [socket, setSocket] = useState(io('http://192.168.10.16:3000/'));
  const options: any = {
    headerStyle: {backgroundColor: '#FFFFFF'},
    headerTitleAlign: 'center',
    headerTitleStyle: {
      textAlign: 'center',
      color: '#27AD80',
      fontWeight: 'bold',
      fontFamily: 'Poppins-Regular',
    },
    headerLeft: () => <BackButton />,
  };

  const isAuthenticated = useSelector((state: any) => {
    return state.isAuthenticated;
  });
  const user = useSelector((state: any) => {
    return state.user;
  });

  const [is_information_completed, set_is_information_completed] =
    useState(false);
  const [showScreens, setShowScreens] = useState(false);
  const dispatch = useDispatch();
  const [is_profile_created, setIsProfileCreated] = useState(false);
  const loadingContext = useContext(LoadingContext);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // await dispatch(save_socket(socket));

        setShowScreens(false);
        let token = await AsyncStorage.getItem('jwt_token');
        console.log('token=', token);
        if (token === null) {
          dispatch(signin(false));
          dispatch(save_user({}));
          setShowScreens(true);
        } else {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          let res: any = await getUserAttributes();

          if (res.user && res.success === true) {
            // socket.emit('user');

            // socket.emit('add_user', {user: res.user});
            await dispatch(save_user(res.user));
            await dispatch(signin(true));

            if (res.user.is_profile_created === true) {
              setIsProfileCreated(true);
            } else if (res.user.is_profile_created === false) {
              setIsProfileCreated(false);
            }
            if (res.user.is_information_completed === false) {
              set_is_information_completed(false);
            } else if (res.user.is_information_completed === true) {
              set_is_information_completed(true);
            }

            if (res.user.is_information_completed === true) {
              set_is_information_completed(true);
            } else if (res.user.is_information_completed === false) {
              set_is_information_completed(false);
            }
            setShowScreens(true);
          }
          if (res.err_code === 401) {
            dispatch(signin(false));
            dispatch(save_user({}));
            setShowScreens(true);
          }
        }
      } catch (err) {
        console.log(' try catch err=', err);
      }
    };

    if (isAuthenticated === true) {
      setShowScreens(false);
    }
    checkAuthentication();

    return () => {
      setShowScreens(false);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    console.log('line 136===', user);
    if (user.is_information_completed === true) {
      set_is_information_completed(true);
    }
    if (user.is_profile_created === true) {
      setIsProfileCreated(true);
    }
  }, [user]);

  return (
    <>
      {showScreens === true ? (
        <Stack.Navigator>
          {isAuthenticated === false ? (
            <Stack.Group>
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}></Stack.Screen>

              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{title: 'Sign In', ...options}}></Stack.Screen>

              <Stack.Screen
                name="SignUP"
                component={SignUP}
                options={{title: 'Sign Up', ...options}}></Stack.Screen>

              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{title: 'Forgot Password', ...options}}></Stack.Screen>
            </Stack.Group>
          ) : null}
          {isAuthenticated === true ? (
            <Stack.Group>
              {user.userType === 'doctor' &&
              user.is_profile_created === true ? (
                <Stack.Screen
                  name="DoctorsHome"
                  component={DoctorDrawer}
                  options={{headerShown: false}}
                />
              ) : null}
              {is_profile_created === false ? (
                <Stack.Group>
                  {user.is_verified === false ? (
                    <Stack.Screen
                      name="VerifyNumber"
                      component={VerifyNumber}
                      options={{
                        title: 'Verify Number',
                        ...options,
                        headerLeft: null,
                      }}></Stack.Screen>
                  ) : null}
                  {user.is_verified == true &&
                  is_information_completed === false &&
                  (user.userType === 'doctor' ||
                    user.userType === 'patient') ? (
                    <Stack.Screen
                      name="Information"
                      component={Information}
                      options={{
                        title: 'Information',
                        ...options,
                        headerBackVisible: false,
                        headerTitleStyle: {
                          fontSize: fontPixel(18),
                          lineHeight: fontPixel(22),
                          color: '#27AD80',
                          fontWeight: '600',
                        },
                        headerShown: true,
                        headerShadowVisible: true,
                      }}
                    />
                  ) : null}

                  {user.userType === 'doctor' &&
                  user.doctor.is_availability_details_completed === false &&
                  is_information_completed === true ? (
                    <Stack.Screen
                      name="DoctorAvailableHours"
                      component={DoctorAvailableHours}
                      options={{
                        headerShown: true,
                        title: 'Available Hours',
                        ...options,
                        headerLeft: () => {},
                      }}
                    />
                  ) : null}
                  {((user.userType === 'doctor' &&
                    user.doctor.is_availability_details_completed === true) ||
                    user.userType === 'patient') &&
                  (user.stripe_account.account.details_submitted === false ||
                    user.payment_details.is_payment_sheet_completed ===
                      false) &&
                  user.is_information_completed === true ? (
                    <Stack.Screen
                      name="BankDetails"
                      component={PaymentInformation}
                      options={{
                        headerShown: true,
                        title: 'Bank Details',
                        ...options,
                        headerLeft: () => {},
                      }}
                    />
                  ) : null}

                  {user.userType === 'doctor' &&
                  user.stripe_account.account.details_submitted === true &&
                  user.payment_details.is_payment_sheet_completed === true &&
                  is_information_completed === true &&
                  user.doctor.is_availability_details_completed === true &&
                  user.doctor.is_personal_profile_created === false &&
                  user.doctor.is_professional_profile_created === false ? (
                    <Stack.Screen
                      name="CongratulationsDoctor"
                      component={Congratulations}
                      options={{
                        headerShown: true,
                        title: 'Congratulations!',
                        ...options,
                        headerLeft: () => {},
                      }}
                    />
                  ) : null}

                  {user.userType === 'doctor' &&
                  user.stripe_account.account.details_submitted === true &&
                  user.payment_details.is_payment_sheet_completed === true &&
                  is_information_completed === true &&
                  user.doctor.is_availability_details_completed === true &&
                  user.doctor.is_personal_profile_created === false &&
                  user.doctor.is_professional_profile_created === false ? (
                    <Stack.Screen
                      name="WelcomeDoctor"
                      component={Welcome}
                      options={{
                        headerShown: true,
                        title: 'Welcome!',
                        ...options,
                        headerLeft: () => {},
                      }}
                    />
                  ) : null}

                  {user.userType === 'doctor' &&
                  user.stripe_account.account.details_submitted === true &&
                  user.payment_details.is_payment_sheet_completed === true &&
                  is_information_completed === true &&
                  user.doctor.is_availability_details_completed === true &&
                  user.doctor.is_personal_profile_created === false &&
                  user.doctor.is_professional_profile_created === false ? (
                    <Stack.Screen
                      name="DoctorPersonalProfile"
                      component={PersonalProfile}
                      options={{
                        headerShown: true,
                        title: 'Personal Information!',
                        ...options,
                        headerLeft: () => {},
                      }}
                    />
                  ) : null}

                  {user.userType === 'doctor' &&
                  user.stripe_account.account.details_submitted === true &&
                  user.payment_details.is_payment_sheet_completed === true &&
                  is_information_completed === true &&
                  user.doctor.is_availability_details_completed === true &&
                  user.doctor.is_personal_profile_created === true &&
                  user.doctor.is_professional_profile_created === false ? (
                    <Stack.Screen
                      name="DoctorProfessionalProfile"
                      component={ProfessionalInformation}
                      options={{
                        headerShown: true,
                        title: 'Professional Information!',
                        ...options,
                        headerLeft: () => {},
                      }}
                    />
                  ) : null}
                </Stack.Group>
              ) : null}
              {user.userType === 'patient' &&
              user.is_profile_created === true ? (
                <>
                  <Stack.Screen
                    name="PatientHome"
                    component={PatientDrawer}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="PatientProfileSettings"
                    component={PatientProfile}
                    options={{title: 'Profile', ...options}}></Stack.Screen>

                  <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{
                      title: 'Change Password',
                      ...options,
                    }}></Stack.Screen>

                  <Stack.Screen
                    name="MedicalDepartments"
                    component={AllCategories}
                    options={{
                      title: 'All Medical Departments',
                      ...options,
                    }}
                  />
                  <Stack.Screen
                    options={{
                      title: 'List',
                      ...options,
                    }}
                    name="DoctorsList"
                    component={DoctorsList}
                  />
                  <Stack.Screen
                    options={{
                      title: 'Info',
                      ...options,
                    }}
                    name="DoctorDetail"
                    component={DoctorDetails}
                  />
                  <Stack.Screen
                    options={{
                      title: 'Appointment',
                      ...options,
                    }}
                    name="RequestAppointment"
                    component={RequestAppointment}
                  />
                  <Stack.Screen
                    options={{
                      title: 'Payment Method',
                      ...options,
                    }}
                    name="PaymentMethod"
                    component={PaymentMethod}
                  />
                </>
              ) : null}
            </Stack.Group>
          ) : null}
        </Stack.Navigator>
      ) : null}
    </>
  );
};

const RootNavigation = () => {
  const [publishableKey, setPublishableKey] = useState('');
  const loadingContext: any = useContext(LoadingContext);

  return (
    <>
      <NavigationContainer>
        <StripeProvider publishableKey="pk_live_HhafB6H2yqfBqcpDNeABfPqQ00vBQmF6f0">
          <Screens />
        </StripeProvider>
      </NavigationContainer>
      {loadingContext.showLoader === true ? <Loader /> : null}
    </>
  );
};

export default RootNavigation;
