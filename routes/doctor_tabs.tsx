import BackButton from '@components/buttons/backButton';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddMedicine from '@screens/doctors/add_medicine';
import Advice from '@screens/doctors/advice';
import DoctorAvailableHours from '@screens/doctors/available_hours';
import Dygnosis from '@screens/doctors/dygnosis';
import DoctorsDashboard from '@screens/doctors/doctor_dashboard';
import Investigation from '@screens/doctors/investigation';
import PaymentInformation from '@screens/doctors/payment_information';
import Prescription from '@screens/doctors/prescription';
import Patient_24_7 from '@screens/paitent/24_7_patients';
import PatientDashboard from '@screens/paitent/patient_dashboard';
import AppointmentsIcon from '@svgs/appointments_icon';
import Call_24_7 from '@svgs/call_24_7';
import DashboardIcon from '@svgs/dashboard_icon';
import HomeIcon from '@svgs/home_icon';
import {fontPixel, heightPixel, pixelSizeHorizontal} from '@utils/normalize';
import React from 'react';
import {Platform} from 'react-native';

const Tabs = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const DoctorStackScreens = () => {
  const stackoptions: any = {
    headerStyle: {backgroundColor: 'white'},
    headerTitleAlign: 'center',
    headerTitleStyle: {
      textAlign: 'center',
      color: '#1c1c1c',
      fontWeight: 'bold',
      fontFamily: 'Poppins-Regular',
      fontSize: fontPixel(24),
      lineHeight: fontPixel(36),
    },
    headerLeft: () => <BackButton />,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DoctorsHome"
        component={DoctorsDashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Prescription"
        component={Prescription}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          ...stackoptions,
        }}
      />
      <Stack.Screen
        name="Advice"
        component={Advice}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          ...stackoptions,
        }}
      />
      <Stack.Screen
        name="AddMedicine"
        component={AddMedicine}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          ...stackoptions,
        }}
      />

      <Stack.Screen
        name="Diagnosis"
        component={Dygnosis}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          ...stackoptions,
        }}
      />

      <Stack.Screen
        name="Investigation"
        component={Investigation}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          ...stackoptions,
        }}
      />

      <Stack.Screen
        name="DoctorAvailableHours"
        component={DoctorAvailableHours}
        options={{
          title: 'Available Hours',
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
        name="PatientDetails"
        component={Patient_24_7}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: 'Patients Details',
          ...stackoptions,
          headerTitleStyle: {
            fontSize: fontPixel(18),
            lineHeight: fontPixel(22),
            color: '#27AD80',
            fontWeight: '600',
          },

          // tabBarShowLabel: false,
          ...stackoptions,
        }}
      />
    </Stack.Navigator>
  );
};
const DoctorTabs = () => {
  const options: any = {
    tabBarShowLabel: false,
    headerTitleAlign: 'center',

    headerTitleStyle: {
      color: '#1c1c1c',
      fontSize: fontPixel(24),
      lineHeight: fontPixel(36),
      fontFamily: 'Poppins-Regular',
      fontWeight: '600',
    },
    headerLeftContainerStyle: {
      paddingHorizontal: pixelSizeHorizontal(15),
    },
    headerLeft: () => <BackButton />,
    headerStyle: {
      height: heightPixel(97),
      shadowColor: '#000000',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 5,
        height: 10,
      },
    },
  };
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#eaf7f3',
          height: heightPixel(Platform.OS === 'ios' ? 77 : 57),
        },
      }}>
      <Tabs.Screen
        name="DoctorsDashboard"
        component={DoctorStackScreens}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => {
            return <HomeIcon />;
          },

          // tabBarShowLabel: false,
          ...options,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="DoctorsAppointment"
        component={DoctorsDashboard}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({focused}) => {
            return <AppointmentsIcon />;
          },

          // tabBarShowLabel: false,
          ...options,
        }}
      />
      <Tabs.Screen
        name="Doctors_24_7"
        component={Patient_24_7}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: '24/7 Patients',
          tabBarIcon: ({focused}) => {
            return <Call_24_7 />;
          },

          // tabBarShowLabel: false,
          ...options,
        }}
      />
      <Tabs.Screen
        name="SideBar"
        component={DoctorsDashboard}
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

export default DoctorTabs;
