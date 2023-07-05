/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  LogBox,
  StatusBar,
  StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';
import RootNavigation from './routes/root';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import LoadingContextProvider from '@contexts/loadingContext';
import {createStore} from 'redux';
import root_reducers from '@reducers/root';
import {Provider} from 'react-redux';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {io} from 'socket.io-client';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  const store = createStore(root_reducers);

  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreLogs([
      "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
      'Warning: Failed prop type: Invalid prop `month` of type `Number` supplied to `Calendar`, expected instance of `XDate`.',
    ]);
    notifee.registerForegroundService(notification => {
      return new Promise(() => {});
    });
  }, []);

  return (
    //@ts-ignore
    <StripeProvider publishableKey={process.env.STRIPE_PUBLISHABLE_KEY}>
      <Provider store={store}>
        <KeyboardAvoidingView
          behavior="height"
          style={{flex: 1}}
          enabled={true}>
          <StatusBar
            barStyle={'dark-content'}
            translucent={true}
            backgroundColor="transparent"
          />
          <LoadingContextProvider>
            <RootNavigation />
          </LoadingContextProvider>
        </KeyboardAvoidingView>
      </Provider>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    flex: 1,
  },
});

export default App;
