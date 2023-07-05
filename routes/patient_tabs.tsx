import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PatientDashboard from '@screens/paitent/patient_dashboard';
import AppointmentsIcon from '@svgs/appointments_icon';
import DoctorsIcon from '@svgs/doctors_icon';
import Call_24_7 from '@svgs/call_24_7';
import DashboardIcon from '@svgs/dashboard_icon';
import {fontPixel, heightPixel, pixelSizeHorizontal} from '@utils/normalize';
import PatientMyAppointments from '@screens/paitent/my_appointments';
import HomeIcon from '@svgs/home_icon';
import DoctorsList from '@screens/doctors/doctors_list';
import BackButton from '@components/buttons/backButton';
import SelectPatient from '@screens/paitent/select_patient';
import {Platform, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PatientDetails from '@screens/paitent/patient_details';
import NewPatientDetails from '@screens/paitent/new_patient_details';
import ConnectWithDoctor from '@screens/doctors/connecting_with_doctor';
import AppointmentRequests from '@screens/paitent/appointment_requests';
import PaymentInformation from '@screens/doctors/payment_information';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const stackoptions: any = {
  headerStyle: {backgroundColor: 'white'},
  headerTitleAlign: 'center',
  headerTitleStyle: {
    textAlign: 'center',
    color: '#1c1c1c',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  headerLeft: () => <BackButton />,
};

const PatientStackScreens = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="PatientDashboard"
        component={DoctorsList}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="PatientDashboard"
        component={PatientDashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppointmentRequests"
        component={AppointmentRequests}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectPatient"
        component={SelectPatient}
        options={{
          title: 'Select Patient',
          headerShadowVisible: false,
          ...stackoptions,
        }}
      />

      <Stack.Screen
        name="PatientDetails"
        component={PatientDetails}
        options={{
          title: 'Patient Details',
          ...stackoptions,
        }}
      />

      <Stack.Screen
        name="PaymentInformation"
        component={PaymentInformation}
        options={{
          title: 'Account Details',
          ...stackoptions,
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

      <Stack.Screen
        name="NewPatientDetails"
        component={NewPatientDetails}
        options={{
          title: 'New Patient Details',
          ...stackoptions,
        }}
      />

      <Stack.Screen
        options={{
          title: 'Connecting with doctor',
          ...stackoptions,
        }}
        name="ConnectWithDoctor"
        component={ConnectWithDoctor}
      />
    </Stack.Navigator>
  );
};

const PatientTabs = () => {
  const options: any = {
    tabBarShowLabel: false,
    headerShown: true,

    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: '#27AD80',
    },

    headerLeftContainerStyle: {
      paddingHorizontal: pixelSizeHorizontal(15),
    },
    headerLeft: () => <BackButton />,
  };

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: '#eaf7f3',
          // height: heightPixel(Platform.OS === 'ios' ? 77 : 57),
        },
      }}>
      <Tabs.Screen
        name="PatientHome"
        component={PatientStackScreens}
        options={{
          tabBarShowLabel: false,

          headerShown: false,
          tabBarIcon: ({focused}) => {
            return <HomeIcon />;
          },
        }}
      />
      <Tabs.Screen
        name="PatientAppointments"
        component={PatientMyAppointments}
        options={{
          tabBarShowLabel: false,

          headerShown: false,
          tabBarIcon: ({focused}) => {
            return <AppointmentsIcon />;
          },
        }}
      />
      <Tabs.Screen
        name="Doctors"
        component={DoctorsList}
        options={{
          tabBarStyle: {display: 'none'},
          headerTitle: 'List',
          tabBarIcon: () => {
            return <DoctorsIcon />;
          },
          ...options,
          headerShadowVisible: true,
        }}
      />
      <Tabs.Screen
        name="PatientCall"
        component={DoctorsList}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          headerTitle: 'List',
          tabBarIcon: ({focused}) => {
            return <Call_24_7 />;
          },
          ...options,
        }}
      />

      <Tabs.Screen
        name="SideBar"
        component={PatientDashboard}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
        options={{
          headerShown: false,
          title: 'Home',

          tabBarIcon: ({focused}) => {
            return <DashboardIcon />;
          },

          // tabBarShowLabel: false,
          ...options,
        }}
      />
    </Tabs.Navigator>
  );
};

export default PatientTabs;
