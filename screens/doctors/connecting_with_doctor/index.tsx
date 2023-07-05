import TEXT from '@components/text';
import DoctorPicLg from '@svgs/doctor_pic_lg';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';

const ConnectWithDoctor = () => {
  const [timerCount, setTimer] = useState(600);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [useIsFocused]);
  return (
    <ScrollView style={{flex: 1, height: '100%'}}>
      <View style={styles.connect_doc_wrapper}>
        <View style={styles.profile_pic_wrapper}>
          <DoctorPicLg />
        </View>
        <TEXT text_style={styles.name}>Dr. stella kane</TEXT>
        <TEXT text_style={styles.title}>eye specialist</TEXT>
        <TEXT text_style={styles.tag_line}>
          Please do not close this window
        </TEXT>

        <TEXT text_style={[styles.tag_line, styles.timer_text]}>
          Estimated wait time
        </TEXT>
        <View style={styles.timmer_wrapper}>
          <TEXT text_style={styles.time}>
            {Math.floor(timerCount / 60)}:
            {timerCount % 60 ? timerCount % 60 : '00'}
          </TEXT>
        </View>

        <View style={styles.alert}>
          <TEXT text_style={styles.alert_text}>
            please stay in a quote place and turn on mobile data
          </TEXT>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConnectWithDoctor;
