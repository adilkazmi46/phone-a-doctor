import AppointmentItem from '@components/appointment/appointmentItem';
import TEXT from '@components/text';
import AudioCallBtn from '@svgs/audio_call_btn';
import DoctorProfileIcon from '@svgs/doctor_profile_icon';
import VideoCallBtn from '@svgs/video_call_btn';
import React, {useContext, useEffect, useState} from 'react';
import {Switch, View, Image, TouchableOpacity, Alert} from 'react-native';
import styles from '@screens/doctors/all_appointments/styles';
import {useSelector} from 'react-redux';
import Patient_Info_24_7 from '@components/24_7_patient_info';
import {
  acceptAppointmentRequest,
  getAppointmentRequests,
  rejectAppointment,
} from '@utils/doctor/appointment';
import {LoadingContext} from '@contexts/loadingContext';
import {formatDate} from '@utils/index';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

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
    console.log('line 53=', item._id);
    let res = await acceptAppointmentRequest({
      to_slot: item.slot.to_slot.toUpperCase(),
      from_slot: item.slot.from_slot.toUpperCase(),
      appointment_id: item._id,
      appointment_date: item.slot.date,
    });
    //@ts-ignore
    if (res.appointment) {
      //@ts-ignore
      navigation.navigate('PatientDetails');
    }
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
    <View style={styles.all_appointments_wrapper}>
      <View style={styles.profile_header}>
        <View style={styles.profile_pic}>
          {user.profile_pic && user.profile_pic.url ? (
            <Image
              style={styles.profile_pic}
              source={{
                uri: user.profile_pic.url,
              }}
            />
          ) : (
            <DoctorProfileIcon />
          )}
        </View>

        <View style={styles.content_wrapper}>
          <TEXT text_style={styles.name}>
            {doctor.title}. {user.full_name}
          </TEXT>
          <TEXT text_style={styles.title}>{doctor.medical_speciality}</TEXT>
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

      <TEXT text_style={styles.appointment_label}>appointment requests</TEXT>
      <ScrollView>
        {appointmentRequests.map((item: any, index: number) => {
          var today = new Date();
          var birthDate = new Date(item.patient[0].dob);
          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return (
            <TouchableOpacity
              onPress={() => {
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
              }}
              key={index}
              style={styles.appointment_item}>
              <Patient_Info_24_7
                user={item.patient[0]}
                isIcon={true}
                status={item.status}
                age={age}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AppointmentRequests;
