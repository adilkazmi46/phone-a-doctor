import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const Patient_Profile = ({setIsEditMode}: {setIsEditMode: any}) => {
  const user = useSelector((state: any) => {
    return state.user;
  });
  return (
    <>
      <View style={styles.info_item_wrapper}>
        <TEXT text_style={styles.info_item_heading}>name:</TEXT>
        <TEXT text_style={[styles.info_item_heading]}>{user.full_name}</TEXT>
      </View>

      <View style={styles.info_item_wrapper}>
        <TEXT text_style={styles.info_item_heading}>Division</TEXT>
        <TEXT text_style={[styles.info_item_heading]}>{user.division}</TEXT>
      </View>

      <View style={styles.info_item_wrapper}>
        <TEXT text_style={styles.info_item_heading}>city</TEXT>
        <TEXT text_style={[styles.info_item_heading]}>{user.city}</TEXT>
      </View>

      <View style={styles.info_item_wrapper}>
        <TEXT text_style={styles.info_item_heading}>area</TEXT>
        <TEXT text_style={[styles.info_item_heading]}>{user.area}</TEXT>
      </View>

      <View style={styles.info_item_wrapper}>
        <TEXT text_style={styles.info_item_heading}>height</TEXT>
        <TEXT text_style={[styles.info_item_heading]}>
          {user.patient.height.ft} feet {user.patient.height.inches} inch
        </TEXT>
      </View>

      <View style={styles.info_item_wrapper}>
        <TEXT text_style={styles.info_item_heading}>weight</TEXT>
        <TEXT text_style={[styles.info_item_heading]}>
          {user.patient.weight} KG
        </TEXT>
      </View>

      <View style={styles.info_item_wrapper}>
        <TEXT text_style={styles.info_item_heading}>language</TEXT>
        <TEXT text_style={[styles.info_item_heading]}>{user.language}</TEXT>
      </View>
      <View style={styles.btn_wrapper}>
        <PrimaryButton
          text="edit"
          handleOnPress={async () => {
            setIsEditMode(true);
          }}
        />
      </View>
    </>
  );
};

export default Patient_Profile;
