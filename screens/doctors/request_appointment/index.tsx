import React, {useContext, useEffect, useRef, useState} from 'react';
import {Platform, View} from 'react-native';
import styles from './styles';
import AppointmentCalendar from '@components/doctors/doctor_appointment/calendar';
import AppointmentItem from '@components/appointment/appointmentItem';
import {ScrollView, TouchableOpacity} from 'react-native';
import TEXT from '@components/text';
import RightArrowHead from '@svgs/rightArrowHead';
import SuccessfullModal from '@components/doctors/doctor_appointment/successfull_modal';
import {useRoute} from '@react-navigation/native';
import {LoadingContext} from '@contexts/loadingContext';
import {getTimeSlotList} from '@utils/doctor/availablity_hours';
import SelectPicker from '@components/picker';
import {useFormik} from 'formik';
import ErrorTEXT from '@components/text/error_text';
import {requestAppointment} from '@utils/doctor/appointment';
import {HeaderBackButton} from '@react-navigation/elements';

const RequestAppointment = ({navigation}: {navigation: any}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selected_from_slot, setSelectedFromSlot] = useState();
  const [serverError, setServerError] = useState('');
  const [selected_to_slot, setSelectedToSlot] = useState();
  const [isSubmiting, setIsSetSubmiting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [relative_patient, set_relative_patient] = useState(null);
  const to_slot_ref = useRef();
  const from_slot_ref = useRef();

  const [startIndex, setStartIndex] = useState();
  const [endIndex, setEndIndex] = useState();

  const loadingContext: any = useContext(LoadingContext);

  const router = useRoute();
  //@ts-ignore
  const doctor_user = router.params.doctor_user;
  //@ts-ignore
  const is_relative = router.params.is_relative;
  const form = useFormik({
    initialValues: {
      selected_from_slot: '',
      selected_to_slot: '',
      selected_date: '',
    },
    onSubmit: async (values, actions) => {
      await loadingContext.handleToggleLoader(true);
      setIsSetSubmiting(true);
      let appointmemt_day: any = new Date(values.selected_date).getDay();
      switch (appointmemt_day.toString()) {
        case '0':
          appointmemt_day = 'sunday';
          break;
        case '1':
          appointmemt_day = 'monday';
          break;
        case '2':
          appointmemt_day = 'tuesday';
          break;
        case '3':
          appointmemt_day = 'wednesday';
          break;
        case '4':
          appointmemt_day = 'thursday';
          break;
        case '5':
          appointmemt_day = 'friday';
          break;
        case '6':
          appointmemt_day = 'saturday';
          break;
        default:
          appointmemt_day = null;
          break;
      }
      console.log('appointment_day=', router.params);
      let res = await requestAppointment({
        from_slot_time: values.selected_from_slot.toUpperCase(),
        to_slot_time: values.selected_to_slot.toUpperCase(),
        appointment_date: values.selected_date,
        appointment_day: appointmemt_day,
        doctor_id: doctor_user._id,
        is_relative: is_relative,
        relative_patient: is_relative === true ? relative_patient : null,
      });
      console.log('Res===', res);
      if (res.appointment) {
        setShowModal(true);
      } else if (res.error === true) {
        setServerError(res.message);
      }
      await loadingContext.handleToggleLoader(false);
    },
  });
  const getTimeSlots = async () => {
    await loadingContext.handleToggleLoader(true);

    let tmp = await getTimeSlotList();

    let start_index = await tmp.indexOf(
      doctor_user.doctor.availability.slots.from,
    );

    let end_index = await tmp.indexOf(doctor_user.doctor.availability.slots.to);

    setStartIndex(startIndex);
    setEndIndex(endIndex);

    let tmp_2 = await tmp.slice(start_index, end_index);
    //@ts-ignore
    let tmp_arr = [];
    await tmp_2.map((item: any, index: number) => {
      tmp_arr.push({label: item, value: item});
    });
    //@ts-ignore
    await setAvailableSlots(tmp_arr);
    console.log('available slots=', availableSlots);
    await loadingContext.handleToggleLoader(false);
  };

  useEffect(() => {
    if (doctor_user === null) {
      navigation.navigate('PatientHome');
    }
  }, [doctor_user]);

  useEffect(() => {
    if (is_relative === null) {
      navigation.navigate('PatientHome');
    }
    if (is_relative === true) {
      //@ts-ignore
      set_relative_patient(router.params.relative_patient);
    }
    //@ts-ignore
    console.log('line 137=', router.params.is_relative);
  }, [is_relative]);

  return (
    <View style={styles.appointment_wrapper}>
      <ScrollView>
        {showCalendar === true ? (
          <AppointmentCalendar
            doctor={doctor_user.doctor}
            selectedDate={form.values.selected_date}
            setSelectedDate={async (val: string) => {
              await form.setFieldValue('selected_date', val);
            }}
          />
        ) : null}
        <View style={styles.error_wrapper}>
          <ErrorTEXT>
            {(form.values.selected_date === '' ||
              form.values.selected_date === null) &&
            isSubmiting === true
              ? 'appointment date required'
              : null}
          </ErrorTEXT>
        </View>
        <View style={styles.appointments_wrapper}>
          <TouchableOpacity
            onPress={async () => {
              await getTimeSlots();
              if (Platform.OS === 'android') {
                //@ts-ignore
                from_slot_ref.current.focus();
              } else if (Platform.OS === 'ios') {
                //@ts-ignore
                from_slot_ref.current.togglePicker(true);
              }
            }}
            style={styles.appointment_item_wrapper}>
            <TEXT text_style={styles.label}>From</TEXT>
            <TEXT text_style={styles.value}>
              {selected_from_slot != undefined &&
              availableSlots[selected_from_slot - 1]
                ? //@ts-ignore
                  availableSlots[selected_from_slot - 1].value
                : null}
            </TEXT>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              await getTimeSlots();
              if (Platform.OS === 'android') {
                //@ts-ignore
                to_slot_ref.current.focus();
              } else if (Platform.OS === 'ios') {
                //@ts-ignore
                to_slot_ref.current.togglePicker(true);
              }
            }}
            style={styles.appointment_item_wrapper}>
            <TEXT text_style={styles.label}>To</TEXT>

            <TEXT text_style={styles.value}>
              {selected_to_slot != undefined &&
              availableSlots[selected_to_slot - 1]
                ? //@ts-ignore
                  availableSlots[selected_to_slot - 1].value
                : null}
            </TEXT>
          </TouchableOpacity>
          <View style={styles.error_wrapper}>
            <ErrorTEXT>
              {isSubmiting === true &&
              //@ts-ignore
              (selected_from_slot > selected_to_slot ||
                selected_from_slot === selected_to_slot)
                ? 'From Slot must be less than to slot'
                : null}
            </ErrorTEXT>
          </View>
          <View style={styles.error_wrapper}>
            <ErrorTEXT>{serverError ? serverError : null}</ErrorTEXT>
          </View>

          <TouchableOpacity
            onPress={async () => {
              // setShowModal(true);
              await setIsSetSubmiting(false);
              await form.handleSubmit();
            }}>
            <View style={[styles.confirm_wrapper]}>
              <TEXT text_style={styles.confirm_text}>confirm</TEXT>
              <View style={styles.arrow_head_wrapper}>
                <RightArrowHead />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <SelectPicker
          items={availableSlots}
          label="label"
          ref={from_slot_ref}
          handleOnChange={async (itemValue: any, itemIndex: number) => {
            //@ts-ignore
            await setSelectedFromSlot(itemIndex);
            await form.setFieldValue(
              'selected_from_slot',
              //@ts-ignore
              availableSlots[itemIndex - 1].label,
            );
          }}
        />

        <SelectPicker
          items={availableSlots}
          label="label"
          ref={to_slot_ref}
          handleOnChange={async (itemValue: any, itemIndex: number) => {
            //@ts-ignore
            await setSelectedToSlot(itemIndex);
            await form.setFieldValue(
              'selected_to_slot',
              //@ts-ignore
              availableSlots[itemIndex - 1].label,
            );
          }}
        />
        {showModal === true ? (
          <SuccessfullModal
            date={new Date(form.values.selected_date).toDateString()}
            handleCloseModal={() => {
              //@ts-ignore
              setSelectedDate();
              //@ts-ignore
              setAvailableSlots([]);
              //@ts-ignore
              setSelectedFromSlot();
              //@ts-ignore
              setSelectedToSlot();
              //@ts-ignore
              setStartIndex();
              //@ts-ignore
              setEndIndex();
              //@ts-ignore
              setSelectedDate();
              setIsSetSubmiting(false);
              setShowModal(false);
              form.resetForm();

              navigation.navigate('DoctorsList');
            }}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default RequestAppointment;
