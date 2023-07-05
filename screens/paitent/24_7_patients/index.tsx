import Patient_Info_24_7 from '@components/24_7_patient_info';
import BackButton from '@components/buttons/backButton';
import PrimaryButton from '@components/buttons/primaryButton';
import CheckBox from '@components/checkbox';
import DoctorHeader from '@components/doctors/doctor_header/doctor_header';
import TEXT from '@components/text';
import {LoadingContext} from '@contexts/loadingContext';
import AudioCall from '@svgs/audio_call';
import GreenArrowRight from '@svgs/greenArrowRight';
import VideoCall from '@svgs/video_call';
import {getAppointments} from '@utils/doctor/appointment';
import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Patient_24_7 = ({navigation}: {navigation: any}) => {
  const [show_details, setShowDetails] = useState(false);
  const [prescription_needed, setPrescription_needed] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [selectedAge, setSelectedAge] = useState();
  const user = useSelector((state: any) => {
    return state.user;
  });
  const loadingContext: any = useContext(LoadingContext);
  const focus = useIsFocused();
  const getAllActiveAppointments = async () => {
    await loadingContext.handleToggleLoader(true);
    let res: any = await getAppointments();
    console.log('res33=', res.appointments);
    if (res.appointments) {
      setAppointments(res.appointments);
    }
    await loadingContext.handleToggleLoader(false);
  };

  useEffect(() => {
    const initialize = async () => {
      //@ts-ignore
      await setSelectedAppointment(null);
      //@ts-ignore
      await setSelectedAge(null);
      await setShowDetails(false);

      await getAllActiveAppointments();
    };
    initialize();
    return () => {};
  }, [focus]);

  useEffect(() => {
    console.log('selectedAppointment=', selectedAppointment);
  }, [selectedAppointment]);
  return (
    <View style={styles.patient_wrapper_24_7}>
      <ScrollView
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
        contentContainerStyle={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View style={styles.doctor_header}>
          <DoctorHeader isHome={false} />
        </View>
        <TEXT text_style={styles.heading}>24/7 patients Queue</TEXT>
        {appointments.length > 0 &&
          show_details === false &&
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
                onPress={async () => {
                  await setSelectedAppointment(item);
                  //@ts-ignore
                  await setSelectedAge(age);
                  setShowDetails(!show_details);
                }}>
                <Patient_Info_24_7
                  user={item.user[0]}
                  isIcon={true}
                  status={item.status}
                  age={age}
                />
              </TouchableOpacity>
            );
          })}
        {show_details === true && selectedAppointment != null ? (
          <>
            <Patient_Info_24_7
              //@ts-ignore
              // patient={selectedAppointment.patient}
              //@ts-ignore
              user={selectedAppointment.user[0]}
              isIcon={true}
              //@ts-ignore
              status={selectedAppointment.status}
              //@ts-ignore
              age={selectedAge}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Prescription', {
                  appointment: selectedAppointment,
                  age: selectedAge,
                });
              }}>
              <View style={styles.prescriptions_wrapper}>
                <TEXT text_style={styles.prescription_text}>
                  {
                    //@ts-ignore
                    selectedAppointment.is_prescription_written === true
                      ? 'edit prescription here'
                      : 'write a prescription here'
                  }
                </TEXT>
                <View style={styles.arrow_wrapper}>
                  <GreenArrowRight />
                </View>
              </View>
            </TouchableOpacity>
            {
              //@ts-ignore
              selectedAppointment.is_prescription_written === true ? null : (
                <TouchableOpacity
                  style={styles.check_box_wrapper}
                  onPress={() => {
                    setPrescription_needed(!prescription_needed);
                  }}>
                  {/* <View style={styles.check_box_wrapper}> */}
                  <CheckBox isChecked={prescription_needed} />
                  <TEXT text_style={styles.checkbox_text}>
                    Prescription not needed
                  </TEXT>
                  {/* </View> */}
                </TouchableOpacity>
              )
            }
            <View style={styles.btn_wrapper}>
              <PrimaryButton
                text="complete consultation"
                handleOnPress={() => {}}
              />
            </View>

            <View style={styles.horizontal_line}></View>

            <TEXT text_style={styles.options_title}>calling options</TEXT>

            <View style={styles.calls_btns_wrapper}>
              <TouchableOpacity>
                <View style={styles.btn_item}>
                  <View style={styles.btn_icon_wrapper}>
                    <AudioCall />
                  </View>
                  <TEXT text_style={styles.btn_text}>phone</TEXT>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  // await start();
                }}>
                <View style={styles.btn_item}>
                  <View style={styles.btn_icon_wrapper}>
                    <VideoCall />
                  </View>
                  <TEXT text_style={styles.btn_text}>video call</TEXT>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Patient_24_7;
