import BackButton from '@components/buttons/backButton';
import SideBar from '@components/sidebar';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AllAppointments from '@screens/doctors/all_appointments';
import AppointmentRequests from '@screens/doctors/appointment_requests';
import DoctorAvailableHours from '@screens/doctors/available_hours';
import PersonalProfile from '@screens/doctors/personal_profile';
import ProfessionalInformation from '@screens/doctors/professional_profile';
import MenuBar from '@svgs/menu_bar';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React from 'react';
import DoctorTabs from './doctor_tabs';
const Drawer = createDrawerNavigator();

const DoctorDrawer = () => {
  const options: any = {
    tabBarShowLabel: false,
    headerShown: true,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: fontPixel(18),
      lineHeight: fontPixel(22),
      color: '#27AD80',
    },
    headerLeftContainerStyle: {
      paddingHorizontal: pixelSizeHorizontal(15),
    },
    headerLeft: () => <BackButton />,
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerHideStatusBarOnOpen: false,

        headerLeftContainerStyle: {
          marginLeft: pixelSizeHorizontal(15),
        },
        sceneContainerStyle: {
          height: '100%',
          paddingTop: pixelSizeVertical(0),
          display: 'flex',
          backgroundColor: 'white',
        },
        swipeEnabled: true,
        headerShown: false,
        drawerType: 'front',
      }}
      useLegacyImplementation={true}
      defaultStatus="closed"
      drawerContent={props => {
        return <SideBar type={'doctor'} {...props} />;
      }}>
      <Drawer.Screen
        name="DoctorDashboard"
        component={DoctorTabs}
        options={{
          title: 'Home',
          ...options,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="DoctorPersonalProfile"
        component={PersonalProfile}
        options={{
          title: 'Personal Information',
          ...options,
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="DoctorProfessionalProfile"
        component={ProfessionalInformation}
        options={{
          title: 'Professional Information',
          ...options,
          headerShown: true,
          headerShadowVisible: true,
        }}
      />
      <Drawer.Screen
        name="DoctorAppointmentsHistory"
        component={AllAppointments}
        options={{
          title: 'History',
          ...options,
          headerShown: true,
          headerShadowVisible: true,
          headerLeft: () => <MenuBar />,
        }}
      />

      <Drawer.Screen
        name="DoctorAppointmentRequests"
        component={AppointmentRequests}
        options={{
          title: 'Appointment Requests',
          ...options,
          headerShown: true,
          headerShadowVisible: true,
          headerLeft: () => <MenuBar />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DoctorDrawer;
