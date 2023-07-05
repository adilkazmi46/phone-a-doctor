import React, {useContext, useEffect, useState} from 'react';
import AppointmentItem from '@components/appointment/appointmentItem';
import TEXT from '@components/text';
import MenuBar from '@svgs/menu_bar';
import ProfilePicIcon from '@svgs/profile_pic_icon';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import styles from '../my_prescriptions/styles';
import {
  cancel_appointment,
  get_all_active_appointments,
} from '@utils/patient/aapointment';
import {useIsFocused} from '@react-navigation/native';
import {LoadingContext} from '@contexts/loadingContext';
import {useSelector} from 'react-redux';
const PatientMyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const focus = useIsFocused();
  const user = useSelector((state: any) => {
    return state.user;
  });
  const loadingContext: any = useContext(LoadingContext);
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
    const getAppointments = async () => {
      await loadingContext.handleToggleLoader(true);
      let res: any = await get_all_active_appointments();
      if (res.appointments) {
        await loadingContext.handleToggleLoader(false);
        setAppointments(res.appointments);
      }
    };
    if (focus === true) {
      getAppointments();
    }
  }, [focus]);
  useEffect(() => {
    console.log('appointments 26=', appointments);
  }, [appointments]);

  const handleCancelAppointment = async (
    appointment_id: string,
    index: number,
  ) => {
    await loadingContext.handleToggleLoader(true);
    let res: any = await cancel_appointment(appointment_id);
    console.log('res=56=', res);
    if (res.appointment) {
      await delete appointments[index];
    }
    await loadingContext.handleToggleLoader(false);
  };
  return (
    // <ScrollView style={{flex: 1, height: '100%', display: 'flex'}}>
    <View style={styles.my_prescriptions_wrapper}>
      <ScrollView>
        <TEXT text_style={styles.title}>My Appoitments</TEXT>
        <View style={styles.profile_section}>
          <View style={styles.profile_wrapper}>
            <ProfilePicIcon />
          </View>
          <TEXT text_style={styles.profile_name}>{user.full_name}</TEXT>

          <TEXT text_style={styles.profile_id}>id: 5678903</TEXT>
        </View>
        <View style={styles.header}>
          <TEXT text_style={styles.status_title}>my appointment status</TEXT>
        </View>

        {appointments.length > 0
          ? appointments.map((item: any, index) => {
              console.log('item=', item);
              let date = new Date(item.slot.date);

              return (
                <View style={styles.appointment_item_wrapper} key={index}>
                  <AppointmentItem
                    date={date.getDate().toString()}
                    month={months[date.getMonth()]}
                    name={item.user[0].full_name}
                    day={item.slot.day.slice(0, 3)}
                    time={item.slot.from_slot + ' - ' + item.slot.to_slot}
                    isCancel={true}
                    handleCancelAppointment={async () => {
                      console.log('item id 92=', item._id);
                      await handleCancelAppointment(item._id, index);
                    }}
                  />
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
    // </ScrollView>
  );
};

export default PatientMyAppointments;
