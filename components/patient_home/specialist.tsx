import React, {useContext} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from 'react-native';
import StethoscopeIcon from '@svgs/stethoscope';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import TEXT from '@components/text';
import {useNavigation} from '@react-navigation/native';
import {LoadingContext} from '@contexts/loadingContext';
import {searchDoctor} from '@utils/doctor';
import Neurologist from '@svgs/neurologist';

const Specialist = () => {
  const navigation = useNavigation();
  const loadingContext: any = useContext(LoadingContext);
  const SearchDoctor = async (val: string) => {
    //@ts-ignore
    await loadingContext.handleToggleLoader(true);
    let res: any = await searchDoctor(val);
    if (res.users) {
      await loadingContext.handleToggleLoader(false);
      //@ts-ignore
      navigation.navigate('DoctorsList', {doctors: res.users});
    }
  };
  return (
    <View style={styles.spacialist_wrapper}>
      <View style={styles.header}>
        <TEXT text_style={styles.title}>spacialist</TEXT>
        <TouchableOpacity
          onPress={() => {
            //@ts-ignore
            navigation.navigate('MedicalDepartments');
          }}>
          <View style={styles.btn_wrapper}>
            <TEXT text_style={styles.btn_text}>all categories</TEXT>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.specialities_wrapper}>
        <TouchableOpacity
          onPress={() => {
            SearchDoctor(`is_24_7=${true}`);
          }}
          style={styles.speciality_item}>
          <View style={styles.bg_white}>
            <TEXT text_style={styles.speciality_title}>24/7 Doctors</TEXT>
          </View>
          <View style={[styles.bg_icon, styles.bg_green]}>
            <View style={styles.icon_wrapper}>
              <StethoscopeIcon />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            SearchDoctor(`medical_category=Cardiology / Heart`);
          }}
          style={styles.speciality_item}>
          <View style={styles.bg_white}>
            <TEXT text_style={styles.speciality_title}>Cardiac</TEXT>
          </View>
          <View style={[styles.bg_icon, styles.bg_purple]}>
            <View style={styles.icon_wrapper}>
              <StethoscopeIcon />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            SearchDoctor(`medical_category=Brain / Neurology`);
          }}
          style={styles.speciality_item}>
          <>
            <View style={styles.bg_white}>
              <TEXT text_style={styles.speciality_title}>Neurologist</TEXT>
            </View>
            <View style={[styles.bg_icon, styles.bg_orange]}>
              <View style={styles.icon_wrapper}>
                <StethoscopeIcon />
              </View>
            </View>
          </>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            SearchDoctor(`medical_category=Diabetes`);
          }}
          style={styles.speciality_item}>
          <View style={styles.bg_white}>
            <TEXT text_style={styles.speciality_title}>Diabetes</TEXT>
          </View>
          <View style={[styles.bg_icon, styles.bg_red]}>
            <View style={styles.icon_wrapper}>
              <StethoscopeIcon />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Specialist;

const styles = StyleSheet.create({
  spacialist_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  btn_wrapper: {
    width: widthPixel(113),
    height: heightPixel(29),
    backgroundColor: '#3DDFB8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  btn_text: {
    color: '#1c1c1c',
    fontSize: fontPixel(12),
    lineHeight: fontPixel(18),
    fontWeight: '300',
    textTransform: 'capitalize',
  },
  specialities_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: pixelSizeVertical(19),
    width: '100%',
  },
  speciality_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: widthPixel(140),
    height: heightPixel(151),
    marginVertical: pixelSizeVertical(10),
    //marginHorizontal: pixelSizeHorizontal(5),
  },
  bg_white: {
    backgroundColor: 'white',
    shadowColor: '#000000',
    width: widthPixel(130),
    height: heightPixel(137),
    borderRadius: 15,
    elevation: 2,
    shadowOffset: {
      width: widthPixel(5),
      height: heightPixel(5),
    },
    shadowOpacity: 0.1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bg_icon: {
    width: widthPixel(84),
    height: heightPixel(83),
    borderRadius: 15,
    marginLeft: pixelSizeHorizontal(-80),
    marginTop: pixelSizeVertical(-20),
    elevation: 2.1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speciality_title: {
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
    color: '#1c1c1c',
    textTransform: 'capitalize',
    marginBottom: pixelSizeVertical(20),
  },
  icon_wrapper: {
    width: widthPixel(36),
    height: heightPixel(36),
  },
  bg_green: {
    backgroundColor: '#27AD80',
  },
  bg_purple: {
    backgroundColor: '#984BFB',
  },
  bg_orange: {
    backgroundColor: '#FB754B',
  },
  bg_red: {
    backgroundColor: '#FB4B75',
  },
});
