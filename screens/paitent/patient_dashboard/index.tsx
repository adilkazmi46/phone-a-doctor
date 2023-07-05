import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import FindDoctor from '@components/patient_home/findDoctor';
import Header from '@components/patient_home/header';
import Offers from '@components/patient_home/offers';
import Specialist from '@components/patient_home/specialist';
import UpcomingAppointments from '@components/patient_home/upcoming_appointments';
import RecentlyViewed from '@components/recently_viewed';
import {LoadingContext} from '@contexts/loadingContext';
import {useIsFocused} from '@react-navigation/native';
import {
  heightPixel,
  pixelSizeVertical,
  widthPixel,
  pixelSizeHorizontal,
} from '@utils/normalize';

import DoctorListItem from '@components/doctors/doctors_item/doctor_list_item';
import PrimaryButton from '@components/buttons/primaryButton';
import ErrorTEXT from '@components/text/error_text';
import {getUPComingAppointment} from '@utils/patient/aapointment';

const PatientDashboard = ({navigation}: {navigation: any}) => {
  const focus = useIsFocused();
  const [doctors, setDoctors] = useState([]);
  const loadingContext: any = useContext(LoadingContext);
  const [upcoming_appointment, set_upcoming_appointment] = useState(null);
  const [showDoctors, setShowDoctors] = useState(false);

  useEffect(() => {
    const GetUPComingAppointment = async () => {
      await loadingContext.handleToggleLoader(true);
      let res: any = await getUPComingAppointment();
      console.log('line 38=', res);
      if (res.appointment) {
        set_upcoming_appointment(res.appointment[0]);
      }
      await loadingContext.handleToggleLoader(false);
    };
    GetUPComingAppointment();
  }, [focus]);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.patient_dashboard_wrapper}>
          <Header
            handleSideBarToggle={() => {
              navigation.toggleDrawer();
            }}
          />
          <FindDoctor setDoctors={setDoctors} setShowDoctors={setShowDoctors} />
          {showDoctors === false ? (
            <>
              <View style={styles.offers_wrapper}>
                <Offers />
              </View>
              {upcoming_appointment != null ? (
                <View style={styles.upcomming_appointments}>
                  <UpcomingAppointments appointment={upcoming_appointment} />
                </View>
              ) : null}
              <View style={styles.recently_viewed_wrapper}>
                <RecentlyViewed />
              </View>
              <View style={styles.spacialist_wrapper}>
                <Specialist />
              </View>
            </>
          ) : null}

          {showDoctors === true ? (
            <>
              {doctors.length > 0 &&
                doctors.map((item: any, index: number) => {
                  let user = item;
                  let doctor = user.doctor;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        //@ts-ignore
                        // navigation.navigate('DoctorDetail', {
                        //   doctor: item,
                        // });
                      }}>
                      <View style={styles.doctor_item}>
                        <DoctorListItem
                          name={doctor.title + '.' + ' ' + user.full_name}
                          title={doctor.medical_speciality}
                          icon={user.profile_pic ? user.profile_pic.url : null}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}

              {doctors.length === 0 ? (
                <>
                  <ErrorTEXT>no doctor found</ErrorTEXT>
                </>
              ) : null}

              <View style={styles.clear_btn}>
                <PrimaryButton
                  text="clear"
                  handleOnPress={() => {
                    setDoctors([]);
                    setShowDoctors(false);
                  }}
                />
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default PatientDashboard;

const styles = StyleSheet.create({
  patient_dashboard_wrapper: {
    paddingHorizontal: pixelSizeHorizontal(39),
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  offers_wrapper: {
    marginTop: pixelSizeVertical(10),
  },
  upcomming_appointments: {
    marginTop: pixelSizeVertical(40),
  },
  recently_viewed_wrapper: {
    marginTop: pixelSizeVertical(38),
  },
  spacialist_wrapper: {
    marginTop: pixelSizeVertical(17),
    width: '100%',
  },
  doctor_item: {
    width: widthPixel(300),
    height: heightPixel(87),
    marginVertical: pixelSizeVertical(8),
  },
  clear_btn: {
    width: widthPixel(100),
    height: heightPixel(50),
    marginVertical: pixelSizeVertical(15),
    marginTop: 'auto',
  },
});
