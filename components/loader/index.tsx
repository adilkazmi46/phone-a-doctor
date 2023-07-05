import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loader_wrapper}>
      <ActivityIndicator color={'#27AD80'} size="large" animating={true} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader_wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999999999999,
    elevation: 9999999999,
  },
});
