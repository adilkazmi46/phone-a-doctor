import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {TouchableOpacity} from 'react-native';
import BackIcon from '@svgs/back_icon';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <BackIcon />
    </TouchableOpacity>
  );
};

export default BackButton;
