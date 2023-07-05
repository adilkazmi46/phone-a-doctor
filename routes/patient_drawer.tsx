import SideBar from '@components/sidebar';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyPrescriptions from '@screens/paitent/my_prescriptions';
import React from 'react';
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import BackButton from '@components/buttons/backButton';
import PatientTabs from './patient_tabs';
import ManagePatient from '@screens/paitent/manage_patient';
const Drawer = createDrawerNavigator();

const PatientDrawer = () => {
  const options: any = {
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleAlign: 'center',
    headerLeftContainerStyle: {
      paddingHorizontal: pixelSizeHorizontal(15),
    },
    headerTitleStyle: {
      textAlign: 'center',
      color: '#1c1c1c',
      fontWeight: 'bold',
      fontFamily: 'Poppins-Regular',
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
          paddingTop: pixelSizeVertical(44),
          display: 'flex',
          backgroundColor: '#ffffff',
        },
        swipeEnabled: true,
        headerShown: false,
        drawerType: 'front',
      }}
      useLegacyImplementation={true}
      defaultStatus="closed"
      drawerContent={props => {
        return <SideBar type="patient" {...props} />;
      }}
      initialRouteName="PatientDashboard">
      <Drawer.Screen name="PatientDashboard" component={PatientTabs} />
      <Drawer.Screen
        name="ManagePatients"
        component={ManagePatient}
        options={{
          title: 'Manage Patient',
          headerShown: true,
          ...options,
        }}
      />
      <Drawer.Screen name="MyPrescriptions" component={MyPrescriptions} />
    </Drawer.Navigator>
  );
};

export default PatientDrawer;
