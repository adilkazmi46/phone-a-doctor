import TEXT from '@components/text';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import MasterCardIcon from '@svgs/mastercard';
import PaytmIcon from '@svgs/paytm';
import VisaIcon from '@svgs/visa';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const PaymentMethod = () => {
  const {confirmPayment} = useStripe();
  const [showStripeCard, setShowStripeCard] = useState(false);
  const handlePaytm = async () => {
    // AllInOneSDKManager.startTransaction(orderId:'01',txnToken:"",amount:"01")
    //   .then(result => {
    //     updateUI(result);
    //   })
    //   .catch(err => {
    //     handleError(err);
    //   });
  };
  return (
    <View style={styles.payment_wrapper}>
      <TEXT text_style={styles.heading}>credit or debit card</TEXT>
      {showStripeCard === true ? (
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
      ) : null}
      <TouchableOpacity
        onPress={() => {
          setShowStripeCard(!showStripeCard);
        }}
        style={styles.icons_wrapper}>
        <View style={styles.icon}>
          <MasterCardIcon />
        </View>
        <View style={styles.icon}>
          <VisaIcon />
        </View>
      </TouchableOpacity>
      <TEXT text_style={styles.heading}>others</TEXT>
      <View style={styles.icons_wrapper}>
        <View style={styles.icon}>
          <PaytmIcon />
        </View>
      </View>
    </View>
  );
};

export default PaymentMethod;
const styles = StyleSheet.create({
  payment_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    height: '100%',
    paddingVertical: pixelSizeVertical(28),
    paddingHorizontal: pixelSizeHorizontal(38),
  },
  heading: {
    color: '#373737',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  icons_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: pixelSizeVertical(15),
    width: '100%',
  },
  icon: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000000',
    width: widthPixel(64),
    height: heightPixel(38),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: pixelSizeHorizontal(5),
  },
});
