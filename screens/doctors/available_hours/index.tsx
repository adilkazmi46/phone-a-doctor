import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import RedCross from '@svgs/red_cross';
import {
  getTimeSlotList,
  setAvailabilityHours,
} from '@utils/doctor/availablity_hours';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import {fontPixel} from '@utils/normalize';
import ErrorTEXT from '@components/text/error_text';
import {LoadingContext} from '@contexts/loadingContext';
import {useIsFocused} from '@react-navigation/native';
import {save_user} from '@actions/auth';

const DoctorAvailableHours = () => {
  const user: any = useSelector((state: any) => {
    return state.user;
  });

  const loadingContext: any = useContext(LoadingContext);

  const dispatch = useDispatch();
  const [selectedDays, setSelectedDays] = useState([]);
  const [time_slots, setTimeSlots] = useState([]);
  const [selectedFromSlot, setSelectedFromSlot] = useState({
    value: user.doctor.availability.slots
      ? user.doctor.availability.slots.from
      : '',
    label: user.doctor.availability.slots
      ? user.doctor.availability.slots.from
      : '',
  });
  const [selectedToSlot, setSelectedToSlot] = useState({
    value: user.doctor.availability.slots
      ? user.doctor.availability.slots.to
      : '',
    label: user.doctor.availability.slots
      ? user.doctor.availability.slots.to
      : '',
  });
  const [can_select_day, set_can_select_day] = useState(true);

  const from_slot_ref_android: any = useRef();
  const from_slot_ref_ios: any = useRef();

  const to_slot_ref_android: any = useRef();
  const to_slot_ref_ios: any = useRef();

  const [isErrors, setIsErrors] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const getTimeSlots = async () => {
      await loadingContext.handleToggleLoader(true);

      let tmp = await getTimeSlotList();

      let tmp_2: Array<any> = [];
      await tmp.map((item: string, index: number) => {
        tmp_2.push({label: item, value: index});
      });
      //@ts-ignore
      await setTimeSlots(tmp_2);

      await loadingContext.handleToggleLoader(false);
    };
    getTimeSlots();
  }, [useIsFocused]);

  useEffect(() => {
    console.log('doctor_availablity=', user.doctor.availability);
    setSelectedDays(user.doctor.availability.available_days);
    setSelectedFromSlot({
      label: user.doctor.availability.slots
        ? user.doctor.availability.slots.from
        : '',
      value: user.doctor.availability.slots
        ? user.doctor.availability.slots.from
        : '',
    });
    setSelectedToSlot({
      label: user.doctor.availability.slots
        ? user.doctor.availability.slots.to
        : '',
      value: user.doctor.availability.slots
        ? user.doctor.availability.slots.to
        : '',
    });
  }, [user]);

  const handleDaySelection = async (day: string) => {
    await loadingContext.handleToggleLoader(true);

    set_can_select_day(false);
    //@ts-ignore
    let check_day = await selectedDays.includes(day);
    if (check_day === true) {
      let tmp_arr = await selectedDays.filter((item: string, index: number) => {
        return item != day;
      });
      setSelectedDays(tmp_arr);
    } else if (check_day === false) {
      //@ts-ignore
      selectedDays.push(day);
    }
    set_can_select_day(true);
    await loadingContext.handleToggleLoader(false);
  };

  const clearSelection = async () => {
    await loadingContext.handleToggleLoader(true);

    setSelectedDays([]);
    setSelectedFromSlot({label: '', value: ''});
    setSelectedToSlot({label: '', value: ''});
    await loadingContext.handleToggleLoader(false);
  };

  const handleConfirm = async () => {
    setErrors([]);

    await loadingContext.handleToggleLoader(true);
    let tmp: Array<string> = [];
    if (selectedFromSlot.value >= selectedToSlot.value) {
      tmp.push('To slot should be greater than from slot');
    }

    if (selectedDays.length < 1) {
      tmp.push('doctor should be available for one day in a week');
    }
    //@ts-ignore
    setErrors(tmp);
    if (errors.length > 0) {
      setIsErrors(true);
      await loadingContext.handleToggleLoader(false);
    } else if (errors.length === 0) {
      let res: any = await setAvailabilityHours({
        from_time: selectedFromSlot.label.toUpperCase(),
        to_time: selectedToSlot.label.toUpperCase(),
        available_days: selectedDays,
      });
      console.log('res method=', res);
      if (res.error === true) {
        //@ts-ignore
        setErrors([res.message]);
        setIsErrors(true);
        console.log('res.error=', res.error);
        await loadingContext.handleToggleLoader(false);
      } else if (res.user) {
        await dispatch(save_user(res.user));
      }
      await loadingContext.handleToggleLoader(false);
    }
  };

  return (
    <View style={styles.available_hours}>
      <TEXT text_style={styles.heading}>Your available hours are here</TEXT>
      <TEXT text_style={styles.day_label}>days</TEXT>

      <View style={styles.days_wrapper}>
        <TouchableOpacity
          onPress={() => {
            if (can_select_day === true) {
              handleDaySelection('sunday');
            }
          }}
          style={
            //@ts-ignore
            selectedDays.includes('sunday') === true
              ? styles.selected_day_item
              : styles.day_item
          }>
          <TEXT
            text_style={
              //@ts-ignore
              selectedDays.includes('sunday') === true
                ? styles.selected_day_text
                : styles.day_text
            }>
            sun
          </TEXT>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (can_select_day === true) {
              handleDaySelection('monday');
            }
          }}
          style={
            //@ts-ignore
            selectedDays.includes('monday') === true
              ? styles.selected_day_item
              : styles.day_item
          }>
          <TEXT
            text_style={
              //@ts-ignore
              selectedDays.includes('monday') === true
                ? styles.selected_day_text
                : styles.day_text
            }>
            mon
          </TEXT>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (can_select_day === true) {
              handleDaySelection('tuesday');
            }
          }}
          style={
            //@ts-ignore
            selectedDays.includes('tuesday') === true
              ? styles.selected_day_item
              : styles.day_item
          }>
          <TEXT
            text_style={
              //@ts-ignore
              selectedDays.includes('tuesday') === true
                ? styles.selected_day_text
                : styles.day_text
            }>
            tue
          </TEXT>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (can_select_day === true) {
              handleDaySelection('wednesday');
            }
          }}
          style={
            //@ts-ignore
            selectedDays.includes('wednesday') === true
              ? styles.selected_day_item
              : styles.day_item
          }>
          <TEXT
            text_style={
              //@ts-ignore
              selectedDays.includes('wednesday') === true
                ? styles.selected_day_text
                : styles.day_text
            }>
            wed
          </TEXT>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (can_select_day === true) {
              handleDaySelection('thursday');
            }
          }}
          style={
            //@ts-ignore
            selectedDays.includes('thursday') === true
              ? styles.selected_day_item
              : styles.day_item
          }>
          <TEXT
            text_style={
              //@ts-ignore
              selectedDays.includes('thursday') === true
                ? styles.selected_day_text
                : styles.day_text
            }>
            thu
          </TEXT>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (can_select_day === true) {
              handleDaySelection('friday');
            }
          }}
          style={
            //@ts-ignore
            selectedDays.includes('friday') === true
              ? styles.selected_day_item
              : styles.day_item
          }>
          <TEXT
            text_style={
              //@ts-ignore
              selectedDays.includes('friday') === true
                ? styles.selected_day_text
                : styles.day_text
            }>
            fri
          </TEXT>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (can_select_day === true) {
              handleDaySelection('saturday');
            }
          }}
          style={
            //@ts-ignore
            selectedDays.includes('saturday') === true
              ? styles.selected_day_item
              : styles.day_item
          }>
          <TEXT
            text_style={
              //@ts-ignore
              selectedDays.includes('saturday') === true
                ? styles.selected_day_text
                : styles.day_text
            }>
            sat
          </TEXT>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            from_slot_ref_android.current.focus();
          } else if (Platform.OS === 'ios') {
            from_slot_ref_ios.current.togglePicker(true);
          }
        }}
        style={styles.slot_wrapper}>
        <TEXT text_style={styles.slot_label}>from</TEXT>
        <TEXT text_style={styles.slot_time}>{selectedFromSlot.label}</TEXT>
      </TouchableOpacity>
      {Platform.OS === 'android' ? (
        <View style={{display: 'none'}}>
          <Picker
            ref={from_slot_ref_android}
            //@ts-ignore
            selectedValue={selectedFromSlot.value}
            onValueChange={(itemValue: number, itemIndex: number) => {
              setSelectedFromSlot({
                //@ts-ignore
                value: itemIndex,
                //@ts-ignore
                label: time_slots[itemValue].label,
              });
            }}>
            <Picker.Item
              value={undefined}
              label={'options'}
              fontFamily="Poppins-Regular"
            />
            {time_slots.map((item: any, index: number) => {
              return (
                <Picker.Item
                  value={item.value}
                  label={item.label}
                  key={index}
                  fontFamily="Poppins-Regular"
                />
              );
            })}
          </Picker>
        </View>
      ) : null}
      {Platform.OS === 'ios' ? (
        <RNPickerSelect
          items={time_slots}
          ref={from_slot_ref_ios}
          style={{
            inputIOS: {
              display: 'none',
            },
            inputAndroid: {
              display: 'none',
            },
          }}
          onValueChange={async (itemValue, itemIndex) => {
            setSelectedFromSlot({
              //@ts-ignore
              value: itemIndex,
              //@ts-ignore
              label: time_slots[itemValue].label,
            });
          }}></RNPickerSelect>
      ) : null}

      {Platform.OS === 'android' ? (
        <View style={{display: 'none'}}>
          <Picker
            ref={to_slot_ref_android}
            //@ts-ignore
            selectedValue={selectedToSlot.value}
            onValueChange={(itemValue: number, itemIndex: number) => {
              setSelectedToSlot({
                //@ts-ignore
                value: itemIndex,
                //@ts-ignore
                label: time_slots[itemValue].label,
              });
            }}>
            <Picker.Item
              value={undefined}
              label={'options'}
              fontFamily="Poppins-Regular"
            />
            {time_slots.map((item: any, index: number) => {
              //@ts-ignore
              return (
                <Picker.Item
                  value={item.value}
                  label={item.label}
                  key={index}
                  fontFamily="Poppins-Regular"
                />
              );
            })}
          </Picker>
        </View>
      ) : null}
      {Platform.OS === 'ios' ? (
        <RNPickerSelect
          items={time_slots}
          ref={to_slot_ref_ios}
          style={{
            inputIOS: {
              display: 'none',
            },
            inputAndroid: {
              display: 'none',
            },
          }}
          onValueChange={async (itemValue, itemIndex) => {
            console.log('item value=', itemValue);
            setSelectedToSlot({
              //@ts-ignore
              value: itemIndex,
              //@ts-ignore
              label: time_slots[itemValue].label,
            });
            // await form.setFieldValue('gender', itemValue);
          }}></RNPickerSelect>
      ) : null}

      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === 'android') {
            to_slot_ref_android.current.focus();
          } else if (Platform.OS === 'ios') {
            to_slot_ref_ios.current.togglePicker(true);
          }
        }}
        style={styles.slot_wrapper}>
        <TEXT text_style={styles.slot_label}>to</TEXT>
        <TEXT text_style={styles.slot_time}>{selectedToSlot.label}</TEXT>
      </TouchableOpacity>
      <View style={styles.confirm_wrapper}>
        <PrimaryButton
          handleOnPress={() => {
            handleConfirm();
          }}
          text="confirm slot"
        />
      </View>
      {isErrors === true ? (
        <>
          {errors.map((item: string, index: number) => {
            return <ErrorTEXT key={index}>{item}</ErrorTEXT>;
          })}
        </>
      ) : null}

      <View style={styles.mini_slot}>
        <View style={{flexDirection: 'row'}}>
          <TEXT
            text_style={[
              styles.mini_slot_grey_text,
              selectedDays.length > 4
                ? {fontSize: fontPixel(11), lineHeight: fontPixel(18)}
                : {},
            ]}>
            {selectedDays.length > 0 &&
              selectedDays.map((item: string, index: number) => {
                return item.slice(0, 3).toLowerCase() + ',';
              })}
            {selectedDays.length > 0 && '-'}
          </TEXT>
          <TEXT
            text_style={[
              styles.mini_slot_green_text,
              selectedDays.length > 4
                ? {fontSize: fontPixel(11), lineHeight: fontPixel(18)}
                : {},
            ]}>
            {selectedFromSlot.label}{' '}
            {selectedFromSlot.label && selectedToSlot.label ? '-' : ''}{' '}
            {selectedToSlot.label}
          </TEXT>
        </View>
        <TouchableOpacity
          onPress={() => {
            clearSelection();
          }}>
          {selectedDays.length > 0 ||
          selectedFromSlot.label ||
          selectedToSlot.label ? (
            <RedCross />
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorAvailableHours;
