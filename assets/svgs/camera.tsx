import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const CameraWhite = () => {
  return (
    <Svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <G clip-path="url(#clip0_795_457)">
        <Path
          d="M7.66658 6.33333C7.66658 6.51014 7.59635 6.67971 7.47132 6.80474C7.3463 6.92976 7.17673 7 6.99992 7H0.999919C0.823108 7 0.653538 6.92976 0.528514 6.80474C0.40349 6.67971 0.333252 6.51014 0.333252 6.33333V2.66667C0.333252 2.48986 0.40349 2.32029 0.528514 2.19526C0.653538 2.07024 0.823108 2 0.999919 2H2.33325L2.99992 1H4.99992L5.66658 2H6.99992C7.17673 2 7.3463 2.07024 7.47132 2.19526C7.59635 2.32029 7.66658 2.48986 7.66658 2.66667V6.33333Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M4.00008 5.66667C4.73646 5.66667 5.33341 5.06971 5.33341 4.33333C5.33341 3.59695 4.73646 3 4.00008 3C3.2637 3 2.66675 3.59695 2.66675 4.33333C2.66675 5.06971 3.2637 5.66667 4.00008 5.66667Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_795_457">
          <Rect width="8" height="8" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CameraWhite;
