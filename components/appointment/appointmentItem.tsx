import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityComponent,
  View,
} from 'react-native';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import TEXT from '@components/text';
import {useNavigation} from '@react-navigation/native';
import DownloadCloud from '@svgs/download_cloud';

const AppointmentItem = ({
  date,
  month,
  name,
  time,
  day,
  isDownload,
  isCancel,
  isDoctor,
  status,
  handleCancelAppointment,
}: {
  date: string;
  month: string;
  name: string;
  time: string;
  day: string;
  isCancel?: boolean;
  isDownload?: boolean;
  isDoctor?: boolean;
  status?: string;
  handleCancelAppointment?: any;
}) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.appointment_wrapper}>
        <View style={styles.date_wrapper}>
          {isDoctor && isDoctor === true ? (
            <View style={styles.download_icon_wrapper}>
              <DownloadCloud />
            </View>
          ) : (
            <>
              <TEXT text_style={styles.date}>{date}</TEXT>
              <TEXT text_style={styles.month}>{month}</TEXT>
            </>
          )}
        </View>
        <View style={styles.data_wrapper}>
          <TEXT text_style={styles.name}>{name}</TEXT>
          <TEXT text_style={styles.time_day}>
            {day} . {time}
          </TEXT>
          {isDownload && isDownload === true ? (
            <View style={styles.download_wrapper}>
              <TEXT text_style={styles.download_text}>download</TEXT>
            </View>
          ) : null}
          {status && status.length > 0 ? (
            <View
              style={[
                styles.download_wrapper,
                styles.cancel_wrapper,
                status === 'awaiting'
                  ? {backgroundColor: 'grey'}
                  : status === 'rejected'
                  ? {backgroundColor: 'red'}
                  : {},
              ]}>
              <TEXT text_style={styles.download_text}>{status}</TEXT>
            </View>
          ) : null}

          {isCancel && isCancel === true ? (
            <TouchableOpacity
              onPress={async () => {
                await handleCancelAppointment();
                //@ts-ignore
                //navigation.navigate('SelectPatient');
              }}>
              <View style={[styles.download_wrapper, styles.cancel_wrapper]}>
                <TEXT text_style={styles.download_text}>cancel</TEXT>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default AppointmentItem;
const styles = StyleSheet.create({
  appointment_wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(39,173,128,0.1)',
    borderRadius: 13,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date_wrapper: {
    width: widthPixel(55),
    height: heightPixel(55),
    borderRadius: 7,
    borderColor: '#27AD80',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: pixelSizeHorizontal(15),
  },
  date: {
    color: '#27AD80',
    fontSize: fontPixel(24),
    lineHeight: fontPixel(36),
    fontWeight: '800',
  },
  month: {
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
    color: '#27AD80',
    textTransform: 'capitalize',
  },
  data_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: pixelSizeHorizontal(19),
  },
  name: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  time_day: {
    color: '#686868',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
  },
  download_wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#6FCCA5',
    width: widthPixel(112),
    height: heightPixel(23),
    marginLeft: '20%',
    marginTop: pixelSizeVertical(2),
  },
  cancel_wrapper: {
    backgroundColor: '#D9A3A3',
  },
  download_text: {
    color: '#ffffff',
    fontWeight: '600',
    textTransform: 'capitalize',
    fontSize: fontPixel(12),
    lineHeight: fontPixel(18),
  },
  download_icon_wrapper: {
    width: widthPixel(32),
    height: heightPixel(22),
  },
});
