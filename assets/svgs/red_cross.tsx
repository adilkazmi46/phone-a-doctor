import React from 'react';
import Svg, {Path} from 'react-native-svg';

const RedCross = () => {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 1.2L10.8 0L6 4.8L1.2 0L0 1.2L4.8 6L0 10.8L1.2 12L6 7.2L10.8 12L12 10.8L7.2 6L12 1.2Z"
        fill="#EA3338"
      />
    </Svg>
  );
};

export default RedCross;
