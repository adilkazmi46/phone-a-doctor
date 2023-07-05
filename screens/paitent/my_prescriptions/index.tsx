import AppointmentItem from '@components/appointment/appointmentItem';
import AppointmentCalendar from '@components/doctors/doctor_appointment/calendar';
import TEXT from '@components/text';
import MenuBar from '@svgs/menu_bar';
import ProfilePicIcon from '@svgs/profile_pic_icon';
import RedCross from '@svgs/red_cross';
import React, {useState} from 'react';
import {Modal, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import styles from './styles';

const MyPrescriptions = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    // <ScrollView style={{flex: 1, height: '100%'}}>
    <View style={styles.my_prescriptions_wrapper}>
      <ScrollView>
        <TEXT text_style={styles.title}>My Prescriptions</TEXT>
        <View style={styles.profile_section}>
          <View style={styles.profile_wrapper}>
            <ProfilePicIcon />
          </View>
          <TEXT text_style={styles.profile_name}>kelly jones</TEXT>

          <TEXT text_style={styles.profile_id}>id: 5678903</TEXT>
        </View>
        <View style={styles.header}>
          <TEXT text_style={styles.date}>01/02/2020 - 03/20/2020</TEXT>
          <TouchableOpacity
            onPress={() => {
              setShowCalendar(true);
            }}>
            <View style={styles.menu_icon_wrapper}>
              <MenuBar />
            </View>
          </TouchableOpacity>
        </View>

        <Modal transparent={true} visible={showCalendar}>
          <View style={styles.calendar_wrapper}>
            <TouchableOpacity
              onPress={() => {
                setShowCalendar(false);
              }}
              style={styles.close_icon}>
              <RedCross />
            </TouchableOpacity>
            <Calendar
              markingType={'period'}
              markedDates={{
                '2022-03-23': {
                  startingDay: true,
                  textColor: 'white',
                  color: '#27AD80',
                },
                '2022-03-24': {
                  textColor: 'white',
                  color: '#27AD80',
                },
                '2022-03-25': {
                  textColor: 'white',
                  color: '#27AD80',
                },

                '2022-03-26': {
                  endingDay: true,
                  textColor: 'white',
                  color: '#27AD80',
                },
              }}
            />
          </View>
        </Modal>
        <View style={styles.appointment_item_wrapper}>
          <AppointmentItem
            date="6"
            month="jan"
            name="apollo clinic"
            day="sunday"
            time="9am - 11am"
            isDownload={true}
          />
        </View>

        <View style={styles.appointment_item_wrapper}>
          <AppointmentItem
            date="7"
            month="jan"
            name="comfort hospital"
            day="monday"
            time="9am - 11am"
            isDownload={true}
          />
        </View>

        <View style={styles.appointment_item_wrapper}>
          <AppointmentItem
            date="8"
            month="jan"
            name="apollo clinic"
            day="sunday"
            time="9am - 11am"
            isDownload={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MyPrescriptions;
