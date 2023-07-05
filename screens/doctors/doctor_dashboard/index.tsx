import AppointmentItem from '@components/appointment/appointmentItem';
import DoctorHeader from '@components/doctors/doctor_header/doctor_header';
import TEXT from '@components/text';
import {LoadingContext} from '@contexts/loadingContext';
import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const DoctorsDashboard = ({navigation}: {navigation: any}) => {
  const loadingContext: any = useContext(LoadingContext);
  const dispatch = useDispatch();

  const doctor = useSelector((state: any) => {
    return state.user.doctor;
  });
  return (
    <View style={styles.doctors_dashboard_wrapper}>
      <ScrollView
        style={{flex: 1, height: '100%'}}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
        }}
        nestedScrollEnabled={true}>
        <TEXT text_style={styles.title}>Home</TEXT>
        <DoctorHeader isHome={true} />

        <TEXT text_style={styles.appointment_label}>today's appointment</TEXT>
        <View style={styles.appointments_wrapper}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            nestedScrollEnabled={true}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}
              style={styles.appointment_item_wrapper}>
              <AppointmentItem
                name="Kelly Jones"
                date="7"
                time="9am - 11am"
                month="jan"
                day="sunday"
                isDoctor={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}
              style={styles.appointment_item_wrapper}>
              <AppointmentItem
                name="Kelly Jones"
                date="7"
                time="9am - 11am"
                month="jan"
                day="sunday"
                isDoctor={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}
              style={styles.appointment_item_wrapper}>
              <AppointmentItem
                name="Kelly Jones"
                date="7"
                time="9am - 11am"
                month="jan"
                day="sunday"
                isDoctor={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}
              style={styles.appointment_item_wrapper}>
              <AppointmentItem
                name="Kelly Jones"
                date="7"
                time="9am - 11am"
                month="jan"
                day="sunday"
                isDoctor={true}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        <TEXT text_style={styles.appointment_label}>
          yesterday's appointment
        </TEXT>
        <View style={styles.appointments_wrapper}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            nestedScrollEnabled={true}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}
              style={styles.appointment_item_wrapper}>
              <AppointmentItem
                name="Kelly Jones"
                date="7"
                time="9am - 11am"
                month="jan"
                day="sunday"
                isDoctor={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}
              style={styles.appointment_item_wrapper}>
              <AppointmentItem
                name="Kelly Jones"
                date="7"
                time="9am - 11am"
                month="jan"
                day="sunday"
                isDoctor={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}
              style={styles.appointment_item_wrapper}>
              <AppointmentItem
                name="Kelly Jones"
                date="7"
                time="9am - 11am"
                month="jan"
                day="sunday"
                isDoctor={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}
              style={styles.appointment_item_wrapper}>
              <AppointmentItem
                name="Kelly Jones"
                date="7"
                time="9am - 11am"
                month="jan"
                day="sunday"
                isDoctor={true}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorsDashboard;
