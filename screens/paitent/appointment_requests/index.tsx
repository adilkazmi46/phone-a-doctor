import AppointmentItem from '@components/appointment/appointmentItem';
import TEXT from '@components/text';
import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {
  acceptAppointmentRequest,
  getAppointmentRequests,
  rejectAppointment,
} from '@utils/doctor/appointment';
import {LoadingContext} from '@contexts/loadingContext';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import styles from '../my_prescriptions/styles';
import ProfilePicIcon from '@svgs/profile_pic_icon';

const AppointmentRequests = () => {
  const [isOnline, setIsOnline] = useState(false);
  const focus = useIsFocused();
  const navigation = useNavigation();
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const doctor = useSelector((state: any) => {
    return state.user.doctor;
  });

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

  const loadingContext: any = useContext(LoadingContext);
  const getAllAppointmentRequets = async () => {
    await loadingContext.handleToggleLoader(true);
    let tmp = await getAppointmentRequests();
    setAppointmentRequests(tmp.appointments);
    await loadingContext.handleToggleLoader(false);
  };

  useEffect(() => {
    getAllAppointmentRequets();
    return () => {
      setAppointmentRequests([]);
    };
  }, [focus]);

  const acceptRequest = async (item: any) => {
    await loadingContext.handleToggleLoader(true);
    let res = await acceptAppointmentRequest({
      to_slot: item.slot.to_slot.toUpperCase(),
      from_slot: item.slot.from_slot.toUpperCase(),
      appointment_id: item._id,
      appointment_date: item.slot.date,
    });
    //@ts-ignore
    // navigation.navigate('PatientDetails');
    await loadingContext.handleToggleLoader(false);
  };
  const rejectRequest = async ({id, index}: {id: string; index: number}) => {
    console.log('reject_id=', id);
    await loadingContext.handleToggleLoader(true);
    let res = await rejectAppointment(id);
    console.log('res 69 ==== ', res);
    if (res.appointment) {
      let tmp_arr: any = appointmentRequests;
      tmp_arr[index].status = 'rejected';
      console.log('tmp_arr=', tmp_arr[index]);
    }
    await loadingContext.handleToggleLoader(false);
  };

  return (
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

        {appointmentRequests.map((item: any, index: number) => {
          console.log('item 124=', item);
          var today = new Date();
          var birthDate = new Date(item.doctor[0].dob);
          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          console.log('status146-=', item.status);
          let date = new Date(item.slot.date);
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.patient._id != null) {
                  if (item.status === 'awaiting') {
                    Alert.alert(
                      'Accept appointment Request?',
                      'To accept and appointment request press yes, ',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Reject',
                          onPress: () => {
                            rejectRequest({id: item._id, index});
                          },
                        },
                        {
                          text: 'Accept',
                          onPress: () => {
                            acceptRequest(item);
                          },
                        },
                      ],
                    );
                  }
                }
              }}
              key={index}
              style={styles.appointment_item_wrapper}>
              <AppointmentItem
                date={date.getDate().toString()}
                month={months[date.getMonth()]}
                name={item.doctor[0].full_name}
                day={item.slot.day.slice(0, 3)}
                time={item.slot.from_slot + ' - ' + item.slot.to_slot}
                isCancel={false}
                status={item.status}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AppointmentRequests;
