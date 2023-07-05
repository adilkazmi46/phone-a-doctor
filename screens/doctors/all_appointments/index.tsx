import AppointmentItem from '@components/appointment/appointmentItem';
import DoctorHeader from '@components/doctors/doctor_header/doctor_header';
import TEXT from '@components/text';
import {LoadingContext} from '@contexts/loadingContext';
import AudioCallBtn from '@svgs/audio_call_btn';
import DoctorPicLg from '@svgs/doctor_pic_lg';
import DoctorProfileIcon from '@svgs/doctor_profile_icon';
import VideoCallBtn from '@svgs/video_call_btn';
import {getAllAppointments} from '@utils/doctor/appointment';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Switch, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const AllAppointments = () => {
  const [isOnline, setIsOnline] = useState(false);
  const loadingContext: any = useContext(LoadingContext);
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state: any) => {
    return state.user;
  });
  const months = [
    'jan',
    'feb',
    'mar',
    'apl',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];
  useEffect(() => {
    const GetAllAppointments = async () => {
      await loadingContext.handleToggleLoader(true);

      let res: any = await getAllAppointments();
      console.log('res 36=', res);
      if (res.appointments) {
        await setAppointments(res.appointments);
      }
      await loadingContext.handleToggleLoader(false);
    };
    GetAllAppointments();
  }, []);
  return (
    <View style={styles.all_appointments_wrapper}>
      <View style={styles.profile_header}>
        <View style={styles.profile_pic}>
          <DoctorProfileIcon />
        </View>
        <View style={styles.content_wrapper}>
          <TEXT text_style={styles.name}>
            {user.doctor.title + ' '} {user.full_name}
          </TEXT>
          <TEXT text_style={styles.title}>
            {user.doctor.medical_speciality}
          </TEXT>
          <View style={styles.call_btn_wrapper}>
            <View style={styles.call_btn}>
              <AudioCallBtn />
            </View>
            <View style={styles.call_btn}>
              <VideoCallBtn />
            </View>
          </View>
        </View>
        <Switch
          style={styles.content_wrapper}
          trackColor={{
            false: 'rgba(155,155,155,0.1)',
            true: 'rgba(155,155,155,0.1)',
          }}
          thumbColor={isOnline ? '#27AD80' : '#27AD80'}
          ios_backgroundColor="rgba(155,155,155,0.1)"
          onValueChange={() => {
            setIsOnline(!isOnline);
          }}
          value={isOnline}
        />
      </View>

      <TEXT text_style={styles.appointment_label}>appointment</TEXT>
      <ScrollView style={{flex: 1}}>
        {appointments.length > 0 &&
          appointments.map((item: any, index: number) => {
            var today = new Date();
            var birthDate = new Date(item.user[0].dob);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {}}
                style={styles.appointment_item}>
                <AppointmentItem
                  date={new Date(item.slot.date).getDate().toString()}
                  month={months[new Date(item.slot.date).getMonth()]}
                  name={item.user[0].full_name}
                  day={item.slot.day.slice(0, 3)}
                  time={item.slot.from_slot + ' - ' + item.slot.to_slot}
                  status={item.status}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default AllAppointments;
