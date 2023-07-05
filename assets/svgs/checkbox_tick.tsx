import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CheckboxTick = () => {
  return (
    <Svg width="10" height="7" viewBox="0 0 10 7" fill="none">
      <Path
        d="M9 1L3.5 6.5L1 4"
        stroke="#27AD80"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CheckboxTick;
