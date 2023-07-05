import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import AppointmentItem from '@components/appointment/appointmentItem';
import TEXT from '@components/text';

const UpcomingAppointments = ({appointment}: {appointment: any}) => {
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
  return (
    <View style={styles.upcoming_appointment_wrapper}>
      <TEXT text_style={styles.title}>upcoming appointments</TEXT>
      <View style={styles.appointment_wrapper}>
        <AppointmentItem
          date={new Date(appointment.slot.date).getDate().toString()}
          month={months[new Date(appointment.slot.date).getMonth()]}
          name={appointment.user[0].full_name}
          day={appointment.slot.day.slice(0, 3)}
          time={appointment.slot.from_slot + ' - ' + appointment.slot.to_slot}
        />
      </View>
    </View>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  upcoming_appointment_wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  appointment_wrapper: {
    width: widthPixel(300),
    height: heightPixel(87),
    marginTop: pixelSizeVertical(24),
  },
});
