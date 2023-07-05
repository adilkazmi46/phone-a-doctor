import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import TEXT from '@components/text';

import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';

const AppointmentCalendar = ({
  doctor,
  selectedDate,
  setSelectedDate,
}: {
  doctor: any;
  selectedDate: string;
  setSelectedDate: any;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  useEffect(() => {
    console.log('selected_date=', selectedDate);
  }, [selectedDate]);

  return (
    <>
      <View style={styles.horizontal_line}></View>

      {
        <View>
          {/* {showCalendar === true ? ( */}
          <Calendar
            hideArrows={false}
            hideExtraDays={true}
            current={currentDate.toDateString()}
            month={selectedMonth}
            markingType={'custom'}
            disableAllTouchEventsForDisabledDays={true}
            dayComponent={props => {
              //@ts-ignore

              let is_available = false;
              let available_days = doctor.availability.available_days;
              //@ts-ignore
              let tmp: string = props.accessibilityLabel;
              for (let i = 0; i < available_days.length; i++) {
                if (tmp.toLowerCase().includes(available_days[i]) === true) {
                  is_available = true;
                }
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (
                      is_available === true &&
                      //@ts-ignore
                      new Date(currentDate) <
                        //@ts-ignore
                        new Date(props.date?.dateString)
                    ) {
                      setShowCalendar(false);
                      console.log('80=');
                      //@ts-ignore
                      setSelectedDate(props.date?.dateString);
                    }
                  }}
                  style={
                    selectedDate === props.date?.dateString &&
                    //@ts-ignore
                    new Date(currentDate) <
                      //@ts-ignore
                      new Date(props.date?.dateString)
                      ? [styles.date_wrapper, styles.selected_date_wrapper]
                      : styles.date_wrapper
                  }>
                  <TEXT
                    text_style={
                      selectedDate === props.date?.dateString &&
                      //@ts-ignore
                      new Date(currentDate) <
                        //@ts-ignore
                        new Date(props.date?.dateString)
                        ? styles.selected_date
                        : is_available === true &&
                          //@ts-ignore
                          new Date(currentDate) <
                            //@ts-ignore
                            new Date(props.date?.dateString)
                        ? {color: 'black'}
                        : {color: 'lightgrey'}
                    }>
                    {props.date?.day}
                  </TEXT>
                </TouchableOpacity>
              );
            }}
            initialDate={currentDate.toDateString()}
            // renderHeader={date => {
            //   return <View></View>;
            // }}
          />
          {/* ) : null} */}
        </View>
      }
      <View style={styles.horizontal_line_2}></View>
    </>
  );
};

export default AppointmentCalendar;

const styles = StyleSheet.create({
  month_picker: {
    width: widthPixel(175),
  },
  month_year_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',

    paddingTop: pixelSizeVertical(20),
    paddingHorizontal: pixelSizeVertical(36),
  },
  month_label: {
    fontSize: fontPixel(17),
    lineHeight: fontPixel(22),
    color: '#1c1c1c',
  },
  picker_wrapper: {
    display: 'none',
  },
  dropdown_arrow_wrapper: {
    height: heightPixel(4),
    width: widthPixel(8),
    marginLeft: pixelSizeHorizontal(5),
    marginVertical: 'auto',
  },
  picker_wrapper_real: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  year_picker_wrapper_real: {
    width: widthPixel(70),
    height: heightPixel(32),
    backgroundColor: '#27AD80',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  year_label_picker: {
    color: 'white',
    fontSize: fontPixel(11),
    lineHeight: fontPixel(13),
    marginTop: pixelSizeVertical(5),
  },
  horizontal_line: {
    width: '100%',
    height: heightPixel(1),
    borderBottomColor: 'rgba(104,104,104,0.5)',
    borderBottomWidth: 1,
    marginTop: pixelSizeVertical(34),
    marginBottom: pixelSizeVertical(17),
  },
  horizontal_line_2: {
    width: '100%',
    height: heightPixel(1),
    borderBottomColor: 'rgba(104,104,104,0.5)',
    borderBottomWidth: 1,
    marginBottom: pixelSizeVertical(21),
  },
  date_wrapper: {
    width: widthPixel(30),
    height: heightPixel(30),
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected_date_wrapper: {
    backgroundColor: '#27AD86',
  },
  selected_date: {
    color: 'white',
  },
});
