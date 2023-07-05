import React, {useContext, useEffect, useState} from 'react';
import TEXT from '@components/text';
import {Alert, View} from 'react-native';
import styles from '../personal_profile/styles';
import {ScrollView} from 'react-native';
import PaymentInformationForm from './payment_information_form';
import Payment_Information from './paymentInformation';
import {LoadingContext} from '@contexts/loadingContext';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPaymentSheetParams, getStripeURL} from '@utils/index';
import {WebView} from 'react-native-webview';
import {user} from '@reducers/auth';
import {get_stripe_account_details} from '@utils/payment';
import {save_user} from '@actions/auth';
import {pixelSizeHorizontal} from '@utils/normalize';
import {useStripe} from '@stripe/stripe-react-native';

const PaymentInformation = () => {
  const _user = useSelector((state: any) => {
    return state.user;
  });
  const dispatch = useDispatch();

  const [showWebView, setShowWebView] = useState(null);
  const [webViewURI, setWebViewURI] = useState('');
  const [payment_details, set_payment_details] = useState({});
  const loadingContext: any = useContext(LoadingContext);
  const [isEditMode, setIsEditMode] = useState(false);

  const [_ephemeralKey, set_ephemeralKey] = useState('');
  const [_customer, set_customer] = useState('');
  const [_setupIntent, set__setupIntent] = useState('');
  const [serverErrors, setServerErrors] = useState('');
  const [payment_intent, set_payment_intent] = useState({});

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const getPaymentInformation = async () => {
    await loadingContext.handleToggleLoader(true);

    // @ts-ignore

    let res: any = await getStripeURL({
      accountID: _user.stripe_account.account.id,
    });

    if (res.error === true) {
      setServerErrors(res.message);
      return;
    }
    let res_: any = await fetchPaymentSheetParams();
    if (res_.setupIntent) {
      set__setupIntent(res_.setupIntent);
    }
    if (res_.ephemeralKey) {
      set_ephemeralKey(res_.ephemeralKey);
    }
    if (res_.customer) {
      set_customer(res_.customer);
    }

    if (res_.error === true) {
      setServerErrors(res_.message);
      return;
    }
    if (res.links) {
      setWebViewURI(res.links.url);
    }
    if (res.user) {
      dispatch(save_user(res.user));
    }
    if (res.paymentIntent) {
      set_payment_intent(res.paymentIntent);
    }

    if (_user.stripe_account.account.details_submitted === true) {
      //@ts-ignore
      setShowWebView(false);
      await loadingContext.handleToggleLoader(false);
    } else if (_user.stripe_account.account.details_submitted === false) {
      //@ts-ignore
      setShowWebView(true);
    }
    // await loadingContext.handleToggleLoader(false);
  };

  useEffect(() => {
    const initialize = async () => {
      getPaymentInformation();
    };
    initialize();
  }, []);

  const handleReturnURL = async () => {
    await loadingContext.handleToggleLoader(true);
    // @ts-ignore

    let res: any = await getStripeURL({
      accountID: _user.stripe_account.account.id,
    });
    // console.log('line 69====', res);
    if (res.links) {
      await setWebViewURI(res.links.url);
    }
    if (res.user) {
      await dispatch(save_user(res.user));
    }
    if (res.paymentIntent) {
      set_payment_intent(res.paymentIntent);
    }

    //@ts-ignore
    setShowWebView(false);
    await loadingContext.handleToggleLoader(false);
  };

  const handleStripeToken = async (account_id: string) => {
    await loadingContext.handleToggleLoader(true);
    //@ts-ignore
    // setShowWebView(false);
    let res = await getStripeURL({accountID: account_id});
    if (res.links) {
      setWebViewURI(res.links.url);
    }
    if (res.user) {
      dispatch(save_user(res.user));
    }

    await loadingContext.handleToggleLoader(false);
    // setIsEditMode(true);
  };
  useEffect(() => {
    if (
      _user.stripe_account.is_verified === true &&
      _user.payment_details.is_payment_sheet_completed === false
    ) {
      setIsEditMode(true);
    }
  }, [_user]);
  useEffect(() => {
    setIsEditMode(!isEditMode);
  }, [payment_intent]);
  return (
    <View style={styles.profile_wrapper}>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          flex: 1,
        }}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}>
        <TEXT
          text_style={[
            styles.payment_information_title,
            {marginLeft: pixelSizeHorizontal(20)},
          ]}>
          bank information
        </TEXT>
        {showWebView === true ? (
          <View
            style={{
              width: '100%',
              height: 1000,
              flex: 1,
              padding: 0,
            }}>
            <WebView
              setBuiltInZoomControls={false}
              containerStyle={{width: '100%'}}
              scalesPageToFit={false}
              onLoadEnd={async (props: any) => {
                await loadingContext.handleToggleLoader(false);
              }}
              onLoadStart={async (props: any) => {
                console.log(
                  'line 132===>>>>',
                  props.nativeEvent.url,
                  process.env.API_URL + 'user/stripe-return-url',
                );
                if (
                  props.nativeEvent.url ===
                  process.env.API_URL + 'user/stripe-return-url'
                ) {
                  await handleReturnURL();
                  //@ts-ignore
                  // setShowWebView(false);
                }
              }}
              onNavigationStateChange={async navState => {
                // await loadingContext.handleToggleLoader(false);

                const {url} = navState; // extracting url from navState obj
                //@ts-ignore
                let back_end_url: string = process.env.API_URL;
                //ts-ignore
                let check_account = url.includes(
                  back_end_url + 'user/stripe-accoun-url',
                );

                //ts-ignore
                let check_submit = url.includes(
                  back_end_url + 'user/stripe-return-url',
                );

                if (check_submit === true) {
                  handleStripeToken(_user.stripe_account.account.id);
                }

                if (check_account === true) {
                  handleStripeToken(_user.stripe_account.account.id);
                }
              }}
              source={{
                uri: webViewURI,
              }}
            />
          </View>
        ) : null}

        {isEditMode === true &&
        _ephemeralKey.length > 0 &&
        _setupIntent.length > 0 &&
        _customer.length > 0 ? (
          <PaymentInformationForm
            setIsEditMode={setIsEditMode}
            _customer={_customer}
            _ephemeralKey={_ephemeralKey}
            _setupIntent={_setupIntent}
            payment_intent={payment_intent}
            //@ts-ignore
            is_bank_details_completed={
              _user.payment_details.is_payment_sheet_completed
            }
          />
        ) : null}

        {showWebView === false ? (
          <Payment_Information
            payment_details={_user.stripe_account.account}
            setIsEditMode={setShowWebView}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default PaymentInformation;
