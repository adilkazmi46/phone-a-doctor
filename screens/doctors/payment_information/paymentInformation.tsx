import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import {getPaymentInformation} from '@utils/doctor/payment';
import {fontPixel, heightPixel} from '@utils/normalize';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from '../personal_profile/styles';

const Payment_Information = ({
  setIsEditMode,
  payment_details,
}: {
  payment_details: any;
  setIsEditMode: any;
}) => {
  return (
    <>
      <View style={[styles.info_wrapper]}>
        {/* <TEXT text_style={styles.info_text}></TEXT> */}
        <TEXT text_style={[styles.info_text]}>
          Bank Name {payment_details.external_accounts.data[0].bank_name}
        </TEXT>
      </View>
      <View style={[styles.info_wrapper]}>
        {/* <TEXT text_style={styles.info_text}></TEXT> */}
        <TEXT text_style={[styles.info_text]}>
          country {payment_details.external_accounts.data[0].country}
        </TEXT>
      </View>
      <View style={[styles.info_wrapper]}>
        {/* <TEXT text_style={styles.info_text}></TEXT> */}
        <TEXT text_style={[styles.info_text]}>
          currency {payment_details.external_accounts.data[0].currency}
        </TEXT>
      </View>
      <View style={[styles.info_wrapper]}>
        {/* <TEXT text_style={styles.info_text}></TEXT> */}
        <TEXT text_style={[styles.info_text]}>
          Last 4 digits of ssn {payment_details.external_accounts.data[0].last4}
        </TEXT>
      </View>
      <View style={[styles.info_wrapper]}>
        <TEXT text_style={[styles.info_text]}>
          card payments status: {payment_details.capabilities.card_payments}
        </TEXT>
      </View>
      <View style={[styles.info_wrapper]}>
        {/* <TEXT text_style={styles.info_text}></TEXT> */}
        <TEXT text_style={[styles.info_text]}>
          {' '}
          bank transfers status: {payment_details.capabilities.transfers}
        </TEXT>
      </View>
      <View style={[styles.edit_btn_wrapper, {alignSelf: 'center'}]}>
        <PrimaryButton
          handleOnPress={() => {
            setIsEditMode(true);
          }}
          text="edit card"
        />
      </View>
    </>
  );
};

export default Payment_Information;
