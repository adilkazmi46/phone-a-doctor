import React, {useContext} from 'react';
import {View} from 'react-native';
import styles from './styles';
import ProfilePicIcon from '@svgs/profile_pic_icon';
import TEXT from '@components/text';
import ProfileSettingsIcon from '@svgs/profile_settings';
import NotificationIcon from '@svgs/notification_icon';
import LockIcon from '@svgs/lock_icon';
import LogoutIcon from '@svgs/logout_icon';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import DoctorProfileIcon from '@svgs/doctor_profile_icon';
import PhoneIcon from '@svgs/phone_icon';
import PaymentInformation from '@svgs/payment_information';
import {useDispatch, useSelector} from 'react-redux';
import {LoadingContext} from '@contexts/loadingContext';
import {remove_user, signout} from '@actions/auth';
import Patient_Icon from '@svgs/patient_icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SideBar = (props: any) => {
  const navigation = useNavigation();
  const type = props.type;
  const handleNavigation = (screen: any) => {
    navigation.navigate(screen);
  };
  const loadingContext: any = useContext(LoadingContext);
  const dispatch = useDispatch();
  const user: any = useSelector((state: any) => {
    return state.user;
  });

  const handleLogout = async () => {
    await loadingContext.handleToggleLoader(true);
    await AsyncStorage.removeItem('jwt_token');
    await dispatch(signout(false));
    await dispatch(remove_user());

    console.log('logout 35 =');

    //@ts-ignore
    // navigation.navigate('Splash');

    await loadingContext.handleToggleLoader(false);
  };
  return (
    <DrawerContentScrollView {...props} style={styles.sidebar_wrapper}>
      <View style={styles.header}>
        <View style={styles.profile_pic_wrapper}>
          {type === 'patient' &&
          user.patient &&
          user.patient.profilePic &&
          user.patient.profilePic.key ? (
            <View style={styles.profile_pic_wrapper}>
              {/* <S3Image
                imgKey={
                  user['custom:userType'] === 'patient'
                    ? user.patient.profilePic.key
                    : ''  
                }
                resizeMode="cover"
                theme={{width: '100%', height: '100%'}}
              /> */}
            </View>
          ) : type === 'patient' ? (
            <ProfilePicIcon />
          ) : null}
          {type === 'doctor' ? (
            user.doctor.profilePic && user.doctor.profilePic.key ? (
              <View style={styles.profile_pic_wrapper}>
                {/* <S3Image
                  imgKey={   
                    userAttribtues['custom:userType'] === 'doctor' 
                      ? doctorProfile.profilePic.key
                      : ''
                  }
                  resizeMode="cover"
                  theme={{width: '100%', height: '100%'}}
                /> */}
              </View>
            ) : (
              <ProfilePicIcon />
            )
          ) : type === 'doctor' ? (
            <DoctorProfileIcon />
          ) : null}
        </View>
        <TEXT text_style={styles.name}>
          {type === 'patient'
            ? user.full_name
            : type === 'doctor'
            ? user.doctor.title + ' ' + user.full_name
            : ''}
        </TEXT>

        <View style={styles.phone_wrapper}>
          {type === 'doctor' ? (
            <View style={styles.phone_icon_wrapper}>
              <PhoneIcon />
            </View>
          ) : null}
          <TEXT text_style={styles.id}>
            {type === 'patient'
              ? 'id: 5678903'
              : type === 'doctor'
              ? user.phone_number
              : ''}
          </TEXT>
        </View>
      </View>
      <View style={styles.menu_item_wrapper}>
        {props.type === 'doctor' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('DoctorPersonalProfile');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Personal Profile</TEXT>
              <View style={styles.icon_wrapper}>
                <ProfileSettingsIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.type === 'doctor' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('DoctorProfessionalProfile');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Professional Profile</TEXT>
              <View style={styles.icon_wrapper}>
                <ProfileSettingsIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.type === 'doctor' || props.type === 'patient' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('PaymentInformation');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Payment Information</TEXT>
              <View style={styles.icon_wrapper}>
                <PaymentInformation />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.type === 'doctor' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('DoctorAppointmentRequests');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>
                Appointment Requirements
              </TEXT>
              <View style={styles.icon_wrapper}>
                <NotificationIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.type === 'doctor' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('DoctorAppointmentsHistory');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>All Appointments</TEXT>
              <View style={styles.icon_wrapper}>
                <NotificationIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {props.type === 'patient' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('AppointmentRequests');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Appointment Requests</TEXT>
              <View style={styles.icon_wrapper}>
                <LockIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {props.type === 'doctor' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('DoctorAvailableHours');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Set Available Hours</TEXT>
              <View style={styles.icon_wrapper}>
                <LockIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        {props.type === 'patient' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('PatientProfileSettings');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Profile Settings</TEXT>
              <View style={styles.icon_wrapper}>
                <ProfileSettingsIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.type === 'patient' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('MyPrescriptions');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>my prescriptions</TEXT>
              <View style={styles.icon_wrapper}>
                <NotificationIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.type === 'patient' ? (
          <TouchableOpacity
            onPress={() => {
              handleNavigation('ManagePatients');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Manage Paitents</TEXT>
              <View style={styles.icon_wrapper}>
                <LockIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.type === 'patient' ? (
          <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              navigation.navigate('ChangePassword');
            }}>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Change password</TEXT>
              <View style={styles.icon_wrapper}>
                <LockIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.type === 'patient' ? (
          <TouchableOpacity>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Payment history</TEXT>
              <View style={styles.icon_wrapper}>
                <LockIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.type === 'patient' ? (
          <TouchableOpacity>
            <View style={styles.menu_item}>
              <TEXT text_style={styles.menu_label}>Payment terms</TEXT>
              <View style={styles.icon_wrapper}>
                <LockIcon />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity>
          <View style={styles.menu_item}>
            <TEXT text_style={styles.menu_label}>terms & conditions</TEXT>
            <View style={styles.icon_wrapper}>
              <ProfileSettingsIcon />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.menu_item}>
            <TEXT text_style={styles.menu_label}>Privacy policy</TEXT>
            <View style={styles.icon_wrapper}>
              <ProfileSettingsIcon />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.menu_item}>
            <TEXT text_style={styles.menu_label}>contact us</TEXT>
            <View style={styles.icon_wrapper}>
              <LockIcon />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            handleLogout();
          }}>
          <View style={styles.menu_item}>
            <TEXT text_style={styles.menu_label}>log out</TEXT>
            <View style={styles.icon_wrapper}>
              <LogoutIcon />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default SideBar;
