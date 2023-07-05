import {LoadingContext} from '@contexts/loadingContext';
import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {save_user} from '@actions/auth';
import {
  BillingDetails,
  useConfirmSetupIntent,
  useStripe,
} from '@stripe/stripe-react-native';
import {paymentSheetFilled} from '@utils/index';

const PaymentInformationForm = ({
  setIsEditMode,
  _customer,
  _setupIntent,
  _ephemeralKey,
  is_bank_details_completed,
  payment_intent,
}: {
  setIsEditMode: any;
  _customer: string;
  _setupIntent: string;
  payment_intent: any;

  _ephemeralKey: string;
  is_bank_details_completed: boolean;
}) => {
  const {confirmSetupIntent, loading} = useConfirmSetupIntent();
  const {initPaymentSheet, presentPaymentSheet, confirmPayment} = useStripe();

  const [card, setCard] = useState();
  const dispatch = useDispatch();

  const loadingContext: any = useContext(LoadingContext);

  const navigation = useNavigation();
  const user = useSelector((state: any) => {
    return state.user;
  });
  const [serverErrors, setServerErrors] = useState({});
  const openPaymentSheet = async () => {
    console.log('line 42 hahaha============>');
    // see below
    //await loadingContext.handleToggleLoader(false);
    const res = await presentPaymentSheet();
    console.log('res line 46====', res);
    console.log('lien 55 ====>>', res.paymentOption?.label);
    //return;
    if (res.error) {
      Alert.alert(`Error code: ${res.error.code}`, res.error.message, [
        {
          text: 'OK',
          onPress: async () => {
            if (is_bank_details_completed === true) {
              setIsEditMode(false);
            } else {
              await openPaymentSheet();
            }
          },
        },
      ]);
    } else {
      let response: any = await paymentSheetFilled({
        label: res.paymentOption.label,
        image: res.paymentOption?.image,
        setupIntent: _setupIntent,
        customer: _customer,
        ephemeralKey: _ephemeralKey,
      });

      Alert.alert(
        'Success',
        'Your payment method is successfully set up for future payments!',
        [
          {
            text: 'OK',
            onPress: async () => {
              await dispatch(save_user(response.user));
            },
          },
        ],
      );
    }
    // await loadingContext.handleToggleLoader(false);
  };

  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const billingDetails: BillingDetails = {
      email: 'jenny.rosen@example.com',
    };
    // Create a setup intent on the backend
    //@ts-ignore
    const clientSecret = await createSetupIntentOnBackend();

    //@ts-ignore
    const {setupIntent, error} = await confirmSetupIntent(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });
    console.log('line 108 ====>>> ', setupIntent);

    if (error) {
      //Handle the error
    }
    // ...
  };

  useEffect(() => {
    const init_payment_sheet = async () => {
      await loadingContext.handleToggleLoader(true);
      console.log('line 169 =', _ephemeralKey);
      //@ts-ignore
      let res = await initPaymentSheet({
        customerId: _customer,
        customerEphemeralKeySecret: _ephemeralKey,
        setupIntentClientSecret: _setupIntent,
        merchantDisplayName: 'doctor_24_7',
        customFlow: true,
        paymentIntentClientSecret: payment_intent,
      });
      console.log('res 126 payment sheet init ====', res);
      await openPaymentSheet();
    };

    init_payment_sheet();
  }, []);

  return <></>;
};

export default PaymentInformationForm;
